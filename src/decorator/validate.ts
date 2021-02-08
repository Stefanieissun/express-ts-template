import Joi from 'joi'
export function validate(schema:Joi.SchemaMap<any>,value:any){
    return (target:any,key:string,descriptor:PropertyDescriptor)=>{
        const oldFunc = target[key];
        const newFunc = (...args:any[])=>{
            const result = Joi.object(schema).validate(value);
            console.log(result);
            if(result.error){
                throw result.error
            }
            oldFunc.apply(target,args);
           
        };
        descriptor.value = newFunc;
        return descriptor;
    }
}

class Animal{

    @validate({name:Joi.string(),age:Joi.number()},{name:"Allen",age:15})
    public sayName(name:string){
        console.log(name);
        return name;
    }
}

let a = new Animal();
a.sayName('Alice');