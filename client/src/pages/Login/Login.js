import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Axios from "axios";
import "./Styles.css";
const Login = () => {
  Axios.defaults.withCredentials = true;
  const [loginStatus, setLoginStatus] = useState();

  const onFinish = (values) => {
    // const data = new FormData(values);
    Axios.post("http://localhost:3001/login", values, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    }).then((response) => {
      // console.log(response.data.rows[0].username);
      if (response.data.message) {
        setLoginStatus(response.data.message);
        toast.error(`${response.data.message}`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setLoginStatus(response.data.rows[0].username);
        toast.success("Logged In Successfully!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((res) => {
      if (res.data.loggedIn === true) setLoginStatus(res.data.user[0].username);
    });
    // eslint-disable-next-line
  }, []);

  const { Title } = Typography;
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Title level={2}> Login Form </Title>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

        {/* <a className="login-form-forgot" href="#">
        Forgot password
      </a> */}
        {/* </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          {/* Or <a href="#">register now!</a> */}
        </Form.Item>
        {loginStatus}
      </Form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Login;
