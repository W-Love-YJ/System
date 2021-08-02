<template>
  <div v-dragDialog>
    <el-dialog
      :title="$attrs['dialog-title'] || '提示'"
      custom-class="custom-dialog"
      v-model="show"
      :width="typeof dialogWidth == 'undefined' ? '60%' : dialogWidth"
      :modal="false"
      :before-close="closeFun"
    >
      <template #title style="display: flex">
        <span style="margin-right: 10px">{{
          $attrs["dialog-title"] || "提示"
        }}</span>
      </template>
      <slot />
    </el-dialog>
  </div>
</template>

<script>
import { dialogDrag } from "@/components/el_dialog/el-drag-dialog.js";
export default {
  directives: {
    dragDialog: {
      // 参数 el, binding, vnode, oldVnode
      mounted: function (el, binding, vnode, oldVnode) {
        dialogDrag(el, binding, vnode, oldVnode);
      },
    },
  },
  props: {
    dialogVisible: {
      type: Boolean,
    },
    dialogWidth: {
      type: String,
    },
    closeOnClickModal: {
      type: Boolean,
    },
  },
  watch: {
    dialogVisible: {
      immediate: true,
      handler(val) {
        this.show = val;
      },
    },
  },
  data() {
    return { show: false };
  },
  mounted() {},
  methods: {
    closeFun(){
      this.$emit('beforeClose')
    }
  },
};
</script>

<style></style>
