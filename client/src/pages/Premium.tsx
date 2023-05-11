import React from 'react'
import { useRouter } from '../hooks/useRouter'

const Premium = () => {
  const { routeTo } = useRouter()

  return (<div className="non-logged-in-body">
    <h1>
      Premium
    </h1>
    <div className="center">
    </div>
  </div>)
}

export default Premium 
