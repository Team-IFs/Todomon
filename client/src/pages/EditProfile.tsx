import React from 'react'
import { useRouter } from '../hooks/useRouter'

const EditProfile = () => {
  const { routeTo } = useRouter()

  return (<div className="non-logged-in-body">
    <h1>
      EditProfile
    </h1>
    <div className="center">
    </div>
  </div>)
}

export default EditProfile 
