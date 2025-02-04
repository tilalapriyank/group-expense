import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { Input, Button, Form, Card, Row, Col, Space, message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            login(email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
            message.error("Login failed! Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
            <Col xs={24} sm={18} md={12} lg={8} xl={6}>
                <Card
                    title={<span style={{ color: "#1890ff" }}>Login</span>} // Blue title
                    bordered={false}
                    style={{
                        width: "100%",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Form onFinish={handleSubmit}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Please input your email!" },
                                { type: "email", message: "Please enter a valid email!" },
                            ]}
                        >
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                style={{
                                    borderRadius: "4px",
                                    borderColor: "#1890ff",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                style={{
                                    borderRadius: "4px",
                                    borderColor: "#1890ff",
                                }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    loading={loading}
                                    style={{
                                        backgroundColor: "#4CAF50", // Green button color
                                        borderColor: "#4CAF50",
                                        borderRadius: "4px",
                                    }}
                                >
                                    Login
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;
