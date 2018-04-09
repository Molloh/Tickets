import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert

} from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'user',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      if (type === 'user') {
        this.props.dispatch({
          type: 'login/userlogin',
          payload: {
            ...values,
            type,
          },
        });
      }
      else if (type === 'stadium') {
        this.props.dispatch({
          type: 'login/stadiumlogin',
          payload: {
            ...values,
            type,
          },
        });
      }
      else if (type === 'admin') {
        this.props.dispatch({
          type: 'login/adminlogin',
          payload: {
            ...values,
            type,
          },
        });
      }
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Tab key="user" tab="会员登录">
            {login.status === false &&
              login.type === 'user' &&
              !login.submitting &&
              this.renderMessage('账户或密码错误')}
            <UserName name="usernameOrEmail" placeholder="用户名或邮箱" />
            <Password name="password" placeholder="密码" />
          </Tab>
          <Tab key="stadium" tab="场馆登录">
            {login.status === false &&
              login.type === 'stadium' &&
              !login.submitting &&
              this.renderMessage('账户或密码错误')}
            <UserName name="stadiumCode" placeholder="场馆序列号" />
            <Password name="password" placeholder="密码" />
          </Tab>
          <Tab key="admin" tab="管理员登录">
            {login.status === false &&
              login.type === 'admin' &&
              !login.submitting &&
              this.renderMessage('账户或密码错误')}
            <UserName name="usernameOrEmail" placeholder="管理员账号" />
            <Password name="password" placeholder="密码" />
          </Tab>
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
          </div>
          <Submit loading={submitting}>登录</Submit>
          <div className={styles.other}>
            <Link className={styles.register} to="/user/register">
              | 注册用户
            </Link>
            <Link className={styles.register} to="/user/stadium-register">
              注册场馆 | 
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}
