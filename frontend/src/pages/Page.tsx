import React from "react";
import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import { Outlet } from "react-router-dom";

const Page: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <HeaderBar />
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default Page;

