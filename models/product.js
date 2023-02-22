import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{type:String,require:true},
    price:{type:String,require:true},
    size:{type:String,require:true},
    image:{type:String,require:true},

},{timestamps:true});

export default mongoose.model('Product',productSchema,'products');