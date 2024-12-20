
import AppError from '../../Errors/AppError';
import Blog from '../Blog/Blog.model';
import User from './User.model';
import httpStatus from 'http-status';
const getAllUserFromDB = async () => {
    const users = await User.find().exec();
    return users
}
const DeleteBlogByAdminfromDB = async (id: string) => {
    // Find the blog by ID
    const blog = await Blog.findById(id);
  
    if (!blog) {
      throw new AppError(httpStatus.FORBIDDEN,'Blog not found');
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
  const BlockeUserByAdminfromDB = async (id: string) => {
  
  
  const updatedBlog = await User.findByIdAndUpdate(
    id,
    { 
     isBlocked:true
   
    },
    { new: true } 
  );

  return updatedBlog;
  };
export const UserServices={
    getAllUserFromDB,
    DeleteBlogByAdminfromDB,
    BlockeUserByAdminfromDB
}
