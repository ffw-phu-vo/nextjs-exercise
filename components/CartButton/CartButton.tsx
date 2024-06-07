import React from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/reducers/cart";

export interface ICartButton {
  className?: string;
  productId: string;
  title: string;
  price: number;
  children?: JSX.Element | string;
}
const CartButton = ({
  className,
  productId,
  title,
  price,
  children,
}: ICartButton) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        productId,
        title,
        price,
      })
    );
    alert("Successful");
  };

  return (
    <div>
      <button className={className} onClick={handleAddToCart}>
        {children}
      </button>
    </div>
  );
};

export default CartButton;
