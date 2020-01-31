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
      <Form.Item label="版">
        {form.getFieldDecorator("version", {
          rules: [{ message: "Type version!" }]
        })(<TextArea rows={4} placeholder="版" />)}
      </Form.Item>
      <Form.Item label="分享">
        {form.getFieldDecorator("share", {
          rules: [{ message: "Type share content!" }]
        })(<TextArea rows={4} placeholder="分享" />)}
      </Form.Item>
      <Form.Item label="关于">
        {form.getFieldDecorator("about", {
          rules: [{ message: "Type about content!" }]
        })(<TextArea rows={4} placeholder="关于" />)}
      </Form.Item>
      <Form.Item label="服务">
        {form.getFieldDecorator("service", {
          rules: [{ message: "Type service content!" }]
        })(<TextArea rows={4} placeholder="服务" />)}
      </Form.Item>
      <Form.Item label="电话">
        {form.getFieldDecorator("phone", {
          rules: [{ required: true, message: "Type admin phone number!" }]
        })(<Input placeholder="电话" />)}
      </Form.Item>
      <div className="btnbox">
        <Button type="primary" htmlType="submit" className="btn">
          添加
        </Button>
      </div>
    </Form>
  );
}

export default Form.create({ name: "addnews" })(AddProfile);
