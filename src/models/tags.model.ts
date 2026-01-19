import mongoose from "mongoose";
import { Schema } from "mongoose";

const TagSchema = new Schema({
    title : {type:String , required:true},
})