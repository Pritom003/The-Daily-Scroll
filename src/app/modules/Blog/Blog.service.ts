

// import QueryBuilder from "../../Builder/QueryBuilder";
import QueryBuilder from "../../Builder/QueryBuilder";
import AppError from "../../Errors/AppError";
import User from "../user/User.model";
import { TBlog } from "./Blog.interface";
import Blog from "./Blog.model";
import httpStatus from 'http-status';

const createBlogtoDB = async (payload: TBlog) => {
    // Create a new blog post with all the fields
const author = await User.findById(payload.author).select('name email role')
if (!author ) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
}

const BlockedUser=await User.isUserBlocked(author?.email)
if(BlockedUser){

    throw new AppError(httpStatus.FORBIDDEN,`The user is blocked `);
}
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
//  Get All BLogs 

const getAllBlogsFromDB = async (query :Record<string, unknown>) => {
    const BLogSerachableFields=['title', 'author.AuthorName']
    
    const BLogs = new QueryBuilder(
        Blog.find(),query
        )
        .search(BLogSerachableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
 
        const result=await  BLogs.modelQuery
       
    return result
}








  const UpdateBlogintoDB = async (id: string, payload: TBlog) => {
    // Find the blog by ID
    const blog = await Blog.findById(id);
  
    if (!blog) {
      throw new AppError(httpStatus.FORBIDDEN,'Blog not found');
    }

    const author = await User.findById(payload.author);
  if(!author || blog.author?.email !== author.email){
    throw new AppError(httpStatus.FORBIDDEN,'You are not the author of this blog');
  }
  const deletedBlog =await Blog.isBLogDeleted(id)
  if (deletedBlog) {
    throw new AppError(httpStatus.FORBIDDEN,'Blog is Deleted');
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { 
      title: payload.title, 
      content: payload.content,
   
    },
    { new: true } 
  );

  return updatedBlog;
  };
  const DeleteBlofromDB = async (id: string, payload: TBlog) => {
    // Find the blog by ID
    const blog = await Blog.findById(id);
  
    if (!blog) {
      throw new AppError(httpStatus.FORBIDDEN,'Blog not found');
    }
    const author = await User.findById(payload.author);
    if (!author || (blog.author?.email !== author.email)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Only the authorcan delete the blog');
      }
  
  
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { 
     isDeleted:true
   
    },
    { new: true } 
  );

  return updatedBlog;
  };
  export const BLogService={
    createBlogtoDB,
    UpdateBlogintoDB,
    DeleteBlofromDB,
    getAllBlogsFromDB
  }