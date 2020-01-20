import React from "react";
import { ColumnProps } from "antd/es/table";
import { ORIGINAL_ROOT } from "../../utils/config";

export const columns: ColumnProps<any>[] = [
  {
    title: "#",
    width: 50,
    key: "tindex",
    render: (text, record, dataIndex) => <span>{dataIndex + 1}</span>
  },
  {
    title: "user",
    dataIndex: "user.name",
    width: 160,
    key: "user._id",
    render: (text, record, dataIndex) => (
      <a href={record.url} target="_blank">
        {text}
      </a>
    )
  },
  {
    title: "tag",
    key: "tag",
    width: 100,
    dataIndex: "tag"
  },
  {
    title: "place",
    key: "place",
    width: 100,
    dataIndex: "place"
  },
  {
    title: "address",
    key: "address",
    width: 100,
    dataIndex: "address"
  },
  {
    title: "description",
    key: "description",
    width: 100,
    dataIndex: "description"
  },
  {
    title: "fee",
    key: "fee",
    width: 50,
    dataIndex: "fee"
  },
  {
    title: "photos",
    key: "photos",
    width: 320,
    dataIndex: "photos",
    render: photos =>
      photos.map((photo: any, i: number) => (
        <a
          key={i}
          href={ORIGINAL_ROOT + "download/photo?path=" + photo.path}
          target="_brank"
          style={{ padding: "10px" }}
        >
          <img
            width="100"
            src={ORIGINAL_ROOT + "download/photo?path=" + photo.path}
          />
        </a>
      ))
  },
  {
    title: "operation",
    key: "operation",
    width: 150,
    dataIndex: "operation"
  }
];
