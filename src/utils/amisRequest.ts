import request from './request'

interface AmisRequestConfig {
  url: string
  method?: 'get' | 'post' | 'put' | 'delete'
  data?: any
  responseType?: string
  config?: any
  headers?: Record<string, string>
}

const amisRequest = async ({
  url,
  method = 'get',
  data,
  responseType,
  config = {},
  headers
}: AmisRequestConfig) => {
  config = {
    ...config,
    headers,
    responseType
  }

  try {
    let response: any
    switch (method) {
      case 'get':
        response = await request.get(url, data, config)
        break
      case 'post':
        response = await request.post(url, data, config)
        break
      case 'put':
        response = await request.post(url, data, { ...config, method: 'put' })
        break
      case 'delete':
        response = await request.post(url, data, { ...config, method: 'delete' })
        break
      default:
        response = await request.post(url, data, config)
    }

    // 处理不同的响应类型
    if (config.responseType === 'blob') {
      return {
        status: 0,
        msg: '',
        data: response
      }
    }

    // 处理常规响应
    return {
      status: 0,
      msg: '',
      data: response
    }
  } catch (error: any) {
    // 区分网络错误和业务错误
    const status = error.code || error.response?.status || -1
    const message = error.msg || error.response?.data?.msg || error.message || '请求失败'

    return {
      status,
      msg: message,
      data: null
    }
  }
}
export default amisRequest
