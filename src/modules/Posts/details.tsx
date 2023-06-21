import RichTextEditor from '@/components/editor';
import api from '@/utils/api';
import { Button, Col, Form, Input, Row } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Details = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    api.post("/post", { body: JSON.stringify(values) }).then(res => {
      console.log(res)
    })
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: "80%" }}
    >
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="excerpt" label="Excerpt" >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="content" label="Content" >
        <RichTextEditor />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset} className="ml-8px">
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Details;