declare namespace NodeJS{
    interface Process{
        env:{
            NODE_ENV:'local'|'development'|'production',
            MONGO:{
                host:string,
                pass:string
            },
            PORT:number
        }
    }
}