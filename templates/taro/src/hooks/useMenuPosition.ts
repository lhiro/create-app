import { useLayoutEffect, useState } from 'react';
import Taro from '@tarojs/taro';

const useMenuPosition = () => {
  const [rect, setRect] = useState<any>(null);
  useLayoutEffect(() => {
    const rect = Taro.getMenuButtonBoundingClientRect();
    if (rect.top) {
      setRect(rect);
    }
  }, []);
  
  return rect;
}

export default useMenuPosition;