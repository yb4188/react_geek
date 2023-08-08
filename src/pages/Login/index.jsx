import React, { Component } from "react";
import { Card, Button, Checkbox, Form, Input, message } from "antd";
import styles from "./index.module.scss";
import logo from "assets/images/logo.png";

import { userLogin } from "api/user";
import { setToken } from "utils/storage";

export default class Login extends Component {
  state = {
    loading: false,
  };
  //收集用户信息
  login = async (user) => {
    this.setState({
      loading: true,
    });
    try {
      const res = await userLogin(user);
      message.success("登录成功", 1, () => {
        //localStorage.setItem("r_token", res.data.token);
        setToken(res.data.token);
        //此处做个判断
        let { state } = this.props.location;
        console.log(state)
        if (state) {
          this.props.history.push(state.from);
        } else {
          this.props.history.push("/home");
        }
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
      message.error(e.response.data.message);
    }
  };
  render() {
    return (
      <div className={styles["login-container"]}>
        <Card className="login">
          <img src={logo} alt="" className="login-img" />
          {/* 表单 */}
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            initialValues={{
              remember: true,
              mobile: "13911111111",
              code: "246810",
              agree: true,
            }}
            onFinish={this.login}
            autoComplete="true"
          >
            <Form.Item
              label="手机号"
              name="mobile"
              validateTrigger={["onChange", "onBlur"]}
              rules={[
                {
                  required: true,
                  message: "请输入你的手机号",
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: "手机号格式错误",
                },
              ]}
            >
              <Input placeholder="请输入你的手机号" />
            </Form.Item>

            <Form.Item
              label="验证码"
              name="code"
              rules={[
                {
                  required: true,
                  message: "请输入验证码",
                },
                {
                  pattern: /^\d{6}$/,
                  message: "请输入6位验证码",
                },
              ]}
            >
              <Input.Password placeholder="请输入验证码" />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("请阅读并同意[隐私条款]和[用户协议]")
                        ),
                },
              ]}
              name="agree"
              valuePropName="checked"
              wrapperCol={{
                offset: 6,
                span: 18,
              }}
            >
              <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={this.state.loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
