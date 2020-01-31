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
    title: "运作",
    key: "content",
    dataIndex: "content",
    editable: true
  },
  {
    title: "运作",
    dataIndex: "operation",
    width: 150
  }
];
