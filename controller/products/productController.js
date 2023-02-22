import { Product } from "../../models";
import multer from "multer";
import CustomeErrorHandler from "../../services/CustomeErrorHandling";
import path from "path";
import Joi from "joi";
import fs from "fs";
import productSchema from "../../validators/productValidators";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`; // <= genrating uniqueName for file like 3453453-43434.png
    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image"); // 5mb

const productController = {
  async store(req, res, next) {
    // Multipart form data
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomeErrorHandler.serverError(err.message));
      }
      const filePath = req.file.path;
      // validation

      const { error } = productSchema.validate(req.body);
      if (error) {
        // Delete the uploaded file
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return next(CustomeErrorHandler.serverError(err.message));
          }
        });

        return next(error);
        // rootfolder/uploads/filename.png
      }

      const { name, price, size } = req.body;
      let document;
      try {
        document = await Product.create({
          name,
          price,
          size,
          image: filePath,
        });
      } catch (error) {
        return next(error);
      }
      res.status(201).json(document);
    });
  },

  //=================================== Update Product ==========================================//
  async update(req, res, next) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomeErrorHandler.serverError(err.message));
      }
      let filePath;
      if (req.file) {
        filePath = req.file.path;
      }
      // validation

      const { error } = productSchema.validate(req.body);
      if (error) {
       if(req.file){
         // Delete the uploaded file
         fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return next(CustomeErrorHandler.serverError(err.message));
          }
        });
       }

        return next(error);
        // rootfolder/uploads/filename.png
      }

      const { name, price, size } = req.body;
      let document;
      try {
        document = await Product.findOneAndUpdate({_id:req.params.id},{
          name,
          price,
          size,
          ...(req.file && { image:filePath })
          
        },{new:true});
      } catch (error) {
        return next(error);
      }
      res.status(201).json(document);
    });
  },
};

export default productController;
