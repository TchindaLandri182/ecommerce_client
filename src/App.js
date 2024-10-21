import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Auth, Cart, Home, ProductDetails, Products } from './pages';
import { Footer, Navbar } from './components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import signupstep from './constant/signupstep'
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const navigate = useNavigate()
  // const token = sessionStorage.token
  const [itemNum, setItemNum] = useState(0)
  const authstep = sessionStorage.signupstep
  const items = localStorage.items

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

  useEffect(() => {
        const getNumItems = () => {
            let num = 0
            let newItems = localStorage.items ? JSON.parse(localStorage.items) : []
            newItems.forEach((item) => {
                console.log(item)
                num += item.quantity
            })
            setItemNum(num)
            console.log(num)
        }
        getNumItems()
    }, [items])
  return (
    
    <div style={{fontSize: localStorage.fontSize+"px" }} className="App dark:bg-gray-900 dark:text-white bg-white text-black text-[10px] md:text-[20px]">
      <Navbar itemNum={itemNum} />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/auth/*' Component={Auth} />
        <Route path='/cart' Component={Cart} />
        <Route path='/product' Component={Products} />
        <Route path='/product/:id' Component={ProductDetails} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
