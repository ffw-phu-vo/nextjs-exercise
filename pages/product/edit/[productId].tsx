import router from "next/router";
import React, { useState } from "react";
import httpClient from "../../../api/httpClient";
import CustomCurrencyInput from "../../../components/CustomCurrencyInput/CustomCurrencyInput";
import Image from 'next/future/image';
import Link from "next/link";

const ProductEdit = (props: any) => {
  const {productId, data} = props;
  const handleType = productId != 0 ? 'update' : 'create';
  const [titleF, setTitleF] = useState(data?.title ? data.title : '');
  const [priceF, setPriceF] = useState(data?.price ? data.price : '');
  const thumbUrlF = data?.thumb ? data.thumb : '';
  const [thumbF, setThumbF] = useState<any>('');
  const [descriptionF, setDescriptionF] = useState(data?.description ? data.description : '');

  const handleSubmit = (e: any) => {
    // console.log({title, price , thumb, description});
    const formData = new FormData();
    formData.append('title', titleF);
    formData.append('price', priceF);
    if(thumbF) {
      formData.append('thumb', thumbF);
    }
    formData.append('description', descriptionF);

    switch(handleType) {
      case 'create':
        httpClient.post(`/product`, formData)
          .then(res => {
            // console.log('finish', res.data);
            // console.log('finish', res.data.data.productId);
            router.push(`/product/edit/${res.data.data.productId}`)
          });
        break;
      case 'update':
        httpClient.put(`/product/${productId}`, formData)
          .then(res => {
            // console.log('finish', res.data);
            router.push(`/product/${productId}`)
          });
        break;
    }

  };

  const handleDelete = () => {
    httpClient.delete(`/product/${productId}`)
      .then(res => {
        // console.log('finish', res.data);
        router.push(`/product`)
      });
  }

  const onThumbnailChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setThumbF(e.target.files[0]);
    }
  }

  return (
    <div className="product-edit container mx-auto">
      <div className="my-2">
        <label className="block">Product Name:</label>
        <input
          type="text"
          value={titleF}
          placeholder="Product Name"
          onChange={(e) => setTitleF(e.target.value)}
        />
      </div>
      <div className="my-2">
        <label className="block">Product Price:</label>
        <CustomCurrencyInput
          id="product-price-input"
          className=""
          placeholder="Product Price"
          value={priceF}
          onValueChange={(value:number) => setPriceF(value)}
        />
      </div>
      <div className="my-2">
        <label className="block">Product Thumbnail:</label>
        {thumbUrlF &&
          <div className="w-3/12">
             <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${thumbUrlF}`}
                alt={`image ${titleF}`}
              />
          </div>
        }
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => onThumbnailChange(e)}
        />
      </div>
      <div className="my-2">
        <label className="block">Product description:</label>
        <textarea
          rows={4}
          cols={50}
          value={descriptionF}
          onChange={(e) => setDescriptionF(e.target.value)}
        />
      </div>
      <div className="my-4">
        <button
          className="btn mr-2"
          onClick={(e) => handleSubmit(e)}
        >
          {handleType} Product
        </button>
        {handleType == "update" && (
          <button
            className="btn"
            onClick={handleDelete}
          >
            Delete Product
          </button>
        )}
        <Link href="/product">
          <a>Back to list</a>
        </Link>
      </div>
    </div>
  );
};

export async function getServerSideProps({params}: {params: any}) {
  const productId = params?.productId;
  let dataPayload:any = [];

  if (productId != 0) {
    dataPayload = await httpClient.get(`/product/${productId}`);

    if(!dataPayload?.data?.data) {
      return {
        redirect: {
          permanent: false,
          destination: "/product",
        }
      };
    }
  }

  return {
    props: {
      data: dataPayload?.data?.data ? dataPayload?.data?.data : dataPayload,
      productId: productId,
    }, // will be passed to the page component as props
  }
}

export default ProductEdit;
