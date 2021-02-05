import {Server} from '@overnightjs/core'
import path from 'path'
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs-extra'
import {json1} from './middleware/json'
import {json,urlencoded,static as st} from 'express'
import config from 'config';

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
sampleServer.start(PORT);

// console.log(sampleServer.app.get('env'),process.env.NODE_ENV)