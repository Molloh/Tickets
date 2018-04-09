import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Card, Input, Modal, Badge, Table, Divider, Button } from 'antd';
import DescriptionList from 'components/DescriptionList';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Description } = DescriptionList;


@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
export default class OrderInfo extends PureComponent {

  componentDidMount() {
    this.props.dispatch({
      type: 'order/queryOrder',
    });
  }

  handleSubmit = () => {
    this.props.dispatch({
      type: 'order/confirmAnOrder',
      payload: {
        orderId: sessionStorage.getItem("orderId"),
      },
    });
  };

  renderButtons = (status) => {
    const { loading } = this.props;
    if (status === 'STATUS_PAID')
      return (
        <div>
          <Button type="primary" htmlType="submit" loading={loading} style={{ float: "right", marginLeft: 8 }} onClick={this.handleSubmit}>确认</Button>
          <Link to="/order-manage">
            <Button style={{ float: "right", marginLeft: 8 }}>返回</Button>
          </Link>
        </div>
      );
    else 
      return (
        <div> 
          <Link to="/order-manage">
            <Button style={{ float: "right", marginLeft: 8 }}>返回</Button>
          </Link>
        </div>
      );
  }

  render() {
    const { order } = this.props.order;
    return (
      <PageHeaderLayout title="购票">
        <Card bordered={false}>
          <DescriptionList size="large" title="订单" style={{ marginBottom: 32 }}>
            <Description term="ID">{order.id}</Description>
            <Description term="总价">{order.priceSum} 元</Description>
            <Description term="订单状态">{order.orderStatus}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          {this.renderButtons(order.orderStatus)}
        </Card>
      </PageHeaderLayout>
    );
  }
}
