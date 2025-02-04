import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerRequest } from "../store/actions/authActions";
import { Input, Button, Form } from "antd";

const Register = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        dispatch(registerRequest(name, email, password));
    };

    return (
        <div>
            <h2>Register</h2>
            <Form onFinish={handleSubmit}>
                <Form.Item label="Name">
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Email">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item label="Password">
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default Register;
