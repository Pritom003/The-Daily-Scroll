import mongoose, { Schema } from 'mongoose';
import { TBlog } from './Blog.interface';


const BlogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: [true, 'Author is required'],
    },
    isPublished: {
      type: Boolean,
      default: true, 
    },
  },
  {
    timestamps: true, 
  }
);

// Mongoose Model
const Blog = mongoose.model<TBlog>('Blog', BlogSchema);

export default Blog;
