import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/Ai';
const Navbar = () => {
  return (
    <>
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center mb-1 py-2 shadow-xl bg-white'>
        <div className="logo mx-5">
            <img src="/specarelogo1.png" width={200} height={40}/>
        </div>
        <div className="nav">
            <ul className="flex items-center space-x-6 font-bold md:text-md">
            <Link href={"/Tshirt"}> <li>Tshirts</li></Link>
            <Link href={"/Hoodies"}> <li>Hoodies</li></Link>      
            <Link href={"/Stickers"}> <li>Stickers</li></Link>
            <Link href={"/Mug"}> <li>Mugs</li></Link>
            {/* <Link href={"/"}> <a><li>Tshirts</li></a></Link> */}
            </ul>
        </div>
        <div className="cart absolute right-0 top-4 mx-5">
         {/* <AiOutlineShoppingCart className="text-3xl md:text-xl"/> */}
         <AiOutlineShoppingCart className="text-xl md:text-3xl"/>
        </div>
    </div>
    
    </>
  )
}

export default Navbar
