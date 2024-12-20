import mongoose, { Schema } from 'mongoose';
import { BlogModel, TAuthor, TBlog } from './Blog.interface';

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
const BlogSchema = new Schema<TBlog ,BlogModel>(
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
    isDeleted: {
        type: Boolean,
        default: false, 
      },
  },
  {
    timestamps: true, 
  }
);
BlogSchema.statics.isBLogDeleted = async function (id :string) {
    const DeletedBlog = await this.findOne({ _id:id, isDeleted: true });
    return DeletedBlog; 
  };
// Mongoose Model
const Blog = mongoose.model<TBlog ,BlogModel>('Blog', BlogSchema);

export default Blog;
