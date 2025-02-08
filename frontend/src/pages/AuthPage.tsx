import React, { useState } from "react";
import { Row, Col, Card, Grid } from "antd";
import Login from "../components/Login";
import Register from "../components/Register";
import { containerStyle, rightSideStyle, cardContainerStyle, imageStyle } from "../assets/AuthStyles";
import welcomeImage from "../assets/auth.svg"; 

const { useBreakpoint } = Grid; // Hook to detect screen size

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const screens = useBreakpoint(); // Get responsive screen sizes

    return (
        <div style={containerStyle}>
            <Card style={cardContainerStyle}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} md={12} lg={12}>
                        {isLogin ? <Login toggleForm={() => setIsLogin(false)} /> : <Register toggleForm={() => setIsLogin(true)} />}
                    </Col>
                    {/* Hide image on small screens */}
                    {screens.md && (
                        <Col md={12} lg={12} style={rightSideStyle}>
                            <img src={welcomeImage} alt="Welcome" style={imageStyle} />
                        </Col>
                    )}
                </Row>
            </Card>
        </div>
    );
};

export default AuthPage;
