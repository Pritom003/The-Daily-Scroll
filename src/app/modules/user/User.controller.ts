import { RequestHandler } from "express";

import httpStatus from 'http-status';
import CatchAsync from "../../utils/fetch.async";
import { UserServices } from "./User.server";
import sendResponse from "../../utils/sendResponse";

const createUser :RequestHandler = CatchAsync(async (req, res ) => {


    const result = await UserServices.createUserDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created succesfully',
      data: result,
    });

})


export const UserController={
createUser
}