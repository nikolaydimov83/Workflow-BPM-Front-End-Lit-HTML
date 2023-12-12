import { clearUserData, getUserData } from "../utils/localStorage";

let baseUrl="https://localhost:3030"
async function request(userData,url,method,data){
    let options={
        method:method,
        headers:{}
    }

    if (data){
        options.headers['Content-Type']='application/json';
        options.body=JSON.stringify(data);
    }

    if (userData){
        options.headers['X-Authorization']=userData;
    }
try {
    let response=await fetch(baseUrl+url,options);

    if (!response.ok){
        if(response.status===403){
            clearUserData();
        }
        
        const error=await response.json()
        throw new Error(error.message)
        

    }

    if (response.status===204){
        return []
    }else{
        return response.json()
    }
} catch (error) {

    throw error
}

}

export async function get(userData,url,data=null){
    return request(userData,url,'GET',data)
}

export async function post(userData,url,data){
    return request(userData,url,'POST',data)
}

export async function put(userData,url,data){
    return request(userData,url,'PUT',data)
}

export async function del(userData,url,data=null){
    return request(userData,url,'DELETE',null,)
}

export function serviceFactory(token){
    return {
        get:get.bind(null,token),
        post:post.bind(null,token),
        put:put.bind(null,token),
        del:del.bind(null,token)
    }
}