import React, { useEffect } from "react";
import { Layout, Dropdown, Button, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../store/actions/userActions";
import { RootState } from "../store/rootReducer";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName, loading } = useSelector((state: RootState) => state.user);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      dispatch(fetchUserRequest(user.id));
    }
  }, [dispatch, user]);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "profile") {
      navigate("/u/profile");
    } else if (key === "logout") {
      logout();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick} style={{ minWidth: 150 }}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: "linear-gradient(90deg, #013856 0%, #0288D1 100%)",
        padding: "0 20px",
        display: "flex",
        justifyContent: "flex-end", // Align everything to the right
        alignItems: "center",
      }}
    >
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          type="text"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#ffffff",
            fontSize: "16px",
          }}
        >
          {loading ? "Loading..." : `Hi, ${userName}`}
          <Avatar name={userName || "User"} size="40" />
        </Button>
      </Dropdown>
    </Header>
  );
};

export default HeaderBar;
