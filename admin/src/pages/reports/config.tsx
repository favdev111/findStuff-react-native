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
    title: "用户",
    dataIndex: "user.name",
    width: 80,
    key: "user._id",
    render: (text, record, dataIndex) => (
      <a href={record.url} target="_blank">
        {text}
      </a>
    )
  },
  {
    title: "说明",
    key: "description",
    dataIndex: "description"
  },
  {
    title: "举报投诉列表",
    key: "reports",
    dataIndex: "reports",
    render: reports =>
      reports.map((report: any, i: number) => (
        <div>
          {i + 1}
          {". "}
          {report.report}
        </div>
      ))
  },
  {
    title: "编辑",
    key: "operation",
    width: 30,
    dataIndex: "operation"
  }
];
