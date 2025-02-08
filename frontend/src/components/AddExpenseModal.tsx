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

interface Member {
  _id: string;
  name: string;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ visible, onCancel, groupId }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState<string>("");
  const [paidBy, setPaidBy] = useState<string | undefined>();
  const [amount, setAmount] = useState<number | undefined>();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const groups = useSelector((state: RootState) => state.groups.groups);
  const group = groups.find((g) => g._id === groupId);
  const groupMembers: Member[] = group?.members ?? [];

  const handleAddExpense = () => {
    if (!description || !paidBy || !amount || selectedMembers.length === 0) return;

    dispatch(addExpenseRequest({ description, paidBy, amount, members: selectedMembers }, groupId));

    // Reset form fields after submission
    setDescription("");
    setPaidBy(undefined);
    setAmount(undefined);
    setSelectedMembers([]);
    onCancel();
  };

  return (
    <Modal
      title="Add Expense"
      open={visible}
      onCancel={onCancel}
      onOk={handleAddExpense}
      okText="Add Expense"
    >
      <Form layout="vertical">
        {/* Expense Description */}
        <Form.Item label="Expense Description" required>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>

        {/* Paid By */}
        <Form.Item label="Paid By" required>
          <Select value={paidBy} onChange={setPaidBy} placeholder="Select a member">
            {groupMembers.map((member) => (
              <Select.Option key={member._id} value={member._id}>
                {member.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Amount */}
        <Form.Item label="Amount" required>
          <InputNumber
            value={amount}
            onChange={(value) => setAmount(value ?? undefined)}
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* Select Members */}
        <Form.Item label="Select Members to Divide Expense" required>
          <Select
            mode="multiple"
            value={selectedMembers}
            onChange={setSelectedMembers}
            placeholder="Select members"
            style={{ width: "100%" }}
          >
            {groupMembers.map((member) => (
              <Select.Option key={member._id} value={member._id}>
                {member.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
