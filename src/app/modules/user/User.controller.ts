import { RequestHandler } from "express";

import httpStatus from 'http-status';
import CatchAsync from "../../utils/fetch.async";

import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./User.service";

const getAllUsers :RequestHandler = CatchAsync(async (req, res ) => {

    const result = await UserServices.getAllUserFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users are retrive  succesfully',
      data: result,
    });

})

const DeleteBlogbyAdmin:RequestHandler = CatchAsync(async (req, res ) => {
  const {id}=req.params
// Add the author's ID to the blog data
await UserServices.DeleteBlogByAdminfromDB(id);;
     
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog deleted successfully',
        data:{}
      });
  
  })
  const BlockUserbyAdmin:RequestHandler = CatchAsync(async (req, res ) => {
    const id=req.params.userId

    
    // Add the author's ID to the blog data
  await UserServices.BlockeUserByAdminfromDB(id);;
       
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'User Blocked successfully',
          data:{}
        });
    
    })
export const UserController={
    getAllUsers ,DeleteBlogbyAdmin,BlockUserbyAdmin
}