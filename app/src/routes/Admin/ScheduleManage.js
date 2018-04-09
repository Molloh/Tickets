import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ admin, loading }) => ({
    schedules: admin.schedules,
    loading: loading.models.admin,
  }))
export default class ScheduleManage extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/querySchedules',
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/querySchedules',
    });
  }

  handleActivate = (record) => {
    this.props.dispatch({
        type: 'admin/checkSchedule',
        payload: {
          scheduleId: record.id,
        },
      });
  }


  render() {
    const columns = [{
        title: '演出编号',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '演出名',
        dataIndex: 'scheduleName',
        key: 'scheduleName',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Button type="primary" onClick={this.handleActivate.bind(this, record)}>结算</Button>
        ),
      }];
    return (
      <PageHeaderLayout title="演出结算">
        <Table columns={columns} dataSource={this.props.schedules} />
      </PageHeaderLayout>
    );
  }
}