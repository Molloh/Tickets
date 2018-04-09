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
export default class OrderInfo extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'stadium/fetchOrders',
    });
  }

  handleSearch = (value) => {
    this.props.dispatch({
      type: 'stadium/searchAnOrder',
      payload: value,
    });
  }

  handleOrder = (item) => {
    sessionStorage.setItem("orderId", item.id);
    this.props.dispatch({
      type: 'stadium/jumpOrderConfirm',
    });
  }

  render() {
    const { loading } = this.props;

    const extraContent = (
      <div className={styles.extraContent}>
        <Search className={styles.extraContentSearch} placeholder="请输入订单号" onSearch={this.handleSearch} defaultValue="" />
      </div>
    );

    const ListContent = ({ data: { createdAt, priceSum } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>订单价格</span>
          <p>{priceSum}元</p>
        </div>
        <div className={styles.listContentItem}>
          <span>下单时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="订单列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              dataSource={this.props.stadium.orders}
              renderItem={item => (
                <List.Item key={item.id} actions={[<a onClick={this.handleOrder.bind(this, item)}>详情</a>]}>
                  <List.Item.Meta
                    avatar={<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png" shape="square" size="large" />}
                    title={<a>{item.id}</a>}
                    description={item.orderStatus}
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
