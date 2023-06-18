import { logInRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import jwt_decode from "jwt-decode";


const tokenKey = "so-token";

function isTokenValid(token){
 if (token){
    //check to make sure token was actually passed
    const decoded = jwt_decode(token);
    // get current date
    let currentDate = new Date();
    if(decoded.exp * 1000 < currentDate.getTime()){
        //token has passed its time and has expired
        console.log("Token expired");
        return false;
    }else{
        console.log("Valid token");
        return true;
    }
    // if there is no token automaticallt return false
 }else return false;
};


// if there is a valid token this function will return token but will redirect user to login page 
//if the token is invalid.
 export function checkLogin(){
    //get token which is stored in the local Storage
    const token = getLocalStorage(tokenKey);
    //check retrieved toke against the isTokenValid function to see if its valid.
    const valid = isTokenValid(token);
     //do the following if it not valid
     if(!valid){
        //remove from local storage
        localStorage.removeItem(tokenKey)
        //get path to current location
        const location = window.location
        //console log current location path to check out what it contains
        console.log(location);
        //redirect user to login page by updating thw window.location
        window.location = `./login/index.html?redirect=${location.pathname}`
     }else return token // return the token if it is valid and has not expired and if they are already logged in.

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