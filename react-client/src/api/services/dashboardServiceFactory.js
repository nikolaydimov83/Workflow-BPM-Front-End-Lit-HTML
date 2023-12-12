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
        createRequest:(data)=>api.post('/data/create',data),
        
        
        getSubjects:()=>api.get('/data/create'),
        getIapplyData:(iapplyId)=>api.get(`/iApply/${iapplyId}`),

        
        
    }
}