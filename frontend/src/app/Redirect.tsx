'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/** Check if the current page is running in an iframe, otherwise redirect home */
const Redirect = () => {
  const router = useRouter()
  router.replace('https://nycmesh.net')
  return null
}

export default Redirect
