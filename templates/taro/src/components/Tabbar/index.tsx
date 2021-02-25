import React, { useState } from 'react';
import { AtTabBar } from 'taro-ui';
import { CommonEvent } from '@tarojs/components/types/common'
import rankIcon from '@/assets/images/rank_01.png';
import rankSeletedIcon from '@/assets/images/rank_selected_01.png';
import meIcon from '@/assets/images/me_01.png';
import meSelectedIcon from '@/assets/images/me_selected_01.png';
import channelsIcon from '@/assets/images/channels_01.png';
import channelsSelectedIcon from '@/assets/images/channels_selected_01.png';

interface TabbarProps {
  current?: number;
  onClick?: (index: number, event: CommonEvent) => void;
}
const Tabbar: React.FC<TabbarProps> = props => {
  const [current, setCurrent] = useState(props.current || 0);

  function handleClick(index, event) {
    if (props.onClick) {
      props.onClick(index, event);
    }
    if (typeof props.current === 'undefined' && !props.onClick) {
      setCurrent(index);
    }
  }
  return (
    <AtTabBar
      current={current}
      onClick={handleClick}
      fixed
      color='rgba(0,0,0,.5)'
      tabList={[{
        title: '榜单',
        image: rankIcon,
        selectedImage: rankSeletedIcon,
      },{
        title: '数据',
        image: channelsIcon,
        selectedImage: channelsSelectedIcon,
      }, {
        title: '我的',
        image: meIcon,
        selectedImage: meSelectedIcon,
      }]}
    />
  )
}

export default Tabbar;