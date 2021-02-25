import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { View, ScrollView, Text, Image } from '@tarojs/components';
import { AtCurtain, AtButton, AtFab } from 'taro-ui';
import Card from '@/components/card';
import serviceImg from '@/assets/images/auth-tip.png';
import Loading from '@/components/loading';
import classnames from 'classnames';
import Taro from '@tarojs/taro';
import NavBar from '@/components/navbar';


interface AuthPicker {
  askLogin?: () => any;
  query:() => any;
  onItemClick?:(item: any) => void;
  list: any[];
  loading?: boolean;
  title?: string;
  type?: string;
  onLeftClick?:() => void;
  visible?: boolean;
  leftIcon?: string;
}

let askTimer: any = null;
const AuthPicker: React.FC<AuthPicker> = props => {
  const [curTitle, setCurTitle] = useState(`授权${props.type}`);
  const [refresher, setRefresher] = useState(false);
  const [curtainVisible, setCurtainVisible] = useState(false);

  function askLogin() {
    const request = async () => {
      const { data, code } = await (props.askLogin ? props.askLogin() : Promise.resolve({code:0, data: null}));
      handleCurtainClose();
      if (code === 200) {
        props.query();
      }
      console.log(code, data);
    }

    askTimer = setInterval(() => {
      request();
    }, 1000)
  }

  function handleContact({ detail }) {
    Taro.showLoading({
      title: '加载中',
      mask: true
    });
    if (detail.errMsg.includes('ok')) {
      askLogin();
    }
  }

  function handleCurtainClose() {
    Taro.hideLoading();
    setCurtainVisible(false);
    clearInterval(askTimer);
  }

  function toDetail(item) {
    if (item.login_status !== 1) {
      setCurTitle('账号过期，需重新授权');
      setCurtainVisible(true);
      return;
    }
    props.onItemClick && props.onItemClick(item);
  }

  async function handlePullFresh() {
    setRefresher(true)
    await props.query();
    setRefresher(false);
  }

  function handleLeftClick() {
    if (props.onLeftClick) {
      props.onLeftClick();
    } else {
      Taro.navigateBack();
    }
  }

  function renderList() {
    const { list } = props;
    return list.map(item => (
      <Card
        onClick={() => toDetail(item)}
        key={item.id}
        className={styles.card}
        avatar={item.avatar}
        title={(
          <Text className={styles.title}>
            {item.nickname}
          </Text>
        )}
        desc={(
          <Text className={styles.desc}>
            {item.login_status === 1 ? `授权成功` : `授权过期`}
          </Text>
        )}
        extra={(
          <View className={styles.extra}>
            <Text className={styles.count}>{item.fans_count}</Text>
            <Text>粉丝数量</Text>
          </View>
        )}
      />
    ))
  }

  const plusClass = classnames({
    [`${styles.card}`]: true,
    [`${styles.plus}`]: true,
  });

  const authPickerClass = classnames({
    [`${styles.authPicker}`]: true,
    [`${styles.active}`]: props.visible
  });

  return (
    <View style={{zIndex: props.visible ? 999 : 99}} className={authPickerClass} catchMove>
      <View className={styles.header}>
        <NavBar 
          leftIcon={props.leftIcon || 'chevron-left'}
          onLeftClick={handleLeftClick}
          className={styles.navbar}
          title={props.title} 
        />
      </View>
      <ScrollView
        className={styles.scrollView}
        scrollY
        scrollWithAnimation
        refresherEnabled
        refresherBackground='#F8F8F8'
        onRefresherRefresh={handlePullFresh}
        refresherTriggered={refresher}
      >
        <View className={styles.main}>
          <Card
            className={plusClass}
            onClick={() => { setCurtainVisible(true); setCurTitle(`授权${props.type}`) }}
            title={(
              <Text className={styles.title}>
                添加授权{props.type}
              </Text>
            )}
            avatar={(
              <AtFab className={styles.fab} size='small'>
                <Text className='at-fab__icon at-icon at-icon-add'></Text>
              </AtFab>
            )}
          />
          <Loading visible={!refresher && props.loading} />
          {renderList()}
        </View>
      </ScrollView>
      <AtCurtain isOpened={curtainVisible} onClose={handleCurtainClose}>
        <View className={styles.curtain}>
          <Text className={styles.title}>{curTitle}</Text>
          <Text className={styles.content}>进入客服消息后，点击右下角图片或回复“{props.type}”，继续添加授权</Text>
          <Image src={serviceImg} />
          <AtButton
            onContact={handleContact}
            type='primary'
            openType='contact'
            showMessageCard
            sendMessagePath='?msg_type=channels'
            sendMessageImg='https://extension-link.oss-cn-beijing.aliyuncs.com/wlscq/image/send-01.png'
          >进入客服消息，回复“{props.type}”</AtButton>
        </View>
      </AtCurtain>
    </View>
  )
}

export default AuthPicker;