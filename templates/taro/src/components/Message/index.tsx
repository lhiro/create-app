import React from 'react';
import { AtMessage } from 'taro-ui';
import useMenuPosition from '@/hooks/useMenuPosition';

const Message: React.FC<{}> = () => {
  const rect = useMenuPosition();
  return (
    <AtMessage customStyle={{top: rect && rect.top}} />
  )
}

export default Message;