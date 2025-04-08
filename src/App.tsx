import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, App as AntdApp, theme } from 'antd'
import router from './router'
import AntdGlobal from './utils/AntdGlobal'
import './App.less'
import './styles/theme.less'
import { useStore } from './store'
import React, { useEffect } from 'react'
import { setDefaultTheme } from 'amis'
// 引入amis主题样式
import 'amis/lib/helper.css'
// import 'amis/lib/themes/antd.css';
// import 'amis/lib/themes/dark.css';
import 'amis/sdk/iconfont.css'
function App() {
  const isDark = useStore(state => state.isDark)
  useEffect(() => {
    const themeName = isDark ? 'dark' : 'antd'
    const suffixes = ['antd', 'dark']

    // 清除现有主题样式
    const selector = suffixes.map(suffix => `[data-vite-dev-id$="${suffix}"]`).join(', ')

    const existingStyleTags = document.querySelectorAll(selector)
    existingStyleTags.forEach(tag => tag.remove())
    // 动态加载主题样式文件
    import(`@amis-themes/${themeName}.css`)
      .then(module => {
        const style = document.createElement('style')
        style.setAttribute('data-vite-dev-id', `${themeName}`)
        style.textContent = module.default // 将导入的 CSS 内容设置为 style 的内容

        // 将 style 标签添加到 head
        document.head.appendChild(style)
      })
      .catch(error => {
        console.error('加载主题样式失败:', error)
      })
  }, [isDark]) // 依赖于 isDark，确保主题在其变化时更新

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ed6c00'
        },
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
      data-theme={isDark ? 'dark' : 'antd'}
    >
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
