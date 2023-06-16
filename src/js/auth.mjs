
import { logInRequest } from "./externalServices.mjs";
import { setLocalStorage,alertMessage,getLocalStorage } from "./utils.mjs";

const tokenKey = "so-token";



function isTokenValid(token){

};

function checkLogin(){

}
export async function login(creds, redirect = "/"){
    try{
    const token = await logInRequest(creds);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
    } catch(err){
        alertMessage(err.message.message);
    }
    };