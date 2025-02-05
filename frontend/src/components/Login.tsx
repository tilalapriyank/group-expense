import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { buttonStyle, toggleTextStyle } from "../assets/AuthStyles";
import { useAuth } from "../context/AuthContext"

const { Title, Text } = Typography;

interface LoginProps {
    toggleForm: () => void;
}

const Login: React.FC<LoginProps> = ({ toggleForm }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            login(values.email, values.password);
            navigate("/dashboard");
            message.success("Login successful!");
        } catch (error) {
            message.error("Invalid email or password!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Title level={2} style={{ color: "#0288D1" }}>Welcome Back!</Title>
            <Text type="secondary">Login to continue</Text>

            <Form onFinish={handleSubmit} layout="vertical" style={{ marginTop: "20px" }}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: "email", message: "Enter a valid email!" }]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Enter your password!" }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading} style={buttonStyle}>
                        Login
                    </Button>
                </Form.Item>
            </Form>

            <Text style={toggleTextStyle} onClick={toggleForm}>
                Don't have an account? Register here
            </Text>
        </>
    );
};

export default Login;
