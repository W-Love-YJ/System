<template>
  <div class="main">
    <el-row style="height: calc(100vh - 0)">
      <el-col :span="24" style="height: calc(100vh - 0)">
        <el-header
          style="
            line-height: 60px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px 0 rgb(0 0 0 / 25%);
          "
        >
          <i class="el-icon-s-home" style="font-size: 1.5rem; padding: 5px" />
          <h2 v-if="!isCollapse" class="system_title">{{ title }}</h2>
        </el-header>
        <el-scrollbar style="height: calc(100vh - 60px)">
          <el-menu
            style="border: none"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            background-color="transparent"
            text-color="#fff"
            :unique-opened="true"
            :collapse="isCollapse"
            :router="
              typeof isRouter == undefined || typeof isRouter == 'undefined'
                ? false
                : true
            "
          >
            <template v-for="(item, i) in MenuList" :key="i">
              <template v-if="item.children.length == 0">
                <el-menu-item :index="item.path">
                  <template #title>
                    <i :class="item.icon" style="color: #4ae9fc" />
                    <svg-icon iconName="list" className="title-svg"></svg-icon>
                    <span
                      style="
                        padding-left: 5px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        text-align: initial;
                        width: calc(100% - 25px);
                      "
                    >
                      {{ item.title }}</span
                    >
                  </template>
                </el-menu-item>
              </template>
              <template v-else>
                <el-submenu :index="item.title">
                  <template #title>
                    <i :class="item.icon" style="color: #4ae9fc" />
                    <svg-icon iconName="list" className="title-svg"></svg-icon>
                    <span
                      style="
                        padding-left: 5px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        text-align: initial;
                        width: calc(100% - 25px);
                      "
                      >{{ item.title }}</span
                    >
                  </template>
                  <elsubMenu
                    v-for="(items, j) in item.children"
                    :items="items"
                    :key="j"
                  ></elsubMenu>
                </el-submenu>
              </template>
            </template>
          </el-menu>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import elsubMenu from "@/components/el_menu/el_subMenu.vue"; // 引用组件
import { mapState } from "vuex";
import { useRoute } from "vue-router";
import { watch, getCurrentInstance, ref } from "vue";
export default {
  components: {
    elsubMenu,
  },
  setup() {
    const { ctx } = getCurrentInstance();
    let defaultActive = ref("");
    let title = process.env.VUE_APP_TITLE;
    defaultActive.value = ctx.$router.options.history.location;
    const route = useRoute();
    watch(
      () => route.path,
      () => {
        defaultActive.value = route.path;
      }
    );
    return { defaultActive, title };
  },
  props: {
    isRouter: {
      type: Boolean,
    },
  },
  computed: {
    ...mapState({
      isCollapse: (state) => {
        return state.user.isCollapse;
      },
      MenuList: (state) => {
        return state.user.listMenu;
      },
    }),
  },
};
</script>
<style lang="scss">
.el-menu--vertical {
  @include background_image("background_image");
  @include font_color("font_color1");
}
.el-submenu__title,
.el-menu-item {
  display: flex;
}
.title-svg {
  display: inline-block;
  cursor: pointer;
  fill: #fff;
  width: 20px;
  height: 100%;
  vertical-align: 10px;
}
</style>
 
