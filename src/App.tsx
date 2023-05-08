import { ConfigProvider } from 'antd';
import { RouterProvider } from "react-router-dom";
import routes from "@routes";
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
      <RouterProvider router={routes} />
    </ConfigProvider>
  )
}

export default App;
