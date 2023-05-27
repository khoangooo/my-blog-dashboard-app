import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '@utils/api';
import "./styles.scss"

function Login() {
  const navigate = useNavigate()
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    api.post("/me", {
      body: JSON.stringify({
        username: values.username,
        password: values.password
      })
    }).then(res => console.log(res))
    // navigate("/")
  };

  return (
    <div className='login-form'>
      <Form
        form={form}
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;