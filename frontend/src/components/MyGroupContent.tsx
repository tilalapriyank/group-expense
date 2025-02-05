import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";  // Import useNavigate instead of useHistory
import CreateGroupModal from "../components/CreateGroupModal";
import { fetchGroups, joinGroupRequest, deleteGroupRequest } from "../store/actions/groupActions"; // Add deleteGroupRequest
import { RootState } from "../store/rootReducer";
import { Group } from "../types/groupTypes";

const MyGroupContent: React.FC = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Use useNavigate hook for navigation
  const groups = useSelector((state: RootState) => state.groups);

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

  const handleView = (id: string) => {
    navigate(`view/${id}`);
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
      render: (_, record: Group) => (
        <>
          <Button type="link" onClick={() => handleView(record._id)}>
            View
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleCreateGroupClick}>
          Create Group
        </Button>
        <Button type="default" onClick={handleJoinGroupClick}>
          Join Group
        </Button>
      </Space>

      <Table columns={columns} dataSource={groups.groups || []} rowKey="id" />

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
    </div>
  );
};

export default MyGroupContent;
