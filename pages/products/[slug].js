import { useRouter } from 'next/router'
import React from 'react'

const slug = () => {
    const router =useRouter()
    const {slug}=router.query
  return (
    <div>
      the slug is :-{slug}
    </div>
  )
}

export default slug

