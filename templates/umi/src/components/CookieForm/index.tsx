import React, { useState, useEffect } from 'react'
import styles from './index.less'
import { Form, Input, Grid, List, Balloon, Field, Button, Dialog, Tag } from '@alifd/next';
import { useRequest } from 'umi';

const { Row, Col } = Grid;
const { Tooltip } = Balloon;

const FormItem = Form.Item;

interface CookieItem {
  id: string;
  createdAt: number;
  cookie: string;
  name: string;
  expired: boolean;
}
interface Props {
  queryHomeData: () => Promise<any>;
  createCookie: (values: any) => Promise<any>;
  deleteCookie: (id: string) => Promise<any>;
  loginSuccess?: (cookie: string) => Promise<any>;
  askLogin?: (cookie: string) => Promise<any>;
  handleScan?: () => Promise<any>;
  dataSchema: {
    key: 'mp' | 'channels',
  };
  actions?: React.ReactNode;
  onHomeData?: (data:any) => void;
}

let askTimer: any = null;

const CookieForm = (props: Props): JSX.Element => {
  const field = Field.useField();
  const [ cookies, setCookies ] = useState<CookieItem[]>([])
  const [ scaned, setScaned ] = useState(false);
  const [ qrcode, setQrcode ] = useState('');

  /** 获取首页数据 */
  useRequest(props.queryHomeData, {
    onSuccess(data: any) {
      setCookies(data.cookies[props.dataSchema.key]);
      props.onHomeData && props.onHomeData(data);
    }
  });

  /** 新建cookie */
  const { loading: createLoading, run: runCraete } = useRequest(handleCreateCookie, {
    manual: true,
    onSuccess(data: any) {
      setCookies((old: CookieItem[]) => ([
        ...old,
        data
      ]));
      setEditData(undefined);
      field.reset();
    }
  })

  /** 获取二维码 */
  const { loading: scanLoading, run: runScan } = useRequest(handleScan, {
    manual: true,
    onSuccess(data: any) {
      setQrcode(data.qrcode);
      askTimer = setInterval(() => {
        askLogin(data.cookie);
      }, 1000)
    }
  });

  /** 登录成功 */
  const { loading: qrcodeLoading, run: runLoginSuccess } = useRequest(loginSuccess, {
    manual: true,
    onSuccess(data: any) {
      setCookies((old: CookieItem[]) => ([
        ...old,
        data
      ]));
      setQrcode('');
      setScaned(false);
    }
  });

  const { run: runDelete, params } = useRequest(deleteCookie, {
    manual: true,
    onSuccess() {
      setCookies(old => old.filter(item => item.id !== params[0]));
    }
  })

  /** componentWillUnmount */
  useEffect(() => {
    return () => {
      clearInterval(askTimer);
    }
  }, [])

  const [ editData, setEditData ] = useState<CookieItem>();
  useEffect(() => {
    field.reset();
    if (editData) {
      const { expired, ...params } = editData;
      field.setValues({
        ...params
      })
    }
  }, [editData]);

  function handleSubmit(values: any, error: any) {
    if (error) return;
    runCraete(values);
  }
  function handleEdit(item: CookieItem) {
    if (editData?.id !== item.id) {
      setEditData(item);
    }
  }
  async function handleCreateCookie(values: any) {
    if (!props.createCookie) return;
    return props.createCookie(values);
  }

  async function deleteCookie(id: string) {
    if (!props.deleteCookie) return;
    return props.deleteCookie(id);
  }
 
  async function handleRemove(id: string) {
    Dialog.confirm({
      title: 'Confirm',
      content: 'Do you confirm deleting this content',
      async onOk() {
        runDelete(id);
      }
    })
  }

  async function loginSuccess(cookie: string) {
    if (!props.loginSuccess) return;
    return props.loginSuccess(cookie);
  }

  async function askLogin(cookie: string) {
    if (!props.askLogin) return;
    const { success, data } = await props.askLogin(cookie)
    if (success && data.base_resp.ret === 0) {
      if (data.status === 4) {
        setScaned(true);
      }
      if (data.status === 1) {
        runLoginSuccess(cookie);
        clearInterval(askTimer);
      }
    }
  }

  async function handleScan() {
    if (!props.handleScan) return;
    return props.handleScan();
  }

  return (
    <div className={styles.cookie}>
      <Row gutter={20} wrap={true}>
        <Col xxs={24} xs={24} m={16}>
          <Form field={field}>
            <Row gutter={4}>
              <Col>
                <FormItem required labelAlign="top" label="name:">
                  <Input name="name" placeholder="name" />
                </FormItem>
              </Col>
              <Col>
                <FormItem labelAlign="top" label="token:">
                  <Input name="token" placeholder="token" />
                </FormItem>
              </Col>
            </Row>
            <FormItem required labelAlign="top" label="cookie:">
              <Input.TextArea rows={15} name="cookie" placeholder="cookie" />
            </FormItem>
            <FormItem label=" ">
              <Form.Submit loading={createLoading} validate onClick={handleSubmit}>Save</Form.Submit>
              {props.handleScan && (
                <Button loading={scanLoading} onClick={() => runScan()} style={{marginLeft: 10}}>扫码添加</Button>
              )}
            </FormItem>
          </Form>
          {props.actions}
        </Col>
        <Col xxs={24} xs={24} m={8}>
          <List
            className={styles['cookie-list']}
            dataSource={cookies}
            header="Cookie list"
            size="small"
            renderItem={(item: CookieItem, k: number) => (
              <List.Item
                key={item.id}
                title={(
                  <Tooltip 
                    trigger={(
                      <h2 onClick={() => handleEdit(item)} style={{cursor: 'pointer', userSelect: 'none'}}>
                        {item.name}
                        {item.expired && (
                          <Tag color="red" size="small" style={{marginLeft: 10}}>已过期</Tag>
                        )}
                      </h2>)} 
                    align="r"
                  >
                    <span>点击复用</span>
                  </Tooltip>
                )}  
                extra={(
                  <div className={styles.action}>
                    <span onClick={() => handleRemove(item.id)}>删除</span>
                  </div>
                )}
              >
                {(new Date(item.createdAt)).toLocaleString()}
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row>
      </Row>
      <Dialog 
        visible={Boolean(qrcode)}
        onClose={() => {
          setQrcode('');
          setScaned(false);
          clearInterval(askTimer);
        }}
        align="cc tc"
        footer={false}
      >
        <div className={styles.qrcode}>
          {!qrcodeLoading && scaned && (
            <div className={styles.cover}>
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M18 9.111C18 13.971 13.97 18 8.889 18 4.029 18 0 13.97 0 9.111 0 4.03 4.03 0 8.889 0 13.97 0 18 4.03 18 9.111zM4.788 9.79l2.876 2.976c.041.043.109.047.15.007l6.327-6.227a.196.196 0 00-.006-.275l-.236-.233a.221.221 0 00-.291-.017l-5.792 4.825c-.037.032-.114.034-.161-.002L5.329 9.06c-.09-.068-.207-.043-.274.048l-.28.38a.234.234 0 00.013.3z" fill="#09BB07" fillRule="evenodd"></path></svg>
              <span style={{marginLeft: 10}}>你已成功扫码</span>
            </div>
          )}
          {qrcodeLoading && (
            <div className={styles.cover}>
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M18 9.111C18 13.971 13.97 18 8.889 18 4.029 18 0 13.97 0 9.111 0 4.03 4.03 0 8.889 0 13.97 0 18 4.03 18 9.111zM4.788 9.79l2.876 2.976c.041.043.109.047.15.007l6.327-6.227a.196.196 0 00-.006-.275l-.236-.233a.221.221 0 00-.291-.017l-5.792 4.825c-.037.032-.114.034-.161-.002L5.329 9.06c-.09-.068-.207-.043-.274.048l-.28.38a.234.234 0 00.013.3z" fill="#09BB07" fillRule="evenodd"></path></svg>
              <span style={{marginLeft: 10}}>正在登录中...</span>
            </div>
          )}
          {qrcode && <img style={{width: 320}} src={`data:image/png;base64,${qrcode}`}></img>}
        </div>
      </Dialog>
    </div>
  )
}



export default CookieForm
