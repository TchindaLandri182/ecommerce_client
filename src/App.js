import { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Auth, Home } from './pages';
import { Footer, Navbar } from './components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import signupstep from './constant/signupstep'
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const navigate = useNavigate()
  // const token = sessionStorage.token
  const authstep = sessionStorage.signupstep

  console.log(localStorage.fontSize)

  useEffect(() => {
    if(authstep !== signupstep.idle && authstep) navigate(`auth/${authstep}`)
  }, [authstep, navigate])

  useEffect(() => {
    
    const setGlobalTheme = () => {
      if(!localStorage?.color) localStorage.setItem('color', '#7fec7f')
      if(!localStorage?.fontSize) localStorage.setItem('fontSize', 16)
    }
    setGlobalTheme()
  }, [])
  return (
    
    <div style={{fontSize: localStorage.fontSize+"px" }} className="App dark:bg-gray-900 dark:text-white bg-white text-black text-[10px] md:text-[20px]">
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
