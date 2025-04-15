import request from './request'

interface AmisRequestConfig {
  url: string
  method?: 'get' | 'post' | 'put' | 'delete'
  data?: any
  responseType?: string
  config?: any
  headers?: Record<string, string>
}

const amisRequest = async ({ url, method = 'get', data, responseType, config = {}, headers }: AmisRequestConfig) => {
  // 处理 GET 请求的 query 参数
  if (method === 'get' && data) {
    const queryParams = new URLSearchParams(data).toString()
    url += `?${queryParams}`
  }

  config = {
    ...config,
    headers,
    responseType
  }

  try {
    let response: any
    switch (method) {
      case 'get':
        response = await request.get(url, config)
        break
      case 'post':
        response = await request.post(url, data, config)
        break
      case 'put':
        response = await request.put(url, data, config)
        break
      case 'delete':
        response = await request.delete(url, { ...config, data })
        break
      default:
        response = await request.post(url, data, config)
    }

    // 处理不同的响应类型
    if (responseType === 'blob') {
      return {
        status: 0,
        msg: '',
        data: response
      }
    }

    // 处理常规响应，转换为amis期望的格式
    const responseData = response.data || response
    return {
      status: responseData.code === 0 ? 0 : 1,
      msg: responseData.msg || '',
      data: responseData.data || null
    }
  } catch (error: any) {
    // 区分网络错误和业务错误
    const status = error?.code || error?.response?.status || -1
    const message = error?.message || error?.response?.data?.msg || '请求失败'

    return {
      status: status,
      msg: message,
      data: null
    }
  }
}

export default amisRequest
