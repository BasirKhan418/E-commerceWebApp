import React, { useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Razorpay from "razorpay";
const Checkout = ({cart, clearCart,addToCart, removeFromCart, subTotal }) => {
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[phone,setPhone]=useState('');
  const[address,setAddress]=useState('');
  const[pincode,setPincode]=useState('');
  const[city,setCity]=useState('');
  const[state,setState]=useState('');
  const[disabled,setDisabled]=useState(true);
  const[user,setUser]=useState({value:null});
  useEffect(()=>{
    const myuser = JSON.parse(localStorage.getItem('myUser'));
 if(myuser && myuser.token){
  setUser(myuser);
  setEmail(myuser.email);
  fetchdata(myuser.token)
 
}
  },[])
  const handleChange=async(e)=>{
    if(e.target.name=='name'){
      setName(e.target.value);
    }
    else if(e.target.name=='email'){
      setEmail(e.target.value)
    }
    else if(e.target.name=='phone'){
      setPhone(e.target.value)
    }
    else if(e.target.name=='address'){
      setAddress(e.target.value)
    }
    else if(e.target.name=='pincode'){
      setPincode(e.target.value)
      if(e.target.value.length==6){
       getPincode(e.target.value);
      }
      else{
        setState('')
        setCity('')
      }
      }
      else{
        setState('')
        setCity('')
      }
    }
    
  const getPincode=async(pin)=>{
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/Pincodes`);
    let pinjson= await pins.json()
    if(Object.keys(pinjson).includes(pin)){
      setState(pinjson[pin][1]);
      setCity(pinjson[pin][0]);
  }}
  const fetchdata=async(token)=>{
    const data ={token:token};
    const pr = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res=await pr.json();
    console.log(res)
    console.log(res.name,res.address,res.phone,res.pincode);
    setName(res.name);
    setAddress(res.address);
    setPhone(res.phone);
    setPincode(res.pincode);
    getPincode(res.pincode);
   }
 useEffect(()=>{
  if(name.length>3 && email.length>3 && phone.length>3 && address.length>3 && pincode.length>3){
    setDisabled(false);
   }
   else{
    setDisabled(true)
   }
 },[name,email,phone,address,pincode])

  // let rand = Math.floor(Math.random() * 100000);
  const data = { subTotal, cart,email:email,name,address,pincode ,phone,city,state};
  const checkoutHandler = async (e) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/precheckout`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
 
    const r = await response.json();
    if(r.success){
    var options =  {
      key: `${process.env.NEXT_PUBLIC_KEY_ID}`,
       // Enter the Key ID generated from the Dashboard
      amount: r.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Tech Print Shopping", //your business name
      description: "Tech Print E-commerce Shopping",
      image: "logo-color.png",
      order_id: r.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/postcheckout`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: name, //your customer's name
        email: email,
        contact: phone, //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#FD0872",
      },
    };
    var rzp1 = new window.Razorpay(options);
    await rzp1.open();
    e.preventDefault();
  }
  else{
    if(r.clearCart){
      clearCart();
    }
    toast.error(r.error, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  };

  return (
    <div className="container px-2 sm:m-auto">
       <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      {/* <Head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      </Head> */}
      
      <h1 className="font-bold text-3xl text-center my-8">Checkout</h1>
      <h2 className="font-bold text-xl mx-2">1.Delivery Details</h2>
      <div className="m-auto flex my-2 mx-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input 
            onChange={handleChange}
            value={name}
              type="name"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            {user && user.token?<input
            value={user.email}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true}
            />:<input
            value={email} onChange={handleChange}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />}
          </div>
        </div>
      </div>
      <div className="px-2 w-full mx-2">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
          value={address} onChange={handleChange}
            cols="5"
            rows="3"
            id="address"
            name="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      <div className="m-auto flex my-2 mx-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
            value={phone} onChange={handleChange}
              type="number"
              id="phone"
              name="phone"
              placeholder="Enter your 10 digit phone number"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode
            </label>
            <input
            value={pincode} onChange={handleChange}
            placeholder="Enter your 6 digit pincode"
              type="number"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
       
      </div>
      <div className="m-auto flex my-2 mx-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
            value={state}
            onChange={handleChange}
              type="state"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              District
            </label>
            <input
            value={city}
            onChange={handleChange}
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           />
          </div>
        </div>
      </div>
      <h2 className="font-bold text-xl mx-2">2.Review Cart Items & Pay</h2>
      <div className="sidebar bg-pink-100 p-6 m-2 z-20">
        <ol className="list-decimal">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 font-semibold">Your Cart is Empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="font-semibold">{`${cart[k].name}(${cart[k].size}/${cart[k].variant}) `}</div>
                  <div className="flex items-center justify-center w-1/3 font-semibold text-xl">
                    <>
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-pink-500"
                      />
                    </>
                    <span className="mx-3 text-sm">{cart[k].qty}</span>
                    <>
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-pink-500"
                      />
                    </>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="font-bold ">SubTotal : ₹{subTotal}</div>
      </div>
      <div className="mx-8">
        <button
          disabled={disabled} onClick={checkoutHandler}
          className=" disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
        >
          <>
            {" "}
            <BsFillBagCheckFill className="m-1" />{" "}
          </>
          Pay ₹{subTotal}
        </button>
      </div>
    </div>
  );
};
export default Checkout;
