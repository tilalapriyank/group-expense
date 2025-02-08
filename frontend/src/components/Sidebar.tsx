import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  WalletOutlined,
  DollarCircleOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  SwapOutlined,
  TransactionOutlined
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import "antd/dist/reset.css";

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (path) {
      setSelectedKey(path);
    }
  }, [location]);

  const handleMenuClick = (key: string) => {
    navigate(`/u/${key}`);
    setSelectedKey(key);

    if (window.innerWidth < 992) {
      setCollapsed(true);
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
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}>
          <Title
            level={4}
            style={{
              color: "#ffffff",
              margin: 0,
              marginBottom: 20,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: collapsed ? "0px" : "18px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              transition: "font-size 0.3s ease",
            }}
          >
            Expense Manager
          </Title>
        </div>

        {/* Menu Items */}
        <Menu.Item key="groups" icon={<TeamOutlined />} style={{ color: "#ffffff" }}>
          Groups
        </Menu.Item>
        <Menu.Item key="viewgroup" icon={<UsergroupAddOutlined />} style={{ color: "#ffffff" }}>
          View Group
        </Menu.Item>
        <Menu.Item key="groupexpenses" icon={<WalletOutlined />} style={{ color: "#ffffff" }}>
          Group Expenses
        </Menu.Item>
        <Menu.Item key="groupsettlements" icon={<SwapOutlined />} style={{ color: "#ffffff" }}>
          Group Settlements
        </Menu.Item>
        <Menu.Item key="expenses" icon={<DollarCircleOutlined />} style={{ color: "#ffffff" }}>
          My Expenses
        </Menu.Item>
        <Menu.Item key="settlements" icon={<TransactionOutlined />} style={{ color: "#ffffff" }}>
          My Settlements
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />} style={{ color: "#ffffff" }}>
          Profile
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
