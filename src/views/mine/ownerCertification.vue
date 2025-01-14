<template>
    <div class="container">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="username"
                    name="您的姓名"
                    label="您的姓名"
                    placeholder="请填写您的姓名"
                    :rules="[{ required: true, message: '请填写您的姓名' }]"
                />
                <van-field
                    v-model="result"
                    is-link
                    readonly
                    name="性别"
                    label="性别"
                    placeholder="点击选择性别"
                    @click="showPicker = true"
                />
                <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
                <van-picker
                    :columns="columns"
                    :model-value="pickerValue"
                    @confirm="onConfirm"
                    @cancel="showPicker = false"
                />
                </van-popup>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                提交
                </van-button>
            </div>
        </van-form>
    </div>
  </template>
  
  <script setup name="OwnerCertification">
  import { defineComponent, ref, reactive, onMounted, onActivated, onDeactivated } from "vue";
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/store/modules/user";
  import { useAppStore } from "@/store";
  import { useLoading } from "@/hooks/useLoading";
  import ScrollList from "@/components/localComponents/ScrollList/index.vue";
  import {getOwnersMeetingNotifyListApi} from "@/api/ownersMeeting.js";
    components: { ScrollList }
    const router = useRouter();
    const store = useUserStore();
    const appStore = useAppStore();
    const { startLoading, stopLoading } = useLoading();
  
    const result = ref('');
    const pickerValue = ref([]);
    const showPicker = ref(false);
    const columns = [
      { text: '男', value: '0' },
      { text: '女', value: '1' },
    ];

    const onConfirm = ({ selectedValues, selectedOptions }) => {
      result.value = selectedOptions[0]?.text;
      pickerValue.value = selectedValues;
      showPicker.value = false;
    };
      const onSubmit = (values) => {
        console.log('submit', values);
        };
      onActivated(() => {
        // console.log("keep-alive初始化");
      });
      onDeactivated(() => {
        // console.log("keep-alive卸载");
      });
  
      onMounted(() => {
        window.addEventListener("scroll", handleScroll, true);
      });
  
    
     
    
      function handleScroll(e) {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop; // 滚动条偏移量
        // console.log(scrollTop);
      }
  
  </script>
  
  <style lang="less" scoped>
 
  
 
  </style>
  