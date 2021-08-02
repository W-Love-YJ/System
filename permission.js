import router from '@/router'
// 页面白名单
const whiteList = ['/', '/error404']
router.beforeEach((to, from, next) => {

  if (sessionStorage.getItem('Token')) {
    /* has token
      判断是否为刷新
    */
    if (!JSON.parse(sessionStorage.getItem("refresh"))) {
      if (to.path === '/') {
        next({ path: '/home' })
      } else {
        if (to.matched.length === 0) {
          next('/error404') // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
        } else {
          next()
        }
      }
    }

  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/' })
    }
  }
})
router.afterEach((to) => {
  document.title = to.meta.title
})