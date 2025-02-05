import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Layout, Spin, message } from "antd";
import { RootState } from "./store/rootReducer";
import Page from "./pages/Page";
import AuthPage from "./pages/AuthPage";

const { Content } = Layout;

const App: React.FC = () => {
  const { token } = useAuth();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return token ? <>{children}</> : <Navigate to="/" />;
  };

  return (
    <Router>
      <Layout>
        <Content>
          {loading ? (
            <Spin size="large" />
          ) : (
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Page />
                  </ProtectedRoute>
                }
              />
              <Route path="/groups" element={
                <ProtectedRoute>
                  <Page />
                </ProtectedRoute>
              } />
              <Route path="/groups/view/*" element={
                <ProtectedRoute>
                  <Page />
                </ProtectedRoute>
              } />
              <Route path="/" element={<Navigate to={token ? "/dashboard" : "/"} />} />
            </Routes>
          )}
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
