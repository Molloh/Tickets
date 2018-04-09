import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ admin, loading }) => ({
    users: admin.users,
    loading: loading.models.admin,
  }))
export default class UserManage extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/queryUsers',
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/queryUsers',
    });
  }

  handleActivate = (record) => {
    this.props.dispatch({
        type: 'admin/abolishUser',
        payload: {
          username: record.username,
        },
      });
  }


  render() {
    const columns = [{
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '用户邮箱',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Button type="primary" onClick={this.handleActivate.bind(this, record)}>取消会员资格</Button>
        ),
      }];
    return (
      <PageHeaderLayout title="会员资格取消">
        <Table columns={columns} dataSource={this.props.users} />
      </PageHeaderLayout>
    );
  }
}