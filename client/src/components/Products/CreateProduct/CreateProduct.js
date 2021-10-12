import React, { useContext, useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import Axios from "axios";
import { AppContext } from "../../../context/AppContext";
import FileBase64 from "react-file-base64";
import FormItem from "antd/lib/form/FormItem";
import { Checkbox } from "antd";

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
  const [data, setData] = useState([]);

  const plainOptions = ["Male", "Large", "Programmer"];

  const { setProducts } = useContext(AppContext);
  const onFinish = () => {
    // setData({ ...data, values });
    // data.append("data", values);
    console.log(data);

    Axios.post("http://localhost:3001/add-product", data).then((res) => {
      console.log(res);
      Axios.get("http://localhost:3001/product").then((res) => {
        setProducts(res.data);
      });
    });
  };
  // const normFile = (e) => {
  //   console.log("Upload event:", e.fileList[0]);

  //   if (Array.isArray(e)) {
  //     return e.fileList[0].originFileObj;
  //   }
  //   // data.append("file", e.fileList[0]);
  //   return e && e.fileList;
  // };

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
        {/* <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          // getValueFromEvent={normFile}
        >
          <Upload name="logo" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item> */}
        <FormItem style={{ marginLeft: "50%", marginBottom: "30px" }}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => setData({ ...data, file: base64 })}
          />
        </FormItem>
        <Form.Item
          name={["product", "title"]}
          label="Product Title"
          rules={[{ required: true }]}
        >
          <Input
            onChange={(e) => setData({ ...data, title: e.target.value })}
            // onChange={(e) => setData({ ...data, product: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name={["product", "description"]}
          label="Description"
          rules={[{ required: true }]}
        >
          <Input
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name={["product", "price"]}
          label="Price"
          rules={[{ type: "number", min: 0, max: 1000 }]}
        >
          <InputNumber onChange={(e) => setData({ ...data, price: e })} />
        </Form.Item>
        <Form.Item label="Categotry">
          <Checkbox.Group
            options={plainOptions}
            defaultValue={["Apple"]}
            onChange={(e) => setData({ ...data, catogory: e })}
          />
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
