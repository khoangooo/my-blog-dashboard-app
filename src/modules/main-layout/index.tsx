import { useState } from 'react';
import { Layout, Menu, Button, theme, Avatar, Row, Dropdown, MenuProps, message } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import MenuItems from '../../components/layout/menu-items';

const { Header, Sider, Content } = Layout;

function MainLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    navigate("/login")
  }

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: 'Log out',
      onClick: handleLogout 
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={MenuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ paddingLeft: 0, paddingRight: 16, background: colorBgContainer }}>
          <Row justify="space-between" align="middle">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Avatar size="large" icon={<UserOutlined />} />
              </a>
            </Dropdown>

          </Row>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
