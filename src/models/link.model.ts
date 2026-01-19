import mongoose from "mongoose";
import { Schema } from "mongoose";

const linkSchema = new Schema({
    hash : {type:String , required:true},
    userId : {type:mongoose.Schema.Types.ObjectId , ref:"user", required:true}
}, {timestamps:true} )

export const Link = mongoose.model("link",linkSchema)