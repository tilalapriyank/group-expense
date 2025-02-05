import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const DashboardContent: React.FC = () => {
  return (
    <Card style={{ padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <Title level={3} style={{ color: "#0288D1" }}>Dashboard</Title>
      <Paragraph>
        Manage your group members, permissions, and activities here. You can add new members, assign roles, and monitor group interactions.
      </Paragraph>
    </Card>
  );
};

export default DashboardContent;