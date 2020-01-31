import React from "react";
import { Form, Input, Button } from "antd";
import { FormComponentProps } from "antd/es/form";
import "./index.scss";
import { addTag } from "../../utils/api";

interface TagsProps<T = any> extends FormComponentProps<T> {
  history?: any;
}

function AddTag(props: TagsProps) {
  const form = props.form;
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const res = await addTag(values);

        if (res.data.success) {
          props.history.push("/tags");
        }
      }
    });
  }
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };
  return (
    <Form
      onSubmit={handleSubmit}
      layout="horizontal"
      {...formItemLayout}
      className="addtag"
    >
      <Form.Item label="名称">
        {form.getFieldDecorator("name", {
          rules: [{ required: true, message: "Type tag name!" }]
        })(<Input placeholder="名称" />)}
      </Form.Item>
      <Form.Item label="图标">
        {form.getFieldDecorator("icon", {
          rules: [{ required: true, message: "Type tag icon name!" }]
        })(<Input placeholder="图标" />)}
      </Form.Item>
      <Form.Item label="描述">
        {form.getFieldDecorator("description", {
          rules: [{ message: "Type tag description!" }]
        })(<Input placeholder="描述" />)}
      </Form.Item>
      <div className="btnbox">
        <Button type="primary" htmlType="submit" className="btn">
          添加
        </Button>
      </div>
    </Form>
  );
}

export default Form.create({ name: "addtag" })(AddTag);
