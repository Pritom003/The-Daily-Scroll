import { RequestHandler } from "express";
import CatchAsync from "../../utils/fetch.async";
import sendResponse from "../../utils/sendResponse";
import { BLogService } from "./Blog.service";
import httpStatus from 'http-status';
import { JwtPayload } from "jsonwebtoken";


const CreateBlog:RequestHandler = CatchAsync(async (req, res ) => {
// console.log(req.user);
const Blogdata = req.body;
const author = req.user as JwtPayload;

// Add the author's ID to the blog data
const result = await BLogService.createBlogtoDB({ ...Blogdata, author: author.id});;
   
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog created successfully',
      data:result
    });

})

const getAllBlogs:RequestHandler = CatchAsync(async (req, res ) => {
  
    console.log(req.query);
    // Add the author's ID to the blog data
    const result = await BLogService.getAllBlogsFromDB(req.query);;
       
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Blogs Retrive successfully',
          data:result
        });
    
    })


const UpdateBlog:RequestHandler = CatchAsync(async (req, res ) => {
    const{ id }=req.params
    const Blogdata = req.body;
    const author = req.user as JwtPayload; 
    
    // Add the author's ID to the blog data
    const result = await BLogService.UpdateBlogintoDB(id,{ ...Blogdata, author: author.id});;
       
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Blog Updated successfully',
          data:result
        });
    
    })
    const DeleteBlog:RequestHandler = CatchAsync(async (req, res ) => {
        const{ id }=req.params
        const Blogdata = req.body;
        const author = req.user as JwtPayload; 
        
        // Add the author's ID to the blog data
      await BLogService.DeleteBlofromDB(id,{ ...Blogdata, author: author.id});;
           
            sendResponse(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: 'Blog deleted successfully',
              data:{}
            });
        
        })
export const BLogController={
    CreateBlog,
    UpdateBlog,DeleteBlog,
    getAllBlogs
}