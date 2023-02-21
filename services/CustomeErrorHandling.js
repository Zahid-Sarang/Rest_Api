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
}

export default CustomeErrorHandler;
