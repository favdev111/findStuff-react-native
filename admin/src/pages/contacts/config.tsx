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
    title: "市",
    key: "city",
    dataIndex: "city",
    editable: true
  },
  {
    title: "区",
    key: "district",
    dataIndex: "district",
    editable: true
  },
  {
    title: "电话号码",
    key: "number",
    dataIndex: "number",
    editable: true
  },
  {
    title: "运作",
    dataIndex: "operation",
    width: 150
  }
];
