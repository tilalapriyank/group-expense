import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Space, Table, Popconfirm, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGroupDetails } from "../store/actions/groupActions";
import { fetchExpensesRequest, deleteExpenseRequest } from "../store/actions/expenseActions";
import AddExpenseModal from "../components/AddExpenseModal";
import { RootState } from "../store/rootReducer";

const { Title } = Typography;

const ViewGroup: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const group = useSelector((state: RootState) => state.groups.groups);
  const expenses = useSelector((state: RootState) => state.expenses.expenses);

  useEffect(() => {
    if (groupId) {
      dispatch(fetchGroupDetails(groupId));
      dispatch(fetchExpensesRequest(groupId));
    }
  }, [dispatch, groupId]);

  const handleAddExpenseClick = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleDeleteExpense = (expenseId: string, groupId: string) => {
    dispatch(deleteExpenseRequest(expenseId, groupId));
  };

  if (!group) return <div>Loading...</div>;

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `${amount.toFixed(2)}`, // Format amount
    },
    {
      title: "Paid By",
      dataIndex: "paidBy",
      key: "paidBy",
      render: (paidBy: { name: string }) => paidBy.name, // Show name instead of full object
    },
    {
      title: "Split Count",
      dataIndex: "splitDetails",
      key: "splitCount",
      render: (splitDetails: any[]) => splitDetails.length, // Count the number of splits
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: { _id: string }) => (
        <Popconfirm
          title="Are you sure you want to delete this expense?"
          onConfirm={() => handleDeleteExpense(record._id, record.groupId)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Card style={{ padding: 20, borderRadius: 8 }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 16, justifyContent: "space-between" }}>
        <Title level={3} style={{ color: "#0288D1" }}>{group.groupName}</Title>
        <Col xs={8} sm={12} md={4}>
          <Button type="primary" block onClick={handleAddExpenseClick}>
            Add Expense
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={expenses || []} // Ensure it's always an array
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }} // Add pagination
        scroll={{ x: true }} // Make the table horizontally scrollable on smaller screens
      />

      {/* Add Expense Modal */}
      <AddExpenseModal visible={isModalVisible} onCancel={handleCancel} groupId={group._id} />
    </Card>
  );
};

export default ViewGroup;
