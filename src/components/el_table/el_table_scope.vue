<template>
  <div v-html="Ahtml"></div>
</template>

<script>
export default {
  name: "el_table_scope",
  props: ["Ahtml", "theRow", "refName"],
  data() {
    return {
      theScopeRow: {},
    };
  },
  created() {
    this.theScopeRow = this.theRow;
    try {
      // const compiler = require('vue-template-compiler')
      // var res = compiler.parse(this.Ahtml); // 直接返回render实例
      // console.log(res, this);
      // this.$options.render = res.render;
      // this.$options.staticRenderFns = res.staticRenderFns;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    buttonMethods(funcName, row, extraParameter) {
      // 行尾按钮
      // console.log(this.refName)
      console.log("表中 监听", funcName, row, this.refName, extraParameter);
      this.$emit("comBackfuc", funcName, row, this.refName, extraParameter);
    },
  },
};
</script>

<style scoped>
</style>
