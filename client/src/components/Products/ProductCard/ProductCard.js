import React, { useContext } from "react";
import { Button, Card, Image, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Tag } from "antd";

import Axios from "axios";
import { AppContext } from "../../../context/AppContext";

const ProductCard = ({ id, title, description, price, Img, catogory }) => {
  const { Title } = Typography;
  const { products, setProducts } = useContext(AppContext);

  const handleClick = () => {
    window.confirm("Are you sure you want to delete");
    Axios.delete(`http://localhost:3001/delete-product/${id}`).then((res) => {
      Axios.get("http://localhost:3001/product").then((res) => {
        setProducts(res.data);
        console.log(products);
      });
    });
    console.log(id);
  };

  return (
    <>
      <Card style={{ width: 300 }} hoverable>
        <Image width={200} src={Img} />
        <Title level={2}>{title}</Title>
        <Title level={4}> {description} </Title>
        <Title level={5}>${price}</Title>
        {catogory !== null ? (
          catogory.map((c) => <Tag>{c}</Tag>)
        ) : (
          <Tag>uncategorized</Tag>
        )}
        <Button
          size={"large"}
          style={{ width: "100%", marginTop: "30px" }}
          onClick={handleClick}
        >
          <DeleteOutlined style={{ fontSize: "16px", color: "red" }} />
        </Button>
      </Card>
    </>
  );
};

export default ProductCard;
