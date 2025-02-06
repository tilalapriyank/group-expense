import React, { useState } from "react";
import { Layout, Card, Avatar, Typography, Button, Input, Row, Col, Form } from "antd";
import { UserOutlined, EditOutlined, SaveOutlined, LogoutOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Content } = Layout;
const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "20px" }}>
        <Row justify="center">
          <Col xs={24} sm={18} md={12} lg={8}>
            <Card bordered={false} style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Avatar size={100} icon={<UserOutlined />} />
                <Title level={3} style={{ marginTop: "10px" }}>
                  {userInfo.name}
                </Title>
                <p>{userInfo.email}</p>
              </div>

              <Form layout="vertical">
                <Form.Item label="Name">
                  {editing ? (
                    <Input
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    />
                  ) : (
                    <p>{userInfo.name}</p>
                  )}
                </Form.Item>

                <Form.Item label="Email">
                  {editing ? (
                    <Input
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    />
                  ) : (
                    <p>{userInfo.email}</p>
                  )}
                </Form.Item>

                <Form.Item label="Phone">
                  {editing ? (
                    <Input
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    />
                  ) : (
                    <p>{userInfo.phone}</p>
                  )}
                </Form.Item>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {editing ? (
                    <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
                      Save
                    </Button>
                  ) : (
                    <Button type="default" icon={<EditOutlined />} onClick={handleEdit}>
                      Edit
                    </Button>
                  )}
                  <Button type="danger" icon={<LogoutOutlined />} onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
