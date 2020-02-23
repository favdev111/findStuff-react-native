import React from "react";
import { ColumnProps } from "antd/es/table";

interface ColumnPropsEditable<T> extends ColumnProps<T> {
  editable?: boolean;
}

export const columns: Array<ColumnPropsEditable<any>> = [
  {
    title: "#",
    width: 50,
    key: "tindex",
    render: (text, record, dataIndex) => <span>{dataIndex + 1}</span>
  },
  {
    title: "城市",
    key: "city",
    dataIndex: "city",
    editable: true
  },
  {
    title: "小区名",
    key: "district",
    dataIndex: "district",
    editable: true
  },
  {
    title: "电话号",
    key: "number",
    dataIndex: "number",
    editable: true
  },
  {
    title: "编辑",
    dataIndex: "operation",
    width: 150
  }
];
