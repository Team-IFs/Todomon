import React from 'react'
import { useRouter } from '../hooks/useRouter'

const Social = () => {
  const { routeTo } = useRouter()

  return (<div className="non-logged-in-body">
    <h1>
      Social
    </h1>
    <div className="center">
    </div>
  </div>)
}

export default Social 
