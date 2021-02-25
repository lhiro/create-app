import React from 'react';
import { View, Image, Text, ITouchEvent } from '@tarojs/components'
import styles from './index.module.less';
import classnames from 'classnames';
import avatar from '@/assets/images/user.png';


export interface CardProps {
  className?: string;
  avatar?: React.ReactNode | string;
  title?: React.ReactNode | string;
  desc?: React.ReactNode | string;
  extra?: React.ReactNode | string;
  onClick?: (e: ITouchEvent) => void;
  openType?: string;
}


const Card:React.FC<CardProps> = (props) => {
  const cardClass = classnames({
    [`${styles.card}`]: true,
    [`${props.className}`]: props.className
  });
  return (
    <View onClick={props.onClick} className={cardClass}>
      {typeof props.avatar === 'string' ? (
        <Image className={styles.avatar} src={props.avatar || avatar} />
      ) : (
        props.avatar
      )}
      <View className={styles.main}>
        {typeof props.title === 'string' ? (
          <View className={styles.name}>{props.title}</View>
        ): (
          props.title
        )}
        {typeof props.desc === 'string' ? (
          <Text>{props.desc}</Text>
        ) : (
          props.desc
        )}
      </View>
      {typeof props.extra === 'string' ? (
        <Text>{props.extra}</Text>
      ) : (
        props.extra
      )}
    </View>
  )
}

export default Card