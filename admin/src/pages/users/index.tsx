import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";
import { columns } from "./config";
import PageLayout from "../../common/components/page-layout";
import { fetchUsers, editUser, delUser } from "../../utils/api";
import { Operate } from "./oprations";
import "./index.scss";

const editPrams: any = {};

function EditCell(props: any) {
  const { editing, children, col, rowIndex, record } = props;
  let res: any = null;
  if (col && col.editable && col.editable) {
    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
      editPrams[col.key] = e.currentTarget.value;
      editPrams.index = rowIndex;
    };
    res = editing ? (
      <Input defaultValue={record[col.key]} onChange={change} />
    ) : (
      <div>{record[col.key]}</div>
    );
  } else {
    res =
      col && col.dataIndex === "operation" ? (
        <Operate {...props} editing={editing} />
      ) : (
        children
      );
  }
  return <td>{res}</td>;
}

const User = () => {
  const [tableData, setTableData] = useState([]);
  const [editingKey, setEditingKey] = useState();
  const [refresh, setRefresh] = useState(1);
  useEffect(() => {
    (async () => {
      const { data } = await fetchUsers();
      setTableData(data || []);
      cancel();
    })();
  }, [refresh]);
  async function save(record: any) {
    if (editPrams.index === null) return;
    let params = { ...record, ...editPrams };

    await editUser(params._id, {
      name: params.name
    });
    params = null;
    setRefresh(refresh + 1);
  }
  function edit(index: number) {
    editPrams.index = null;
    setEditingKey(index);
  }
  function cancel() {
    setEditingKey("");
  }
  async function del(record: any) {
    if (editPrams.index === null) return;
    await delUser(record._id);
    setRefresh(refresh + 1);
  }

  function isEditing(index: number) {
    return index === editingKey;
  }

  const tableColumns = columns.map(col => {
    if (col.editable) {
      return {
        ...col,
        onCell: (record: any, rowIndex: number) => ({
          record,
          col,
          rowIndex,
          editing: isEditing(rowIndex)
        })
      };
    } else if (col.dataIndex === "operation") {
      return {
        ...col,
        onCell: (record: any, rowIndex: number) => ({
          col,
          record,
          save,
          edit,
          cancel,
          del,
          rowIndex,
          editing: isEditing(rowIndex)
        })
      };
    } else {
      return col;
    }
  });
  const components = { body: { cell: EditCell } };
  return (
    <div style={{ flex: 1 }}>
      <PageLayout title="用户">
        <Table
          components={components}
          columns={tableColumns}
          dataSource={tableData}
          bordered
          size="middle"
          style={{ width: "50%" }}
          rowKey="_id"
        />
      </PageLayout>
    </div>
  );
};

export default User;
