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

interface Member {
    _id: string;
    name: string;
}

interface Settlement {
    key: string;
    from: string;
    to: string;
    amount: string;
    payer: string;
    payee: string;
    status: string;
}

const GroupSettlements: React.FC = () => {
    const dispatch = useDispatch();
    const { groups, loading: groupsLoading } = useSelector((state: RootState) => state.groups);
    const { expenses, loading: expensesLoading } = useSelector((state: RootState) => state.expenses);
    const { settlements, loading: settlementsLoading } = useSelector((state: RootState) => state.settlements);

    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [generatedSettlements, setGeneratedSettlements] = useState(false);

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
            setGeneratedSettlements(true);
        }
    }, [settlements]);

    const handleGroupChange = (groupId: string) => {
        setSelectedGroup(groupId);
        setGeneratedSettlements(false);
    };

    const handleStatusChange = (settlementId?: string) => {
        if (!settlementId) return;
        dispatch(updateSettlementStatusRequest(settlementId, "completed"));
    };

    const group = groups.find((g) => g._id === selectedGroup);
    const groupName = group?.groupName ?? "Unknown Group"; // ✅ Ensures valid string
    const groupMembers: Member[] = group?.members ?? [];

    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const perPersonShare = groupMembers.length > 0 ? totalExpense / groupMembers.length : 0;

    const settlementData = groupMembers.map((member: Member) => {
        const totalPaid = expenses
            .filter((expense) => expense.paidBy?._id === member._id)
            .reduce((sum, exp) => sum + exp.amount, 0);
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
        const creditors: Settlement[] = [];
        const debtors: Settlement[] = [];

        settlementData.forEach((member) => {
            const balance = parseFloat(member.balance);
            if (balance > 0) {
                creditors.push({ from: member.name, payer: member.key, balance, key: "", amount: "", to: "", payee: "", status: "" });
            } else if (balance < 0) {
                debtors.push({ from: member.name, payer: member.key, balance: Math.abs(balance), key: "", amount: "", to: "", payee: "", status: "" });
            }
        });

        const transactionList: Settlement[] = [];
        let i = 0, j = 0;
        while (i < debtors.length && j < creditors.length) {
            const debtor = debtors[i];
            const creditor = creditors[j];
            const amount = Math.min(debtor.balance, creditor.balance);

            transactionList.push({
                groupId: selectedGroup,
                key: `${debtor.from}-${creditor.from}`,
                from: debtor.from,
                to: creditor.from,
                amount: amount.toFixed(2),
                payer: debtor.payer,
                payee: creditor.payer,
                status: "pending",
            });

            debtor.balance -= amount;
            creditor.balance -= amount;

            if (debtor.balance === 0) i++;
            if (creditor.balance === 0) j++;
        }

        if (transactionList.length > 0) {
            dispatch(addBulkSettlementRequest(transactionList));
            setGeneratedSettlements(true);
        }
    };

    return (
        <Card style={{ padding: "20px", borderRadius: "8px", width: "100%", background: "#ffffff" }}>
            <Title level={3} style={{ color: "#0288D1" }}>{groupName} Settlements</Title>
            <Paragraph>Select a group to generate and view settlement transactions.</Paragraph>
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
                            dataSource={settlements}
                            pagination={false}
                        />
                    ) : (
                        <Empty description="No settlements found" />
                    )}
                </>
            )}
        </Card>
    );
};

export default GroupSettlements;
