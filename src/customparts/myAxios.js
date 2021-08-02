
// 引用axios
import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: process.env.VUE_APP_BASE_contentType,
  headers: {
    'Content-Type': process.env.VUE_APP_BASE_requestTimeout,
  },
})

// request拦截器
instance.interceptors.request.use(
  config => {
    if (config.type === 'formdata') {
      config.transformRequest = [(data) => {
        // 在请求之前对data传参进行格式转换
        data = qs.stringify(data)
        return data
      }]
    } else if (config.type === 'querystring') {
      let mag = {
        '+': '%2B',
        ' ': '%20',
        '/': '%2F',
        '?': '%3F',
        '%': '%25',
        '#': '%23',
        '&': '%26',
        '=': '%3D',
      }
      let url = config.url

      config.transformRequest = [(data) => {
        url += '?'
        for (let i in data) {
          data[i] = typeof data[i] != 'undefined' ? (data[i] + '').replace(/\+| |\/|\?|%|#|&|=/g, function (val) {
            return mag[val]
          }) : data[i]
          url += i + '=' + data[i] + '&'
        }
        url = url.substr(0, url.length - 1)
      }]


    }
    config.headers['token'] = sessionStorage.getItem('Token') // 让每个请求携带自定义token 请根据实际情况自行修改

    return config
  },
  error => {
    // console.log(error)
    Promise.reject(error)
  }
)



// 响应拦截器
instance.interceptors.response.use(res => {
  if (res.data.code == 401) {
    ElMessageBox.confirm(
      '登录状态已过期，您可以继续留在该页面，或者重新登录',
      '系统提示',
      {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      store.dispatch('user/logout').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    })
    return false
  }
  if (res.config.url == '/login/ajaxLogin') {
    return res
  } else {
    return res.data
  }
},
  err => {
    if (err && err.response) {
      // console.log(err)
      switch (err.response.status) {
        case 400:
          err.message = '请求错误(400)';
          break;
        case 401:
          ElMessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            store.dispatch('user/logout').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
          // store.commit('logout');
          // router.push({ name: 'login' });
          break;
        case 403:
          err.message = '拒绝访问(403)';
          break;
        case 404:
          err.message = '请求出错(404)';
          break;
        case 408:
          err.message = '请求超时(408)';
          break;
        case 500:
          err.message = '服务器错误(500)';
          break;
        case 501:
          err.message = '服务未实现(501)';
          break;
        case 502:
          err.message = '网络错误(502)';
          break;
        case 503:
          err.message = '服务不可用(503)';
          break;
        case 504:
          err.message = '网络超时(504)';
          break;
        case 505:
          err.message = 'HTTP版本不受支持(505)';
          break;
        default:
          err.message = `连接出错(${err.response.status})!`;
      }
    } else {
      err.message = '连接服务器失败!';
    }
    ElMessage({
      message: err.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(err)
  }
)

export default instance