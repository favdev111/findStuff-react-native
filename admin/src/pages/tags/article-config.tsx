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
    title: "name",
    dataIndex: "name",
    width: 400,
    key: "name",
    editable: true
  },
  {
    title: "icon",
    dataIndex: "icon",
    width: 400,
    key: "icon",
    editable: true
  },
  {
    title: "description",
    key: "description",
    dataIndex: "description",
    editable: true
  },
  {
    title: "编辑",
    dataIndex: "operation",
    width: 150
  }
];
