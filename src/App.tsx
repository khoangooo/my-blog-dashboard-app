import { ConfigProvider } from 'antd';
import { RouterProvider } from "react-router-dom";
import routes from "@/routes";
import AuthProvider from '@/containers/auth-provider';
import 'antd/dist/reset.css';
import './global-styles.scss';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <AuthProvider>
        <RouterProvider router={routes} fallbackElement={<div></div>} />
      </AuthProvider>
    </ConfigProvider>
  )
}

export default App;
