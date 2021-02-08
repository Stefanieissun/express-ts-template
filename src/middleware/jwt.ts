import  jwt,{Secret} from 'jsonwebtoken';


export function generateJwt(data:{_id:string,role:'admin'|'user'},secret:Secret){
    const token = jwt.sign(data,secret,{expiresIn:60*60*1});
    return token;
}
