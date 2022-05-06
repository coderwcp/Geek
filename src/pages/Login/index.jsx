import { Button, Form, Input, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginAction } from "@/store/actions/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./index.scss";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const initialValues = {
    mobile: "13911111111",
    code: "246810",
    isAgree: true,
  };

  const onFinish = async (values) => {
    try {
      await dispatch(loginAction(values));
      console.log(history.location.state);
      history.replace("/home");
      message.success("登录成功");
    } catch (err) {
      message.error(err.response?.data?.message || "登录失败");
    }
  };

  const rules = {
    mobile: [
      {
        required: true,
        message: "手机号码不能为空",
      },
      {
        pattern: /^1[3-9]\d{9}$/,
        message: "手机号码格式错误",
      },
    ],
    code: [
      {
        required: true,
        message: "验证码不能为空",
      },
      {
        pattern: /\d{6}/,
        message: "验证码格式错误",
      },
    ],
  };

  const isAgree = [
    {
      validator(rule, value) {
        return value
          ? Promise.resolve()
          : Promise.reject(new Error("请勾选「用户协议」和「隐私条款」"));
      },
    },
  ];

  return (
    <div className="login">
      <div className="login-container">
        {/* 登录表单 */}
        <Form
          size="large"
          validateTrigger={["onBlur"]}
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item name="mobile" rules={rules.mobile}>
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入手机号码"
            ></Input>
          </Form.Item>
          <Form.Item name="code" rules={rules.code}>
            <Input prefix={<LockOutlined />} placeholder="请输入验证码"></Input>
          </Form.Item>
          <Form.Item name="isAgree" valuePropName="checked" rules={isAgree}>
            <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>
          <Button type="primary" block htmlType="submit">
            登 录
          </Button>
        </Form>
      </div>
    </div>
  );
}
