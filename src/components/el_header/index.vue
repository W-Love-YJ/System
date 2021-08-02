<template>
  <el-row style="align-items: center; height: 60px">
    <el-col
      :span="12"
      style="font-size: 24px; display: flex; align-items: center"
    >
      <i :class="isClass" @click="switchFun"> </i>
      <el-breadcrumb separator="/" style="padding-left: 10px">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <template v-for="(item, index) in itemList" :key="index">
          <el-breadcrumb-item>{{ item }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </el-col>
    <el-col
      :span="12"
      style="display: flex; align-items: center; flex-direction: row-reverse"
    >
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="showThemeBox">一键换肤</el-dropdown-item>
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <screenfull
        id="screenfull"
        style="margin-right: 10px"
        class="right-menu-item hover-effect"
      />
      <el-tooltip content="回到首页" placement="bottom" effect="light">
        <i
          class="el-icon-s-promotion"
          style="margin-right: 10px; font-size: 26px"
          @click="clickFun"
        />
      </el-tooltip>
      <div style="display: flex; align-items: center">
        <svg-icon
          style="width: 26px; height: 26px"
          iconName="search"
          className="search-svg"
          @click="searchShow"
        ></svg-icon>
        <el-select
          ref="search"
          v-show="searchIsShow"
          v-model="valPath"
          @change="handleSelect"
          @keyup.enter="onKeydownEnter"
          clearable
          @clear="clearFun"
          filterable
          remote
          placeholder="搜索"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="(item, index) in states"
            :key="'搜索' + index"
            :label="item.value"
            :value="JSON.stringify(item)"
          >
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-dialog
      title="一键换肤"
      v-model="dialogVisible"
      width="60%"
      append-to-body
    >
      <el-theme></el-theme>
    </el-dialog>
  </el-row>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import elTheme from "@/components/el_theme/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
import { onBeforeRouteUpdate } from "vue-router";
export default {
  setup() {},
  data() {
    return {
      dialogVisible: false,
      valPath: "",
      loading: false,
      states: [],
      searchIsShow: false,
      itemList: [],
    };
  },
  computed: {
    ...mapState({
      userName: (state) => {
        return state.user.username;
      },
      isCollapse: (state) => {
        return state.user.isCollapse;
      },
      listMenu: (state) => {
        return state.user.listMenu;
      },
    }),
    isClass: function () {
      if (this.isCollapse) {
        return { "el-icon-s-fold": true, "el-icon-s-unfold": false };
      } else {
        return { "el-icon-s-fold": false, "el-icon-s-unfold": true };
      }
    },
  },
  components: {
    elTheme,
    Screenfull,
  },
  created() {
    onBeforeRouteUpdate((to) => {
      let valPath = [];
      if (to.path != "/home") {
        valPath = this.querySearch().filter((item) => {
          return item.path == to.path;
        });
        this.itemList = valPath[0].value.split(">");
      } else {
        this.itemList = [];
      }
    });

    let valPath = [];
    let path = this.$route.path;
    if (path != "/home") {
      valPath = this.querySearch().filter((item) => {
        return item.path == path;
      });
      this.itemList = valPath[0].value.split(">");
    }
  },
  methods: {
    ...mapMutations({ setIsCollapse: "user/setIsCollapse" }),
    ...mapActions({ logout: "user/logout" }),
    // 回到首页
    clickFun() {
      this.$router.push({ path: "/home" });
    },
    // 是否展开菜单
    switchFun() {
      this.setIsCollapse(!this.isCollapse);
    },
    // 是否显示搜索
    searchShow() {
      this.searchIsShow = !this.searchIsShow;
    },
    // 搜索方法
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        this.states = this.querySearch().filter((item) => {
          return item.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
        this.loading = false;
      }
    },
    // 搜索菜单数据整理
    querySearch() {
      let results = [];
      search(this.listMenu, "");
      function search(params, cbTitle) {
        params.forEach((element) => {
          let title = cbTitle;
          if (element.children.length != 0) {
            title = title + element.title + ">";
            search(element.children, title);
          } else {
            title += element.title;
            results.push({ value: title, path: element.path });
          }
        });
      }
      return results;
    },
    // 搜索回车
    onKeydownEnter() {
      if (this.states.length != 0) {
        this.handleSelect(JSON.stringify(this.states[0]));
      }
      this.$refs.search.blur();
    },
    // 搜索清空回到首页
    clearFun() {
      this.$router.push({ path: "/home" });
    },
    // 搜索选择跳转
    handleSelect(item) {
      if (item) {
        this.valPath = JSON.parse(item).value.split(">").slice(-1)[0];
        this.$router.push({ path: JSON.parse(item).path });
      }
    },
    // 退出登录
    handleCommand(command) {
      switch (command) {
        case "loginout":
          this.$confirm("是否退出登录", "系统提示", {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.logout().then(() => {
              location.reload(); // 为了重新实例化vue-router对象 避免bug
            });
          });
          break;

        default:
          break;
      }
    },
    // 一键换肤
    showThemeBox() {
      this.dialogVisible = true;
    },
  },
};
</script>
<style scoped lang="scss">
.el-dropdown-link {
  @include font_color("font_color1");
}
::v-deep .el-input__inner {
  background: transparent;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
  color: #fff;
}
::v-deep .el-breadcrumb__inner.is-link {
  color: #fff;
}
::v-deep .el-breadcrumb__inner {
  color: #e6e6e6;
}
::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #e6e6e6;
}
</style>
