import React from 'react'
import { useRouter } from '../hooks/useRouter'

const Login = () => {
  const { routeTo } = useRouter()

  return (<div className="non-logged-in-body">
    <h1>
      Login
    </h1>
    <div className="center">
    </div>
  </div>)
}

export default Login
