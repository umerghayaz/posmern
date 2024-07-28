import React ,{useState}from 'react'
import { Button, Layout, Modal, Space } from "antd";
import LayoutHeader from './LayoutHeader';
import LayoutSidebar from './LayoutSidebar';
const { Content } = Layout;
const MainContent = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const onClose = () => {
        setCollapsed(false);
      };
    const layoutStyle = {
        minHeight: '100vh',
    }
  return (
    <Layout hasSider>
    <LayoutSidebar collapsed={collapsed} onClose={onClose} />
     <Layout  >
       <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
       <Content
       >
        {children}
       </Content>
     </Layout>
   </Layout>
  )
}

export default MainContent
