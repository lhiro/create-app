import React from 'react';
import Card from '../card';
import { OpenData, Text } from '@tarojs/components';
import styles from './index.module.less';


interface UserProps {
  descVisible?: boolean;
  avatarStyle?: React.CSSProperties;
}
const User: React.SFC<UserProps> = (props) => {
  return (
    <Card
      className={styles.user}
      title={(
        <OpenData type='userNickName' />
      )}
      avatar={(
        <OpenData style={props.avatarStyle} className={styles.avatar} type='userAvatarUrl' />
      )}
      desc={props.descVisible && (
        <Text style={{ fontSize: 14 }}>登录时间：{new Date().toISOString().substr(0, 10)}</Text>
      )}
    />
  )
}
User.defaultProps = {
  descVisible: true,
  avatarStyle: {},
}

export default User;