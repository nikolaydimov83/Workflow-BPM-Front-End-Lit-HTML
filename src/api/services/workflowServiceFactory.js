import { serviceFactory } from "../api"

export default function workflowServiceFactory(token){
    const api=serviceFactory(token);
    return {

        roles:()=>api.get('/workflow/roles'),
        statuses:()=>api.get('/workflow/statuses'),
        workflows:()=>api.get('/workflow/workflows'),
        subjects:()=>api.get('/workflow/subjects'), 

        getRoleById:(id)=>api.get('/workflow/roles/'+id),
        getStatusById:(id)=>api.get('/workflow/statuses/'+id),
        getWorkflowById:(id)=>api.get('/workflow/workflows/'+id),
        getSubjectById:(id)=>api.get('/workflow/subjects/'+id),

        createroles:(data)=>api.post('/workflow/roles',data),
        createstatuses:(data)=>api.post('/workflow/statuses',data),
        createworkflows:(data)=>api.post('/workflow/workflows',data),
        createsubjects:(data)=>api.post('/workflow/subjects',data),

        editRole:(data,id)=>api.put('/workflow/roles/'+id,data),
        editStatus:(data,id)=>api.put('/workflow/statuses/'+id,data),
        editWorkflow:(data,id)=>api.put('/workflow/workflows/'+id,data),
        editSubject:(data,id)=>api.put('/workflow/subjects/'+id,data),
    }
}