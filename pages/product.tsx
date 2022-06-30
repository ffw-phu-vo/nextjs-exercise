import Link from 'next/link';
import React from 'react'
import Image from 'next/future/image';
import httpClient from '../api/httpClient';
import CartTeaser from '../components/CartTeaser/CartTeaser';
import { formatCustomDate, formatDollar } from '../helper/format';

const ProductList = (prod: any) => {
  const { data , total , perPage} = prod.data;
  const totalPage = Math.ceil(total / perPage);
  const currentPage = 1;
  return (
    <div className='product-list container mx-auto'>
      <div className='product-list__top m-5 flex flex-wrap'>
        <div className='w-8/12'>
          <h1>Product List</h1>
        </div>
        <div className='w-4/12'>
          <CartTeaser />
          <div>
            <Link href="/product/edit/0">
              <a>Add new product</a>
            </Link>
          </div>
        </div>
      </div>
      <div className='product-list__list m-5'>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          {data && (
            <tbody>
              {data.map((item:any, index:number) => {
                return (
                  <tr key={`table-${index}`}>
                    <td>{index + 1 + (currentPage - 1) * perPage}</td>
                    <td>
                      <div className='w-52'>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.thumb}`}
                          alt={`image ${item.title}`}
                        />
                      </div>
                    </td>
                    <td>{item.title}</td>
                    <td>{formatDollar(item.price)}</td>
                    <td>{formatCustomDate(item.date)}</td>
                    <td>Actions</td>
                  </tr>
                )
              })}

            </tbody>
          )}
        </table>
      </div>
      <div className='product-list__pager m-5'>
        Pager
      </div>
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

export default ProductList
