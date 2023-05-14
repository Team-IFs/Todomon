import React from 'react'
import { useRouter } from '../hooks/useRouter'
import Button from '@mui/material/Button';

const Home = () => {
  const { routeTo } = useRouter()

  return (<div>
    <h1>
      Home
    </h1>
    <Button variant="contained" onClick={()=>routeTo('/categorysetting')}>CategorySetting</Button>
  </div>)
}

export default Home
