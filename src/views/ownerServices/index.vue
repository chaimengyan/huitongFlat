<template>
  <div class="container">
    <NavBar title="业主服务" :left-arrow="false" />
    <no-data></no-data>
    <!-- 底部导航 -->
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped></style>