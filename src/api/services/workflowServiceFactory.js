import { serviceFactory } from "../api"

export default function workflowServiceFactory(token){
    const api=serviceFactory(token);
    return {

        roles:()=>api.get('/workflow/roles'),
        statuses:()=>api.get('/workflow/statuses'),
        workflows:()=>api.get('/workflow/workflows'),
        subjects:()=>api.get('/workflow/subjects')        
    }
}