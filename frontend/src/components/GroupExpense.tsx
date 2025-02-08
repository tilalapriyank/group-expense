import React, { useState, useEffect } from "react";
import { Card, Typography, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { fetchGroupDetails, fetchGroups } from "../store/actions/groupActions";
import { fetchExpensesRequest } from "../store/actions/expenseActions";
import { Group } from "../types/groupTypes";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const GroupExpense: React.FC = () => {
    const dispatch = useDispatch();
    const { groups, loading } = useSelector((state: RootState) => state.groups);
    const { expenses } = useSelector((state: RootState) => state.expenses);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchGroups());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchGroupDetails(selectedGroup));
    }, [dispatch]);

    useEffect(() => {
        if (selectedGroup) {
            dispatch(fetchExpensesRequest(selectedGroup));
        }
    }, [dispatch, selectedGroup]);

    const handleGroupChange = (groupId: string) => {
        setSelectedGroup(groupId);
    };

    const groupMembers = groups.find(group => group._id === selectedGroup)?.members || [];
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const perPersonShare = totalExpense / groupMembers.length;

    const settlements = groupMembers.map(member => {
        const totalPaid = expenses.filter(expense => expense.paidBy._id === member._id).reduce((sum, exp) => sum + exp.amount, 0);
        const balance = (totalPaid - perPersonShare).toFixed(2);

        return {
            key: member._id,
            name: member.name,
            paid: totalPaid.toFixed(2),
            share: perPersonShare.toFixed(2),
            balance,
        };
    });

    return (
        <Card style={{ padding: "20px", borderRadius: "8px" }}>
            <Title level={3} style={{ color: "#0288D1" }}>Group Expenses</Title>
            <Paragraph>
                Select a group to view expense details, contributions, and settlement calculations.
            </Paragraph>

            <Select
                placeholder="Select a Group"
                style={{ width: "200px", marginBottom: "20px" }}
                onChange={handleGroupChange}
                loading={loading}
            >
                {groups.map((group: Group) => (
                    <Option key={group._id} value={group._id}>{group.groupName}</Option>
                ))}
            </Select>

            <Table
                columns={[
                    { title: "Member", dataIndex: "name", key: "name" },
                    { title: "Paid", dataIndex: "paid", key: "paid" },
                    { title: "Charged", dataIndex: "share", key: "share" },
                    { 
                        title: "Balance", 
                        dataIndex: "balance", 
                        key: "balance",
                        render: (balance: string) => {
                            const balanceNum = parseFloat(balance);
                            return (
                                <span style={{ color: balanceNum < 0 ? "red" : "green", fontWeight: "bold" }}>
                                    {balanceNum > 0 ? `+${balance}` : balance}
                                </span>
                            );
                        }
                    }
                ]}
                dataSource={settlements}
                pagination={false}
            />
        </Card>
    );
};

export default GroupExpense;