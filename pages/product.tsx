import React from 'react'
import httpClient from '../api/httpClient';
import CartTeaser from '../components/CartTeaser/CartTeaser';

const product = () => {
  return (
    <div className='product-list'>
      <CartTeaser />
    </div>
  )
}

export async function getServerSideProps() {
  const dataPayload = await httpClient.get(`/product`);

  console.log(dataPayload?.data);

  return {
    props: {
      data: dataPayload?.data
    }, // will be passed to the page component as props
  }
}

export default product
