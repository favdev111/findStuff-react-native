import React from "react";
import { Divider, Button, Checkbox } from "antd";
export function Operate(props: any) {
  const { record } = props;
  return (
    <div className="btnbox">
      <Button type="link" onClick={() => props.del(record._id)}>
        删除
      </Button>
    </div>
  );
}
