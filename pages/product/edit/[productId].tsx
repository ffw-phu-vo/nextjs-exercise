import router from "next/router";
import React, { useEffect, useState } from "react";
import httpClient from "../../../api/httpClient";
import CustomCurrencyInput from "../../../components/CustomCurrencyInput/CustomCurrencyInput";

const ProductEdit = (props: any) => {
  const handleType = props.data?.productId ? 'update' : 'create';
  const [title, setTitle] = useState(props.data?.title ? props.data.title : '');
  const [price, setPrice] = useState(props.data?.price ? props.data.price : '');
  const [thumb, setThumb] = useState<any>("");
  const [description, setDescription] = useState(props.data?.description ? props.data.description : '');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log({title, price , thumb, description});

    if (title && price && thumb && description) {
      console.log({thumb, title, price, description});
      // const formData = new FormData();
      // formData.append('title', title);
      // formData.append('price', price);
      // formData.append('thumb', thumb);
      // formData.append('description', description);
      // httpClient.post("/product", formData)
      //   .then(res => {
      //     // console.log('finish', res.data);
      //     const productId = res.data.data.productId;
      //     router.push(`/product/edit/${productId}`)
      //   });
    }
  };

  const onThumbnailChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setThumb(e.target.files[0]);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="product-edit container mx-auto">
        <div className="my-2">
          <label className="block">Product Name:</label>
          <input
            type="text"
            value={title}
            placeholder="Product Name"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-2">
          <label className="block">Product Price:</label>
          <CustomCurrencyInput
            id="product-price-input"
            className=""
            placeholder="Product Price"
            value={price}
            setValue={setPrice}
          />
        </div>
        <div className="my-2">
          <label className="block">Product Thumbnail:</label>
          <input
            type="file"
            onChange={(e) => onThumbnailChange(e)}
          />
        </div>
        <div className="my-2">
          <label className="block">Product description:</label>
          <textarea
            rows={4}
            cols={50}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="my-4">
          <button
            className="btn"
            type="submit"
          >
            {handleType} Product
          </button>
        </div>
      </div>
    </form>
  );
};

export async function getServerSideProps({params}: {params: any}) {
  const productId = params?.productId;
  let dataPayload:any = [];

  if (productId != 0) {
    dataPayload = await httpClient.get(`/product/${productId}`);
  }

  console.log(dataPayload?.data?.data);

  return {
    props: {
      data: dataPayload?.data?.data ? dataPayload?.data?.data : dataPayload
    }, // will be passed to the page component as props
  }
}

export default ProductEdit;
