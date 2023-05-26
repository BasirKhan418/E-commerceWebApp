import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillCloseCircle, AiFillPlusCircle, AiOutlineShoppingCart ,AiFillMinusCircle} from 'react-icons/Ai';
import {BsFillBagCheckFill} from 'react-icons/Bs';
import {MdAccountCircle} from 'react-icons/Md';
const Navbar = ({cart,addToCart,removeFromCart,clearCart,subTotal}) => {
  const ref = useRef()
  const toggleCart=()=>{
if(ref.current.classList.contains("translate-x-full")){
  ref.current.classList.remove('translate-x-full')
  ref.current.classList.add("translate-x-0")
}
else if(!ref.current.classList.contains("translate-x-full")){
  ref.current.classList.remove('translate-x-0')
  ref.current.classList.add("translate-x-full")
}
  }
  return (
    <>
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center mb-1 py-2 shadow-xl bg-white sticky top-0 z-10'>
    <Link href={"/"}>
      <div className="logo mx-5">
          
            <img alt="logo" src="/specarelogo1.png" width={150} height={40}/>
            
        </div></Link>
        <div className="nav">
            <ul className="flex items-center space-x-6 font-bold md:text-md">
            <Link href={"/tshirts"}> <li>Tshirts</li></Link>
            <Link href={"/hoodies"}> <li>Hoodies</li></Link>      
            <Link href={"/stickers"}> <li>Stickers</li></Link>
            <Link href={"/mugs"}> <li>Mugs</li></Link>
            {/* <Link href={"/"}> <a><li>Tshirts</li></a></Link> */}
            </ul>
        </div>
        <div className="cart absolute right-0 top-4 mx-5 flex" >
         {/* <AiOutlineShoppingCart className="text-3xl md:text-xl"/> */}
         <Link href={"/Login"}><MdAccountCircle className="text-xl md:text-3xl cursor-pointer mx-4"/></Link>
         <AiOutlineShoppingCart className="text-xl md:text-3xl cursor-pointer" onClick={toggleCart}/>
        </div>
        <div ref={ref} className="w-72 h-[100vh] sidebar absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform translate-x-full z-20">
          <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
          <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-pink-500'><AiFillCloseCircle/></span>
         <ol className='list-decimal'>
          {Object.keys(cart).length==0&&<div className='my-4 font-semibold'>Your Cart is Empty!</div>}
          {Object.keys(cart).map((k)=>{return<li key={k}>
            <div className="item flex my-5">
          <div className='w-2/3 font-semibold'>{cart[k].name}</div>
          <div className="flex items-center justify-center w-1/3 font-semibold text-xl"><AiFillMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className="cursor-pointer text-pink-500"/><span className='mx-3 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='cursor-pointer text-pink-500'/></div>
          </div>
          </li>})}
        </ol>
        <div className='font-bold my-2'>SubTotal : ₹{subTotal}</div>
       <div className="flex">
       <Link href={"/checkout"}><button className="flex mx-auto mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
      <BsFillBagCheckFill className="m-1"/>Checkout
    </button></Link>
  <button onClick={clearCart} className="flex mx-auto mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
    Clear cart
    </button>
    </div> 
        </div>
    </div>
    
    </>
  )
}

export default Navbar
