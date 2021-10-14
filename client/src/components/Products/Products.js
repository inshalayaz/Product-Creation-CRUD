import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import CreateProduct from "./CreateProduct/CreateProduct";
import ProductCard from "./ProductCard/ProductCard";
import Axios from "axios";

import { AppContext } from "../../context/AppContext";

const Products = () => {
  const { Title } = Typography;
  const { products, setProducts } = useContext(AppContext);
  const [message, setMessage] = useState("Loading");
  const style = { padding: "8px 0" };

  useEffect(() => {
    Axios.get("http://localhost:3001/product", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log(res);
      if (res.data.auth === false) {
        setMessage("Login To See the Posts");
        // return history.push("/login");
      } else {
        setProducts(res.data);
      }
    });
  }, [setProducts]);
  return (
    <Row>
      <Col span={24}>
        <CreateProduct />
      </Col>
      <Col span={24}>
        <Title level={3} style={{ textAlign: "center" }}>
          Products
        </Title>
      </Col>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}></Row>

      {products ? (
        products.map(({ id, title, description, price, image, catogory }) => (
          <Col className="gutter-row" span={6} key={id}>
            <div style={style}>
              <ProductCard
                id={id}
                title={title}
                description={description}
                price={price}
                Img={image}
                catogory={catogory}
              />
            </div>
          </Col>
        ))
      ) : (
        <Title level={3} style={{ textAlign: "center" }}>
          {message}
        </Title>
      )}
    </Row>
  );
};

export default Products;
