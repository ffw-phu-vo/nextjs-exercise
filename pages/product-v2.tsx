import Link from 'next/link';
import React, { useState } from 'react'
import httpClient from '../api/httpClient';
import CartTeaser from '../components/CartTeaser/CartTeaser';
import { useRouter } from 'next/router';
import Pager from '../components/Pager/Pager';
import { handleQuery } from '../helper/handleQuery';
import CustomCurrencyInput from '../components/CustomCurrencyInput/CustomCurrencyInput';
import CustomTable from '../components/CustomTable/CustomTable';
import { OnClickButton, ProductTableColumns } from '../helper/productTableColumns';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/reducers/cart';
import CustomPopup from '../components/CustomPopup/CustomPopup';
import productApi, { IProductQuery } from '../api/productApi';


const ProductList = (prod: any) => {
  const router = useRouter();
  const { data , total , perPage} = prod.data;
  const dispatch = useDispatch();
  const query = prod.query;
  const totalPage = Math.ceil(total / perPage);
  const currentPage = prod.currentPage;
  const arrowAsc = query.isAscending == 'true' ? '&#160;&#8593;' : '&#160;&#8595;';
  const tableColumns = ProductTableColumns.map(item =>
    item.id === `product_${query.orderBy}`
      ? {
          ...item,
          ...query.isAscending && {arrowAsc: arrowAsc}
        }
      : item
  );

  const handleTest = () => {
    // console.log(prod.query);
    // const query = handleQuery(prod.query, {page: '2'});
    // console.log(query);
    router.replace({
      query: {
        ...prod.query,
        orderBy: 'title',
        isAscending: query.isAscending == 'true' ? false : true,
      },
    });
  }

  const handleDeleteOnProduct = (productId: number) => {
    productApi.delete(productId);
    // httpClient.delete(`/product/${productId}`)
    //   .then(res => {
    //     // console.log('finish', res.data);
    //     // router.push(`/product`)
    //     router.replace(router.asPath)
    //   });
  }

  const handleProductQuery = (property:object) => {
    const updateQuery = handleQuery(query, property);
    router.replace({
      query: {...updateQuery},
    });
  }

  const handleOnClickButton = (type: string, value: any) => {
    console.log(type, value);
    const {productId, title, price} = value;
    switch(type) {
      case OnClickButton.ADD_TO_CART:
        dispatch(
          addProduct({
            productId,
            title,
            price,
          })
        );
        break;
      case OnClickButton.EDIT_PRODUCT:
        router.push(`/product/edit/${productId}`)
        break;
      case OnClickButton.DELETE_PRODUCT:

        break;
      case OnClickButton.ORDER_BY_TITLE:
        handleProductQuery({
          orderBy: 'title',
          isAscending: query.isAscending == 'true' ? false : true,
        });
        break;
      case OnClickButton.ORDER_BY_PRICE:
        handleProductQuery({
          orderBy: 'price',
          isAscending: query.isAscending == 'true' ? false : true,
        })
        break;
        case OnClickButton.ORDER_BY_DATE:
          handleProductQuery({
            orderBy: 'date',
            isAscending: query.isAscending == 'true' ? false : true,
          })
          break;
    }
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
              onValueChange={(value) => handleProductQuery({priceFrom: value})}
            />
            <span className='py-2'>To:</span>
            <CustomCurrencyInput
              id="product-price-to-input"
              className=""
              placeholder="Product Price To"
              value={query.priceTo}
              onValueChange={(value) => handleProductQuery({priceTo: value})}
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
      {data.length > 0 && (
        <>
          <div className='product-list__list m-5'>
            <CustomTable
              columns={tableColumns}
              data={data}
              onClick={handleOnClickButton}
            />
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
        </>
      )}
    </div>
  )
}

export async function getServerSideProps({ query }: {query: IProductQuery | undefined}) {
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
  // const result = '?' + new URLSearchParams(query).toString();
  // const dataPayload = await httpClient.get(`/product${result}`);
  const dataPayload = await productApi.filter(query);

  // console.log(dataPayload?.data);

  return {
    props: {
      data: dataPayload?.data,
      query: query,
      currentPage: query?.page ? Number(query?.page) : 1,
    }, // will be passed to the page component as props
  }
}

export default ProductList
