class CustomeErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }
  static alreadyExist(message) {
    return new CustomeErrorHandler(409, message);
  }
  static wrongCredentials(message='Username or  password is wrong!') {
    return new CustomeErrorHandler(401, message);
  }
  static unAuthorized(message='unAuthorized') {
    return new CustomeErrorHandler(401, message);
  }
  static notFound(message='404 Not Found') {
    return new CustomeErrorHandler(404, message);
  }
  static serverError(message='Internal Server error') {
    return new CustomeErrorHandler(500, message);
  }
}

export default CustomeErrorHandler;
