import React from "react";
import { Form, Input, Button } from "antd";
import { FormComponentProps } from "antd/es/form";
import "./index.scss";
import { addContact } from "../../utils/api";

interface TagsProps<T = any> extends FormComponentProps<T> {
  history?: any;
}

function AddContact(props: TagsProps) {
  const form = props.form;
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const res = await addContact(values);

        if (res.data.success) {
          props.history.push("/contacts");
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
      <Form.Item label="市">
        {form.getFieldDecorator("city", {
          rules: [{ required: true, message: "Type contact city!" }]
        })(<Input placeholder="市" />)}
      </Form.Item>
      <Form.Item label="区">
        {form.getFieldDecorator("district", {
          rules: [{ required: true, message: "Type contact district!" }]
        })(<Input placeholder="区" />)}
      </Form.Item>
      <Form.Item label="电话号码">
        {form.getFieldDecorator("number", {
          rules: [{ required: true, message: "Type contact number!" }]
        })(<Input placeholder="电话号码" />)}
      </Form.Item>
      <div className="btnbox">
        <Button type="primary" htmlType="submit" className="btn">
          添加
        </Button>
      </div>
    </Form>
  );
}

export default Form.create({ name: "addtag" })(AddContact);
