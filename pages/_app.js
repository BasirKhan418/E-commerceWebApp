import '@/styles/globals.css'
import React, { useRef } from 'react';
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
export default function App({ Component, pageProps }) {
const router = useRouter();
  const[cart,setCart]=useState({})
  const[subTotal,setSubtotal]=useState(0)
  const [user,setUser]=useState(false);
  const [key,setKey]=useState(0);
  const [progress, setProgress] = useState(0)
  useEffect(()=>{
    router.events.on('routeChangeStart',()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete',()=>{
      setProgress(100)
    })
    try{
if(localStorage.getItem("cart")){
  setCart(JSON.parse(localStorage.getItem("cart")))
  saveCart(JSON.parse(localStorage.getItem("cart")))
}
    }catch(error){
    console.log(error)
    localStorage.clear()
    }
    const token = localStorage.getItem('token');
    if(token){
    setUser(true)
    setKey(Math.random());
    }
  },[router.query])
  const saveCart =(myCart)=>{
  localStorage.setItem("cart",JSON.stringify(myCart));
  let subt=0;
  let keys =Object.keys(myCart);
  for (let i = 0; i<keys.length; i++) {
    subt+=myCart[keys[i]]["price"] * myCart[keys[i]].qty;
  }
  setSubtotal(subt)
  }
  const addToCart =(itemCode,qty,price,name,size,variant)=>{
   let newCart =cart;
   if(itemCode in cart){
    newCart[itemCode].qty=cart[itemCode].qty+qty;
   }
   else{
    newCart[itemCode]={qty:1,price,name,size,variant}
   }
   setCart(newCart);
   saveCart(newCart);
  }
  const logout=()=>{
    localStorage.removeItem('token');
    setKey(Math.random());
    setUser(false);
    router.push('/');
    toast.success('Logged out successfully', {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  const clearCart =()=>{
    setCart({});
    saveCart({});
  }
  const removeFromCart=(itemCode,qty,price,name,size,variant)=>{
    let newCart =cart;
    if(itemCode in cart){
     newCart[itemCode].qty=cart[itemCode].qty-qty;
    }
    if(newCart[itemCode].qty<=0){
      delete newCart[itemCode]
    }
    setCart(newCart);
    saveCart(newCart);
  }
  const buyNow=(itemCode,qty,price,name,size,variant)=>{
    let newCart={itemCode:{qty:1,price,name,size,variant}}
    setCart(newCart);
    saveCart(newCart);
    router.push('/checkout');
  }
  return <>   <LoadingBar
  color='#ff2d55'
  waitingTime={400}
  progress={progress}
  onLoaderFinished={() => setProgress(0)}
/> <Navbar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/> <ToastContainer
  position="top-left"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  /> <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps}/><Footer/></>
}
