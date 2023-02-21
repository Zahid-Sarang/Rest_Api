import Joi from "joi";
import CustomeErrorHandler from "../../services/CustomeErrorHandling";
import { User } from "../../models";
import bcrypt from "bcrypt";

const registerController = {
  async register(req, res, next) {
    //===========Validation==============================//
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return next(error); // passing the error to errorHandler.js
    }

    //==========check if user is in the database already=========//
    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomeErrorHandler.alreadyExist("This email is already taken")
        );
      }
    } catch (error) {
      return next(error); // passing the error
    }

    //==Hash password==//
    const { name, email, password } = req.body;

    const hasedPassword = await bcrypt.hash(password, 10);

    //==prepare the model==//

    const user = new User({ name, email, password: hasedPassword });

    try {
      const result = await User.save();

      //======Token=======//

    } catch (error) {
      return next(error);
    }

    res.json({ msg: "hello from back end" });
  },
};

export default registerController;

// * validate the request
// * authorise the request
// * check if user is in the database already
// * prepare model
// * store in database
// * generate jwt token
// * send response
