import { useEffect, useState } from 'react';
import { Layout, Menu, Button, theme, Avatar, Row, Dropdown, MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import MenuItems from '@/components/layout/menu-items';
import { useAuth } from '@/hooks';
import Loading from '@/components/loading';
import { retrieveData, refreshAccessToken } from '@/utils/token';

const { Header, Sider, Content } = Layout;

refreshAccessToken()

function MainLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const { loading }: any = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const remember = retrieveData('remember');
    if (remember === '0') {
      window.addEventListener('beforeunload', () => {
        localStorage.clear();
      })
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear();
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
      {loading
        ? <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Loading />
        </div>
        : <>
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
        </>}
    </Layout>
  );
}

export default MainLayout;
