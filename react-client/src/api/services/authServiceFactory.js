import { serviceFactory } from "../api";

export function authServiceFactory(token){
    const api=serviceFactory(token);
    return {
        login:(data)=>api.post('/users/login',data),
        register:(data)=>api.post('/users/register',data),
        logout:()=>api.get('users/logout')
    }
}