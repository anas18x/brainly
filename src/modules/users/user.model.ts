import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
    shareSlug: {
        type: String,
        unique: true,
        sparse: true,   // 'sparse' allows multiple documents to have a null value for this field, but still enforces uniqueness for non-null values
        default: null
    },
    isBrainPublic: {
        type: Boolean,
        default: false
    },



}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User;