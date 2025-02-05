import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "antd/dist/reset.css";
import { useAuth } from "../context/AuthContext";

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard"); // Track selected menu item
  const { logout } = useAuth();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleMenuClick = (key: string) => {
    if (key === "logout") {
      logout();
    } else {
      navigate(`/${key}`); // Update the URL when a menu item is selected
      setSelectedKey(key); // Update the selected menu item state
    }
  };

  return (
    <Sider
      collapsed={collapsed}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        background: "linear-gradient(to bottom, #013856, #0066a1)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          textAlign: "left",
          padding: "16px",
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        <Title level={4} style={{ color: "#ffffff", margin: 0 }}>
          Expense Manager
        </Title>
      </div>
      <Menu
        mode="vertical"
        selectedKeys={[selectedKey]} // Highlight the selected menu item
        style={{
          background: "transparent",
          color: "#ffffff",
          borderRight: "none",
        }}
        theme="dark"
        onClick={({ key }) => handleMenuClick(key)} // Handle menu click
      >
        <Menu.Item key="dashboard" icon={<AppstoreOutlined />} style={{ color: "#ffffff" }}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="groups" icon={<UserOutlined />} style={{ color: "#ffffff" }}>
          My group
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ color: "#ffffff" }}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
