<template>
  <div id="main">
    <VueDraggableNext
      :list="listData"
      handle=".handle"
      v-bind="dragOptions"
      @start="onStart"
      @end="onEnd"
      style="
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      "
    >
      <template v-for="(item, index) in listData" :key="index" class="item">
        <el-row>
          <el-col class="handle" :span="24" style="display: flex">
            <p>
              <span><i :class="item.icon" /></span>
              <span>{{ item.title }}</span>
            </p>
          </el-col>
          <Suspense>
            <template #default>
              <component :is="componentSesult(item.path)"></component>
            </template>
          </Suspense>
        </el-row>
      </template>
    </VueDraggableNext>
  </div>
</template>
<script>
import { VueDraggableNext } from "vue-draggable-next";
import { defineAsyncComponent } from "vue";
export default {
  components: {
    VueDraggableNext,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      listData: [],
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 300,
      };
    },
  },
  mounted() {
    this.listData = this.list;
  },
  methods: {
    componentSesult(path) {
      return defineAsyncComponent(() => import("@/views/" + `${path}` + ".vue"));
    },
    onEnd() {
      this.$emit("onEnd", this.listData);
    },
    onStart() {},
  },
};
</script>
<style scoped>
</style>