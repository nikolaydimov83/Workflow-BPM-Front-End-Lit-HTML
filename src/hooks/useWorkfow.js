import { useState } from "react";

export function useWorkflow(){
    const [workflowState,setWorkflowState]=useState({workflowDashboard:'roles'});
    
    async function setWorkflowDashboard(dashboardStatus){

        setWorkflowState({workflowDashboard:dashboardStatus});
    }

    return {workflowState,setWorkflowDashboard}
}