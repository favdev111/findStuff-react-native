import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { columns } from "./config";
import PageLayout from "../../common/components/page-layout";
import { fetchFoundPost, delFoundPost } from "../../utils/api";
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
  const [refresh, setRefresh] = useState(1);
  const [page, setPage] = useState({ current: 1, total: 0 });
  useEffect(() => {
    (async () => {
      const { data } = await fetchFoundPost({ current_page: page.current });
      setTableData(data || []);
      // setPage({current: data.result.pagination.current_page, total: data.result.pagination.total})
    })();
  }, [refresh]);

  function edit(id: string) {
    props.history.push(`/foundpost-add?id=${id}`);
  }
  async function del(id: string) {
    const { data } = await delFoundPost(id);
    setRefresh(refresh + 1);
    setPage({ current: 1, total: 0 });
    message.success(data.message);
  }

  const tableColumns = columns.map(col => {
    if (col.dataIndex === "operation") {
      return {
        ...col,
        onCell: (record: any, rowIndex: number) => ({
          col,
          record,
          edit,
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
    <PageLayout title="Found Posts">
      <Table
        components={components}
        className="foundposts"
        columns={tableColumns}
        dataSource={tableData}
        bordered
        size="middle"
        rowKey="_id"
        pagination={page}
      />
    </PageLayout>
  );
};

export default Projects;
