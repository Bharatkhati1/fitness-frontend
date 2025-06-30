import React, { useState } from "react";
import { Modal, Input, Form } from "antd";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import { toast } from "react-toastify";

const AddAmountModal = ({ visible, onCancel, selectedId, type }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const res = await adminAxios.post(adminApiRoutes.add_debit(type), {
        ...values,
        userId: selectedId,
      });
      toast.success(res.data.message)
      form.resetFields();
      onCancel();
    } catch (error) {
        console.log(error)
      toast.error("Server Error !")
    }
  };

  const handleCancel = () => {
    form.resetFields();
    
  };

  return (
    <Modal
      title="Enter Amount & Comment"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Submit"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Amount is required" },
            { pattern: /^[0-9]+$/, message: "Amount must be a number" },
          ]}
        >
          <Input placeholder="Enter amount" />
        </Form.Item>

        <Form.Item
          label="Comment"
          name="comment"
          rules={[{ required: true, message: "Comment is required" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter comment" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAmountModal;
