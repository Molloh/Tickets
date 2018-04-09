import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Input, Progress, Button, Avatar } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ScheduleInfo.less';

const { Search } = Input;

@connect(({ stadium, loading }) => ({
  stadium,
  loading: loading.models.stadium,
}))
export default class SchedulesInfo extends PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'stadium/fetchSchedules',
    });
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'stadium/fetchSchedules',
    });
  }

  handleOrder = (item) => {
    sessionStorage.setItem("scheduleId", item.id);
    this.props.dispatch({
      type: 'stadium/jump',
    });
  }


  render() {
    const { loading } = this.props;
    
    const ListContent = ({ data: { unitPrice, startDate, ticketsNum } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>票价</span>
          <p>{unitPrice}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>开始时间</span>
          <p>{moment(startDate).format('YYYY-MM-DD HH:mm:ss')}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress percent={ticketsNum} status="active" strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="演出列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              dataSource={this.props.stadium.schedules}
              renderItem={item => (
                <List.Item key={item.id} actions={[<a onClick={this.handleOrder.bind(this, item)}>购票</a>]}>
                  <List.Item.Meta
                    avatar={<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png" shape="square" size="large" />}
                    title={<a>{item.scheduleName}</a>}
                    description={item.discription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
