import React from 'react';
import classnames from 'classnames';
import { View, Text } from '@tarojs/components';
import styles from './index.module.less';

type Column = {
  title: string;
  dataIndex: string | number;
}[];
interface TableProps {
  className?: string;
  column: Column 
  dataSource: any;
  formatData?: (dataSource: any) => any;
}
const Table: React.FC<TableProps> = props => {

  function renderHead() {
    if (props.column?.length) {
      return props.column.map((item, index) => (
        <View className={styles.item} key={`${item.dataIndex}-${index}`}>
          <Text>{item.title}</Text>
        </View>
      ));
    }
  }
  function renderBody() {
    if (props.dataSource) {
      const data = props.formatData ? props.formatData(props.dataSource) : props.dataSource;
      
      return data.map((item, index) => {
        return (
          <View className={styles.row} key={`bodyItem-${index}`}>
            { props.column.map(c => (
              <View className={styles.item} key={`${item.dataIndex}-${index}`}>
                <Text>{item[c.dataIndex]}</Text>
              </View>
            ))}
          </View>
        )
      })
    }
    return null;
  }
  const className = classnames({
    [`${styles.table}`]: true,
    [`${props.className}`]: props.className
  });
  return (
    <View className={className}>
      <View className={styles.head}>
        {renderHead()}
      </View>
      <View className={styles.body}>
        {renderBody()}
      </View>
    </View>
  )
}

export default Table;