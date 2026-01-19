import mongoose from "mongoose";
import { Schema } from "mongoose";


const contentSchema = new Schema({
    title : {type:String , required:true},
    link : {type:String , required:true},
    type : {type:String, enum : ["text","image","video","audio"], required:true},
    tag : [{type:mongoose.Schema.Types.ObjectId , ref:"tag", required:true}],
    userId : {type:mongoose.Schema.Types.ObjectId , ref:"user", required:true}
}, {timestamps:true} )

export const Content = mongoose.model("content",contentSchema)