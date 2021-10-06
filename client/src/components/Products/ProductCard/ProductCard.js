import React from "react";
import { Button, Card, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Axios from "axios";

const ProductCard = ({ id, title, description, price }) => {
  const { Title } = Typography;

  const handleClick = () => {
    console.log(id);
  };

  return (
    <>
      <Card style={{ width: 300 }} hoverable>
        <Title level={2}>{title}</Title>
        <Title level={4}> {description} </Title>
        <Title level={5}>${price}</Title>
        <Button size={"large"} style={{ width: "100%" }} onClick={handleClick}>
          <DeleteOutlined style={{ fontSize: "16px", color: "red" }} />
        </Button>
      </Card>
    </>
  );
};

export default ProductCard;
