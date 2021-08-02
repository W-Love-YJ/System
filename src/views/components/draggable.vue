<template>
  <div class="main">
    <vuedraggable :list="list" />
  </div>
</template>

<script>
import vuedraggable from "@/components/draggable/index.vue";
export default {
  name: "draggable",
  components: {
    vuedraggable,
  },
  data() {
    return {
      list: [
        {
          id: "1",
          title: "卡片",
          name: "compcard",
          icon: "el-icon-menu",
          path: "test/card",
        },
        {
          id: "2",
          title: "描述列表",
          name: "compdescriptions",
          icon: "el-icon-menu",
          path: "test/Descriptions",
        },
        {
          id: "3",
          title: "空状态",
          name: "compempty",
          icon: "el-icon-menu",
          path: "test/empty",
        },
        {
          id: "4",
          title: "图标",
          name: "compicon",
          icon: "el-icon-menu",
          path: "test/icon",
        },
        {
          id: "5",
          title: "加载",
          name: "comploading",
          icon: "el-icon-menu",
          path: "test/loading",
        },
        {
          id: "6",
          title: "消息提示",
          name: "compmessage",
          icon: "el-icon-menu",
          path: "test/message",
        },
        {
          id: "7",
          title: "结果",
          name: "compresult",
          icon: "el-icon-menu",
          path: "test/result",
        },
        // {
        //   id: "8",
        //   title: "表格",
        //   name:'comptable',
        //   icon:'el-icon-menu',
        //   path: "test/table",
        // },
        {
          id: "9",
          title: "树结构",
          name: "tree-comp",
          icon: "el-icon-menu",
          path: "test/tree",
        },
      ],
    };
  },
};
</script>