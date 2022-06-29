import React from 'react'

const ProductDetail = () => {
  return (
    <div>[pid]</div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      data: 'test'
    }, // will be passed to the page component as props
  }
}

export default ProductDetail
