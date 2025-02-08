import React, { useState, useEffect } from "react";
import { Card, Typography, Select, Table, Spin, Empty, Button, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { fetchGroups } from "../store/actions/groupActions";
import { fetchExpensesRequest } from "../store/actions/expenseActions";
import { fetchSettlementsRequest, addBulkSettlementRequest, updateSettlementStatusRequest, deleteAllSettlementsRequest } from "../store/actions/settlementActions";
import { Group } from "../types/groupTypes";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const GroupSettlements: React.FC = () => {
    const dispatch = useDispatch();

    const { groups, loading: groupsLoading } = useSelector((state: RootState) => state.groups);
    const { expenses, loading: expensesLoading } = useSelector((state: RootState) => state.expenses);
    const { settlements, loading: settlementsLoading } = useSelector((state: RootState) => state.settlements);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [generatedSettlements, setGeneratedSettlements] = useState(false); // New state to track settlements

    useEffect(() => {
        dispatch(fetchGroups());
    }, [dispatch]);

    useEffect(() => {
        if (selectedGroup) {
            dispatch(fetchExpensesRequest(selectedGroup));
            dispatch(fetchSettlementsRequest(selectedGroup));
        }
    }, [dispatch, selectedGroup]);

    useEffect(() => {
        if (settlements.length > 0) {
            setGeneratedSettlements(true); // Disable the button once settlements are available
        }
    }, [settlements]);

    const handleGroupChange = (groupId: string) => {
        setSelectedGroup(groupId);
        setGeneratedSettlements(false); // Reset when a new group is selected
    };

    const handleStatusChange = (settlementId: string) => {
        dispatch(updateSettlementStatusRequest(settlementId, "completed"));
    };

    const groupMembers = groups.find(group => group._id === selectedGroup)?.members || [];
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const perPersonShare = totalExpense / groupMembers.length;
    const settlement = groupMembers.map(member => {
        const totalPaid = expenses.filter(expense => expense.paidBy._id === member._id).reduce((sum, exp) => sum + exp.amount, 0);
        return {
            key: member._id,
            name: member.name,
            paid: totalPaid.toFixed(2),
            share: perPersonShare.toFixed(2),
            balance: (totalPaid - perPersonShare).toFixed(2),
        };
    });
    const deleteAllSettlements = () => {
        if (selectedGroup) {
            dispatch(deleteAllSettlementsRequest(selectedGroup));
            setGeneratedSettlements(false);
        }
    };
    const calculateSettlements = () => {
        if (!selectedGroup) return;
        const creditors: any[] = [];
        const debtors: any[] = [];

        settlement.forEach(member => {
            const balance = parseFloat(member.balance);
            if (balance > 0) {
                creditors.push({ name: member.name, userId: member.key, balance });
            } else if (balance < 0) {
                debtors.push({ name: member.name, userId: member.key, balance: Math.abs(balance) });
            }
        });

        const transactionList: any[] = [];
        let i = 0, j = 0;
        while (i < debtors.length && j < creditors.length) {
            const debtor = debtors[i];
            const creditor = creditors[j];
            const amount = Math.min(debtor.balance, creditor.balance);

            transactionList.push({
                groupId: selectedGroup,
                key: `${debtor.name}-${creditor.name}`,
                from: debtor.name,
                to: creditor.name,
                amount: `${amount.toFixed(2)}`,
                payer: debtor.userId,
                payee: creditor.userId,
            });

            debtor.balance -= amount;
            creditor.balance -= amount;

            if (debtor.balance === 0) i++;
            if (creditor.balance === 0) j++;
        }

        if (transactionList.length > 0) {
            dispatch(addBulkSettlementRequest({ settlementsDetails: { transactionList } }));
            setGeneratedSettlements(true);
        }
    };

    return (
        <Card style={{ padding: "20px", borderRadius: "8px", width: "100%", background: "#ffffff" }}>
            <Title level={3} style={{ color: "#0288D1" }}>Group Settlements</Title>
            <Paragraph style={{ marginBottom: "20px" }}>
                Select a group to generate and view settlement transactions.
            </Paragraph>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Select
                        placeholder="Select a Group"
                        style={{ width: "100%" }}
                        onChange={handleGroupChange}
                        loading={groupsLoading}
                    >
                        {groups.map((group: Group) => (
                            <Option key={group._id} value={group._id}>{group.groupName}</Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Button
                        type="primary"
                        style={{ width: "100%" }}
                        onClick={calculateSettlements}
                        disabled={!selectedGroup || generatedSettlements || settlements.length > 0}
                    >
                        Generate Settlements
                    </Button>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Button
                        type="primary"
                        style={{ width: "100%" }}
                        onClick={deleteAllSettlements}
                        disabled={!selectedGroup || !(settlements.length > 0)}
                    >
                        Delete All
                    </Button>
                </Col>
            </Row>
            {(expensesLoading || settlementsLoading) ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <Spin size="large" />
                    <Paragraph>Loading settlements...</Paragraph>
                </div>
            ) : (
                <>
                    {settlements.length > 0 ? (
                        <Table
                            columns={[
                                { title: "From", dataIndex: "from", key: "from" },
                                { title: "To", dataIndex: "to", key: "to" },
                                { title: "Amount", dataIndex: "amount", key: "amount" },
                                {
                                    title: "Status",
                                    dataIndex: "status",
                                    key: "status",
                                    render: (text) => (
                                        <span style={{ fontWeight: "bold", color: text === "completed" ? "green" : "orange" }}>
                                            {text.charAt(0).toUpperCase() + text.slice(1)}
                                        </span>
                                    )
                                },
                                {
                                    title: "Action",
                                    key: "action",
                                    render: (_, record) => (
                                        <Button
                                            type="link"
                                            onClick={() => handleStatusChange(record.key)}
                                            disabled={record.status === "completed"}
                                        >
                                            Mark as Completed
                                        </Button>
                                    )
                                }
                            ]}
                            dataSource={settlements.map(settlement => ({
                                key: settlement._id,
                                from: settlement.payer?.name || "Unknown",
                                to: settlement.payee?.name || "Unknown",
                                amount: `₹${settlement.amount.toFixed(2)}`,
                                status: settlement.status
                            }))}
                            pagination={false}
                            style={{ marginTop: "20px" }}
                        />
                    ) : (
                        <Empty description="No settlements found" style={{ marginTop: "20px" }} />
                    )}
                </>
            )}
        </Card>
    );
};

export default GroupSettlements;
