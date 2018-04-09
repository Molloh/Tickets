import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card, Button, Icon, Divider, List } from 'antd';

import Ellipsis from 'components/Ellipsis';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Coupons.less';

@connect(({ coupon, loading }) => ({
  coupon,
  loading: loading.models.coupon,
}))
export default class Coupons extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'coupon/queryMyCoupons',
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'coupon/queryMyCoupons',
    });
  }

  handleExchange = (item) => {
    const { dispatch } = this.props;
    const { couponCost, discount } = item;
    dispatch({
      type: 'coupon/buyAnCoupon',
      payload: {
        couponCost,
        discount,
      },
    });
  }

  render() {
    const { coupon, loading } = this.props;
    const { coupons, mycoupons } = coupon;

    const columns = [{
      title: '优惠券编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '优惠券折扣',
      dataIndex: 'discount',
      key: 'discount',
    }, {
      title: '优惠券花费',
      key: 'couponCost',
      dataIndex: 'couponCost',      
    }, {
      title: '优惠券状态',
      key: 'couponStatus',
      dataIndex: 'couponStatus',
    }];

    const discribe = {'0.9': '九折券', '0.8': '八折券'}

    return (
      <PageHeaderLayout title="优惠券兑换">
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={coupons}
            renderItem={item =>(
              <List.Item key={item.id}>
                <Card hoverable className={styles.card} actions={[<a onClick={this.handleExchange.bind(this, item)}>兑换</a>]}>
                  <Card.Meta
                    avatar={<img alt="" className={styles.cardAvatar} src='https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png' />}
                    title={discribe[item.discount]}
                    description={
                      <Ellipsis className={styles.item} lines={3}>
                        {item.couponCost} 积分兑换
                      </Ellipsis>
                    }
                  />
                </Card>
              </List.Item>)
            }
          />
        </div>
        <Divider style={{ marginBottom: 32 }} />
        <Table columns={columns} dataSource={mycoupons} />
      </PageHeaderLayout>
    );
  }
}