import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Layout, Spin, message } from "antd";
import { RootState } from "./store/rootReducer";
import Page from "./pages/Page";
import AuthPage from "./pages/AuthPage";
import DashboardContent from "./components/DashboardContent";
import MyGroupContent from "./components/MyGroupContent";
import ViewGroup from "./components/ViewGroup";
import MyExpense from "./components/MyExpense";

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
              <Route path="/u/*" element={<ProtectedRoute>
                <Page />
              </ProtectedRoute>}
              >
                <Route path="dashboard" element={
                  <DashboardContent />
                } />
                <Route path="groups" element={
                  <MyGroupContent />
                } />
                <Route path="expenses" element={
                  <MyExpense />
                } />
                <Route path="groups/view/:groupId" element={
                  <ViewGroup />
                } />
              </Route>
              <Route path="/" element={<Navigate to={token ? "/u/dashboard" : "/"} />} />
            </Routes>
          )}
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
