import React, { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//refactor passsword toast[pending]
//display valid reason why password failed to set[pending]
const myaccount = () => {
  const router =useRouter();
  useEffect(()=>{
    const myuser = JSON.parse(localStorage.getItem('myUser'));
    if(myuser && myuser.token){
     setUser(myuser);
     setEmail(myuser.email);
     fetchdata(myuser.token);
    }
    if(!myuser){
     router.push('/');
    }
   
     },[])
     const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[phone,setPhone]=useState('');
  const[address,setAddress]=useState('');
  const[pincode,setPincode]=useState('');
  const[password,setPassword]=useState('');
  const[cpassword,setCpassword]=useState('');
  const[npassword,setNpassword]=useState('');
  const[user,setUser]=useState({value:null});
     const handleChange=async(e)=>{
      if(e.target.name=='name'){
        setName(e.target.value);
      }
      else if(e.target.name=='phone'){
        setPhone(e.target.value)
      }
      else if(e.target.name=='address'){
        setAddress(e.target.value)
      }
      else if(e.target.name=='pincode'){
        setPincode(e.target.value)
      }
      else if(e.target.name=='password'){
        setPassword(e.target.value)
      }
      else if(e.target.name=='cpassword'){
        setCpassword(e.target.value)
      }
      else if(e.target.name=='npassword'){
        setNpassword(e.target.value)
      }
     
     }
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
     }
     const handleSaveChange=async()=>{
      const data ={name,address,phone,pincode,email};
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const response=await res.json();
      console.log(response);
      toast.success("Successfully updated your details", {
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
     const handleSaveChangePassword=async()=>{
      const data ={token:user.token,password,cpassword,npassword};
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const response=await res.json();
      console.log(response);
      if(response.success){
        toast.success("Successfully updated your details", {
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
      else{
        toast.error("Some error occured", {
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
      
     setCpassword('');
     setNpassword('');
     setPassword('');
     }
  return (
    <div className='container mx-auto my-9 min-h-screen'>
         <ToastContainer
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
/>
      <h1 className='md:text-3xl text-xl font-bold text-center '>Update Your Account </h1>
      <h2 className="font-bold md:text-xl text-lg mx-2">1.Delivery Details</h2>
      <div className="m-auto flex my-2 mx-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input onChange={handleChange}
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
              Email (Cannot be updated)
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
      <button onClick={handleSaveChange}
          className="m-2 mb-5 disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
        >
          Save Changes
        </button>
      <h2 className="font-bold md:text-xl text-lg mx-2">2.Update your password</h2>
      <div className="m-auto flex my-2 mx-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
             Password
            </label>
            <input onChange={handleChange}
            value={password}
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">
              New Password
            </label>
            <input
            onChange={handleChange}
            value={npassword}
              type="password"
              id="npassword"
              name="npassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">
              Confirm New Password
            </label>
            <input
            onChange={handleChange}
            value={cpassword}
              type="password"
              id="cpassword"
              name="cpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
            />
          </div>
        </div>
      </div>
      <button onClick={handleSaveChangePassword}
          className="m-2 mb-5 disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
        >
          Save Changes
        </button>
    </div>
  )
}

export default myaccount
