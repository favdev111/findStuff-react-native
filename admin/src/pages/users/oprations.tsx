import React from "react";
import { Divider, Button, Popconfirm, Checkbox } from "antd";

export function Operate(props: any) {
  const { editing, rowIndex, record } = props;
  return (
    <div className="btnBox">
      {editing ? (
        <>
          <Button type="link" onClick={() => props.cancel()}>
            取消
          </Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => props.save(record)}>
            保存
          </Button>
        </>
      ) : (
        <>
          <Button type="link" onClick={() => props.edit(rowIndex)}>
            修改
          </Button>
          <Divider type="vertical" />
          <Checkbox
            onChange={e => props.block(record._id, e.target.checked)}
            checked={record.block}
          >
            {"禁止"}
          </Checkbox>

          {false && (
            <>
              <Divider type="vertical" />
              <Popconfirm
                placement="topRight"
                title={"Are you sure?"}
                onConfirm={() => props.del(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button>删除</Button>
              </Popconfirm>
            </>
          )}
        </>
      )}
    </div>
  );
}
