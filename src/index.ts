import {Server} from '@overnightjs/core'
import path from 'path'
// import bluebird from 'bluebird'

// 头部安全
import helmet from 'helmet';
// 打印每一次请求的
import morgan from 'morgan';
import fs from 'fs-extra'
import {json1} from './middleware/json'
import {json,urlencoded,static as st} from 'express'
// 读取配置文件
import config from 'config';
// 跟环境变量来打印log
import debugFunc from 'debug'

// 根据 环境变量中的DEBUG 来区分是否要打印 DEBUG=app:debug,  环境变量可以写在package.json也可以写进Dockerfile
const debug = debugFunc('app:debug');

console.log('application name', config.get('name'));
const dirs = fs.readdirSync(path.join(__dirname,'./controller'));
const PORT = process.env.PORT === undefined? 3000:Number(process.env.PORT);

export class Servers extends Server{
    public constructor(){
        super(process.env.NODE_ENV === 'development');
        this.setupControllers();
    }

    public start(port: number): void { 
        this.app.listen(port, () => { 
          console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`); 
        }); 
    }


    private async setupControllers():Promise<void>{
        for(let i of dirs){
            const controllerName  = i.split('.')[0];
            let controller = await import (`./controller/${i}`);
            const contro = new controller[controllerName]();
            super.addControllers([contro]);
        }
    }

    
}

const sampleServer = new Servers();
const {app} = sampleServer;
app.use(json()).use(json1).use(urlencoded({extended:true})).use(st(path.join(__dirname,'./public'))).use(helmet());
if(app.get('env')==='dev'){
    console.log('morgan starting');
    app.use(morgan('dev'));
}


debug('start up app');
sampleServer.start(PORT);
