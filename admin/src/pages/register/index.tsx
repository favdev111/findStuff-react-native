import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { RouterProps } from "react-router";
import "./login.scss";
import { register } from "../../utils/api";
function LoginForm(props: FormComponentProps & RouterProps) {
  const { form, history } = props;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const { phone, password, confirm } = values;

        if (password !== confirm) {
          alert("Inut the same password!");
          return;
        }

        const { data, headers } = await register({ phone, password });

        if (data.success) {
          history.push("/");
        } else {
          alert(data.msg);
        }
      }
    });
  };
  const iconColor = { color: "rgba(0,0,0,.25)" };
  return (
    <div id="login">
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {form.getFieldDecorator("phone", {
            rules: [{ required: true, message: "请输入账号!" }]
          })(
            <Input
              prefix={<Icon type="phone" style={iconColor} />}
              placeholder="请输入账号!"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={iconColor} />}
              type="password"
              placeholder="请输入密码!"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator("confirm", {
            rules: [{ required: true, message: "请输入密码!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={iconColor} />}
              type="password"
              placeholder="请输入密码!"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
        <Form.Item>
          <a href="/">Login now!</a>
          <a className="login-form-forgot" href="/forgotpwd">
            Forgot password
          </a>
        </Form.Item>
      </Form>
      <div className="loginMask"></div>
    </div>
  );
}

export default Form.create({ name: "admin_login" })(LoginForm);
