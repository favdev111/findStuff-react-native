import React from "react";
import { Form, Input, Button } from "antd";
import { FormComponentProps } from "antd/es/form";
import "./index.scss";
import { addUser } from "../../utils/api";

interface TagsProps<T = any> extends FormComponentProps<T> {
  history?: any;
}

const { TextArea } = Input;

function AddUser(props: TagsProps) {
  const form = props.form;
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const res = await addUser(values);

        if (res.data.success) {
          props.history.push("/users");
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
      <Form.Item label="电话">
        {form.getFieldDecorator("phone", {
          rules: [{ required: true, message: "Type phone number!" }]
        })(<Input placeholder="电话" />)}
      </Form.Item>
      <Form.Item label="名称">
        {form.getFieldDecorator("name", {
          rules: [{ message: "Type name!" }]
        })(<TextArea rows={4} placeholder="名称" />)}
      </Form.Item>
      <div className="btnbox">
        <Button type="primary" htmlType="submit" className="btn">
          添加
        </Button>
      </div>
    </Form>
  );
}

export default Form.create({ name: "addusers" })(AddUser);
