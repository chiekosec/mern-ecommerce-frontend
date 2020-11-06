import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import Payment from "./Payment";

function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h1>Products section</h1>
        {products.map((item, index) => {
          return (
            <Card
              key={index}
              product={item}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No products in cart</h3>
          )}
        </div>
        <div className="col-6">
          <Payment products={products} setReload={setReload} reload={reload} />
        </div>
      </div>
    </Base>
  );
}

export default Cart;
