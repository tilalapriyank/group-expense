import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Table, Popconfirm, Row, Col, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../store/actions/groupActions";
import { fetchExpensesRequest, deleteExpenseRequest } from "../store/actions/expenseActions";
import AddExpenseModal from "../components/AddExpenseModal";
import { RootState } from "../store/rootReducer";

const { Title, Text } = Typography;
const { Option } = Select;

const ViewGroup: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const groups = useSelector((state: RootState) => state.groups.groups);
  const expenses = useSelector((state: RootState) => state.expenses.expenses);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  useEffect(() => {
    if (selectedGroupId) {
      // dispatch(fetchGroupDetails(selectedGroupId));
      dispatch(fetchExpensesRequest(selectedGroupId));
    }
  }, [dispatch, selectedGroupId]);

  const handleGroupChange = (groupId: string) => {
    setSelectedGroupId(groupId);
  };

  const handleAddExpenseClick = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleDeleteExpense = (expenseId: string) => {
    if (selectedGroupId) {
      dispatch(deleteExpenseRequest(expenseId, selectedGroupId));
    }
  };

  const selectedGroup = groups.find(group => group._id === selectedGroupId);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const columns = [
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Amount", dataIndex: "amount", key: "amount", render: (amount: number) => `${amount.toFixed(2)}` },
    { title: "Paid By", dataIndex: "paidBy", key: "paidBy", render: (paidBy: { name: string }) => paidBy.name },
    { title: "Split", dataIndex: "splitDetails", key: "splitNames", render: (splitDetails: any[]) => splitDetails.map(split => split.userId.name).join(", ") },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: { _id: string }) => (
        <Popconfirm
          title="Are you sure you want to delete this expense?"
          onConfirm={() => handleDeleteExpense(record._id)}
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
            <Title level={3} style={{ color: "#0288D1"}}>View Group</Title>

      <Row gutter={[16, 16]} align="middle" justify="space-between" style={{ marginBottom: 16 }}>

        <Col span={12}>
          <Select
            placeholder="Select a group"
            style={{ width: "200px" }}
            onChange={handleGroupChange}
            value={selectedGroupId || undefined}
          >
            {groups.map(group => (
              <Option key={group._id} value={group._id}>{group.groupName}</Option>
            ))}
          </Select>
        </Col>
        <Col xs={8} sm={12} md={4}>
          <Button type="primary" block onClick={handleAddExpenseClick} disabled={!selectedGroupId}>
            Add Expense
          </Button>
        </Col>
      </Row>

      {selectedGroupId && selectedGroup ? (
        <>
          <Title level={3} style={{ color: "#0288D1" }}>{selectedGroup.groupName}</Title>
          <Table
            dataSource={expenses || []}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
            summary={() => (
              <Table.Summary fixed="bottom">
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}><Text strong>Total Expenses:</Text></Table.Summary.Cell>
                  <Table.Summary.Cell index={1}><Text strong>{totalExpenses.toFixed(2)}</Text></Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
          <AddExpenseModal visible={isModalVisible} onCancel={handleCancel} groupId={selectedGroupId} />
        </>
      ) : (
        <Text>Select a group to view details</Text>
      )}
    </Card>
  );
};

export default ViewGroup;
