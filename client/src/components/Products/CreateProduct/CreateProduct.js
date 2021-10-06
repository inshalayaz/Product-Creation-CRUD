import React, { useContext, useEffect, useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import Axios from "axios";
import { AppContext } from "../../../context/AppContext";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const CreateProduct = () => {
  const { products, setProducts } = useContext(AppContext);
  const onFinish = (values) => {
    console.log(values);

    Axios.post("http://localhost:3001/add-product", values.product).then(
      (res) => {
        console.log(res);
        Axios.get("http://localhost:3001/product").then((res) => {
          console.log(res.data);
          setProducts(res.data);
          console.log(products);
        });
      }
    );
  };

  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        className="createProducts"
        style={{ marginTop: "100px" }}
      >
        <Form.Item
          name={["product", "title"]}
          label="Product Title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["product", "description"]}
          label="Description"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["product", "price"]}
          label="Price"
          rules={[{ type: "number", min: 0, max: 1000 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateProduct;
