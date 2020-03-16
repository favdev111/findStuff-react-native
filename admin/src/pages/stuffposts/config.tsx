import React from "react";
import { ColumnProps } from "antd/es/table";
import { ORIGINAL_ROOT } from "../../utils/config";
import { Avatar } from "antd";

export const columns: ColumnProps<any>[] = [
  {
    title: "#",
    width: 50,
    key: "tindex",
    render: (text, record, dataIndex) => <span>{dataIndex + 1}</span>
  },
  {
    title: "用户",
    dataIndex: "user.name",
    width: 160,
    key: "user._id",
    render: (text, record, dataIndex) => (
      <a href={record.url} target="_blank">
        {record.user && (
          <Avatar
            size="large"
            src={ORIGINAL_ROOT + "download/photo?path=" + record.user.photo}
          />
        )}
        <br/>
        {text}
      </a>
    )
  },
  {
    title: "标签",
    key: "tag",
    width: 100,
    dataIndex: "tag",
    render: tag => {
      let ret = "其他";
      if (tag === "CatWallet") ret = "钱包";
      else if (tag === "CatKey") ret = "钥匙";
      else if (tag === "CatDigital") ret = "数码";
      else if (tag === "CatOffice") ret = "办公";
      else if (tag === "CatMan") ret = "寻人";
      else if (tag === "CatPet") ret = "宠物";
      else if (tag === "CatBag") ret = "背包";
      return ret;
    }
  },
  {
    title: "地点",
    key: "place",
    width: 100,
    dataIndex: "place"
  },
  {
    title: "地址",
    key: "address",
    width: 100,
    dataIndex: "address"
  },
  {
    title: "说明",
    key: "description",
    width: 100,
    dataIndex: "description"
  },
  {
    title: "费用",
    key: "fee",
    width: 50,
    dataIndex: "fee"
  },
  {
    title: "照片",
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
          {
            <img
              width="100"
              src={ORIGINAL_ROOT + "download/photo?path=" + photo.path}
            />
          }
        </a>
      ))
  },
  {
    title: "编辑",
    key: "operation",
    width: 150,
    dataIndex: "operation"
  }
];
