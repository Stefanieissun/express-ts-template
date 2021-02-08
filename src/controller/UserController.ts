import {Controller,Get, Post} from '@overnightjs/core'
import config from 'config';
import {Request,Response} from 'express'
import {generateJwt} from '../middleware/jwt'
import fs from 'fs-extra'
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

    @Post('a')
    private postAll(req:Request,res:Response){
        const body = req.body;
        console.log(body);
        res.status(200).json({body})
    }


    @Post('login')
    private login(req:Request,res:Response){
        const {userName,password} = req.body;
        if(userName !== 'Allen' || password !== '123456'){
            res.status(400).json({success:false,msg:"用户名或者密码错误"});
            return;
        }
        const token = generateJwt({_id:'1',role:'admin'},config.get('secret'));
        res.status(200).header('token',token).json({userName,password});
    }

    @Post('file')
    private file(req:Request,res:Response){
        // req.on('data',chunk=>{});
        req.pipe(fs.createWriteStream('1.ods')).on('finish',()=>res.status(200).json({success:true}));
    }
}