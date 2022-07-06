import React, { ReactElement } from 'react'

export type OnClickType = (type: string, value: any) => void;

export interface ICustomTableColumn {
  id: string;
  label: string;
  sortable?: boolean;
  arrowAsc?:string;
  renderSortable?: (
    column: any,
    onClick?: OnClickType,
  ) => ReactElement;
  className?: string;
  render: (
    value: any,
    onClick?: OnClickType
  ) => ReactElement;
}

export interface ICustomTable {
  columns: ICustomTableColumn[];
  data: any[];
  onClick: OnClickType;
}

const CustomTable = ({columns, data, onClick}:ICustomTable) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th key={`heading_${column.id}`}>
                  {(column.sortable && column.renderSortable) ? (
                    <>{column.renderSortable(column, onClick)}</>
                  ) : (
                    <span>{column.label}</span>
                  )}

                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item,index) => {
            return (
              <tr key={`row_${index}`}>
                {columns.map((column) => {
                  return (
                    <td key={`col_${column.id}`}>
                       {column.render(item, onClick)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CustomTable
