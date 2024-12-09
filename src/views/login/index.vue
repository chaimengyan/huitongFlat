<template>
  <div class="container loginBg" >
    
    <div class="content">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
    <!-- 底部导航 -->
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  setup() {
    const username = ref('');
    const password = ref('');
    const onSubmit = (values) => {
      console.log('submit', values);
    };
    onMounted(() => {
      console.log('66666');
    })
    return {
      username,
      password,
      onSubmit,
    };
  },
});
</script>

<style lang="less" scoped>
.loginBg {
  background-image: url('@/assets/images/login/loginBg3x.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100vh;
}
</style>
