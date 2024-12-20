import mongoose, { Schema } from 'mongoose';
import { TAuthor, TBlog } from './Blog.interface';

const AurhorScheema = new Schema<TAuthor>(

    {
        AuthorName: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            required: true,
          }}
    
    
)
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
author:AurhorScheema,
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
