import { clearUserData, getUserData, setUserData } from "../utils.js";
import { get, post } from "./api.js";


export function logout(){
    get('/users/logout',getUserData().accessToken)
    clearUserData();
}



