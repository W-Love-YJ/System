/**
 * @description 登录、获取用户信息、退出登录、清除Token逻辑，不建议修改
 */
import { login } from '@/api/mockuser'
import { getMenu } from "@/api/mockuser";
import router from '@/router'
import { ElMessage, ElNotification } from 'element-plus'
const state = () => ({
  username: '',
  Token: '',
  userinfo: '',
  isCollapse: false,
  listMenu: []
})
const getters = {
  Token: (state) => state.Token,
  username: (state) => state.username,
  userinfo: (state) => state.userinfo,
  isCollapse: (state) => state.isCollapse,
  listMenu: (state) => state.listMenu
}
const mutations = {

  /**
   * @description Token
   * @param {*} state
   * @param {*} Token
   */
  setToken(state, Token) {
    state.Token = Token
  },
  /**
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username
  },
  /**
   * @description 设置用户信息
   * @param {*} state
   * @param {*} userinfo
   */
  setUserinfo(state, userinfo) {
    state.userinfo = userinfo
  },
  /**
   * @description 设置菜单栏是否收起
   * @param {*} state
   * @param {*} isCollapse
   */
  setIsCollapse(state, isCollapse) {
    state.isCollapse = isCollapse
  },
  /**
   * @description 获取菜单内容
   * @param {*} state
   * @param {*} listMenu
   */
  setIistMenu(state, listMenu) {
    state.listMenu = listMenu
  },

}
const actions = {
  /**
   * @description 登录
   * @param {*} { commit }
   * @param {*} userInfo
   */
  async login({ commit }, userInfo) {
    await login(userInfo).then(res => {
      if (res.code == 200) {
        let Token = res.token
        let data = res.data
        commit('setUserinfo', data)
        commit('setUsername', data.username)
        sessionStorage.setItem('Token', Token)
        commit('setToken', Token)
        const hour = new Date().getHours()
        const thisTime =
          hour < 8
            ? '早上好'
            : hour <= 11
              ? '上午好'
              : hour <= 13
                ? '中午好'
                : hour < 18
                  ? '下午好'
                  : '晚上好'
        ElNotification({
          title: `欢迎登录`,
          message: `${thisTime}！`,
        })
      } else {
        ElMessage.error(`验证失败，请重新登录...`)
      }
    })
  },
  /**
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ dispatch }) {
    await dispatch('resetAll')
  },
  /**
   * @description 重置Token、router等
   * @param {*} 
   */
  async resetAll() {
    sessionStorage.clear()
    localStorage.clear()
    router.push('/')
  },
  /**
   * @description 设置菜单，和添加动态路由
   * @param {*} { commit }
   */
  async installMenu({ commit }) {
    let path = router.options.history.location
    await getMenu().then((res) => {
      if (res.code == 200) {
        let data = res.data;
        localStorage.setItem('routes', res.data)
        commit('setIistMenu', data)
        promiseFun([data]).then((res) => {
          sessionStorage.setItem('refresh', JSON.stringify(false))
          if (res == '') {
            router.push({ path: path })
          } else {
            router.push({ name: res })
          }

        })
      }
      function promiseFun(data) {
        return new Promise((resolve) => {
          let routeName = ''
          function closureFun(params, name) {
            // 菜单数据处理方法 并添加路由
            params.forEach((item) => {
              let newRes = {
                name: item.name,
                title: item.title,
                meta: { title: "系统综合集成平台", name: item.title },
                path: item.path,
                component: () => import("@/views/" + item.component + ".vue"),
              };
              router.addRoute(name, newRes);
              if (item.children != 0) {
                closureFun(item.children, item.name);
              }
              if (item.path == path) {
                routeName = item.name
              }
            });
          }
          data.forEach((element) => {
            if (element.path == "/home") {
              if (element.children.length != 0) {
                closureFun(element.children, "home");
              }
            }
          });
          resolve(routeName)
        })
      }
    });

  },
}
export default { state, getters, mutations, actions }
