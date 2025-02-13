import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col, Spin, Input, Button, Modal, Form } from "antd";
import Avatar from "react-avatar";
import { UserOutlined, MailOutlined, BankOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileRequest, updateUserRequest, updatePasswordRequest } from "../store/actions/profileActions";
import { RootState } from "../store/rootReducer";
import { AppDispatch } from "../store/store";
const { Title, Text } = Typography;

const Profile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.profile);

    const [editableUser, setEditableUser] = useState({
        userId:"",
        id: "",
        name: "",
        email: "",
        upiId: "",
    });

    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        dispatch(fetchProfileRequest());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setEditableUser({
                userId: user.id,
                id: user.id,
                name: user.userId.name || "",
                email: user.userId.email || "",
                upiId: user.upiId || "",
            });
        }
    }, [user]);

    const handleInputChange = (field: string, value: string) => {
        setEditableUser({ ...editableUser, [field]: value });
    };

    const handleSaveChanges = () => {
        dispatch(updateUserRequest(editableUser));
    };

    const handlePasswordChange = () => {
        if (!newPassword) {
            return;
        }
        dispatch(updatePasswordRequest(newPassword));
        setPasswordModalVisible(false);
        setNewPassword("");
    };

    return (
        <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
            <Row justify="center">
                <Col xs={24} sm={20} md={16} lg={12}>
                    <Card
                        style={{
                            width: "100%",
                            padding: "30px",
                            borderRadius: "12px",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Title level={2} style={{ color: "#1890ff", textAlign: "center", marginBottom: "20px" }}>
                            Profile
                        </Title>

                        {loading ? (
                            <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
                        ) : (
                            <Row gutter={[16, 16]} justify="center">
                                {/* Avatar Section */}
                                <Col xs={24} style={{ textAlign: "center" }}>
                                    <Avatar
                                        name={editableUser.name || "User"}
                                        size="100"
                                        round
                                        style={{ fontSize: "36px" }}
                                    />

                                </Col>
                                {/* Form Section */}
                                <Col xs={24}>
                                    <Form layout="vertical">
                                        <Form.Item label={<Text strong><UserOutlined /> Name</Text>}>
                                            <Input
                                                size="large"
                                                value={editableUser.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                            />
                                        </Form.Item>

                                        <Form.Item label={<Text strong><MailOutlined /> Email</Text>}>
                                            <Input
                                                size="large"
                                                value={editableUser.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                            />
                                        </Form.Item>

                                        <Form.Item label={<Text strong><BankOutlined /> UPI ID</Text>}>
                                            <Input
                                                size="large"
                                                value={editableUser.upiId}
                                                onChange={(e) => handleInputChange("upiId", e.target.value)}
                                            />
                                        </Form.Item>
                                    </Form>
                                </Col>

                                {/* Buttons Section */}
                                <Col xs={24} style={{ textAlign: "center", marginTop: "20px" }}>
                                    <Button type="primary" size="large" onClick={handleSaveChanges} block>
                                        Save Changes
                                    </Button>
                                </Col>

                                <Col xs={24} style={{ textAlign: "center", marginTop: "10px" }}>
                                    <Button
                                        type="default"
                                        size="large"
                                        icon={<LockOutlined />}
                                        onClick={() => setPasswordModalVisible(true)}
                                        block
                                    >
                                        Change Password
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Card>
                </Col>
            </Row>

            {/* Password Change Modal */}
            <Modal
                title="Change Password"
                open={passwordModalVisible}
                onCancel={() => setPasswordModalVisible(false)}
                onOk={handlePasswordChange}
            >
                <Form layout="vertical">
                    <Form.Item label="New Password">
                        <Input.Password
                            size="large"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Profile;
