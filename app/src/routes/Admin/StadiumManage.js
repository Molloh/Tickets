import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ admin, loading }) => ({
    stadiums: admin.stadiums,
    loading: loading.models.admin,
  }))
export default class StadiumManage extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/queryStadiums',
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/queryStadiums',
    });
  }

  handleActivate = (record) => {
    this.props.dispatch({
        type: 'admin/activateStadium',
        payload: {
          stadiumCode: record.stadiumCode,
        },
      });
  }


  render() {
    const columns = [{
        title: '场馆编号',
        dataIndex: 'stadiumCode',
        key: 'stadiumCode',
      }, {
        title: '场馆邮箱',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: '确认注册',
        key: 'action',
        render: (text, record) => (
          <Button type="primary" onClick={this.handleActivate.bind(this, record)}>确认</Button>
        ),
      }];
    return (
      <PageHeaderLayout title="场馆注册确认">
        <Table columns={columns} dataSource={this.props.stadiums} />
      </PageHeaderLayout>
    );
  }
}