import { serviceFactory } from "../api"

export default function dashboardServiceFactory(token){
    const api=serviceFactory(token);
    return {
        getAll:()=>api.get('/data/catalog'),
        getById:(id)=>api.get('/data/catalog/'+id),
        getDelayed:()=>api.get(`/reportsController`),
        getAllActive:()=>api.get(`/reportsController/active`),
        getClosedAndActive:()=>api.get(`/reportsController/all`),
        searchRequest:(data)=>api.post('/search/all',data),

        changeStatus:(id,data)=>api.post(`/data/changeStatus/${id}`,data),
        createComment:(id,data)=>api.post(`/comments/${id}`,data),
        editRequest:(id,data)=>api.put(`/data/edit/${id}`,data),
        getSubjects:()=>api.get('/data/create'),
        
        
        create:(data)=>api.post('/data/characters',data),
        edit:(id,data)=>api.put('/data/characters/'+id,data),
        getLikes:(characterId)=>api.get(`/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`),
        postLike:(data)=>api.post(`/data/useful`,data),
        getUserLikes:(characterId,userId)=>api.get(`/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    }
}