import { User } from "../../models"
import CustomeErrorHandler from "../../services/CustomeErrorHandling"

const userController = {
  async me(req,res,next){
    try{
        const user = await User.findOne({_id:req.user._id}).select('-password -updatedAt -__v')  // req.user is come from auth middelware
        if(!user) {
            return next(CustomeErrorHandler.notFound());
        }
        res.json(user);

    }catch(error){
      return  next(error)
    }
   }

}

export default userController