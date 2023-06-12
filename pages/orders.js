import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { render } from 'react-dom';
const myOrders = () => {
  const [orders,setOrders]= useState([])
  const router =useRouter();
  const fetchorders=async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token:JSON.parse(localStorage.getItem('myUser')).token}),
    });

    const response=await res.json();
    setOrders(response.orders);
  }
  useEffect(()=>{
    if(!localStorage.getItem('myUser')){
     router.push('/');
    }
    else{
      fetchorders();
    }
     },[])
    console.log(orders)
  return (
    <div className='min-h-screen'>
    <h1 className='font-semibold text-2xl text-center bg-white p-8'>My Orders</h1>
    <div className='containe mx-auto bg-white'>
      
      <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">Order Id </th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Amount</th>
              <th scope="col" className="px-6 py-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item)=>{
            return <tr key={item._id}
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-300 dark:border-neutral-500 dark:hover:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{item.orderID}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>
              <Link href={'/order?id='+item._id}><td className="whitespace-nowrap px-6 py-4">Details</td></Link>
            </tr>})}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </div>
    </div>
  )
}
export default myOrders
