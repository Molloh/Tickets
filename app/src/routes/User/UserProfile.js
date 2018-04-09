import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, DatePicker, Select, Button, Card, Divider, Radio, Icon, Tooltip } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './UserProfile.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Description } = DescriptionList;

@connect(({ user, loading }) => ({
    profile: user.profile,
    submitting: loading.effects['user/submitProfile'],
}))
@Form.create()
export default class UserProfile extends PureComponent {
    componentDidMount() {
      this.props.dispatch({
        type: 'user/fetchProfile',
      });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'user/submitProfile',
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

      const { phoneNumber, gender, id, level, totalPay, integration } = this.props.profile;

      return (
        <PageHeaderLayout
          title="用户信息"
        >
          <Card bordered={false}>
            <DescriptionList size="large" title={id} style={{ marginBottom: 32 }}>
              <Description term="等级">LV {level}</Description>
              <Description term="总消费">{totalPay} 元</Description>
              <Description term="积分">{integration} 分</Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
              <FormItem {...formItemLayout} label="手机号：">
                {getFieldDecorator('phoneNumber', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                    initialValue: phoneNumber,
                  })(
                    <Input style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="性别">
                {getFieldDecorator('gender', {
                    initialValue: gender,
                })(
                  <Radio.Group>
                    <Radio value="SECRET">保密</Radio>
                    <Radio value="MALE">男</Radio>
                    <Radio value="FEMALE">女</Radio>
                  </Radio.Group>
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
