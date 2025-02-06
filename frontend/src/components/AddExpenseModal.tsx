import React, { useState } from "react";
import { Modal, Form, Input, Select, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { addExpenseRequest } from "../store/actions/expenseActions";

interface AddExpenseModalProps {
  visible: boolean;
  onCancel: () => void;
  groupId: string;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ visible, onCancel, groupId }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [paidBy, setPaidBy] = useState<string | undefined>();
  const [amount, setAmount] = useState<number | undefined>();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const group = useSelector((state: RootState) => state.groups.groups);
  const groupMembers = group?.members || []; // Ensure it's always an array

  const handleAddExpense = () => {
    if (!description || !paidBy || !amount) return; // Prevent invalid submissions

    const expense = { description, paidBy, amount, members: selectedMembers };
    dispatch(addExpenseRequest(expense, groupId));

    onCancel();
    setDescription("");
    setPaidBy(undefined);
    setAmount(undefined);
    setSelectedMembers([]);
  };

  return (
    <Modal title="Add Expense" open={visible} onCancel={onCancel} onOk={handleAddExpense} okText="Add Expense">
      <Form layout="vertical">
        <Form.Item label="Expense Description" required>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>

        <Form.Item label="Paid By" required>
          <Select value={paidBy} onChange={setPaidBy} placeholder="Select a member">
            {groupMembers.map((member) => (
              <Select.Option key={member._id} value={member._id}>
                {member.name} {/* Fixed key reference */}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Amount" required>
          <InputNumber value={amount} onChange={setAmount} min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Select Members to Divide Expense">
          <Select mode="multiple" value={selectedMembers} onChange={setSelectedMembers} placeholder="Select members" style={{ width: "100%" }}>
            {groupMembers.map((member) => (
              <Select.Option key={member._id} value={member._id}>
                {member.name} {/* Fixed key reference */}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
