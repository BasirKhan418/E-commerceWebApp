import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Order from '@/models/Order';
import mongoose from 'mongoose';
const orders = () => {
  const router =useRouter();
  useEffect(()=>{
    if(!localStorage.getItem('token')){
     router.push('/');
    }
     },[])
  return (
    <>
    <h1 className='font-semibold text-2xl text-center bg-white p-8'>My Orders</h1>
    <div className='containe mx-auto bg-white'>
      
      <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">First</th>
              <th scope="col" className="px-6 py-4">Last</th>
              <th scope="col" className="px-6 py-4">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-300 dark:border-neutral-500 dark:hover:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
              <td className="whitespace-nowrap px-6 py-4">Mark</td>
              <td className="whitespace-nowrap px-6 py-4">Otto</td>
              <td className="whitespace-nowrap px-6 py-4">@mdo</td>
            </tr>
            <tr
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-300 dark:border-neutral-500 dark:hover:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
              <td className="whitespace-nowrap px-6 py-4">Jacob</td>
              <td className="whitespace-nowrap px-6 py-4">Thornton</td>
              <td className="whitespace-nowrap px-6 py-4">@fat</td>
            </tr>
            <tr
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-300 dark:border-neutral-500 dark:hover:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
              <td className="whitespace-nowrap px-6 py-4">Larry</td>
              <td className="whitespace-nowrap px-6 py-4">Wild</td>
              <td className="whitespace-nowrap px-6 py-4">@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </div>
    </>
  )
}
export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
}
    let orders= await Order.find({});
    let colorSizeSlug={}
   
  return{
    props:{orders:orders}
  }
}
export default orders
