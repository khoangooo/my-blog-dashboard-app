import { ConfigProvider } from 'antd';
import AppLayout from '@components/layout';
import 'antd/dist/reset.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <AppLayout />
    </ConfigProvider>
  )
}

export default App;
