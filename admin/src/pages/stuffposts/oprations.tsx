import React from "react";
import { Divider, Button, Checkbox } from "antd";
export function Operate(props: any) {
  const { record } = props;
  return (
    <div className="btnbox">
      <Checkbox
        onChange={e => props.ads(record._id, e.target.checked)}
        checked={record.ads}
      >
        {"ads"}
      </Checkbox>

      <Divider type="vertical" />
      <Button type="link" onClick={() => props.del(record._id)}>
        删除
      </Button>
    </div>
  );
}
