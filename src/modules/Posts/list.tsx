import api from '@/utils/api';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Row, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TPost } from 'src/types/post';

const columns: ColumnsType<TPost> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (title) => <a>{title}</a>,
  },
  {
    title: 'Excerpt',
    dataIndex: 'excerpt',
    key: 'excerpt',
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: () => <Space>
      <Button type="link">
        <EditOutlined />
      </Button>
      <Button type="link">
        <DeleteOutlined />
      </Button>
    </Space>
  }
];


function Posts() {
  const [data, setData] = useState<TPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    api.get("/posts").then((res: any) => {
      if (res.status) {
        setData(res.data)
        setLoading(false)
      }
    })
  }, [])

  const handleAddNewPost = () => {
    navigate("/post/add")
  }

  return (
    <>
      <Row justify="end" className='mb-20px'>
        <Button type="primary" onClick={handleAddNewPost}>Add new post</Button>
      </Row>
      <Button onClick={() => api.post("/refresh", {}).then(res => console.log(res))}>test</Button>
      <Table loading={loading} rowKey="_id" columns={columns} dataSource={data} />
    </>
  )
}

export default Posts;