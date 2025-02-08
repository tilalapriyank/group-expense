import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";
import { Layout, Spin, message } from "antd";
import { RootState } from "./store/rootReducer";
import Page from "./pages/Page";
import AuthPage from "./pages/AuthPage";
import MyGroupContent from "./components/MyGroupContent";
import ViewGroup from "./components/ViewGroup";
import MyExpense from "./components/MyExpense";
import GroupExpense from "./components/GroupExpense";
import GroupSettlements from "./components/GroupSettlements";
import MySettlements from "./components/MySettlements";
import Profile from "./components/Profile";

const { Content } = Layout;

const App: React.FC = () => {
  const { token } = useAuth();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);


  const ProtectedRoute = () => {
    const { token } = useAuth();
    const storedToken = localStorage.getItem("token");

    if (!token && !storedToken) {
        return <Navigate to="/" replace />;
    }

    return <Page />;
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
              <Route path="/u/*" element={<ProtectedRoute />}>                              
                <Route path="groups" element={
                  <MyGroupContent />
                } />
                <Route path="viewgroup" element={
                  <ViewGroup />
                } />
                <Route path="expenses" element={
                  <MyExpense />
                } />
                <Route path="settlements" element={
                  <MySettlements />
                } />
                <Route path="groupexpenses" element={
                  <GroupExpense />
                } />
                <Route path="groupsettlements" element={
                  <GroupSettlements />
                } />
                <Route path="profile" element={
                  <Profile />
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
