import React from "react";
import { Divider, Button } from "antd";

export function Operate(props: any) {
  const { editing, rowIndex, record } = props;
  return (
    <div className="btnBox">
      {editing ? (
        <>
          <Button type="link" onClick={() => props.cancel()}>
            Cancel
          </Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => props.save(record)}>
            Save
          </Button>
        </>
      ) : (
        <>
          <Button type="link" onClick={() => props.edit(rowIndex)}>
            Edit
          </Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => props.del(record)}>
            Delete
          </Button>
        </>
      )}
    </div>
  );
}
