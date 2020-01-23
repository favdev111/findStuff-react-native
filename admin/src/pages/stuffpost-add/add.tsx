import React from "react";
import { Form, Input, Button, Upload, Icon, message } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { uploadConfig, addStuffPost, editStuffPost } from "../../utils/api";
import { useQuery } from "../../utils/index";

import "./index.scss";
import { userInfo } from "os";
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
};

export interface photo {
  path: string;
}
export interface stuffPost {
  user: string;
  address: string;
  place: string;
  description: string;
  fee?: number;
  photos: Array<photo>;
}

function AddStuffPost(props: any) {
  const form = props.form;
  const query = useQuery();

  // let photoTmp: Array<photo> = [];

  const photoUploadConfig = {
    name: "photo",
    ...uploadConfig(),
    onChange(info: UploadChangeParam) {
      if (info.file.response && info.file.response.photo) {
        message.success("successsssssssssss!");
        console.log(info.file.response.photo);
        form.setFieldsValue({
          photos: [
            ...props.item.photos,
            { path: info.file.response.photo[0].path }
          ]
        });
      }
    }
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.validateFields((err: any, values: any) => {
      console.log(values, "from handlesubmit");

      if (!err) {
        let id = query.get("id");
        id ? edit(values, id) : add(values);
      }
    });
  }

  async function add(values: any) {
    console.log("add values...", values);

    const { data } = await addStuffPost(values);
    if (data.code) {
      message.success(data.message);
      props.history.push("/stuffposts");
    }
  }

  async function edit(values: any, id: string) {
    const { data } = await editStuffPost(id, values);
    if (data.code) {
      message.success(data.message);
      props.history.push("/stuffposts");
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      layout="horizontal"
      {...formItemLayout}
      className="addStuffPost"
    >
      <Form.Item label="tag">
        {form.getFieldDecorator("tag", {
          initialValue: props.item.tag || "",
          rules: [{ required: true, message: "Input the tag!" }]
        })(<Input placeholder="tag" />)}
      </Form.Item>

      <Form.Item label="address">
        {form.getFieldDecorator("address", {
          initialValue: props.item.address || "",
          rules: [{ required: true, message: "Input address!" }]
        })(<Input placeholder="address" />)}
      </Form.Item>

      <Form.Item label="place">
        {form.getFieldDecorator("place", {
          initialValue: props.item.place || "",
          rules: [{ required: true, message: "Input place!" }]
        })(<TextArea rows={4} placeholder="place" />)}
      </Form.Item>
      <Form.Item label="description">
        {form.getFieldDecorator("description", {
          initialValue: props.item.description || "",
          rules: [{ required: true, message: "Input description!" }]
        })(<Input placeholder="description" />)}

        <Upload {...photoUploadConfig}>
          <Button type="link">
            <Icon type="upload" />
            click to upload photo
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item label="photos">
        {form.getFieldDecorator("photos", {
          initialValue: props.item.photos || [],
          rules: [{ required: true, message: "select photos!" }]
        })(<TextArea rows={4} placeholder="photo array" />)}
      </Form.Item>
      <div className="btnbox">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
}

export default Form.create({ name: "addStuffPost" })(AddStuffPost);
