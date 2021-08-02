<template>
  <div class="eltable">
    <el-row
      v-if="list.IsUseExport == true"
      style="padding-bottom: 10px; float: right"
    >
      <el-popover placement="top-start" title="导出" trigger="hover">
        <template #reference>
          <el-button>导出</el-button>
        </template>
        <div>
          <el-button
            class="table_waianniu"
            type="primary"
            style="margin-bottom: 5px"
            @click="exportExcel_Nowpage()"
            >导出当前</el-button
          >
          <el-button
            class="table_waianniu"
            type="primary"
            style=""
            @click="exportExcel_Allpage()"
            >导出全部</el-button
          >
        </div>
      </el-popover>
    </el-row>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
        v-if="list.IsSerial"
        label="序号"
      >
      </el-table-column>
      <!-- 主要表头 -->
      <template v-for="(item, i) in list.TableListThead" :key="i">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          align="center"
          show-overflow-tooltip
        >
          <template #default="scope">
            <template
              v-if="
                typeof item.formatter != undefined &&
                typeof item.formatter != 'undefined'
              "
            >
              {{ comBackfuc(item.formatter, scope.row) }}
            </template>
            <template
              v-else-if="
                typeof item.scope != undefined &&
                typeof item.scope != 'undefined'
              "
            >
              <!-- <elTablescope
                v-bind:Ahtml="item.scope"
                v-bind:theRow="scope.row"
                v-bind:refName="'scope' + item.prop + scope.row.id"
                @comBackfuc="comBackfuc22"
                :ref="'scope' + item.prop + scope.row.id"
              /> -->
            </template>
            <template v-else>
              {{ scope.row[item.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="list.IsUseOperation == true"
        label="操作"
        prop="lalala"
        align="center"
      >
        <!-- 表头操作栏 -->
        <template #default="scope">
          <template v-for="(item, i) in list.ExtraOperation" :key="i">
            <span
              v-if="item.name != '删除'"
              style="padding: 5px; color: #409eff; cursor: pointer"
              @click="buttonMethods(item.click, scope.row)"
              >{{ item.name }}</span
            >
            <span
              v-else
              style="padding: 5px; color: #f56c6c; cursor: pointer"
              @click="buttonMethods(item.click, scope.row)"
              >{{ item.name }}</span
            >
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="typeof list.noPage == 'undefined' || list.noPage != true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="thetotal"
    >
    </el-pagination>

    <!-- 导出分页模拟表 -->
    <el-table v-show="false" :data="tableData_hide" ref="table_hide">
      <!-- 主要表头 -->
      <template v-for="(item, i) in list.TableListThead" :key="i">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          align="center"
          show-overflow-tooltip
        >
          <template #default="scope">
            <template
              v-if="
                typeof item.formatter != undefined &&
                typeof item.formatter != 'undefined'
              "
            >
              {{ comBackfuc(item.formatter, scope.row) }}
            </template>
            <template v-else>
              {{ scope.row[item.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
// import elTablescope from "@c/el_table/el_table_scope.vue"; // 引用组件
export default {
  components: {
    // elTablescope,
  },
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tableData_hide: [], // 导出用表格-展示数据
      tableData: [], // 表格-展示数据
      pageSizes: [10, 20, 30, 50], //
      pageSize: 10,
      thetotal: 0, // 表格总数
      currentPage: 1, // 显示第几页
    };
  },
  mounted() {
    console.log("获取传入参数", this.list);
    this.tableData = this.list.data;
    if (this.list.noPage) {
      if (
        this.list.pageSize != undefined &&
        this.list.pageSize != "undefined"
      ) {
        this.pageSize = this.list.pageSize;
      }
      if (
        this.list.currentPage != undefined &&
        this.list.currentPage != "undefined"
      ) {
        this.currentPage = this.list.currentPage;
      }
      if (
        this.list.thetotal != undefined &&
        this.list.thetotal != "undefined"
      ) {
        this.thetotal = this.list.thetotal;
      }

      if (
        this.list.pageSizes != undefined &&
        this.list.pageSizes != "undefined"
      ) {
        this.pageSizes = this.list.pageSizes;
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      // 改变每页数量 val
      // console.log(this);
      let trueThis = this.FindTrueParent(this.$parent);
      this.pageSize = val;
      this.currentPage = 1; // 显示页码也改为1
      this.$emit("handleSizeChange", val, trueThis); // 跳到第一页
    },
    handleCurrentChange(val) {
      let trueThis = this.FindTrueParent(this.$parent);
      // 点击跳转页码 val
      this.currentPage = val;
      this.$emit("handleCurrentChange", val, trueThis);
    },
    comBackfuc(funcName, row) {
      // 表中scope-formatter按钮 回调
      let methods = this.FindTrueParent(this.$parent).$options.methods;
      let trueThis = this.FindTrueParent(this.$parent);
      return methods[funcName](row, trueThis);
    },

    comBackfuc22(funcName, row, refName, extraParameter) {
      // 表中scope按钮 回调
      let methods = this.FindTrueParent(this.$parent).$options.methods;
      let trueThis = this.FindTrueParent(this.$parent);
      methods[funcName](row, trueThis, this.$refs[refName], extraParameter);
    },
    buttonMethods(funcName, row) {
      // 行尾按钮
      let methods = this.FindTrueParent(this.$parent).$options.methods;
      let trueThis = this.FindTrueParent(this.$parent);
      methods[funcName](row, trueThis);
    },
    // 导出当前页
    exportExcel_Nowpage() {
      let stringNumber = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      let newArr = [];
      for (let t in this.list.TableListThead) {
        if (
          typeof this.list.TableListThead[t].keepNumber != "undefined" &&
          this.list.TableListThead[t].keepNumber == true
        ) {
          newArr.push(stringNumber[t]);
        }
      }
      // console.log(newArr) // 需要保持数字格式的列

      this.tableData_hide = this.list.data; // 赋值表格数据
      // console.log(this.tableData_hide);
      this.$nextTick(() => {
        var xlsxParam = { raw: true }; // 转换成excel时，使用原始的格式
        // console.log(this.$refs);
        var wb = this.$XLSX.utils.table_to_book(
          this.$refs.table_hide.$el,
          xlsxParam
        );
        // console.log(wb)
        var toNumber = newArr;
        for (let i in wb.Sheets.Sheet1) {
          if (
            toNumber.indexOf(i.substr(0, 1)) != -1 &&
            i.substr(1, 1000) != "1"
          ) {
            wb.Sheets.Sheet1[i].t = "n";
            wb.Sheets.Sheet1[i].v = parseInt(wb.Sheets.Sheet1[i].v);
          }
        }
        var wbout = this.$XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        });
        try {
          this.$FileSaver.saveAs(
            new Blob([wbout], {
              type: "application/octet-stream;charset=utf-8",
            }),
            this.list.ExportNowpageName
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      });
    },
    // 导出全部
    exportExcel_Allpage() {},
    FindTrueParent(methodsPage) {
      // 找到正确的父级页面，限制20层 // 限制会一直找到main页面层（略过el-form等含vue实例的父级不停下）
      for (var i = 0; i < 20; i++) {
        if (
          typeof methodsPage.$options.methods == "undefined" ||
          typeof methodsPage.$el.className == "undefined" ||
          methodsPage.$el.className.indexOf("main") == -1
        ) {
          methodsPage = methodsPage.$parent;
        } else {
          return methodsPage;
        }
      }
      alert("未找到正确的父级页面！确认代码结构！");
    },
  },
};
</script>
<style scoped>
.table_waianniu {
  height: 40px;
  font-size: 16px;
  margin: 0;
}
</style>
