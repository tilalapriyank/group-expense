import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Popconfirm, Row, Col, Card, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CreateGroupModal from "../components/CreateGroupModal";
import { fetchGroups, joinGroupRequest, deleteGroupRequest } from "../store/actions/groupActions";
import { RootState } from "../store/rootReducer";
import { Group } from "../types/groupTypes";

const MyGroupContent: React.FC = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  const dispatch = useDispatch();
  const groups = useSelector((state: RootState) => state.groups);
  const { Title } = Typography;

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleCreateGroupClick = () => setIsCreateModalVisible(true);
  const handleJoinGroupClick = () => setIsJoinModalVisible(true);
  const handleCancel = () => {
    setIsCreateModalVisible(false);
    setIsJoinModalVisible(false);
  };

  const handleJoinGroup = () => {
    if (!groupCode.trim()) {
      return;
    }
    dispatch(joinGroupRequest(groupCode));
    setIsJoinModalVisible(false);
    setGroupCode("");
  };

  const handleDelete = (id: string) => {
    dispatch(deleteGroupRequest(id));
  };

  const columns = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "name",
    },
    {
      title: "Group Code",
      dataIndex: "groupCode",
      key: "code",
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (members: any[] | undefined) => members?.length ?? 0,
    },
    {
      title: "Total Expenses",
      dataIndex: "expenses",
      key: "expenses",
      render: (expenses: any[] | undefined) => expenses?.length ?? 0,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Group) => (
        <>
          <Popconfirm
            title="Are you sure you want to delete this group?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Card style={{ padding: 20, borderRadius: 8 }}>
      <Title level={3} style={{ color: "#0288D1" }}>Groups</Title>

      <Row style={{ marginBottom: 16, marginTop: 8 }}>
        <Col xs={8} sm={12} md={4} style={{ marginRight: 5 }}>
          <Button type="primary" block onClick={handleCreateGroupClick}>
            Create Group
          </Button>
        </Col>
        <Col xs={8} sm={12} md={4}>
          <Button type="default" block onClick={handleJoinGroupClick}>
            Join Group
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={groups.groups || []}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
        scroll={{ x: 800 }}
      />

      <CreateGroupModal visible={isCreateModalVisible} onCancel={handleCancel} />

      <Modal
        title="Join Group"
        visible={isJoinModalVisible}
        onCancel={handleCancel}
        onOk={handleJoinGroup}
        okText="Join"
      >
        <Input
          placeholder="Enter Group Code"
          value={groupCode}
          onChange={(e) => setGroupCode(e.target.value)}
        />
      </Modal>
    </Card>
  );
};

export default MyGroupContent;
