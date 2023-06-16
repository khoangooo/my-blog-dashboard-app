import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import "./styles.scss"
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import api from '@/utils/api';

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = (values: any) => {
    api.post("/login", {
      body: JSON.stringify(values)
    }).then((res: any) => {
      if (res.status) {
        localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
        const origin = location.state?.from?.pathname || '/';
        navigate(origin)
      }
    })
  };

  if (localStorage.getItem('accessToken')) {
    const origin = location.state?.from?.pathname || '/';
    return <Navigate to={origin} replace />
  }

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