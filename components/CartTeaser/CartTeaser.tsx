import React from 'react'
import { useSelector } from 'react-redux';
import { formatDollar } from '../../helper/format';
import { RootState } from '../../store';

const CartTeaser = () => {
  const cart = useSelector((state: RootState) => state.cart);
  return (
    <div>{cart.totalProducts} Product(s): {formatDollar(cart.totalPrice)} </div>
  )
}

export default CartTeaser
