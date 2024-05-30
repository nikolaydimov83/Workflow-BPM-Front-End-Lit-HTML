import { serviceFactory } from "../api"

export default function dashboardServiceFactory(token){
    const api=serviceFactory(token);
    return {
        getAll:()=>api.get('/data/catalog'),
        getById:(id)=>api.get('/data/catalog/'+id),
        getDelayed:(page)=>api.get(`/reportsController?page=${page}`),
        getAllActive:(page)=>api.get(`/reportsController/active?page=${page}`),
        getClosedAndActive:(page)=>api.get(`/reportsController/all?page=${page}`),
        searchRequest:(page,data)=>{
            if (!data){
                data=JSON.parse(sessionStorage.getItem('searchString'));
            }
            return api.post('/search/all?page='+page,data)
        },

        changeStatus:(id,data)=>api.post(`/data/changeStatus/${id}`,data),
        createComment:(id,data)=>api.post(`/comments/${id}`,data),
        editRequest:(id,data)=>api.put(`/data/edit/${id}`,data),
        createRequest:(data)=>api.post('/data/create',data),
        getSubjects:()=>api.get('/data/create'),
        getIapplyData:(iapplyId)=>api.get(`/iApply/${iapplyId}`),
        getHistory:(id)=>api.get(`/history/${id}`)

        
        
    }
}

