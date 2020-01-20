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
    title: "city",
    key: "city",
    dataIndex: "city",
    editable: true
  },
  {
    title: "district",
    key: "district",
    dataIndex: "district",
    editable: true
  },
  {
    title: "number",
    key: "number",
    dataIndex: "number",
    editable: true
  },
  {
    title: "operation",
    dataIndex: "operation",
    width: 150
  }
];
