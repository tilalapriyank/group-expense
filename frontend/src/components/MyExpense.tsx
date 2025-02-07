import React, { useState, useEffect } from "react";
import { Card, Typography, Select, Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { fetchGroups } from "../store/actions/groupActions";
import { Group } from "../types/groupTypes";
import { fetchExpensesRequest } from "../store/actions/expenseActions";
import { useAuth } from "../context/AuthContext";

const { Title } = Typography;
const { Option } = Select;

const MyExpense: React.FC = () => {
    const dispatch = useDispatch();
    const { groups, loading } = useSelector((state: RootState) => state.groups);
    const { expenses } = useSelector((state: RootState) => state.expenses);
    const { user } = useAuth();
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchGroups());
    }, [dispatch]);

    useEffect(() => {
        if (selectedGroup) {
            dispatch(fetchExpensesRequest(selectedGroup));
        }
    }, [dispatch, selectedGroup]);

    const handleGroupChange = (groupId: string) => {
        setSelectedGroup(groupId);
    };

    const myExpenses = expenses
        .filter((expense) =>
            expense.splitDetails.some((detail) => detail.userId === user?.id)
        )
        .map((expense) => ({
            key: expense._id,
            description: expense.description,
            amount: expense.amount,
            paidBy: expense.paidBy.name,
            myShare: expense.splitDetails.find((detail) => detail.userId === user?.id)?.shareAmount || 0,
        }));

    const totalMyShare = myExpenses.reduce((acc, curr) => acc + curr.myShare, 0);

    const handlePrint = () => {
        const tableContent = document.getElementById("expense-table").innerHTML;
        const newWindow = window.open("", "", "width=800,height=600");
        newWindow.document.write(`<html><head><title>Print Expenses</title></head><body>${tableContent}</body></html>`);
        newWindow.document.close();
        newWindow.print();
    };

    return (
        <div className="expense-container">
            <Card className="expense-card">
                <Title level={2} className="title">My Expenses</Title>

                <Select
                    placeholder="Select a Group"
                    className="group-select"
                    onChange={handleGroupChange}
                    loading={loading}
                    style={{ marginBottom: "10px",width:"200px" }}
                >
                    {groups.map((group: Group) => (
                        <Option key={group._id} value={group._id}>{group.groupName}</Option>
                    ))}
                </Select>

                <div id="expense-table">
                    <Table
                        columns={[
                            { title: "Description", dataIndex: "description", key: "description" },
                            { title: "Paid By", dataIndex: "paidBy", key: "paidBy" },
                            { title: "Total Amount", dataIndex: "amount", key: "amount" },
                            { title: "My Share", dataIndex: "myShare", key: "myShare" },
                        ]}
                        dataSource={myExpenses}
                        loading={loading}
                        pagination={false}
                        footer={() => (
                            <div className="total-expense">
                                <strong>Total My Share: ₹{totalMyShare.toFixed(2)}</strong>
                            </div>
                        )}
                    />

                </div>

                <Button type="primary" className="print-btn" onClick={handlePrint}>
                    Print Expense
                </Button>
            </Card>
        </div>
    );
};

export default MyExpense;
