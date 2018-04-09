import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './StadiumProfile.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ stadium, loading }) => ({
    profile: stadium.profile,
    submitting: loading.effects['stadium/submitProfile'],
}))
@Form.create()
export default class StadiumProfile extends PureComponent {
    componentDidMount() {
      this.props.dispatch({
        type: 'stadium/fetchProfile',
      });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'stadium/submitProfile',
            payload: values,
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

      const { phoneNumber, stadiumName, address } = this.props.profile;

      return (
        <PageHeaderLayout
          title="场馆信息"
        >
          <Card bordered={false}>
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
              <FormItem {...formItemLayout} label="场馆名称：">
                {getFieldDecorator('stadiumName', {
                    rules: [{ required: true, message: '请输入场馆名！' }],
                    initialValue: stadiumName,
                  })(
                    <Input style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="地址：">
                {getFieldDecorator('address', {
                    rules: [{ required: true, message: '请输入地址！' }],
                    initialValue: address,
                  })(
                    <Input style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="电话号码：">
                {getFieldDecorator('phoneNumber', {
                    rules: [{ required: true, message: '请输入联系方式！' }],
                    initialValue: phoneNumber,
                  })(
                    <Input style={{ width: '100%' }} />
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
