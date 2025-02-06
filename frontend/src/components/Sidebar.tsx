import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import "antd/dist/reset.css";
import { useAuth } from "../context/AuthContext";

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (path) {
      setSelectedKey(path);
    }
  }, [location]);

  const handleMenuClick = (key: string) => {
    if (key === "logout") {
      logout();
    } else {
      navigate(`/u/${key}`);
      setSelectedKey(key);
    }
  };

  return (
    <Sider
      collapsed={collapsed}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        zIndex: 999,
        minHeight: "100vh",
        transition: "background 0.3s ease-in-out",
        background: collapsed ? "transparent" : "linear-gradient(to bottom, #013856, #0066a1)",
      }}
    >
      <Menu
        mode="vertical"
        selectedKeys={[selectedKey]}
        style={{
          background: "transparent",
          color: "#ffffff",
          borderRight: "none",
        }}
        theme="dark"
        onClick={({ key }) => handleMenuClick(key)}
      >
        {/* Title */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "16px" }}>
          <Title
            level={4}
            style={{
              color: "#ffffff",
              margin: 0,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: collapsed ? "0px" : "18px", 
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              transition: "font-size 0.3s ease", // Smooth font size change
            }}
          >
            Expense Manager
          </Title>
        </div>

        {/* Menu Items */}
        <Menu.Item key="dashboard" icon={<AppstoreOutlined />} style={{ color: "#ffffff" }}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="groups" icon={<UserOutlined />} style={{ color: "#ffffff" }}>
          My group
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />} style={{ color: "#ffffff" }}>
          Profile
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ color: "#ffffff" }}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
