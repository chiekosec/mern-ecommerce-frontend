import React, { useState, useEffect } from "react";
import "../styles.css";
// eslint-disable-next-line
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Ecommo" description="A place to buy cool Products">
      <div className="text-center">
        <h1 className="text-white">All of shirts</h1>
        <div className="row">
          {products.map((item, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={item} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default Home;
