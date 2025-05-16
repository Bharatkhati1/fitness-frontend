import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { GATEWAY_URL } from "../../utils/constants.jsx";

const ForgotPasswordForm = () => {
  const onForgotPasswordFormSubmit = async ({ username }) => {
    try {
      const res = await axios.get(`${GATEWAY_URL}/sign-up/check-username/${username}`, {
        withCredentials: true,
      });
      message.success(res.data.message);
    } catch (error) {
      if (error.response?.status === 400) {
        message.error(error.response.data.message);
      } else {
        message.error("Internal server error. Please try again later.");
      }
    }
  };

  return (
    <div className="d-flex flex-column h-100 p-3">
      <div className="row justify-content-center h-100">
        <div className="col-lg-6 d-flex flex-column justify-content-center">
          <div className="auth-logo mb-4">
            <img src="assets/images/logo-dark.png" height="24" alt="logo" />
          </div>

          <h2 className="fw-bold fs-24">Reset Password</h2>
          <p className="text-muted mb-4">
            Enter your email address and we'll send you an email to reset your password.
          </p>

          <Form layout="vertical" onFinish={onForgotPasswordFormSubmit}>
            <Form.Item
              name="username"
              label="Email"
              rules={[{ required: true, type: "email", message: "Enter a valid email" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Reset Password
              </Button>
            </Form.Item>
          </Form>

          <p className="mt-5 text-danger text-center">
            Back to <Link to="/login" className="fw-bold">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
