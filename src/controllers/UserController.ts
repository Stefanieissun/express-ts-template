import {Controller,Get} from '@overnightjs/core'
import {Request,Response} from 'express'

@Controller('api/users')
export class UserController{
    @Get('')
    // @Middleware(async(req,res,next)=>{
    //     console.log(req.url);
    //     await next();
    // })
    private getAll(req:Request,res:Response){
        return res.status(200).json({
            message:"成功获取"
        });
    }
}