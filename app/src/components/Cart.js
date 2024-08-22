import React from "react";
import "./styles/Cart.module.css";

const Cart = () => {
  const cartItems = [
    { id: 1, name: "Inception" },
    { id: 2, name: "Interstellar" },
  ];

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
