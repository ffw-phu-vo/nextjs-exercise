import React from 'react'

interface IProductCart {
  productId: string;
  price: number;
}
const ProductCart = ({productId, price}:IProductCart) => {
  const handleAddToCart = () => {
    console.log({productId, price});
  }

  return (
    <div>
      <button className='btn' onClick={handleAddToCart}>Add to cart</button>
    </div>
  )
}

export default ProductCart
