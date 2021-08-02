<template>
  <div class="main">
    <el-button type="primary" @click="showFun">弹窗</el-button>
    <elDialog
      dialog-title="可拖动弹出框"
      :dialogVisible="show"
      dialogWidth="600px"
      @beforeClose="beforeClose"
    >
      <el-empty description="可拖动弹出框"></el-empty>
    </elDialog>
  </div>
</template>
<script>
import elDialog from "@/components/el_dialog/index.vue";
export default {
  name:'vdialog',
  components: { elDialog },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showFun() {
      this.show = !this.show;
    },
    beforeClose(){
        this.show = false
    }
  },
};
</script>