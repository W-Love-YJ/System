<template>
  <div class="main">
    <v-elTable
      :list="list"
      @handleSizeChange="sizeChange"
      @handleCurrentChange="currentChange"
      v-if="showTable"
    ></v-elTable>
  </div>
</template>

<script>
import velTable from "@/components/el_table/el_table.vue";
import { text } from "@/api/mockuser";
export default {
  name: "V_table",
  components: {
    "v-elTable": velTable,
  },
  data() {
    return {
      showTable: false,
      list: {
        data: [], //表格数据
        IsSerial: true, //是否显示序号
        TableListThead: [
          {
            prop: "foo",
            label: "标识",
          },
          {
            prop: "bar",
            label: "内容",
          },
        ], //表头
        ExtraOperation: [
          {
            name: "详情",
            click: "handlerDetail",
          },
          {
            name: "编辑",
            click: "handlerUpdate",
          },
          {
            name: "删除",
            click: "handlerDelete",
          },
        ], // 操作栏-自定义按钮
        IsUseOperation: true, // 是否开启操作栏
        IsUseExport: true, // 开启导出按钮
        ExportNowpageName: "(当前分页).xlsx", // 本页导出-文件名
        ExportAllpageName: "(所有分页).xlsx", // 全部导出-文件名
        noPage: true, //取消分页
        // 非必填
        pageSizes: [10, 20, 30, 50], //
        pageSize: 10, // 每页多少条
        thetotal: 0, // 表格总数
        currentPage: 1, // 显示第几页
      },
      queryItem: {
        pageNo: 1,
        pageSize: 10,
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    update(row, _this) {
      console.log(row, _this);
    },
    getList() {
      let _this = this;
      text(this.queryItem).then((res) => {
        if (res.code == 200) {
          _this.list.data = res.data;
          _this.list.thetotal = res.total;
          _this.showTable = false;
          _this.$nextTick(() => {
            _this.showTable = true;
          });
        }
      });
    },
    //翻页事件
    sizeChange(size, _this) {
      _this.queryItem.pageSize = size;
      _this.list.pageSize = size;
      _this.getList();
    },
    currentChange(current, _this) {
      _this.queryItem.pageNo = current;
      _this.list.currentPage = current;
      _this.getList();
    },
    handlerDetail(row, _this) {
      console.log(row, _this);
    },
    handlerUpdate(row, _this) {
      console.log(row, _this);
    },
    handlerDelete(row, _this) {
      console.log(row, _this);
    },
  },
};
</script>

<style>
</style>