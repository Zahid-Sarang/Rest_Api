import { DEBUG_MODE } from "../config";
import { ValidationError } from "joi";
import CustomeErrorHandler from "../services/CustomeErrorHandling";

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: "Internal server error",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };
  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.message,
    };
  }
  if (err instanceof CustomeErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }
  res.status(statusCode).json(data);
};

export default errorHandler;
