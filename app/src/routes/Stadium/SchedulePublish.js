import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './SchedulePublish.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ stadium, loading }) => ({
    submitting: loading.effects['stadium/submitSchedules'],
}))
@Form.create()
export default class SchedulePublish extends PureComponent {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        const { start, end, scheduleName, discription, ticketsNum, unitPrice } = values;
        const startDate = moment(start).format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(end).format('YYYY-MM-DD HH:mm:ss');
        if (!err) {
          this.props.dispatch({
            type: 'stadium/submitSchedules',
            payload: {
              scheduleName,
              discription,
              ticketsNum,
              unitPrice,
              startDate,
              endDate,
            },
          });
        }
        });
    };
    render() {
      const { submitting } = this.props;
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
        <PageHeaderLayout
          title="发布演出计划"
        >
          <Card bordered={false}>
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
              <FormItem {...formItemLayout} label="演出名称：">
                {getFieldDecorator('scheduleName', {
                    rules: [{ required: true, message: '请输入演出名称！' }],
                  })(
                    <Input style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="描述：">
                {getFieldDecorator('discription', {
                    rules: [{ required: true, message: '请输入描述！' }],
                  })(
                    <Input style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="票价：">
                {getFieldDecorator('unitPrice', {
                    rules: [{ required: true, message: '请输入票价！' }],
                  })(
                    <InputNumber style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="总票数：">
                {getFieldDecorator('ticketsNum', {
                    rules: [{ required: true, message: '请输入总票数！' }],
                  })(
                    <InputNumber style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="开始时间：">
                {getFieldDecorator('start', {
                    rules: [{ required: true, message: '请输入开始时间！' }],
                  })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="选择开始时间"
                      style={{ width: '100%' }}
                    />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="结束时间：">
                {getFieldDecorator('end', {
                    rules: [{ required: true, message: '请输入结束时间！' }],
                  })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="选择结束时间"
                      style={{ width: '100%' }}
                    />
                )}
              </FormItem>
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit" loading={submitting} style={{ float: "right" }}>提交</Button>
              </FormItem>
            </Form>
          </Card>
        </PageHeaderLayout>
      );
  }
}
