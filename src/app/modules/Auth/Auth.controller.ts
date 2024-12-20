import { RequestHandler } from "express";

import httpStatus from 'http-status';
import CatchAsync from "../../utils/fetch.async";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./Auth.service";
import config from "../../config";
// import { AuthServices } from "./Auth.service";
const RegisterUser :RequestHandler = CatchAsync(async (req, res ) => {


    const result = await AuthServices.createUserDB(req.body);
   
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created succesfully',
      data: result,
    });

})
const LogInUser :RequestHandler = CatchAsync(async (req, res ) => {


    const result = await AuthServices.Loginuserservice(req.body);
    const { refreshToken ,accessToken }=result
    res.cookie('refreshToken',refreshToken,{
      secure:config.NODE_ENV==='production',
      httpOnly: true,

    })
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Login successful',
      data: {token:accessToken},
    });

})
const RefreshToken :RequestHandler = CatchAsync(async (req, res ) => {

const {refreshToken}=req.cookies
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'AccessToken Retrive  successfully',
    data: result,
  });

})

export const AuthController={
    LogInUser,RefreshToken,
    RegisterUser 
}