import React, { PureComponent, Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Tag, List, Checkbox, Card, Select, InputNumber, Badge, Table, Divider, Button, message } from 'antd';
import DescriptionList from 'components/DescriptionList';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Description } = DescriptionList;
const { Option } = Select;

@connect(({ deal, coupon, loading }) => ({
  deal,
  coupon,
  loading: loading.models.deal,
}))
export default class PlaceAnOrderSelectSeat extends Component {
  state = {
    total: 0,
    ticketPayloads: [],
    couponId: -1,
  }
  
  componentWillMount() {
    this.props.dispatch({
      type: 'deal/queryTickets',
    });
    this.handleSeats();
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'deal/queryCurrentSchedule',
    });
    this.props.dispatch({
      type: 'coupon/queryMyCoupons',
    });
  }

  handleSelectCoupon = (value) => {
    this.setState({
      couponId: value,
    })
  }

  handleSeats = () => {
    const { deal: { tickets, seats } } = this.props;
    
    for (let i = 0; i < tickets.length; i += 1) {
      for (let j = 0; j < seats.length; j += 1) {
        if (tickets[i].row === seats[j].row && tickets[i].column === seats[j].column) {
          seats[j].isReserved = true;
        }
      }
    }

    this.props.dispatch({
        type: 'deal/changeSeats',
        payload: seats,
    });
  }

  handleSubmmit = () => {
    const { ticketPayloads, total, couponId } = this.state;
    const { deal: { schedule }} = this.props;
    this.props.dispatch({
        type: 'user/placeAnOrderSelectSeat',
        payload: {
            couponId,
            username: sessionStorage.getItem("username"),
            priceSum: total,
            scheduleId: schedule.id,
            ticketPayloads,
          },
    });
  }

  handleSelect = (item) => {
    const { deal: { schedule } } = this.props;
    const { ticketPayloads } = this.state;

    for (let i = 0; i < ticketPayloads.length; i += 1) {
      if (ticketPayloads[i].row === item.row && ticketPayloads[i].column === item.column) {
        ticketPayloads.splice(i, 1);
        this.setState({
            total: schedule.unitPrice * ticketPayloads.length,
            ticketPayloads: [...ticketPayloads],
        });
        return;
      }
    }

    ticketPayloads.push({
        row: item.row,
        column: item.column,
        price: schedule.unitPrice,
    });
    this.setState({
        total: schedule.unitPrice * ticketPayloads.length,
        ticketPayloads: [...ticketPayloads],
    });
  }

  render() {
    const { deal: { schedule, seats }, coupon: { mycoupons }, loading } = this.props;
    const discribe = {'0.9': '九折券', '0.8': '八折券'};
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
            <Description term="提醒">最多选择六张</Description>
          </DescriptionList>
          <Select defaultValue={-1} onChange={this.handleSelectCoupon}>
            <Option value={-1}>不使用优惠券</Option>
            {mycoupons.map(item => <Option value={item.id} key={item.id}>{item.id} - {discribe[item.discount]}</Option>)}
          </Select>
          <Divider style={{ marginBottom: 32 }} />
          <Link to="/order-place">
              不选座
          </Link>
          <Divider style={{ marginBottom: 32 }} />
          <List
            loading={loading}
            grid={{ column: 8 }}
            dataSource={seats}
            renderItem={item =>(
              <List.Item>
                <Checkbox disabled={item.isReserved} onChange={this.handleSelect.bind(this, item)}>{item.row}行{item.column}列</Checkbox>
              </List.Item>)
            }
          />
          <Divider style={{ marginBottom: 32 }} />
          <Button type="primary" htmlType="submit" loading={loading} style={{ float: "right", marginLeft: 8 }} onClick={this.handleSubmmit}>提交</Button>
          <Link to="/schedules">
            <Button style={{ float: "right", marginLeft: 8 }}>返回</Button>
          </Link>
            
        </Card>
      </PageHeaderLayout>
    );
  }
}
