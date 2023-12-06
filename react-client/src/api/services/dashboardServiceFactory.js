import { serviceFactory } from "../api"

export default function dashboardServiceFactory(token){
    const api=serviceFactory(token);
    return {
        getAll:()=>api.get('/data/characters?sortBy=_createdOn%20desc'),
        getById:(id)=>api.get('/data/characters/'+id),
        create:(data)=>api.post('/data/characters',data),
        edit:(id,data)=>api.put('/data/characters/'+id,data),
        getLikes:(characterId)=>api.get(`/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`),
        postLike:(data)=>api.post(`/data/useful`,data),
        getUserLikes:(characterId,userId)=>api.get(`/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    }
}