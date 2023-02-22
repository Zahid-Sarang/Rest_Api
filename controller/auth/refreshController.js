import Joi from "joi";
import { REFRESH_SECRET } from "../../config";
import { User, RefreshToken } from "../../models";
import CustomeErrorHandler from "../../services/CustomeErrorHandling";
import JwtService from "../../services/JwtService";

const refreshController = {
  async refresh(req, res, next) {
   // ====================== Request validation ====================== //
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });
    const { error } = refreshSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // ====================== check token in database ====================== //
    let refreshtoken;

    try {
      refreshtoken = await RefreshToken.findOne({
        token: req.body.refresh_token,
      });
      if (!refreshtoken) {
        return next(CustomeErrorHandler.unAuthorized("Invalid refresh token"));
      }
      let userId;
      try {
        const { _id } = await JwtService.verify(
          refreshtoken.token,
          REFRESH_SECRET
        );
        userId = _id;
      } catch (error) {
        return next(CustomeErrorHandler.unAuthorized("Invalid refresh token"));
      }

      const user = await User.findOne({ _id: userId });
      if (!user) {
        return next(CustomeErrorHandler.unAuthorized("No user found!"));
      }

      // ====================== tokens ====================== //
      const access_token = JwtService.sign({
        _id: user._id,
        role: user.role,
      });
      const refresh_token = JwtService.sign(
        { _id: user._id, role: user.role },
        "1y",
        REFRESH_SECRET
      );

      // ====================== database whitelist ====================== //
      await RefreshToken.create({ token: refresh_token });
      res.json({ access_token, refresh_token });
    } catch (error) {
      return next(new Error("Someting went wrong" + error.message));
    }
  },
};

export default refreshController;
