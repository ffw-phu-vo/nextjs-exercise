import React from 'react'
import httpClient from '../api/httpClient';

const product = () => {
  return (
    <div>product</div>
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
