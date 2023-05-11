import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CategorySetting from './pages/CategorySetting'
import Social from './pages/Social'
import EditProfile from './pages/EditProfile'
import Premium from './pages/Premium'
import { createBrowserRouter } from 'react-router-dom'
import { Router as RemixRouter } from '@remix-run/router/dist/router'

interface RouterElement {
  id: number
  path: string
  label: string
  element: React.ReactElement
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    label: 'Home',
    element: <Home />,
  },
  {
    id: 1,
    path: '/login',
    label: 'Login',
    element: <Login />,
  },
  {
    id: 2,
    path: '/signup',
    label: 'Signup',
    element: <Signup />,
  },
  {
    id: 3,
    path: '/categorysetting',
    label: 'CategorySetting',
    element: <CategorySetting />,
  },
  {
    id: 4,
    path: '/social',
    label: 'Social',
    element: <Social />,
  },
  {
    id: 5,
    path: '/editprofile',
    label: 'EditProfile',
    element: <EditProfile />,
  },
  {
    id: 6,
    path: '/premium',
    label: 'Premium',
    element: <Premium />,
  },
  
  
]

export const routers: RemixRouter = createBrowserRouter(

  routerData.map((router) => {
    return {
      path: router.path,
      element: router.element
    }
  })
)