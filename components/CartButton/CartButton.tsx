import React from 'react'
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/reducers/cart';

export interface ICartButton {
  productId: string;
  title: string;
  price: number;
}
const CartButton = ({productId, title, price}:ICartButton) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        productId,
        title,
        price,
      })
    );
    alert('Successful')
  }

  return (
    <div>
      <button className='btn' onClick={handleAddToCart}>Add to cart</button>
    </div>
  )
}

export default CartButton
