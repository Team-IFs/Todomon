import React from 'react'
import { useRouter } from '../hooks/useRouter'

const Home = () => {
  const { routeTo } = useRouter()

  return (<div className="non-logged-in-body">
    <h1>
      Home
    </h1>
    <div className="center">
    </div>
  </div>)
}

export default Home
