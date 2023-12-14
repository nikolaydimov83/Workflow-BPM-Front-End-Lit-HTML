import { serviceFactory } from "../api"

export default function workflowServiceFactory(token){
    const api=serviceFactory(token);
    return {

        roles:()=>api.get('/workflow/roles'),
        statuses:()=>api.get('/workflow/statuses'),
        workflows:()=>api.get('/workflow/workflows'),
        subjects:()=>api.get('/workflow/subjects'), 

        createroles:(data)=>api.post('/workflow/roles',data),
        createstatuses:(data)=>api.post('/workflow/statuses',data),
        createworkflows:(data)=>api.post('/workflow/workflows',data),
        createsubjects:(data)=>api.post('/workflow/subjects',data)
    }
}