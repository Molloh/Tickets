import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Input, Progress, Button, Avatar } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Schedules.less';

const { Search } = Input;

@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
export default class UserOrder extends PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'user/fetchOrders',
    });
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchOrders',
    });
  }
  
  handleOrder = (item) => {
    sessionStorage.setItem("orderId", item.id);
    this.props.dispatch({
      type: 'user/jumpOrderInfo',
    });
  }

  render() {
    const { loading } = this.props;
    
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
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              dataSource={this.props.user.orders}
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
