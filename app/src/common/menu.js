import { isUrl } from '../utils/utils';

const menuData = [
  // user part
  {
    name: '我的订单',
    icon: 'shopping-cart',
    authority: 'user',
    path: 'myorder',
  },
  {
    name: '用户信息',
    icon: 'form',
    authority: 'user',
    path: 'userprofile',
  },
  {
    name: '活动列表',
    icon: 'table',
    authority: 'user',
    path: 'schedules',
  },
  {
    name: '优惠券兑换',
    icon: 'tag-o',
    authority: 'user',
    path: 'coupon',
  },
  // deal part
  {
    name: '订单信息',
    authority: 'user',
    path: 'orderInfo',
    hideInMenu: true,
  },
  {
    name: '提交订单',
    authority: 'user',
    path: 'order-place',
    hideInMenu: true,
  }, 
  {
    name: '选座购买',
    authority: 'user',
    path: 'order-place-select',
    hideInMenu: true,
  }, 
  // stadium part
  {
    name: '场馆信息',
    icon: 'form',
    path: 'stadiumprofile',
    authority: 'stadium',
  },
  {
    name: '发布演出计划',
    icon: 'calendar',
    path: 'schedule-publish',
    authority: 'stadium',
  },
  {
    name: '订单管理',
    icon: 'book',
    path: 'order-manage',
    authority: 'stadium',
  },
  {
    name: '线下售票',
    path: 'deal-offline',
    authority: 'stadium',
    hideInMenu: true,
  },
  {
    name: '订单确认',
    path: 'confirm-order',
    authority: 'stadium',
    hideInMenu: true,
  },
  {
    name: '演出信息',
    icon: 'schedule',
    path: 'schedule-info',
    authority: 'stadium',
  },
  // admin part
  {
    name: '统计信息',
    icon: 'dashboard',
    authority: 'admin',
    path: 'analysis',
  },
  {
    name: '场馆管理',
    icon: 'home',
    authority: 'admin',
    path: 'stadium-manage',
  },
  {
    name: '用户管理',
    icon: 'team',
    authority: 'admin',
    path: 'user-manage',
  },
  {
    name: '演出管理',
    icon: 'bell',
    authority: 'admin',
    path: 'schedule-manage',
  },
  // sign in & register part
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册用户',
        path: 'register',
      },
      {
        name: '注册账户',
        path: 'stadium-register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
      {
        name: '场馆注册结果',
        path: 'register-result-stadium',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
