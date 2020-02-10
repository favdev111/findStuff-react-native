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
    title: "版",
    key: "version",
    dataIndex: "version",
    editable: true
  },
  {
    title: "分享",
    key: "share",
    dataIndex: "share",
    editable: true
  },
  {
    title: "关于",
    key: "about",
    dataIndex: "about",
    editable: true
  },
  {
    title: "服务",
    key: "service",
    dataIndex: "service",
    editable: true
  },
  {
    title: "电话",
    key: "phone",
    dataIndex: "phone",
    editable: true
  },
  {
    title: "编辑",
    dataIndex: "operation",
    width: 150
  }
];
