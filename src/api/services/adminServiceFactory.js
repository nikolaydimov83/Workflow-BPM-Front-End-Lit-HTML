import { serviceFactory } from "../api"

export default function adminServiceFactory(token){
    const api=serviceFactory(token);
    return {

        getAllAdminInfo:async ()=>{

        let data=await api.get('/admin');
        let listOfRoles=await api.get(`/workflow/roles`);
        //let dataStringifiedDates=stringifyDates(data.result);
        let enrichedData=[];
        if (data.length>0){
          enrichedData=data.map((user)=>{
            listOfRoles.forEach((roleFromRoles)=>{
              if (user.role===roleFromRoles._id){
                user.roleName=roleFromRoles.role;
                
              }
            })
            return user
          })
          return {result:enrichedData}
        }},

        getUserFromAdminById:async (id)=>{
            let listOfRoles=await api.get(`/workflow/roles`);
            let serverResponse=await api.get(`/admin/${id}`);
            if (listOfRoles.length>0){
              listOfRoles.forEach((role) => {
                if (role._id===serverResponse.role){
                  role.selected=true
                }else{
                  role.selected=false
                }
              });
            }
            serverResponse.listOfRoles=listOfRoles;
            return serverResponse;
        },
        editUserFromAdmin:(id,data)=> api.put(`/admin/${id}`,data),
        createUserFromAdmin:(data)=>  api.post(`/admin`,data),
        getWrongDataLog:(page)=>api.get(`/wrongDataLogger?page=${page}`),
        editIapplyDataAdmin:(id,data)=> api.put(`/iApply/${id}`,data),
        sendFileWithUsersToCreate:(formData,fileType,fileSize)=>api.postFile('/files/usersFileUpload',formData,fileType,fileSize),
        sendFileWithUsersToEdit:(formData,fileType,fileSize)=>api.postFile('/files/usersFileEdit',formData,fileType,fileSize),
        sendFileIapplyManualUpld:(formData,fileType,fileSize)=>api.postFile('/files/manuallyUploadIapplyData',formData,fileType,fileSize),
        sendFileTransferRequests:(formData,fileType,fileSize)=>api.postFile('/files/migrateRequests',formData,fileType,fileSize)
    }
}