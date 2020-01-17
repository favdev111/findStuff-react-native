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
      <Form.Item label="name">
        {form.getFieldDecorator("name", {
          rules: [{ required: true, message: "Type tag name!" }]
        })(<Input placeholder="tag name" />)}
      </Form.Item>
      <Form.Item label="icon">
        {form.getFieldDecorator("icon", {
          rules: [{ required: true, message: "Type tag icon name!" }]
        })(<Input placeholder="tag icon name" />)}
      </Form.Item>
      <Form.Item label="description">
        {form.getFieldDecorator("description", {
          rules: [{ message: "Type tag description!" }]
        })(<Input placeholder="tag description" />)}
      </Form.Item>
      <div className="btnbox">
        <Button type="primary" htmlType="submit" className="btn">
          add
        </Button>
      </div>
    </Form>
  );
}

export default Form.create({ name: "addtag" })(AddTag);
