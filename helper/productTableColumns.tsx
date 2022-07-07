import Link from "next/link";
import Image from 'next/future/image';
import { ICustomTableColumn, OnClickType } from "../components/CustomTable/CustomTable";
import { formatCustomDate, formatDollar } from "./format";
import { FaCartPlus, FaPencilAlt, FaTrash } from "react-icons/fa";

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
          <FaCartPlus />
        </button>

        <button
          onClick={() => onClick && onClick(OnClickButton.EDIT_PRODUCT, product)}
          className=""
        >
          <FaPencilAlt />
        </button>

        <button
          onClick={() => onClick && onClick(OnClickButton.DELETE_PRODUCT, product)}
          className=""
        >
          <FaTrash />
        </button>

      </>
    ),
  },
];
