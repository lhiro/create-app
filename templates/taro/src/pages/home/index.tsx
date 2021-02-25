import React from 'react'
import { View } from '@tarojs/components'
import { AtListItem, AtList, AtButton } from 'taro-ui';
import User from '@/components/user';
import styles from './index.module.less'
import { PageProps } from './index.d';
import NavBar from '@/components/navbar';

const Page: React.FC<PageProps> = (props: PageProps) => {

  return (
    <View className={styles.home}>
      <NavBar className={styles.navbar} title="我的" />
      {/* https://creator-data.oss-cn-shenzhen.aliyuncs.com/image/logo-256.png */}
      <User />

      <View className={styles.banner}>

      </View>
      <AtList
        className={styles.list}
        hasBorder={false}
      >
        <AtListItem
          hasBorder={false}
          title='已认领的账号'
          extraText='即将开放'
        />
        <AtListItem
          hasBorder={false}
          title='收藏的账号'
          extraText='即将开放'
        />
        <AtListItem
          hasBorder={false}
          title='收藏的视频动态'
          extraText='即将开放'
        />
      </AtList>
    </View>
  )
}

export default Page;
