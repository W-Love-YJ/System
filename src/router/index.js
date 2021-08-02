import { createRouter, createWebHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LogIn.vue'),
    hidden: true,
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Index.vue'),
    hidden: true,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/home/table',
        name: 'table',
        component: () => import('@/views/components/table.vue'),
        hidden: true,
        meta: {
          title: '表格',
          name: '表格'
        }
      }, {
        path: '/home/SVG',
        name: 'SVG',
        component: () => import('@/views/components/SVG.vue'),
        hidden: true,
        meta: {
          title: 'SVG图标',
          name: 'SVG图标'
        }
      }, {
        path: '/home/draggable',
        name: 'draggable',
        component: () => import('@/views/components/draggable.vue'),
        hidden: true,
        meta: {
          title: '拖动组件',
          name: '拖动组件'
        }
      }, {
        path: '/home/dialog',
        name: 'dialog',
        component: () => import('@/views/components/dialog.vue'),
        hidden: true,
        meta: {
          title: '拖动弹出框',
          name: '拖动弹出框'
        }
      }, {
        path: '/home/chart',
        name: 'chart',
        component: () => import('@/views/components/chart.vue'),
        hidden: true,
        meta: {
          title: 'echarts图表',
          name: 'echarts图表'
        }
      }
    ]
  },
  {
    path: '/error404',
    name: 'error404',
    component: () => import('@/views/404.vue'),
    hidden: true,
    meta: {
      title: '404-页面不存在'
    }
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

export default router
