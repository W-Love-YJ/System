<template>
  <div class="mainBox">
    <el-button :plain="true" @click="open1">成功</el-button>
    <el-button :plain="true" @click="open2">警告</el-button>
    <el-button :plain="true" @click="open3">消息</el-button>
    <el-button :plain="true" @click="open4">错误</el-button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "message",
  setup() {
    return {
      open1() {
        ElMessage.success({
          message: "恭喜你，这是一条成功消息",
          type: "success",
        });
      },
      open2() {
        ElMessage.warning({
          message: "警告哦，这是一条警告消息",
          type: "warning",
        });
      },
      open3() {
        ElMessage("这是一条消息提示");
      },
      open4() {
        ElMessage.error("错了哦，这是一条错误消息");
      },
    };
  },
});
</script>