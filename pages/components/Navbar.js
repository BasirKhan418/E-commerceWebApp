import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillCloseCircle, AiFillPlusCircle, AiOutlineShoppingCart ,AiFillMinusCircle} from 'react-icons/ai';
import {BsFillBagCheckFill} from 'react-icons/bs';
import {MdAccountCircle} from 'react-icons/md';
const Navbar = ({logout,user,cart,addToCart,removeFromCart,clearCart,subTotal}) => {
  const [dropdown,setDropdown]=useState(false);
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
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md bg-white sticky top-0 z-10'>
    <Link href={"/"}>
      <div className="logo ml-auto md:mx-5">
          
            <Image alt="logo" src="/specarelogo1.png" width={150} height={40}/>
            
        </div></Link>
        <div className="nav">
            <ul className="flex items-center space-x-6 font-bold md:text-md">
            <Link href={"/tshirts"}> <li className='hover:text-pink-600'>Tshirts</li></Link>
            <Link href={"/hoodies"}> <li  className='hover:text-pink-600'>Hoodies</li></Link>      
            <Link href={"/stickers"}> <li  className='hover:text-pink-600'>Stickers</li></Link>
            <Link href={"/mugs"}> <li  className='hover:text-pink-600'>Mugs</li></Link>
            {/* <Link href={"/"}> <a><li>Tshirts</li></a></Link> */}
            </ul>
        </div>
        <div className="cart  items-center absolute right-0 top-4 mx-5 flex" >
          <a onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
          {dropdown&&<div className='absolute right-8 bg-white shadow-lg top-5 rounded-md px-5 w-36 py-4'>
            <Link href={'/myaccount'}><li className='py-1 text-sm hover:text-pink-700 list-none font-bold'>My Account</li></Link>
            <Link href={'/orders'}><li className='py-1 text-sm hover:text-pink-700 list-none font-bold'>Orders</li></Link>
            <li onClick={logout} className='py-1 text-sm hover:text-pink-700 list-none font-bold'>Logout</li>
          </div>}
         {/* <AiOutlineShoppingCart className="text-3xl md:text-xl"/> */}
        {user.value&&<MdAccountCircle onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="text-xl md:text-3xl cursor-pointer mx-4"/>}
        </a>
        {!user.value&&<Link href={"/Login"}><>
         <button className='bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2'>Login</button></></Link>}
         <><AiOutlineShoppingCart className="text-xl md:text-3xl cursor-pointer" onClick={toggleCart}/></>
        </div>
        <div ref={ref} className={`w-72 h-[100vh] sidebar absolute top-0 right-0 bg-pink-100 px-8 py-10 transform overflow-y-scroll transition-transform ${Object.keys(cart).length!==0?'translate-x-0':'translate-x-full'} z-20`}>
          <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
          <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-pink-500'><><AiFillCloseCircle/></></span>
         <ol className='list-decimal'>
          {Object.keys(cart).length==0&&<div className='my-4 font-semibold'>Your Cart is Empty!</div>}
          {Object.keys(cart).map((k)=>{return<li key={k}>
            <div className="item flex my-5">
          <div className='w-2/3 font-semibold'>{`${cart[k].name}(${cart[k].size}/${cart[k].variant}) `}</div>
          <div className="flex items-center justify-center w-1/3 font-semibold text-xl"><><AiFillMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className="cursor-pointer text-pink-500"/></><span className='mx-3 text-sm'>{cart[k].qty}</span><><AiFillPlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='cursor-pointer text-pink-500'/></></div>
          </div>
          </li>})}
        </ol>
        <div className='font-bold my-2'>SubTotal : ₹{subTotal}</div>
       <div className="flex">
       <Link href={"/checkout"}><button className="flex mx-auto mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
     <> <BsFillBagCheckFill className="m-1"/> </>Checkout
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
