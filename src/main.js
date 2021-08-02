import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import router from './router'
import store from './store'

// 动态注册路由
if (sessionStorage.getItem('Token')) {
  store.dispatch('user/installMenu')
}

// 引用FileSaver、XLSX 导出exls表格
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

import '../permission' // 引入路由拦截
import SvgIcon from '@/components/SvgIcon/index.vue'// svg component

import _ from 'lodash' // 全局引入lodash 

import * as echarts from 'echarts' // 全局引入echarts

const app = createApp(App);

app.use(ElementPlus, { locale });
app.use(router);
app.use(store);
app.component('svg-icon', SvgIcon)

app.config.globalProperties.$_ = _
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$FileSaver = FileSaver
app.config.globalProperties.$XLSX = XLSX
app.mount('#app');
