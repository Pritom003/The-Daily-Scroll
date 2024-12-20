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


export const UserController={
    getAllUsers
}