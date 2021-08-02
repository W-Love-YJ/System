<template>
  <div>
    <template v-if="items.children.length == 0">
      <el-menu-item :index="items.path">
        <template #title>
          <i :class="items.icon" style="color: #4ae9fc" />
          <svg-icon iconName="list" className="title-svg"></svg-icon>
          <span
            style="
              padding-left: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: initial;
              width: calc(100% - 25px);
            "
            >{{ items.title }}</span
          >
        </template>
      </el-menu-item>
    </template>
    <template v-else>
      <el-submenu :index="items.title">
        <template #title>
          <i :class="items.icon" style="color: #4ae9fc" />
          <svg-icon iconName="list" className="title-svg"></svg-icon>
          <span
            style="
              padding-left: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: initial;
              width: calc(100% - 25px);
            "
            >{{ items.title }}</span
          >
        </template>
        <mySubMenu
          v-for="(isItem, j) in items.children"
          :items="isItem"
          :key="j"
        >
        </mySubMenu>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import mySubMenu from "@/components/el_menu/el_subMenu.vue"; // 引用组件
export default {
  name: "mySubMenu",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  props: {
    items: {
      type: Object,
    },
  },
  components: {
    mySubMenu,
  },
};
</script>
<style scoped>
</style>