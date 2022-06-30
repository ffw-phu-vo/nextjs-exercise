import React from 'react'
import httpClient from '../../api/httpClient';
import ProductDetail from '../../components/ProductDetail/ProductDetail';

const Product = (props:any) => {

  return (
    <div>
      <ProductDetail {...props.data}/>
    </div>
  )
}

export async function getServerSideProps({params}: {params: any}) {
  const productId = params?.productId;
  let dataPayload:any = [];

  dataPayload = await httpClient.get(`/product/${productId}`);

  if(!dataPayload?.data?.data) {
    return {
      redirect: {
        permanent: false,
        destination: "/product",
      }
    };
  }

  return {
    props: {
      data: dataPayload?.data?.data,
      productId: productId,
    }, // will be passed to the page component as props
  }
}

export default Product
