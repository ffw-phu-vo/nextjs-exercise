import router from 'next/router';
import httpClient from './httpClient';

export interface IProductQuery {
  search: string;
  priceFrom: string;
  priceTo: string;
  orderBy: string;
  isAscending: string;
  page: number,
}

const productApi = {
  filter: async (query:IProductQuery | any): Promise<any> => {
    const result = '?' + new URLSearchParams(query).toString();
    return httpClient.get(`/product${result}`);
  },

  get: async (productId:number): Promise<any> => {
    return httpClient.get(`/product/${productId}`);
  },

  create: (formData: FormData) => {
    httpClient.post(`/product`, formData)
    .then(res => {
      // console.log('finish', res.data);
      // console.log('finish', res.data.data.productId);
      router.push(`/product/edit/${res.data.data.productId}`);
    });
  },

  update: (productId: number,formData: FormData) => {
    httpClient.put(`/product/${productId}`, formData)
      .then(res => {
        // console.log('finish', res.data);
        router.push(`/product/${productId}`)
      });
  },

  delete: (productId:number) => {
    httpClient.delete(`/product/${productId}`)
    .then(res => {
      // console.log('finish', res.data);
      router.push(`/product`)
    });
  }
}

export default productApi;
