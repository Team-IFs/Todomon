import React from 'react'
import { useRouter } from '../hooks/useRouter'

const Signup = () => {
  const { routeTo } = useRouter()

  return (<div className="non-logged-in-body">
    <h1>
      Signup
    </h1>
    <div className="center">
    </div>
  </div>)
}

export default Signup
