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
            <DashboardContextProvider>
              <Dashboard/>
            </DashboardContextProvider>}/>


          
        </Routes>
      </div>

    </AuthContextProvider>

  );
}

export default App;
