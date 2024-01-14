import {url} from "../utils/constant.js"

async function networkCall(){
   try {const promise= await fetch(url);
    const response= await promise.json();
    return response;}
    catch(err){
        console.log("Error found",err);
        throw err;
    }
}
export default networkCall;