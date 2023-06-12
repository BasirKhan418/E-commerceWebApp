import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
const myaccount = () => {
  const router =useRouter();
  useEffect(()=>{
    if(!localStorage.getItem('myUser')){
     router.push('/');
    }
     },[])
  return (
    <div>
      <h1>My account </h1>
    </div>
  )
}

export default myaccount
