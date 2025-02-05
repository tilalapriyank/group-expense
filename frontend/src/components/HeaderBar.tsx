import React, { useEffect } from "react";
import { Layout, Typography } from "antd";
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_USER_REQUEST } from "../store/actions/userActions";
import { RootState } from "../store/rootReducer";
import { useAuth } from "../context/AuthContext";

const { Header } = Layout;
const { Title } = Typography;

const HeaderBar: React.FC = () => {
    const dispatch = useDispatch();
    const { userName, loading } = useSelector((state: RootState) => state.user);
    const { user } = useAuth();
    useEffect(() => {
        if (user) {
            const id = user.id;
            dispatch({ type: FETCH_USER_REQUEST, id });
        }
    }, [dispatch, user]);

    return (
        <Header style={{
            background: "linear-gradient(90deg, #013856 0%, #0288D1 100%)",
            padding: "0 20px",
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Title level={4} style={{ margin: 0, color: "#ffffff" }}>
                    {loading ? 'Loading...' : `Hii, ${userName}`}
                </Title>
                <Avatar name={userName || 'Unknown'} size="40" style={{ marginLeft: 10 }} />
            </div>
        </Header>

    );
};

export default HeaderBar;
