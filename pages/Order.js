import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import mongoose from 'mongoose';
import Order from '@/models/Order';
const MyOrder = ({order,clearCart}) => {
  const [date,setDate]=useState()
  useEffect(()=>{
    const d =new Date(order.createdAt);
    setDate(d);
   if(router.query.clearCart==1){
    clearCart();
   }
  },[])
  const router =useRouter();
  const products =order.products;
console.log(products)
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden bg-white">
  <div className="container px-5 py-12 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest"><span className='font-bold text-pink-700'>TECHPRINT.COM</span></h2>
        <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-2">Order Id:- <span className='font-semi-bold text-pink-700'>{order.orderID}</span></h1>
        <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Payment Id:- <span className='font-semi-bold text-pink-700'>{order.payment_id}</span></h1>
        <p className="leading-relaxed mb-4">Yayy! Your order has been successfully placed!</p>
        <p className="leading-relaxed mb-1">Order placed on :-{date && date.toLocaleDateString("en-IN",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p className='leading-relaxed mb-1'> Your Payment Status is <span className='font-bold text-pink-700'>{order.status}</span> </p>
        <div className="flex mb-4">
          <a className="flex-grow text-pink-500 border-b-2 border-pink-500 py-2 text-lg px-1">Item Description</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Item Total</a>
        </div>
       
        {Object.keys(products).map((item)=>{
          return <div key={item} className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">{products[item].name}({products[item].size}/{products[item].variant})</span>
          <span className="m-auto text-gray-900">{products[item].qty}</span>
          <span className="m-auto text-gray-900">₹{products[item].price}X {products[item].qty}=₹{products[item].price*products[item].qty}</span>
        </div>})}
        <div className="flex my-8">
          <span className="title-font font-medium text-2xl text-gray-900">SubTotal: ₹{order.amount}</span>
         
        </div>
        <div className="flex ">
          <button className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded my-4">Track Your Order</button>
          </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={'/orderconfirm1.jpg'}/>
    </div>
  </div>
</section>
    </div>
  )
}
export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
}
    let order= await Order.findById(context.query.id)
  return{
    props:{order:JSON.parse(JSON.stringify(order))}
  }
}

export default MyOrder
