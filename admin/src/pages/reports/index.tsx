import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { PaginationConfig } from "antd/es/pagination";
import { columns } from "./config";
import PageLayout from "../../common/components/page-layout";
import { fetchStuffPost, delStuffPost } from "../../utils/api";
import { Operate } from "./oprations";
import "./index.scss";

function EditCell(props: any) {
  const { children, col } = props;
  return (
    <td>
      {col && col.dataIndex === "operation" ? <Operate {...props} /> : children}
    </td>
  );
}

const Projects = (props: any) => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState({ current: 1, total: 0, pageSize: 10 });

  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(0);

  async function getList() {
    const { data } = await fetchStuffPost({
      current: page.current,
      pageSize: page.pageSize,
      report: true
    });
    setTableData(data.list || []);

    if (data.success) {
      setPage({
        current: data.pagination.current,
        total: data.pagination.total,
        pageSize: data.pagination.pageSize
      });
    }
  }

  useEffect(() => {
    getList();
  }, [load]);

  function handleTableChange(p: PaginationConfig) {
    setPage({
      current: p.current || 1,
      total: p.total || 0,
      pageSize: p.pageSize || 10
    });
    setLoad(load + 1);
  }

  async function del(id: string) {
    const { data } = await delStuffPost(id);
    setLoad(load + 1);
    message.success(data.msg);
  }

  const tableColumns = columns.map(col => {
    if (col.dataIndex === "operation") {
      return {
        ...col,
        onCell: (record: any, rowIndex: number) => ({
          col,
          record,
          del,
          rowIndex
        })
      };
    } else {
      return col;
    }
  });
  const components = { body: { cell: EditCell } };
  return (
    <PageLayout title="发布">
      <Table
        components={components}
        className="stuffposts"
        columns={tableColumns}
        dataSource={tableData}
        bordered
        size="middle"
        rowKey="_id"
        pagination={page}
        loading={loading}
        onChange={handleTableChange}
      />
    </PageLayout>
  );
};

export default Projects;
