import React, { useContext, useEffect } from "react";
import { Row, Col, Typography } from "antd";
import CreateProduct from "./CreateProduct/CreateProduct";
import ProductCard from "./ProductCard/ProductCard";
import Axios from "axios";
import { AppContext } from "../../context/AppContext";
const Products = () => {
  const { Title } = Typography;
  const { products, setProducts } = useContext(AppContext);
  const style = { padding: "8px 0" };

  useEffect(() => {
    Axios.get("http://localhost:3001/product").then((res) => {
      console.log(res.data);
      setProducts(res.data);
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

      {products
        ? products.map(({ id, title, description, price, image, catogory }) => (
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
        : "Loading"}
    </Row>
  );
};

export default Products;
