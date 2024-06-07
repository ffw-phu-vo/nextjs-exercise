import React, { ReactElement } from "react";

export type OnClickType = (type: string, value: any) => void;

export interface ICustomTableColumn {
  id: string;
  label: string;
  sortable?: boolean;
  arrowAsc?: string;
  renderSortable?: (column: any, onClick?: OnClickType) => ReactElement;
  className?: string;
  render: (value: any, onClick?: OnClickType) => ReactElement;
}

export interface ICustomTable {
  columns: ICustomTableColumn[];
  data: any[];
  onClick: OnClickType;
}

const CustomTable = ({ columns, data, onClick }: ICustomTable) => {
  const keyGenData = Math.floor(Math.random() * 100);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th key={`heading-${keyGenData}-${column.id}`}>
                  {column.sortable && column.renderSortable ? (
                    <>{column.renderSortable(column, onClick)}</>
                  ) : (
                    <span>{column.label}</span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={`row-${keyGenData}-${index}`}>
                {columns.map((column) => {
                  return (
                    <td key={`col-${keyGenData}-${column.id}`}>
                      {column.render(item, onClick)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
