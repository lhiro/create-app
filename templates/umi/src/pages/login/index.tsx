import React from 'react';
import { Form, Input, Message } from '@alifd/next';
import styles from './index.less';
import { request, history, useRequest } from 'umi';
import { getCsrfToken } from '../../utils/helper';

const FormItem = Form.Item;
const token = getCsrfToken();

const Page: React.FC<{}> = props => {

  const { run, loading } = useRequest(handleLogin, {
    manual: true,
    onSuccess() {
      Message.success('登录成功');
      localStorage.setItem('auth', JSON.stringify(true));
      history.push('/');
    },
    onError() {
      Message.warning('登录失败')
    }
  })

  function handleLogin(values: any) {
    return request('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': token,
      },
      data: JSON.stringify(values)
    })
  }
  return (
    <div className={styles.login}>
      <Form style={{ width: 400 }} labelTextAlign="left" size="large" labelAlign="inset" >
        <FormItem label="password" required asterisk={false}>
            <Input.Password name="password" trim placeholder="访问密码" />
        </FormItem>
        <FormItem label=" ">
          <Form.Submit loading={loading} htmlType="submit" onClick={(values, errors) => {if(errors) return; run(values)}} style={{ width: '100%' }} type="primary" validate>Submit</Form.Submit>
        </FormItem>
    </Form>
    </div>
  )
}

export default Page;