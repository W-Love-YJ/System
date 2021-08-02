<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="center">
        <component class="view" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  // 刷新页面保持VueX不重置
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
      sessionStorage.removeItem("store");
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("refresh", JSON.stringify(true));
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    /************ 一键换肤 *************/
    /**
     *  判断 sessionStorage 中的 type 是否为空，如果为空的话，就给默认的颜色（页面初始化的颜色），如
     *  果不为空的话就将对应获取到的值给到 data-theme
     **/
    if (sessionStorage.getItem("type") != null) {
      window.document.documentElement.setAttribute(
        "data-theme",
        sessionStorage.getItem("type")
      );
    } else {
      window.document.documentElement.setAttribute("data-theme", "blue");
    }
    /************ 一键换肤 end *************/
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  padding: 0;
  margin: 0;
}
</style>
