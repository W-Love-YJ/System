<template>
  <div class="box">
    <div class="color_content">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="content_div1"
        :class="'content_div' + (index + 1)"
        @click="theme(item.class)"
        :title="item.title"
        :style="{ 'background-image': item.color }"
      >
        <span v-if="item.current">√</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "theme",
  data() {
    return {
      list: [
        {
          title: "蓝色",
          class: "blue",
          color: "linear-gradient(to right, #2b32b2, #4465C5)",
          current: false,
        },
        {
          title: "紫色",
          class: "glup",
          color: "linear-gradient(to right, #a83279, #b04167)",
          current: false,
        },
        {
          title: "红色",
          class: "red",
          color: "linear-gradient(to right, #cb2d3e, #d0313d)",
          current: false,
        },
        {
          title: "绿色",
          class: "green",
          color: "linear-gradient(to right, #2E8942, #3EA655)",
          current: false,
        },
        {
          title: "黑色",
          class: "black",
          color: "linear-gradient(to right, rgb(54, 58, 65), rgb(54, 58, 65))",
          current: false,
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 点击对应的颜色块进行意见换肤
    theme(type) {
      // 将对应的数据存储到sessionStorage，方便后续使用
      sessionStorage.setItem("type", type);
      // 全局添加样式名称：data-theme，并在sessionStorage获取对应的样式名称的值。
      window.document.documentElement.setAttribute(
        "data-theme",
        sessionStorage.getItem("type")
      );
      this.init();
    },
    init() {
      let _this = this;
      let types = sessionStorage.getItem("type");
      for (let i = 0; i < _this.list.length; i++) {
        _this.list[i].current = false;
        if (types === null) {
          _this.list[0].current = true;
        } else {
          if (_this.list[i].class === types) {
            _this.list[i].current = true;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.color_content {
  width: 550px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 2px;
  box-shadow: -2px 5px 12px 4px #f0f0f0;
  .content_div1 {
    width: 80px;
    height: 80px;
    margin-right: 25px;
    cursor: pointer;
    color: #fff;
    text-align: center;
    line-height: 80px;
    span {
      font-size: 30px;
      font-weight: bold;
    }
  }
  div:last-child {
    margin-right: 0px;
  }
}
</style>
