import React from 'react'
import { render as renderAmis } from 'amis'
import amisRequest from '../../utils/amisRequest'

const AmisPage: React.FC = () => {
  return (
    <div>
      {renderAmis(
        {
          title: '登录',
          type: 'form',
          mode: 'inline',
          api: '/users/login',
          body: [
            {
              type: 'input-text',
              name: 'username',
              label: '用户名：'
            },
            {
              type: 'input-password',
              name: 'password',
              label: '密码：'
            }
          ],
          actions: [
            {
              type: 'button',
              label: '登录',
              actionType: 'submit'
            }
          ]
        },
        {
          locale: 'zh-CN'
        },
        {
          fetcher: ({ url, method, data, config, headers }: any) => {
            console.log('请求参数:', { url, method, data, config, headers })
            return amisRequest({
              url,
              method,
              data,
              config,
              headers
            })
              .then(response => {
                console.log('请求成功:', response)
                return response
              })
              .catch(error => {
                console.error('请求失败:', error)
                throw error
              })
          },
          env: {
            loadingConfig: {
              showLoading: true
            }
          },
          theme: 'antd'
        }
      )}
    </div>
  )
}

export default AmisPage
