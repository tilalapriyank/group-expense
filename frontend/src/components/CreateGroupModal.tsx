import React, { useState } from "react";
import { Modal, Input, Form } from "antd";
import { useDispatch } from "react-redux";
import { createGroup } from "../store/actions/groupActions";

interface CreateGroupModalProps {
    visible: boolean;
    onCancel: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ visible, onCancel }) => {
    const [groupName, setGroupName] = useState<string>("");
    const dispatch = useDispatch();

    const handleCreateGroup = () => {
        if (groupName.trim()) {
            dispatch(createGroup(groupName));
            setGroupName(""); 
            onCancel();
        }
    };

    return (
        <Modal
            title="Create New Group"
            visible={visible}
            onCancel={() => {
                setGroupName(""); 
                onCancel();
            }}
            onOk={handleCreateGroup}
            okText="Create"
            destroyOnClose={true} 
        >
            <Form>
                <Form.Item label="Group Name">
                    <Input
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateGroupModal;
