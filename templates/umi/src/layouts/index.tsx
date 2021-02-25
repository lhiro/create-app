
import React, { useLayoutEffect } from 'react'
import { Nav } from '@alifd/next'
const { Item: NavItem } = Nav;
import styles from './index.less';
import { Link, history } from 'umi';
import { checkAccess } from '@/utils/helper';


interface LayoutProps {
  location: {
    pathname: string;
  }
}
const Layout: React.FC<LayoutProps> = (props) => {
  
  useLayoutEffect(() => {
    if (!checkAccess()) {
      history.push('/login');
    }
  }, []);
  return (
    <div className={styles.normal}>
      <Nav 
        className="nav" 
        mode="inline" 
        type="normal" 
        direction="hoz" 
        triggerType="click"
        selectedKeys={[props.location.pathname]}
        header={(
          <span className={styles.header}>Channels's system</span>
        )}
      >
        <NavItem key="/user">
          <Link to="/user">Users</Link>
        </NavItem>
        <NavItem key="/post">
          <Link to="/post">Posts</Link>
        </NavItem>
        <NavItem key="/record">
          <Link to="/record">Records</Link>
        </NavItem>
      </Nav>
      {props.children}
    </div>
  )
}

export default Layout
