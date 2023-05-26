import React from 'react'
import Link from 'next/link'
import Product from "@/models/Product";
import mongoose from 'mongoose';
const Tshirt = ({products}) => {
  return (
    <div>
      <section className="text-gray-600 body-font bg-white z-10">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
     {products.map((item)=>{
     return <Link passHref={true} key={item._id}href={`/products/${item.slug}`} className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-xl m-2"><div>
        <div className="block relative rounded overflow-hidden">
          <img alt="ecommerce" className="m-auto h-[30vh] md:[h-36vh] block" src={item.img}/>
        </div>
        <div className="mt-4 text-center md:text-left">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirt</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
          <p className="mt-1 text-gray-900 title-font text-lg font-medium">₹{item.price}</p>
          <p className="mt-1 font-bold">S ,M ,XL ,XXL</p>
        </div>
      </div>
      </Link>})}
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
    let products=await Product.find({category:"tshirt"})
  return{
    props:{products:JSON.parse(JSON.stringify(products))},
  }
}
export default Tshirt
