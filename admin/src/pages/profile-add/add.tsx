import React from "react";
import { Form, Input, Button } from "antd";
import { FormComponentProps } from "antd/es/form";
import "./index.scss";
import { addProfile } from "../../utils/api";

interface TagsProps<T = any> extends FormComponentProps<T> {
  history?: any;
}

const { TextArea } = Input;

function AddProfile(props: TagsProps) {
  const form = props.form;
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const res = await addProfile(values);

        if (res.data.success) {
          props.history.push("/profiles");
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
      className="addnews"
    >
      <Form.Item label="version">
        {form.getFieldDecorator("version", {
          rules: [{ message: "Type version!" }]
        })(<TextArea rows={4} placeholder="version" />)}
      </Form.Item>
      <Form.Item label="share">
        {form.getFieldDecorator("share", {
          rules: [{ message: "Type share content!" }]
        })(<TextArea rows={4} placeholder="share" />)}
      </Form.Item>
      <Form.Item label="about">
        {form.getFieldDecorator("about", {
          rules: [{ message: "Type about content!" }]
        })(<TextArea rows={4} placeholder="about" />)}
      </Form.Item>
      <Form.Item label="service">
        {form.getFieldDecorator("service", {
          rules: [{ message: "Type service content!" }]
        })(<TextArea rows={4} placeholder="service" />)}
      </Form.Item>
      <Form.Item label="phone">
        {form.getFieldDecorator("phone", {
          rules: [{ required: true, message: "Type admin phone number!" }]
        })(<Input placeholder="phone number" />)}
      </Form.Item>
      <div className="btnbox">
        <Button type="primary" htmlType="submit" className="btn">
          add
        </Button>
      </div>
    </Form>
  );
}

export default Form.create({ name: "addnews" })(AddProfile);
