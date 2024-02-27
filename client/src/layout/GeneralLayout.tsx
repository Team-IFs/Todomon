import Sidebar from '../components/Sidebar'
import Header from '../components/Header/Header'
import styled from '@emotion/styled'
interface GeneralLayoutProps {
  children: React.ReactNode
}
const RowLayout = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: 'auto',
})
const ColumnLayout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

export const SettingContentsLayout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100vw - 210px)',
  minHeight: 'calc(100vh - 67.5px)',
  height: 'auto'
})

export const SidebarLayout: React.FC<GeneralLayoutProps> = ({children}) => {
  return (<ColumnLayout>
    <Header />
    <RowLayout>
      <Sidebar/>
      <ColumnLayout>
        { children }
      </ColumnLayout>
    </RowLayout>
  </ColumnLayout>)
}

export const HeaderLayout: React.FC<GeneralLayoutProps> = ({children}) => {
  return (<div className='general-layout'>
    <Header/>
    <div className='header-layout-content'>
      { children }
    </div>
  </div>)
}