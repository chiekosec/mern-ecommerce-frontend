import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "./helper/CartHelper";
import { createOrder } from "./helper/OrderHelper";
import { getToken, processPayment } from "./helper/paymentHelper";
import DropIn from "braintree-web-drop-in-react";

function Payment({ products, setReload, reload }) {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getTheToken = (userId, token) => {
    getToken(userId, token).then((res) => {
      if (res.error) {
        setInfo({
          ...info,
          error: res.error,
        });
      } else {
        const clientToken = res.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken && products.length > 0 ? (
          <div>
            <h1>Payment Section</h1>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success btn-block" onClick={onPurchase}>
              Pay
            </button>
          </div>
        ) : (
          <h3> Login or enter something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getTheToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    let nonce;
    info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((res) => {
          setInfo({ ...info, success: res.success, loading: false });

          const orderData = {
            products: products,
            transaction_id: res.transaction.id,
            amount: res.transaction.amount,
          };
          createOrder(userId, token, orderData);
          emptyCart(() => {
            console.log("");
          });
          setReload(!reload);
        })
        .catch((err) => {
          setInfo({ loading: false, success: false });
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + product.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Total amount: {getAmount()}$</h3>
      {showDropIn()}
    </div>
  );
}

export default Payment;
