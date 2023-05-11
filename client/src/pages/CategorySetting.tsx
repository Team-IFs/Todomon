import React from 'react'
import { useRouter } from '../hooks/useRouter'

const CategorySetting = () => {
  const { routeTo } = useRouter()

  return (<div className="non-logged-in-body">
    <h1>
      CategorySetting
    </h1>
    <div className="center">
    </div>
  </div>)
}

export default CategorySetting 
