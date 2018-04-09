import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Card, Select, InputNumber, Badge, Table, Divider, Button } from 'antd';
import DescriptionList from 'components/DescriptionList';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ deal, coupon, loading }) => ({
  deal,
  coupon,
  loading: loading.models.deal,
}))
@Form.create()
export default class PlaceAnOrder extends PureComponent {
  state = {
    total: 0,
    couponId: -1,
  }
  
  componentDidMount() {
    this.props.dispatch({
      type: 'deal/queryCurrentSchedule',
    });
    this.props.dispatch({
      type: 'coupon/queryMyCoupons',
    });
  }
  
  onChange = (value) => {
    const { schedule } = this.props.deal;
    this.setState({ 
      total: schedule.unitPrice * value, 
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { ticketsNum } = values;
      const ticketPayloads = [];
      for (let i = 0; i < ticketsNum; i += 1) {
        ticketPayloads.push({
          row: -1,
          column: -1,
          price: this.props.deal.schedule.unitPrice,
        });
      }
      if (!err) {
        this.props.dispatch({
          type: 'user/placeAnOrder',
          payload: {
            couponId: this.state.couponId,
            username: sessionStorage.getItem("username"),
            priceSum: this.state.total,
            scheduleId: this.props.deal.schedule.id,
            ticketPayloads,
          },
        });
      }
    });
  };

  handleSelectCoupon = (value) => {
    this.setState({
      couponId: value,
    })
  }

  render() {
    const discribe = {'0.9': '九折券', '0.8': '八折券'};
    const { deal, loading, coupon: { mycoupons } } = this.props;
    const { schedule } = deal;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 10, offset: 7 },
      },
    };
    return (
      <PageHeaderLayout title="购票">
        <Card bordered={false}>
          <DescriptionList size="large" title="演出" style={{ marginBottom: 32 }}>
            <Description term="名称">{schedule.scheduleName}</Description>
            <Description term="介绍">{schedule.discription}</Description>
            <Description term="单价">{schedule.unitPrice} 元/张</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="订单" style={{ marginBottom: 32 }}>
            <Description term="总价">{this.state.total} 元</Description>
          </DescriptionList>
          <Select defaultValue={-1} onChange={this.handleSelectCoupon}>
            <Option value={-1}>不使用优惠券</Option>
            {mycoupons.map(item => <Option value={item.id} key={item.id}>{item.id} - {discribe[item.discount]}</Option>)}
          </Select>
          <Divider style={{ marginBottom: 32 }} />
          <Link to="/order-place-select">
              选座购买
          </Link>
          <Divider style={{ marginBottom: 32 }} />
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="票数">
              {getFieldDecorator('ticketsNum', {
                rules: [{ required: true, message: '请输入场馆名！' }],
                initialValue: 0,
                })(
                  <InputNumber style={{ width: '100%' }} onChange={this.onChange} max={20} />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={loading} style={{ float: "right", marginLeft: 8 }}>提交</Button>
              <Link to="/schedules">
                <Button style={{ float: "right", marginLeft: 8 }}>返回</Button>
              </Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
