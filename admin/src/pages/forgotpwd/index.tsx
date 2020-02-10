import React, { useState, useEffect, useRef } from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { RouterProps } from "react-router";
import "./login.scss";
import { resetpass, getOtp } from "../../utils/api";
function LoginForm(props: FormComponentProps & RouterProps) {
  const { form, history } = props;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const { phone, password, confirm, otp } = values;

        console.log("asdfasdfasdfasdfafds");

        if (password !== confirm) {
          alert("Inut the same password!");
          return;
        }
        console.log("tttrtrtrtrtrtrt");
        if (otp === "" || otp === undefined) {
          alert("Input otp code!");
          return;
        }
        console.log("7878787878787");
        const { data, headers } = await resetpass({ phone, password, otp });

        if (data.success) {
          history.push("/");
        } else {
          alert(data.msg);
        }
      }
    });
  };
  const iconColor = { color: "rgba(0,0,0,.25)" };

  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const getOtpCode = async () => {
    const phone = form.getFieldValue("phone");

    if (phone === "") {
      alert("Input phone number!");
      return;
    }

    setLoading(true);
    const { data } = await getOtp({ phone });

    if (data.success) {
    } else {
      alert(data.msg);
    }
    setLoading(false);
  };

  return (
    <div id="login">
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          <Row gutter={8}>
            <Col span={17}>
              {form.getFieldDecorator("phone", {
                rules: [{ required: true, message: "请大人输入账号!" }]
              })(
                <Input
                  prefix={<Icon type="phone" style={iconColor} />}
                  placeholder="请大人输入账号!"
                />
              )}
            </Col>
            <Col span={4}>
              <Button type="primary" loading={loading} onClick={getOtpCode}>
                Get OTP
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator("otp", {
            rules: [{ required: true, message: "请大人输入账号!" }]
          })(
            <Input
              prefix={<Icon type="phone" style={iconColor} />}
              placeholder="OTP code"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator("password", {
            rules: [{ required: true, message: "请大人输入密码!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={iconColor} />}
              type="password"
              placeholder="请大人输入密码!"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator("confirm", {
            rules: [{ required: true, message: "请大人输入密码!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={iconColor} />}
              type="password"
              placeholder="请大人输入密码!"
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
          <a href="/">Login</a>
          <a className="login-form-forgot" href="/register">
            Register
          </a>
        </Form.Item>
      </Form>
      <div className="loginMask"></div>
    </div>
  );
}

export default Form.create({ name: "admin_login" })(LoginForm);
