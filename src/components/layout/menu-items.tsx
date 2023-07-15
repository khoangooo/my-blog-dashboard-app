import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

const MenuItems: MenuProps['items'] = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: (
      <Link to="/">
        Posts
      </Link>
    ),
  },
  // {
  //   key: '2',
  //   icon: <VideoCameraOutlined />,
  //   label: 'nav 2',
  // },
  // {
  //   key: '3',
  //   icon: <UploadOutlined />,
  //   label: 'nav 3',
  // },
]

export default MenuItems;