import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Card, Input, Modal, Badge, Table, Divider, Button } from 'antd';
import DescriptionList from 'components/DescriptionList';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Description } = DescriptionList;
const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleSubmit, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleSubmit(fieldsValue);
    });
  };
  return (
    <Modal
      title="支付"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="账户">
        {form.getFieldDecorator('account', {
          rules: [{ required: true, message: '请输入支付账户：' }],
        })(<Input placeholder="账户" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入支付密码：' }],
        })(<Input type="password" placeholder="密码" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
export default class OrderInfo extends PureComponent {
  state = {
    modalVisible: false,
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'order/queryOrder',
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleSubmit = (paypal) => {
    const { account, password } = paypal;
    this.props.dispatch({
      type: 'order/dealAnOrder',
      payload: {
        account,
        password,
        orderId: sessionStorage.getItem("orderId"),
      },
    });
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = () => {
    this.props.dispatch({
      type: 'order/cancelAnOrder',
      payload: {
        orderId: sessionStorage.getItem("orderId"),
      },
    });
  }

  renderButtons = (status) => {
    const { loading } = this.props;
    if (status === 'STATUS_COMPLETED' || status === 'STATUS_CANCELED')
      return (
        <div>
          <Link to="/myorder">
            <Button style={{ float: "right", marginLeft: 8 }}>返回</Button>
          </Link>
        </div>
      );
    else 
      return (
        <div> 
          <Button type="primary" htmlType="submit" loading={loading} style={{ float: "right", marginLeft: 8 }} onClick={() => this.handleModalVisible(true)}>支付</Button>
          <Button type="primary" htmlType="submit" loading={loading} style={{ float: "right", marginLeft: 8 }} onClick={this.handleCancel}>取消订单</Button>
          <Link to="/myorder">
            <Button style={{ float: "right", marginLeft: 8 }}>返回</Button>
          </Link>
        </div>
      );
  }

  render() {
    const { order } = this.props.order;
    const { modalVisible } = this.state;

    const parentMethods = {
      handleSubmit: this.handleSubmit,
      handleModalVisible: this.handleModalVisible,
    };

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
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
