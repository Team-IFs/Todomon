import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CategorySetting from './pages/CategorySetting'
import Social from './pages/Social'
import Settings from './pages/Settings'
import Premium from './pages/Premium'
import Landing from './pages/Landing'
import { createBrowserRouter } from 'react-router-dom'
import { Router as RemixRouter } from '@remix-run/router/dist/router'
import { SidebarElement } from './types/sidebar'
import {SidebarLayout, HeaderLayout} from './layout/GeneralLayout'

interface RouterElement {
  id: number
  path: string
  label: string
  element: React.ReactElement
  isSidebar: boolean
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/home',
    label: '홈',
    element: <Home />,
    isSidebar: false
  },
  {
    id: 1,
    path: '/login',
    label: '로그인',
    element: <Login />,
    isSidebar: false
  },
  {
    id: 2,
    path: '/signup',
    label: '회원가입',
    element: <Signup />,
    isSidebar: false
  },
  {
    id: 3,
    path: '/settings',
    label: '설정',
    element: <Settings />,
    isSidebar: true
  },
  {
    id: 4,
    path: '/categorysetting',
    label: '카테고리 관리',
    element: <CategorySetting />,
    isSidebar: true
  },
  {
    id: 5,
    path: '/social',
    label: '친구 관리',
    element: <Social />,
    isSidebar: true
  },
  {
    id: 6,
    path: '/premium',
    label: '투두몬 프리미엄',
    element: <Premium />,
    isSidebar: true
  },
  {
    id: 7,
    path: '/',
    label: '랜딩',
    element: <Landing />,
    isSidebar: false
  },
  
  
]

export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => {
    if (router.isSidebar) {
      return {
        path: router.path,
        element: <SidebarLayout>{ router.element }</SidebarLayout>
      }
    } else {
      return {
        path: router.path,
        element: <HeaderLayout>{ router.element }</HeaderLayout>
      }
    }
  })
)

export const SidebarContent: SidebarElement[] = routerData.reduce((prev, router) => {
  if (!router.isSidebar) return prev

  return [
    ...prev,
    {
      id: router.id,
      path: router.path,
      label: router.label,
    }
  ]
}, [] as SidebarElement[])
