import React, { useState } from "react";
import { Modal, Input, Button, Form, message } from "antd";

const EmailRequiredPopup = ({ visible, onClose, onGetRecipe }) => {
  const [email, setEmail] = useState("");

  const handleGetRecipe = () => {
    if (!email) {
      message.error("Please enter your email.");
      return;
    }
    onGetRecipe(email); // Call the passed function
    onClose(); // Close the modal
    setEmail(""); // Reset input
  };

  return (
    <Modal
      title="Get the Recipe via Email"
      open={visible}
      onCancel={() => {
        onClose();
        setEmail("");
      }}
      footer={null}
      centered
    >
      <Form layout="vertical">
        <Form.Item label="Enter your email">
          <Input
            type="email"
            value={email}
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Button type="primary" block onClick={handleGetRecipe}>
          Get to Download
        </Button>
      </Form>
    </Modal>
  );
};

export default EmailRequiredPopup;
