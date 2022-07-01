import Link from 'next/link';
import React, { useState } from 'react'
import Image from 'next/future/image';
import httpClient from '../api/httpClient';
import CartTeaser from '../components/CartTeaser/CartTeaser';
import { formatCustomDate, formatDollar } from '../helper/format';
import { useRouter } from 'next/router';
import Pager from '../components/Pager/Pager';
import { handleQuery } from '../helper/handleQuery';
import CustomCurrencyInput from '../components/CustomCurrencyInput/CustomCurrencyInput';
import CartButton from '../components/CartButton/CartButton';


const ProductList = (prod: any) => {
  const router = useRouter();
  const { data , total , perPage} = prod.data;
  const query = prod.query;
  const totalPage = Math.ceil(total / perPage);
  const currentPage = prod.currentPage;
  const arrowAsc = query.isAscending == 'true' ? '&#160;&#8593;' : '&#160;&#8595;'

  const handleTest = () => {
    // console.log(prod.query);
    // const query = handleQuery(prod.query, {page: '2'});
    // console.log(query);
    router.replace({
      query: {...prod.query, page: '2'},
    });
  }

  const handleProductQuery = (property:object) => {
    const updateQuery = handleQuery(query, property);
    router.replace({
      query: {...updateQuery},
    });
  }

  return (
    <div className='product-list container mx-auto'>
      <div className='product-list__top m-5 flex flex-wrap'>
        <div className='w-8/12'>
          <h1>Product List</h1>
          <div className='product-list__search flex flex-wrap'>
            <span className='py-2'>Search:</span>
            <input
              type="text"
              value={query.search}
              placeholder="Search Product name"
              onChange={(e) => handleProductQuery({search: e.target.value})}
            />
            <span className='py-2'>Price From:</span>
            <CustomCurrencyInput
              id="product-price-from-input"
              className=""
              placeholder="Product Price From"
              value={query.priceFrom}
              onValueChange={(value:number) => handleProductQuery({priceFrom: value})}
            />
            <span className='py-2'>To:</span>
            <CustomCurrencyInput
              id="product-price-to-input"
              className=""
              placeholder="Product Price To"
              value={query.priceTo}
              onValueChange={(value:number) => handleProductQuery({priceTo: value})}
            />
            <Link href="/product">
              <a className='py-2'>Reset</a>
            </Link>
          </div>
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
              <th>
                <button
                  onClick={()=>handleProductQuery({
                    orderBy: 'title',
                    isAscending: query.isAscending == 'true' ? false : true,
                  })}
                >
                  Name
                  {query.orderBy == 'title' && <span dangerouslySetInnerHTML={{ __html: arrowAsc }} />}
                </button>
              </th>
              <th>
                <button
                  onClick={()=>handleProductQuery({
                    orderBy: 'price',
                    isAscending: query.isAscending == 'true' ? false : true,
                  })}
                >
                  Price
                  {query.orderBy == 'price' && <span dangerouslySetInnerHTML={{ __html: arrowAsc }} />}
                </button>
              </th>
              <th>
                <button
                  onClick={()=>handleProductQuery({
                    orderBy: 'date',
                    isAscending: query.isAscending == 'true' ? false : true,
                  })}
                >
                  Date
                  {query.orderBy == 'date' && <span dangerouslySetInnerHTML={{ __html: arrowAsc }} />}
                </button>
              </th>
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
                    <td>
                      <Link href={`/product/${item.productId}`}>
                        <a>{item.title}</a>
                      </Link>
                    </td>
                    <td>{formatDollar(item.price)}</td>
                    <td>{formatCustomDate(item.date)}</td>
                    <td>
                      <CartButton
                        className='link'
                        productId={item.productId}
                        title={item.title}
                        price={item.price}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                      </CartButton>
                      <Link href={`/product/edit/${item.productId}`}>
                        <a>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </a>
                      </Link>
                    </td>
                  </tr>
                )
              })}

            </tbody>
          )}
        </table>
      </div>
      <div className='product-list__pager m-5'>
        Pager
        <button onClick={handleTest}>test</button>
        <Pager
          currentPage={currentPage}
          totalPage={totalPage}
          onClick={handleProductQuery}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }: {query: any}) {
  if (query
    && Object.keys(query).length === 0
    && Object.getPrototypeOf(query) === Object.prototype
  ) {
    query = {
      search: '',
      priceFrom:'',
      priceTo:'',
      orderBy: '',
      isAscending: 'true',
      page: 1,
    }
  }
  // console.log(query);
  const result = '?' + new URLSearchParams(query).toString();
  const dataPayload = await httpClient.get(`/product${result}`);

  // console.log(dataPayload?.data);

  return {
    props: {
      data: dataPayload?.data,
      query: query,
      currentPage: Number(query.page),
    }, // will be passed to the page component as props
  }
}

export default ProductList
