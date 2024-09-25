import { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Auth, Home } from './pages';
import { Footer, Navbar } from './components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    const verifyAuth = () => {
      console.log(sessionStorage.token, sessionStorage.isEmailVerified)
      if(sessionStorage.token && !sessionStorage.isEmailVerified) navigate('/auth/verify')
      
    }
    const setGlobalTheme = () => {
      if(!localStorage?.color) localStorage.setItem('color', '#7fec7f')
      if(localStorage?.fontSize) localStorage.setItem('fontSize', 0.5)
    }
    setGlobalTheme()
    verifyAuth()
  }, [navigate])
  return (
    
    <div style={{fontSize: ((2*(Number.parseFloat(localStorage.fontSize) + 0.1))+'rem')}} className="App dark:bg-gray-900 dark:text-white bg-white text-black">
      <Navbar />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/auth/*' Component={Auth} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
