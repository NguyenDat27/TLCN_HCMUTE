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

const DashboardAdmin = () => {
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
        console.log("Đã nhấn")
        navigate("/dashboard/changepass");
    }

    const items = [
        {
            label: (
                <span onClick={handlePasswordChange} style={{ color: 'green' }}>
                    <UserOutlined style={{ marginRight: 20 }} /> Đổi mật khẩu
                </span>
            ),
            key: '6',
        },
        {
            label: (
                <span onClick={handleLogout} style={{ color: 'red' }}>
                    <LogoutOutlined style={{ marginRight: 20 }} /> Đăng xuất
                </span>
            ),
            key: '7',
        },
    ];
    const handleMenuSelect = (item) => {
        switch (item.key) {

            case '0':
                navigate("/dashboard")
                setheaderTitle('Home')
                break;

            case '1':
                navigate("/dashboard/account")
                setheaderTitle('Quản lý tài khoản')
                break;

            case '2':
                navigate("/dashboard/doctor")
                setheaderTitle('Quản lý bác sĩ')
                break;

            case '3':
                navigate('/dashboard/patient')
                setheaderTitle('Quản lý hồ sơ bệnh nhân')
                break;

            case '4':
                navigate('/dashboard/medical')
                setheaderTitle('Quản lý hồ sơ bệnh án')
                break;

            case '5':
                navigate('/dashboard/diagnose')
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
                    icon: <UserOutlined />,
                    label: 'Tài khoản',
                },
                {
                    key: '2',
                    icon: <UserOutlined />,
                    label: 'Bác sĩ',
                },
                {
                    key: '3',
                    icon: <CopyOutlined />,
                    label: 'Hồ sơ bệnh nhân',
                },
                {
                    key: '4',
                    icon: <FileOutlined />,
                    label: 'Hồ sơ bệnh án',
                },
                {   
                    key: '5',
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
                    <span style={{ marginInline: 10 }}>Admin: {localStorage.getItem("fullname")}</span>
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

export default DashboardAdmin