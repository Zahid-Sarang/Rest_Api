import CustomeErrorHandler from "../services/CustomeErrorHandling";
import JwtService from "../services/JwtService";

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(CustomeErrorHandler.unAuthorized());
  }
  const token = authHeader.split(" ")[1]; // split the token from the header
  try {
    const { _id, role } = await JwtService.verify(token);
    const user = {
      _id,
      role,
    };
    req.user = user; // passing the _id and role in the request
    next();
  } catch (error) {
    return next(CustomeErrorHandler.unAuthorized());
  }
};

export default auth;
