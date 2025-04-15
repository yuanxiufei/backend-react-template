import { useState, useEffect } from 'react'
import { Button, Form, Input, message, Row, Col } from 'antd'
import styles from './index.module.less'
import api from '@/api'
import { Login } from '@/types/api'
import storage from '@/utils/storage'
import { useStore } from '@/store'
import { encrypt2 } from '@/utils'

export default function LoginFC() {
  const [loading, setLoading] = useState(false)
  const [captchaUrl, setCaptchaUrl] = useState('')
  const [random, setRandom] = useState('') // Renamed from randomStr to random
  const updateToken = useStore(state => state.updateToken)
  const getImageCheck = async () => {
    try {
      const res: any = await api.imgCode()
      const { base64, random } = res.data as any // Parse response if it's a JSON string
      setCaptchaUrl(base64)
      setRandom(random) // Assign randomStr to random
    } catch (error) {
      console.error('Error fetching captcha:', error)
    }
  }
  const refreshCaptcha = async () => {
    getImageCheck() // Re-fetch captcha on click
  }

  useEffect(() => {
    getImageCheck() // Initial captcha fetch when the component mounts
  }, [])
  const onFinish = async (values: Login.params) => {
    const chcekParams = {
      code: String(values.code), // 确保是字符串
      random: String(random) // 即使 random 是 useState 存的，也强转一下
    }
    const resCheck: any = await api.check(chcekParams)
    if (resCheck.code === 0) {
      try {
        setLoading(true)
        const resKey: any = await api.getKey()
        if (resKey.code === 0) {
          const cauthParams = {
            code: String(values.code),
            random: String(random),
            password: encrypt2(resKey.data.key, values.password),
            username: values.username
          }
          const authData: any = await api.login(cauthParams)
          setLoading(false)
          storage.set('token', authData.data)
          updateToken(authData.data)
          message.success('登录成功')
          const params = new URLSearchParams(location.search)
          setTimeout(() => {
            location.href = params.get('callback') || '/welcome'
          })
        } else {
          setLoading(false)
          message.error(resKey.msg || '获取key失败')
        }
      } catch (error) {
        setLoading(false)
      }
    } else {
      message.error(resCheck.msg || '验证码错误')
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='code' rules={[{ required: true, message: '请输入验证码！' }]}>
            <Row gutter={8}>
              <Col span={18}>
                <Input placeholder='验证码' />
              </Col>
              <Col span={6}>
                <img
                  src={captchaUrl}
                  alt='验证码'
                  style={{ width: '100%', height: '30px' }}
                  onClick={refreshCaptcha}
                  title='点击刷新验证码'
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' block htmlType='submit' loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
