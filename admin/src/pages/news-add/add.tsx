import React from "react";
import { Form, Input, Button } from "antd";
import { FormComponentProps } from "antd/es/form";
import "./index.scss";
import { addNews } from "../../utils/api";

interface TagsProps<T = any> extends FormComponentProps<T> {
  history?: any;
}

const { TextArea } = Input;

function AddNews(props: TagsProps) {
  const form = props.form;
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const res = await addNews(values);

        if (res.data.success) {
          props.history.push("/news");
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
      <Form.Item label="content">
        {form.getFieldDecorator("content", {
          rules: [{ message: "Type news content!" }]
        })(<TextArea rows={4} placeholder="news content" />)}
      </Form.Item>
      <div className="btnbox">
        <Button type="primary" htmlType="submit" className="btn">
          add
        </Button>
      </div>
    </Form>
  );
}

export default Form.create({ name: "addnews" })(AddNews);
