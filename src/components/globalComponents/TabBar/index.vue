<template>
  <div class="custom-tab-bar">
    <van-tabbar
      route
      v-model="active"
      @change="onChange"
      @before-change="handleBeforeChange()"
      placeholder
      safe-area-inset-bottom
    >
      <van-tabbar-item
        v-for="(item, index) in list"
        :key="index"
        :to="item.name"
        replace
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: 'TabBar',
  setup() {
    const active = ref(0);

    const list = [
      {
        name: "/dynamics",
        title: "小区动态",
        active: new URL("/imgs/navbar/dynamicsA3x.png", import.meta.url).href,
        normal: new URL("/imgs/navbar/dynamics3x.png", import.meta.url).href,
      },
      // {
      //   name: "/login",
      //   title: "登录",
      //   active: new URL("@/assets/icons/home.svg", import.meta.url).href,
      //   normal: new URL("@/assets/icons/un_home.svg", import.meta.url).href,
      // },
      {
        name: "/ownersMeeting",
        title: "业主大会",
        active: new URL("/imgs/navbar/ownersMeetingA3x.png", import.meta.url).href,
        normal: new URL("/imgs/navbar/ownersMeeting3x.png", import.meta.url).href,
      },
      {
        name: "/ownerServices",
        title: "业主服务",
        active: new URL("/imgs/navbar/ownerServicesA3x.png", import.meta.url).href,
        normal: new URL("/imgs/navbar/ownerServices3x.png", import.meta.url).href,
      },
      {
        name: "/mine",
        title: "个人中心",
        active: new URL("/imgs/navbar/mineA3x.png", import.meta.url).href,
        normal: new URL("/imgs/navbar/mine3x.png", import.meta.url).href,
      },
    ];

    const onChange = (index) => {
      console.log("index：", index);
    };
    const handleBeforeChange = (e) => {
      console.log("=====", e);
      return false;
    };

    return { active, list, onChange, handleBeforeChange };
  },
});
</script>

<style lang="less" scoped></style>
