import React, { useEffect, useState } from "react";
import { Card, Typography, Table, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { fetchMySettlementsRequest, updateSettlementStatusRequest } from "../store/actions/settlementActions";
import { useAuth } from "../context/AuthContext";
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

const MySettlements: React.FC = () => {
    const dispatch = useDispatch();
    const { settlements, loading } = useSelector((state: RootState) => state.settlements);
    const { user } = useAuth();
    const [pendingPaymentId, setPendingPaymentId] = useState<string | null>(null);
    useEffect(() => {
        dispatch(fetchMySettlementsRequest());

        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get("Status");
        const txnId = urlParams.get("txnId");

        if (status === "SUCCESS" && pendingPaymentId) {
            message.success(`Payment Successful! Transaction ID: ${txnId}`);
            dispatch(updateSettlementStatusRequest(pendingPaymentId, "completed"));
            setPendingPaymentId(null);
        }
    }, [dispatch, pendingPaymentId]);

    const handleStatusChange = (settlementId: string) => {
        dispatch(updateSettlementStatusRequest(settlementId, "completed"));
    };

    const handleUPIPayment = (settlementId: string, amount: number, upiID: string, payeeName: string, groupName: string) => {
        if (!upiID) {
            message.error("Payee UPI ID not available.");
            return;
        }
        const upiUrl = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(payeeName)}&tn=${encodeURIComponent(groupName)}&am=${amount.toFixed(2)}&cu=INR`;
        console.log(`UPI URL: ${upiUrl}`);

        window.location.href = upiUrl;

        setPendingPaymentId(settlementId);
    };
    interface Settlement {
        key: string;
        groupName: string;
        payer: string;
        payee: string;
        payerId: string;
        amount: number;
        status: string;
        upiID: string;
    }
    const columns: ColumnsType<Settlement> = [
        {
            title: "Group",
            dataIndex: "groupName",
            key: "groupName",
            responsive: ["md"]
        },
        {
            title: "Payer",
            dataIndex: "payer",
            key: "payer"
        },
        {
            title: "Payee",
            dataIndex: "payee",
            key: "payee"
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (text: number) => `₹${text.toFixed(2)}`
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <span style={{ fontWeight: "bold", color: status === "completed" ? "green" : "orange" }}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => (
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <Button
                        type="link"
                        onClick={() => handleStatusChange(record.key)}
                        disabled={record.status === "completed"}
                    >
                        Mark as Completed
                    </Button>

                    {record.status === "pending" && user && record.payerId === user.id && (
                        <Button
                            type="primary"
                            onClick={() => handleUPIPayment(record.key, record.amount, record.upiID, record.payee, record.groupName)}
                        >
                            Pay
                        </Button>
                    )}
                </div>
            )
        }
    ];

    const dataSource: Settlement[] = settlements.map(settlement => ({
        key: settlement._id ?? "",
        groupName: (settlement.groupId as any)?.groupName || "Unknown",
        payer: settlement.payer?.name || "Unknown",
        payee: settlement.payee?.name || "Unknown",
        payerId: settlement.payer?._id || "",
        amount: settlement.amount,
        status: settlement.status,
        upiID: settlement.payee?.upiId || ""
    }));

    return (
        <Card style={{ width: "100%", borderRadius: "8px" }}>
            <Title level={3} style={{ color: "#0288D1" }}>My Settlements</Title>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: "max-content" }}
                style={{ marginTop: "20px" }}
            />
        </Card>
    );
};

export default MySettlements;