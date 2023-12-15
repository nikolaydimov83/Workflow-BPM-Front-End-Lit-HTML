import logo from './logo.svg';
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
          <Route path='/dashboard' element={
            <DashboardContextProvider >
              <Dashboard/>
            </DashboardContextProvider>}/>
          <Route path='/dashboard/:id' element={<Details/>}/>
          <Route path='/comment/create/:id' element={<CreateComment/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path='/create' element={<Create/>}/> 
          <Route path='/admin/:id' element={<EditUser/>}/> 
          <Route path='/createUser' element={<CreateUser/>}/>
          
          <Route path='/roles' element={            
    
            <DashboardContextProvider >
              <Dashboard/>
            </DashboardContextProvider>}
          />

          <Route path='/statuses' element={            
          
            <DashboardContextProvider >
              <Dashboard/>
            </DashboardContextProvider>}
          />  
          <Route path='/workflows' element={            
          
          <DashboardContextProvider >
            <Dashboard/>
          </DashboardContextProvider>}
        /> 

        <Route path='/subjects' element={            
          
          <DashboardContextProvider >
            <Dashboard/>
          </DashboardContextProvider>}
        /> 
        <Route path='/createroles' element={<CreateRole/>}/>  
        <Route path='/createstatuses' element={<CreateStatus/>}/>   
        <Route path='/createworkflows' element={<CreateWorkflow/>}/> 
        <Route path='/createsubjects' element={<CreateSubject/>}/>  

        <Route path='/roles/:id' element={<CreateRole/>}/>
        <Route path='/statuses/:id' element={<CreateStatus/>}/> 
        <Route path='/workflows/:id' element={<CreateWorkflow/>}/>    
        <Route path='/subjects/:id' element={<CreateSubject/>}/>            
          </Routes>
          
        
      </div>

    </AuthContextProvider>

  );
}
//{[{Header:`Създател`,accessor:'requestCreatorEmail'},{Header:'Апликация номер',accessor:'iApplyId'},{Header:'Име на клиента',accessor:'clientName'},{Header:'ЕГН/ЕИК',accessor:'clientEGFN'},{Header:'ФЦ',accessor:"finCenter"},{Header:'Рефериращ',accessor:'refferingFinCenter'},{Header:'Subject',accessor:"subjectId.subjectName"},{Header:'Статус',accessor:'status.statusName'},{Header:'Дата на постъпване',accessor:'statusIncomingDate'},{Header:'Краен срок',accessor:"deadlineDate"}]}
export default App;
