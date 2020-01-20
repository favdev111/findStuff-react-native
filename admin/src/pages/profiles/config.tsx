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
    title: "version",
    key: "version",
    dataIndex: "version",
    editable: true
  },
  {
    title: "share",
    key: "share",
    dataIndex: "share",
    editable: true
  },
  {
    title: "about",
    key: "about",
    dataIndex: "about",
    editable: true
  },
  {
    title: "service",
    key: "service",
    dataIndex: "service",
    editable: true
  },
  {
    title: "phone",
    key: "phone",
    dataIndex: "phone",
    editable: true
  },
  {
    title: "operation",
    dataIndex: "operation",
    width: 150
  }
];
