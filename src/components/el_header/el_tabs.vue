<template>
  <el-scrollbar style="padding: 10px 10px 0 10px; height: 40px">
    <el-tabs
      v-if="editable.editableTabs.length"
      v-model="editable.editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="clickTab"
    >
      <el-tab-pane
        v-for="(item, index) in editable.editableTabs"
        :key="item.name + index"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </el-scrollbar>
</template>

<script>
import { useRoute } from "vue-router";
import { watch, reactive, getCurrentInstance } from "vue";
export default {
  setup() {
    let editable = reactive({ editableTabsValue: "", editableTabs: [] });

    const { ctx } = getCurrentInstance();
    let addTabs = (row) => {
      if (
        !JSON.stringify(editable.editableTabs).includes(JSON.stringify(row))
      ) {
        editable.editableTabs.push(row);
        editable.editableTabsValue = row.name;
      }
    };
    let clickTab = (row) => {
      ctx.$router.push({ path: row.paneName });
    };
    let removeTab = (targetName) => {
      let tabs = editable.editableTabs;
      let activeName = editable.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      editable.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      editable.editableTabsValue = activeName;

      console.log(
        editable.editableTabs,
        tabs.filter((tab) => tab.name !== targetName)
      );
      if (editable.editableTabs.length == 0) {
        ctx.$router.push({ path: "/home" });
      } else {
        ctx.$router.push({ path: activeName });
      }
    };
    // 进入首次执行
    if (ctx.$router.currentRoute.value.path != "/home") {
      addTabs({
        name: ctx.$router.currentRoute.value.path,
        title: ctx.$router.currentRoute.value.meta.name,
      });
    }
    editable.editableTabsValue = ctx.$router.options.history.location;

    // 监听变化
    let route = useRoute();
    watch(
      () => route.path,
      () => {
        if (ctx.$router.currentRoute.value.path != "/home") {
          addTabs({ name: route.path, title: route.meta.name });
        }
        editable.editableTabsValue = route.path;
      }
    );
    // editable = toRefs(editable);
    return { editable, clickTab, removeTab };
  },
};
</script>

<style>
.el-tabs__header {
  margin: 0;
}
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-bottom: none;
}
.el-tabs--card > .el-tabs__header {
  border-bottom: none;
}
</style>