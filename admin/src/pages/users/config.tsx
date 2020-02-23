import React from "react";
import { ColumnProps } from "antd/es/table";
import { ORIGINAL_ROOT } from "../../utils/config";

import { Avatar } from "antd";

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
    title: "头像",
    key: "photo",
    dataIndex: "photo",
    editable: false,
    align: "center",
    render: photo => (
      <div style={{ textAlign: "center" }}>
        <Avatar
          size="large"
          src={ORIGINAL_ROOT + "download/photo?path=" + photo}
        />
      </div>
    )
  },
  {
    title: "电话",
    key: "phone",
    dataIndex: "phone",
    editable: false,
    align: "center",
    render: phone => <div style={{ textAlign: "center" }}>{phone}</div>
  },
  {
    title: "名称",
    key: "name",
    dataIndex: "name",
    editable: true,
    align: "center",
    render: name => <div style={{ textAlign: "center" }}>{name}</div>
  },
  {
    title: "编辑",
    dataIndex: "operation",
    width: 150,
    align: "center"
  }
];
