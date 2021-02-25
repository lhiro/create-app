import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import NavBar from '@/components/navbar';
import useMenuPosition from '@/hooks/useMenuPosition';
import styles from './index.module.less';
import userIcon from '@/assets/images/user.png';
import changesIcon from '@/assets/images/changes.png';
import Taro from '@tarojs/taro';


interface Props {
  onCenterClick?: () => void;
  avatar?: string;
  nickname?: string;
}

const NavbarWithAvatar: React.FC<Props> = props => {

  const rect = useMenuPosition();

  function handleCenterClick() {
    props.onCenterClick && props.onCenterClick();
  }

  return (
    <NavBar
      onLeftClick={() => {
        Taro.navigateBack();
      }}
      leftIcon='chevron-left'
      className={styles.navbar}
      title={(
        <View className={styles.member} onClick={handleCenterClick}>
          <Image style={{ width: rect?.height - 2, height: rect?.height - 2 }} className={styles.avatar} src={props.avatar ? props.avatar : userIcon} />
          <Text className={styles.title}>{props.nickname || '选择账号'}</Text>
          <Image style={{ width: rect?.height / 2, height: rect?.height / 2, marginLeft: 4 }} src={changesIcon} />
        </View>
      )}
    />
  )
}

export default NavbarWithAvatar;