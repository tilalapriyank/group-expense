import React from "react";
import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import DashboardContent from "../components/DashboardContent";
import MyGroupContent from "../components/MyGroupContent";
import ViewGroup from "../components/ViewGroup";
import { useLocation } from "react-router-dom";

const { Content } = Layout;

const Page: React.FC = () => {
  const location = useLocation();
  const renderContent = () => {
    if (location.pathname.startsWith("/groups/view/")) {
      return <ViewGroup />;
    }
    switch (location.pathname) {
      case "/groups":
        return <MyGroupContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <HeaderBar />
        <Content style={{ padding: "20px" }}>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default Page;
