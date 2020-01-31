import React from "react";
import { Form, Input, Button } from "antd";
import { FormComponentProps } from "antd/es/form";
import "./index.scss";
import { addNotification } from "../../utils/api";

const { TextArea } = Input;

interface TagsProps<T = any> extends FormComponentProps<T> {
  history?: any;
}

function AddNotification(props: TagsProps) {
  const form = props.form;
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const res = await addNotification(values);

        if (res.data.success) {
          props.history.push("/notifications");
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
      className="addnotification"
    >
      <Form.Item label="内容">
        {form.getFieldDecorator("content", {
          rules: [{ message: "Type notification content!" }]
        })(<TextArea rows={4} placeholder="内容" />)}
      </Form.Item>

      <div className="btnbox">
        <Button type="primary" htmlType="submit" className="btn">
          添加
        </Button>
      </div>
    </Form>
  );
}

export default Form.create({ name: "addnotification" })(AddNotification);
