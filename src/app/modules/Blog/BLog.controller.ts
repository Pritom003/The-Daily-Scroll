import { RequestHandler } from "express";
import CatchAsync from "../../utils/fetch.async";
import sendResponse from "../../utils/sendResponse";
import { BLogService } from "./Blog.service";
import httpStatus from 'http-status';
import { JwtPayload } from "jsonwebtoken";


const CreateBlog:RequestHandler = CatchAsync(async (req, res ) => {
// console.log(req.user);
const Blogdata = req.body;
const author = req.user as JwtPayload; // Extract the user info from req.user

// Add the author's ID to the blog data
const result = await BLogService.createBlogtoDB({ ...Blogdata, author: author.id});;
   
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog created successfully',
      data:result
    });

})
export const BLogController={
    CreateBlog
}