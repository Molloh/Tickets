import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    // user part
    '/myorder': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/User/UserOrder')),
    },
    '/userprofile': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/User/UserProfile')),
    },
    '/schedules': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/User/Schedules')),
    },
    '/coupon': {
      component: dynamicWrapper(app, ['coupon'], () => import('../routes/User/Coupons')),
    },
    // deal part
    '/orderInfo': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/User/OrderInfo')),
    },
    '/order-place': {
      component: dynamicWrapper(app, ['deal', 'coupon'], () => import('../routes/Deal/PlaceAnOrder')),
    },
    '/order-place-select': {
      component: dynamicWrapper(app, ['deal', 'coupon'], () => import('../routes/Deal/PlaceAnOrderSelectSeat')),
    },
    // stadium part
    '/order-manage': {
      component: dynamicWrapper(app, ['stadium'], () => import('../routes/Stadium/OrderInfo')),
    },
    '/stadiumprofile': {
      component: dynamicWrapper(app, ['stadium'], () => import('../routes/Stadium/StadiumProfile')),
    },
    '/schedule-publish': {
      component: dynamicWrapper(app, ['stadium'], () => import('../routes/Stadium/SchedulePublish')),
    },
    '/schedule-info': {
      component: dynamicWrapper(app, ['stadium'], () => import('../routes/Stadium/ScheduleInfo')),
    },
    '/deal-offline': {
      component: dynamicWrapper(app, ['deal'], () => import('../routes/Stadium/DealOffline')),
    },
    '/confirm-order': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Stadium/OrderConfirm')),
    },
    // admin part
    '/analysis': {
      component: dynamicWrapper(app, ['admin'], () => import('../routes/Admin/Analysis')),
    },
    '/user-manage': {
      component: dynamicWrapper(app, ['admin'], () => import('../routes/Admin/UserManage')),
    },
    '/stadium-manage': {
      component: dynamicWrapper(app, ['admin'], () => import('../routes/Admin/StadiumManage')),
    },
    '/schedule-manage': {
      component: dynamicWrapper(app, ['admin'], () => import('../routes/Admin/ScheduleManage')),
    },
    // info part
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    // sign in && register part
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/Auth/Login')),
    },
    '/user/stadium-register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/Auth/RegisterStadium')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/Auth/RegisterUser')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/Auth/RegisterResult')),
    },
    '/user/register-result-stadium': {
      component: dynamicWrapper(app, [], () => import('../routes/Auth/RegisterResultStadium')),
    },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
