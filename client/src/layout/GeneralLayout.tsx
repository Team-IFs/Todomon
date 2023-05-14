import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
interface GeneralLayoutProps {
  children: React.ReactNode
}

export const SidebarLayout: React.FC<GeneralLayoutProps> = ({children}) => {
  return (<div>
    <Header/>
    <Sidebar/>
    <div>
      { children }
    </div>
  </div>)
}

export const HeaderLayout: React.FC<GeneralLayoutProps> = ({children}) => {
  return (<div>
    <Header/>
    <div>
      { children }
    </div>
  </div>)
}