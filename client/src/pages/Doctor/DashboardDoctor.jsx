import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  CopyOutlined,
  LogoutOutlined,
  DownOutlined,
  FileOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Dropdown, message } from 'antd';
const { Header, Sider, Content } = Layout;
import { Outlet, useNavigate } from 'react-router-dom';
import { logoutApi } from '../../api';
import axios from 'axios';

const DashboardDoctor = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [headerTitle, setheaderTitle] = useState("Dashboard");
    const navigate = useNavigate();
    const {
    token: { colorBgContainer },
    } = theme.useToken();

    const handleLogout = async () => {

        const token = localStorage.getItem("token");  
        try{
          const response = await axios.get(logoutApi, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }); 
          if (response.status === 200) {
            localStorage.removeItem("email");
            localStorage.removeItem("fullname");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            message.success("Đăng xuất thành công")
            navigate("/")
          }
        } catch(error) {
          console.log(error);
          message.error("Đăng xuất không thành công")
        }
    }
    const handlePasswordChange = () => {
        navigate("/doctor/changepass")
    }

    const items = [
        {
            label: (
                <span onClick={handlePasswordChange} style={{ color: 'green' }}>
                    <UserOutlined style={{ marginRight: 20 }} /> Đổi mật khẩu
                </span>
            ),
            key: '4',
        },
        {
            label: (
                <span onClick={handleLogout} style={{ color: 'red' }}>
                    <LogoutOutlined style={{ marginRight: 20 }} /> Đăng xuất
                </span>
            ),
            key: '5',
        },
    ];
    const handleMenuSelect = (item) => {
        switch (item.key) {

            case '0':
                navigate("/doctor")
                setheaderTitle('Home')
                break;

            case '1':
                navigate('/doctor/patient')
                setheaderTitle('Quản lý hồ sơ bệnh nhân')
                break;

            case '2':
                navigate('/doctor/medical')
                setheaderTitle('Quản lý hồ sơ bệnh án')
                break;

            case '3':
                navigate('/doctor/diagnose')
                setheaderTitle('Chẩn đoán')
                break;

            default:
            break;
        }
    }
    return (
        <Layout id='dashboard' style={{minHeight:"100vh"}}>
            <Sider
                trigger={null} 
                collapsible 
                collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['0']}
                onSelect={handleMenuSelect}
                items={[
                {
                    key: '0',
                    icon: <HomeOutlined/>,
                    label: 'Home',
                },
                {
                    key: '1',
                    icon: <CopyOutlined />,
                    label: 'Hồ sơ bệnh nhân',
                },
                {
                    key: '2',
                    icon: <FileOutlined />,
                    label: 'Hồ sơ bệnh án',
                },
                {   
                    key: '3',
                    icon: <UploadOutlined />,
                    label: 'Chẩn đoán',
                },
                ]}
            />
            </Sider>
            <Layout>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
                >
                <div style={{display: "flex"}}>
                    <div>
                        <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '14px',
                            width: "80px",
                            height: "40px",
                            alignItems: "center",
                            marginTop: "30px"
                        }}
                        />
                    </div>
                    <div style={{fontSize:"13px", marginTop:"30px"}}>
                        <h2>{headerTitle}</h2>
                    </div>
                </div>

                <Dropdown
                    overlay={
                        <Menu onClick={handleMenuSelect}>
                            {items.map((menuItem) => (
                                <Menu.Item key={menuItem.key}>
                                    {menuItem.label}
                                </Menu.Item>
                            ))}
                        </Menu>
                    }
                    trigger={['click']}
                >
                    <div style={{ marginRight: 20, cursor: "pointer" }}>
                    <Avatar size="large" icon={<UserOutlined />} />
                    <span style={{ marginInline: 10 }}>BS: {localStorage.getItem("fullname")}</span>
                    <DownOutlined />    
                    </div>
                </Dropdown>
            </Header>
            <Content
                style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                }}
            >
                <Outlet/>
            </Content>
            </Layout>
        </Layout>
    );
}

export default DashboardDoctor