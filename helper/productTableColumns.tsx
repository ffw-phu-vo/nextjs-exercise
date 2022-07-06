import Link from "next/link";
import Image from 'next/future/image';
import { ICustomTableColumn, OnClickType } from "../components/CustomTable/CustomTable";
import { formatCustomDate, formatDollar } from "./format";

export enum OnClickButton {
  ADD_TO_CART = "add_to_cart",
  EDIT_PRODUCT = "edit_product",
  DELETE_PRODUCT = "delete_product",
  ORDER_BY_TITLE = "order_by_name",
  ORDER_BY_PRICE = "order_by_price",
  ORDER_BY_DATE = "order_by_date",
}

export const ProductTableColumns: ICustomTableColumn[] = [
  {
    id: "product_id",
    label: "Id",
    render: (product: any) => <>{product.productId}</>,
  },
  {
    id: "product_image",
    label: "Image",
    render: (product: any) => (
      <div className="relative w-52">
        <Link href={`/product/${product.productId}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.thumb}`}
            alt={`image ${product.title}`}
          />
        </Link>
      </div>
    ),
  },
  {
    id: "product_title",
    label: "Name",
    render: (product: any) => (
      <p className="font-bold text-lg">
        <Link href={`/product/${product.productId}`}>{product.title}</Link>
      </p>
    ),
    sortable: true,
    renderSortable: (column: any, onClick?: OnClickType) => (
      <>
        <button
          onClick={() => onClick && onClick(OnClickButton.ORDER_BY_TITLE, column.id)}
          className=""
        >
          {column.label}<span dangerouslySetInnerHTML={{ __html: column.arrowAsc }} />
        </button>
      </>
    )
  },
  {
    id: "product_price",
    label: "Price",
    render: (product: any) => <>{formatDollar(product.price)}</>,
    sortable: true,
    renderSortable: (column: any, onClick?: OnClickType) => (
      <>
        <button
          onClick={() => onClick && onClick(OnClickButton.ORDER_BY_PRICE, column.id)}
          className=""
        >
          {column.label}<span dangerouslySetInnerHTML={{ __html: column.arrowAsc }} />
        </button>
      </>
    )
  },
  {
    id: "product_date",
    label: "Updated At",
    render: (product: any) => <>{formatCustomDate(product.date)}</>,
    sortable: true,
    renderSortable: (column: any, onClick?: OnClickType) => (
      <>
        <button
          onClick={() => onClick && onClick(OnClickButton.ORDER_BY_DATE, column.id)}
          className=""
        >
          {column.label}<span dangerouslySetInnerHTML={{ __html: column.arrowAsc }} />
        </button>
      </>
    )
  },
  {
    id: "product_action",
    label: "",
    render: (product: any, onClick?: OnClickType) => (
      <>
        <button
          onClick={() => onClick && onClick(OnClickButton.ADD_TO_CART, product)}
          className=""
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        </button>

        <button
          onClick={() => onClick && onClick(OnClickButton.EDIT_PRODUCT, product)}
          className=""
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>

        <button
          onClick={() => onClick && onClick(OnClickButton.DELETE_PRODUCT, product)}
          className=""
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>

      </>
    ),
  },
];
