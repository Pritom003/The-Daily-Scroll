
import User from "../user/User.model";
import { TBlog } from "./Blog.interface";
import Blog from "./Blog.model";


const createBlogtoDB = async (payload: TBlog) => {
    // Create a new blog post with all the fields
const author = await User.findById(payload.author).select('name email role')
const blogData = {
    ...payload,
    author: {
      AuthorName: author?.name,
      email: author?.email,
      role: author?.role,
    },
  };
    const result = await Blog.create(blogData);
    return result;
  }



  export const BLogService={
    createBlogtoDB
  }