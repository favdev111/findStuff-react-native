import React from "react";
import { ColumnProps } from "antd/es/table";
import { ORIGINAL_ROOT } from "../../utils/config";

import { Avatar, Row, Col } from "antd";
import { Typography } from "antd";

const { Text } = Typography;

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
        <Row gutter={[16, 16]}>
          <Col>
            <Text style={{ marginRight: 10 }}>{report.report}</Text>
            {report.user && (
              <Avatar
                size="small"
                src={ORIGINAL_ROOT + "download/photo?path=" + report.user.photo}
              />
            )}
            {report.user.name}
          </Col>
        </Row>
      ))
  },
  {
    title: "编辑",
    key: "operation",
    width: 30,
    dataIndex: "operation"
  }
];
