import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Typography, message } from "antd";
import { registerRequest } from "../store/actions/authActions";

const { Title, Text } = Typography;

interface RegisterProps {
    toggleForm: () => void;
}

const Register: React.FC<RegisterProps> = ({ toggleForm }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: { name: string; email: string; password: string; upiId: string;}) => {
        setLoading(true);
        try {
            dispatch(registerRequest(values));
            message.success("Registration successful! You can now log in.");
            toggleForm();
        } catch (error) {
            message.error("Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Title level={2} style={{ color: "#0288D1", textAlign: "center" }}>Create Account</Title>
            <Text type="secondary" style={{ display: "block", textAlign: "center" }}>Join us today</Text>

            <Form onFinish={handleSubmit} layout="vertical" style={{ marginTop: "20px" }}>
                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: "Enter your name!" }]}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: "email", message: "Enter a valid email!" }]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="UPI ID"
                    name="upiId"
                    rules={[
                        { required: true, message: "Enter your UPI ID!" },
                        { pattern: /^[\w.-]+@[a-zA-Z]+$/, message: "Enter a valid UPI ID!" }
                    ]}
                >
                    <Input placeholder="Enter your UPI ID" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Enter your password!" }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Register
                    </Button>
                </Form.Item>
            </Form>

            <Text style={{ cursor: "pointer", color: "#0288D1", textAlign: "center", display: "block" }} onClick={toggleForm}>
                Already have an account? Login here
            </Text>
        </>
    );
};

export default Register;
