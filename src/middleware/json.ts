import { NextFunction, Request, Response } from "express";

export function json1(req:Request,res:Response,next:NextFunction){
    console.log(req.url,req.params,req.query);
    console.log(res.headersSent);
    next();
}
