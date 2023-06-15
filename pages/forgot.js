import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
const forgot = () => {
  const[password,setPassword]=useState('');
  const[email,setEmail]=useState('');
  const[cpassword,setcPassword]=useState('');
  const handleChange=async(e)=>{
    if(e.target.name=='password'){
      setPassword(e.target.value);
    }
    else if(e.target.name=='cpassword'){
      setcPassword(e.target.value)
    }
    else if(e.target.name=='email'){
      setEmail(e.target.value)
    };
  }
  const router=useRouter();
  useEffect(()=>{
if(localStorage.getItem('token')){
  router.push('/');
}
  },[])
  const sendEmailf=async()=>{
    const data = {email,sendMail:true};
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/forgot`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
   
      const r = await response.json();
      console.log(r.forgot.token);
      if(r.success){
        console.log("reset password email send successfully")
      }
      else{
        console.log("some error occured")
      }
  }
  const resetPassword=async()=>{
    if(password==cpassword){
 const token =router.query.token;
    const data = {password,cpassword,token,sendMail:false};
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/forgot`,
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
        console.log("reset password successfully")
      }
      else{
        console.log("some error occured")
      }
            
    }

  }
  return (
    <div>
      <div className="flex min-h-full py-12 flex-col items-start justify-center sm:px-6 lg:px-8 bg-white">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
  <Image alt="logo" src="/techprintlogo.png" width={180} height={60} className='m-auto'/>
    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot your account</h2>
  </div>

  {!router.query.token && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input value={email}
          onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 p-2"/>
        </div>
      </div>
      <div>
        <button onClick={sendEmailf} type="submit" className="mt-4 flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Continue</button>
      </div>
    <p className="mt-10 text-center text-sm text-gray-500">
      Already a member?
      <Link href="/Login" className="font-semibold leading-6 text-pink-600 hover:text-pink-500"> Login</Link>
    </p>
  </div>}
  {router.query.token && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
        <div className="mt-2">
          <input onChange={handleChange} value={password} id="password" name="password" type="password" autoComplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 p-2"/>
        </div>
        <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
        <div className="mt-2">
          <input onChange={handleChange} value={cpassword}id="cpassword" name="cpassword" type="password" autoComplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 p-2"/>
        </div>
      </div>
      <div>
        <button onClick={resetPassword} disabled={cpassword!==password} type="submit" className=" disabled:bg-pink-300 flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 mt-4">Continue</button>
      </div>
      {/* {cpassword!==password && <span className='text-red-600 mt-2 font-bold'>Password doesnot match</span>} */}
    <p className="mt-10 text-center text-sm text-gray-500">
      Already a member?
      <Link href="/Login" className="font-semibold leading-6 text-pink-600 hover:text-pink-500"> Login</Link>
    </p>
    
  </div>}
  
</div>
    </div>
  )
}

export default forgot
