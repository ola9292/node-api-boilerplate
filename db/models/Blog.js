import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true, 'Blog title is required'],
    },
    content:{
        type: String,
        required:[true, 'Blog content is required'],
    }
}, {timestamps: true})

export default mongoose.model('Blog', blogSchema);