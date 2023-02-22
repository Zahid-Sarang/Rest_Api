import mongoose from "mongoose";
import { APP_URL } from "../config";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{type:String,require:true},
    price:{type:String,require:true},
    size:{type:String,require:true},
    image:{type:String,require:true , get:(image) => {
        return `${APP_URL}/${image}`
    }},

},{timestamps:true,toJSON:{getters:true},id:false});

export default mongoose.model('Product',productSchema,'products');