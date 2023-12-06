import logo from './logo.svg';
import './App.css';
import Header from './components/Navigation/Header';
import { AuthContextProvider } from './contexts/AuthContext';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router';
import Login from './components/Authentication/Login';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>

    </AuthContextProvider>

  );
}

export default App;
