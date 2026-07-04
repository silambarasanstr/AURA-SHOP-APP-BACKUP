import React from "react";
import WishlistContainer from "../containers/WishlistContainer";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { addToCart } = useCart();

  return <WishlistContainer onAddToCart={addToCart} />;
};

export default Wishlist;
