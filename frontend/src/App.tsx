import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "./context/AuthContext";  // React Context for token
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Layout, Spin, message } from "antd";
import { RootState } from "./store/rootReducer";  // Import the RootState to access the Redux state
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const { Content } = Layout;

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useAuth(); // Access token from React Context
  const { loading, error } = useSelector((state: RootState) => state.auth);  // Get loading and error from Redux store

  useEffect(() => {
    if (error) {
      message.error(error); // Show error message if login fails
    }
  }, [error]);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return token ? <>{children}</> : <Navigate to="/login" />;  // Redirect if not authenticated
  };

  return (
    <Router>
      <Layout>
        <Content style={{ padding: "20px" }}>
          {loading ? (
            <Spin size="large" />  // Show loading spinner while loading
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} /> {/* Redirect */}
            </Routes>
          )}
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
