<template>
  <div class="container">
    <el-container style="width: 100%; height: 100%">
      <el-aside width="auto" height="100%" style="max-width: 227px">
        <elmenu :isRouter="true"></elmenu>
      </el-aside>
      <el-container>
        <el-header>
          <elheader> </elheader>
        </el-header>
        <div>
          <eltabs />
        </div>
        <el-main style="background: #f0f2f5">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component class="view" :is="Component" />
              </keep-alive>
            </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import elmenu from "@/components/el_menu/index.vue";
import elheader from "@/components/el_header/index.vue";
import eltabs from "@/components/el_header/el_tabs.vue";
export default {
  name:'home',
  components: {
    elmenu,
    elheader,
    eltabs,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  created() {},

  methods: {},
};
</script>
<style scoped lang="scss">
.container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.el-header {
  @include background_image("background_image");
  @include font_color("font_color1");
}
.el-aside {
  @include background_image("background_image");
  @include font_color("font_color1");
}
</style>
