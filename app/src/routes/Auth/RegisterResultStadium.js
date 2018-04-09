import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import Result from 'components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/">
      <Button size="large">返回首页</Button>
    </Link>
  </div>
);

export default ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        您的账户：{location.state ? location.state.account : 'tickets@example.com'} 注册成功
      </div>
    }
    description="请等待管理员审核。审核成功后，激活邮件将发送到您的邮箱中，请注意查收。"
    actions={actions}
    style={{ marginTop: 56 }}
  />
);
