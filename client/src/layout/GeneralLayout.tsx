import Sidebar from '../components/Sidebar'
import Header from '../components/Header/Header'
interface GeneralLayoutProps {
  children: React.ReactNode
}

export const SidebarLayout: React.FC<GeneralLayoutProps> = ({children}) => {
  return (<div className='general-layout'>
    <Header />
    <div className='sidebar-layout-child'>
    <Sidebar/>
    <div className='sidebar-layout-content'>
      { children }
      </div>
    </div>
  </div>)
}

export const HeaderLayout: React.FC<GeneralLayoutProps> = ({children}) => {
  return (<div className='general-layout'>
    <Header/>
    <div className='header-layout-content'>
      { children }
    </div>
  </div>)
}