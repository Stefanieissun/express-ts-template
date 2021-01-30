import {Server} from '@overnightjs/core'

import fs from 'fs-extra'

const dirs = fs.readdirSync('./controllers');
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
            let controller = await import (`./controllers/${i}`);
            const contro = new controller[controllerName]();
            super.addControllers([contro]);
        }
    }

    
}

const sampleServer = new Servers();
sampleServer.start(PORT);