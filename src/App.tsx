import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, App as AntdApp, theme } from 'antd'
import router from './router'
import AntdGlobal from './utils/AntdGlobal'
import './App.less'
import './styles/theme.less'
import { useStore } from './store'
// 引入amis主题样式
import 'amis/lib/helper.css'
import 'amis/lib/themes/antd.css'
// import 'amis/lib/themes/dark.css';
import 'amis/sdk/iconfont.css'
function App() {
  const isDark = useStore(state => state.isDark)
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ed6c00'
        },
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
