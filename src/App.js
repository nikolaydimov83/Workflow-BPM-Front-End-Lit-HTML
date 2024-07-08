
import './App.css';
import Header from './components/Navigation/Header';
import { AuthContextProvider, GlobalContext } from './contexts/GlobalContext';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router';
import Login from './components/Authentication/Login';
import ErrorWrapper from './components/Error/ErrorWrapper';
import { useContext } from 'react';
import Register from './components/Authentication/Register';
import Dashboard from './components/Dashboard/Dashboard';
import { DashboardContextProvider } from './contexts/DashboardContext';
import Details from './components/Details/Details';
import CreateComment from './components/Commnet/CreateComment';
import Edit from './components/Details/Edit';
import Create from './components/Details/Create';
import EditUser from './components/Admin/EditUser';
import CreateUser from './components/Admin/CreateUser';
import CreateRole from './components/WorkflowDesign/CreateRole';
import CreateStatus from './components/WorkflowDesign/CreateStatus';
import CreateWorkflow from './components/WorkflowDesign/CreateWorkflow';
import CreateSubject from './components/WorkflowDesign/CreateSubject';
import {RouteGuardLogged } from './components/RouteGuards/RouteGuardLogged';
import { RouteGuardUser } from './components/RouteGuards/RouteGuardUser';
import { RouteGuardAdmin } from './components/RouteGuards/RouteGuardAdmin';
import { RouteGuardWorkflow } from './components/RouteGuards/RouteGuardWorkflow';
import ResetPassRequest from './components/Authentication/ResetPassRequest';
import ResetPassTokenSubmit from './components/Authentication/ResetPassTokenSubmit';
import EditIapplyEntry from './components/Admin/EditIApplyEntry';
import UploadUsersFile from './components/Admin/UploadUsersFile';
import { DetailsContextProvider } from './contexts/DetailsContext';


function App() {

  return (
    <AuthContextProvider>
      <div className="App">
        <Header/>
        <ErrorWrapper/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/resetPass' element={<ResetPassRequest/>}/>
          <Route path='/resetPass/:id' element={<ResetPassTokenSubmit/>}/>

          <Route path='/dashboard' element={
            <RouteGuardLogged>
            <DashboardContextProvider >
              <Dashboard/>
            </DashboardContextProvider>              
            </RouteGuardLogged>
}/>
          <Route path='/dashboard/:id' element={
            <RouteGuardUser>
              <DetailsContextProvider>
                <Details/> 
              </DetailsContextProvider>
              
            </RouteGuardUser>
            
          
          }/>
          <Route path='/comment/create/:id' element={
            
            <RouteGuardUser>
              <CreateComment/>
             </RouteGuardUser>
            
          }/>
          <Route path='/edit/:id' element={
            <RouteGuardUser>
              <Edit/>
            </RouteGuardUser>
          }/>
          <Route path='/create' element={
            <RouteGuardUser>
              <Create/>
            </RouteGuardUser>   
            }/> 


          {/*Admin paths/*/}
          <Route path='/admin/:id' element={
            <RouteGuardAdmin>
              <EditUser/> 
            </RouteGuardAdmin>

            
            }/> 
          <Route path='/createUser' element={
            <RouteGuardAdmin>
              <CreateUser/>
            </RouteGuardAdmin>          
            }/>
          <Route path='/transferIssues' element={
            <RouteGuardAdmin>
              <DashboardContextProvider >
                <Dashboard />
              </DashboardContextProvider>
            </RouteGuardAdmin>          
           }/>
           <Route path='/uploadUsersFile' element={
            <RouteGuardAdmin>
              
                <UploadUsersFile />

            </RouteGuardAdmin>          
           }/>
           

          <Route path='/iApply/:id' element={
            <RouteGuardAdmin>
              <DashboardContextProvider >
                <EditIapplyEntry/>
              </DashboardContextProvider>
            </RouteGuardAdmin>          
           }/>             
          
          <Route path='/roles' element={            
            <RouteGuardWorkflow>
              <DashboardContextProvider >
                <Dashboard />
              </DashboardContextProvider>
            </RouteGuardWorkflow>
          }/>

          <Route path='/statuses' element={            
            <RouteGuardWorkflow>
              <DashboardContextProvider >
                <Dashboard/>
              </DashboardContextProvider> 
            </RouteGuardWorkflow>

          }/>  
          <Route path='/workflows' element={            
             <RouteGuardWorkflow>
              <DashboardContextProvider >
                <Dashboard/>
              </DashboardContextProvider>              
             </RouteGuardWorkflow>         
}
        /> 

        <Route path='/subjects' element={            
          <RouteGuardWorkflow>
          <DashboardContextProvider >
            <Dashboard/>
          </DashboardContextProvider>
          </RouteGuardWorkflow>
}
        /> 
        <Route path='/createroles' element={
          <RouteGuardWorkflow>
            <CreateRole/>
          </RouteGuardWorkflow>
        }/>  
        <Route path='/createstatuses' element={
          <RouteGuardWorkflow>
            <CreateStatus/>
          </RouteGuardWorkflow>

          }/>   
        <Route path='/createworkflows' element={
          <RouteGuardWorkflow>
            <CreateWorkflow/>
          </RouteGuardWorkflow>
          }/> 
        <Route path='/createsubjects' element={
          <RouteGuardWorkflow>
            <CreateSubject/>
          </RouteGuardWorkflow> 
          }/>  

        <Route path='/roles/:id' element={
          <RouteGuardWorkflow>
          <CreateRole/>
        </RouteGuardWorkflow>
          }/>
        <Route path='/statuses/:id' element={
          <RouteGuardWorkflow>
            <CreateStatus/>
          </RouteGuardWorkflow>
        }/> 
        <Route path='/workflows/:id' element={
          <RouteGuardWorkflow>
            <CreateWorkflow/>
          </RouteGuardWorkflow>
          }/>    
        <Route path='/subjects/:id' element={
          <RouteGuardWorkflow>
            <CreateSubject/>
          </RouteGuardWorkflow> 
        }/>            
          </Routes>
          
        
      </div>

    </AuthContextProvider>

  );
}
export default App;
