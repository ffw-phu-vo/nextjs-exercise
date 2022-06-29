import router from "next/router";
import React, { useEffect, useState } from "react";
import httpClient from "../../../api/httpClient";
import CustomCurrencyInput from "../../../components/CustomCurrencyInput/CustomCurrencyInput";

const ProductEdit = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({title, price , thumbnail, description});
    httpClient.post("/product", { title, price, description })
      .then(res => {
        const productId = res.data.productId;
        router.push(`/product/edit/${productId}`)
      });
  };

  const onThumbnailChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
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
            Create Product
          </button>
        </div>
      </div>
    </form>
  );
};

export async function getServerSideProps({params}: {params: any}) {
  console.log(params);
  const productId = params?.productId;
  let dataPayload:any = [];

  if (productId) {
    dataPayload = await httpClient.get(`/product?productId=${productId}`);
  }
  console.log(dataPayload.data);

  return {
    props: {
      data: dataPayload?.data
    }, // will be passed to the page component as props
  }
}

export default ProductEdit;
