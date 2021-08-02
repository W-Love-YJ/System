<template>
  <div class="mainBox">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>卡片名称</span>
          <el-button class="button" type="text">操作按钮</el-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ "列表内容 " + o }}
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "card",
};
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
