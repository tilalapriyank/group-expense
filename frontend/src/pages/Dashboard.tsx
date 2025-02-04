import React from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {

    const { user } = useAuth();

    return (
        <div>
            <h2>Welcome, {user?.name}</h2>
        </div>
    );
};

export default Dashboard;
