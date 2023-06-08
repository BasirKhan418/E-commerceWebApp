import React from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";;
import Head from "next/head";
import Script from "next/script";
// import Razorpay from "razorpay";
const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  let rand = Math.floor(Math.random() * 100000);
  const checkoutHandler = async (e,cart) => {
  
    const data = { subTotal, cart };
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
    console.log(r,r.id,r.amount)
    var options =  {
      key: `${process.env.NEXT_PUBLIC_KEY_ID}`, // Enter the Key ID generated from the Dashboard
      amount: r.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Specare E-com Shopping", //your business name
      description: "Specare Ecom",
      image: "/specarelogo2.png",
      order_id: r.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/postcheckout`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
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
  };

  return (
    <div className="container px-2 sm:m-auto">
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
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full mx-2">
        <div className="mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
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
              type="number"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
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
              type="state"
              id="state"
              name="state"
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
              type="number"
              id="pinode"
              name="pincode"
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
          onClick={checkoutHandler}
          className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
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
