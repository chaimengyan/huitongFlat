<template>
  <div class="container">
<!--    <van-swipe class="my-swipe" :autoplay="2000">-->
<!--      <van-swipe-item v-for="item in bannerList" :key="item">-->
<!--        <img :src="item.url" class="swipe-img" />-->
<!--      </van-swipe-item>-->
<!--      <template #indicator="{ active, total }">-->
<!--        <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>-->
<!--      </template>-->
<!--    </van-swipe>-->
    <!-- <NavBar title="小区动态" :left-arrow="false" /> -->
    <div class="dynamics-banner">
      <img src="/imgs/dynamics/dynamicsBanner@3x.png" class="swipe-img" />
      <div class="banner-learn">
        点击了解
      </div>
    </div>
    <div class="content">
      <div class="page-title">
        <span>通知公告</span>
      </div>
      <van-tabs v-model:active="active">
        <van-tab v-for="(item,index) in notifyList" :title="item" :key="index">
          <div class="card-list">
            <div v-for="n in notifyItemList[item]" class="card-list-item">
              <img class="cover" :src="n.imgUrl" alt="">
              <div class="card-list-item-content">
                <div>
                  <div class="title">{{n.title}}</div>
                  <van-text-ellipsis class="sub-title" :content="richTextToPlainText(n.content)" />
                  <!-- <div class="sub-title" v-html="n.content"></div> -->
                </div>
                <div class="time">{{n.createTime}}</div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>



    </div>

    <tab-bar></tab-bar>
  </div>
</template>

<script name="dynamics" setup>
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { onActivated, onDeactivated } from "vue";
import { useUserStore } from "@/store/modules/user";
import { useAppStore } from "@/store";
import { useLoading } from "@/hooks/useLoading";
import ScrollList from "@/components/localComponents/ScrollList/index.vue";
import {getCommunityDynamicsNotifyListApi, noSignGetCommunityDynamicsNotifyListApi} from "@/api/dynamics.js";
import { getToken} from "@/utils/auth.js"

  components: { ScrollList }
    const router = useRouter();
    const store = useUserStore();
    const appStore = useAppStore();
    const { startLoading, stopLoading } = useLoading();
    

    const slider = ref(50);
    const active = ref('');
    const notifyList = ref(['政府通知', '业委会通知', '物业通知']);
    const notifyItemList = ref({
          '政府通知': [{
            imgUrl: '/imgs/dynamics/dynamicsBanner@3x.png',
            title: '物业管理显成效',
            content: '以物业为主以物业为主以物业为主以物业为主以物业为主以物业为主',
            createTime: '2024-01-01',
          },{
            imgUrl: '/imgs/dynamics/dynamicsBanner@3x.png',
            title: '物业管理显成效',
            content: '以物业为主以物业为主以物业为主以物业为主',
            createTime: '2024-01-01',
          }], 
          '业委会通知': [{
            imgUrl: '/imgs/dynamics/dynamicsBanner@3x.png',
            title: '物业管理显成效',
            content: '以物业为主以物业为主以物业为主以物业为主以物业为主以物业为主',
            createTime: '2024-01-01',
          },{
            imgUrl: '/imgs/dynamics/dynamicsBanner@3x.png',
            title: '物业管理显成效',
            content: '以物业为主以物业为主以物业为主以物业为主',
            createTime: '2024-01-01',
          }], 
          '物业通知': [{
            imgUrl: '/imgs/dynamics/dynamicsBanner@3x.png',
            title: '物业管理显成效',
            content: '以物业为主以物业为主以物业为主以物业为主以物业为主以物业为主',
            createTime: '2024-01-01',
          },{
            imgUrl: '/imgs/dynamics/dynamicsBanner@3x.png',
            title: '物业管理显成效',
            content: '以物业为主以物业为主以物业为主以物业为主',
            createTime: '2024-01-01',
          }]
        });

    onActivated(() => {
      // console.log("keep-alive初始化");
    });
    onDeactivated(() => {
      // console.log("keep-alive卸载");
    });

    onMounted(() => {
      getCommunityDynamicsNotifyList()
      window.addEventListener("scroll", handleScroll, true);
    });

    // themeVars 内的值会被转换成对应 CSS 变量
    // 比如 sliderBarHeight 会转换成 `--van-slider-bar-height`
    const themeVars = reactive({
      rateIconFullColor: "#07c160",
      sliderBarHeight: "4px",
      sliderButtonWidth: "20px",
      sliderButtonHeight: "20px",
      sliderActiveBackground: "#07c160",
      buttonPrimaryBackground: "#07c160",
      buttonPrimaryBorderColor: "#07c160",
    });
    function getCommunityDynamicsNotifyList() {
      const Api = getToken() ? getCommunityDynamicsNotifyListApi() : noSignGetCommunityDynamicsNotifyListApi()
      Api.then(res=>{
        notifyList.value = Object.keys(res).length === 0 ? notifyList.value : Object.keys(res)
        notifyItemList.value = res
      })
    }

    // JS富文本内容转化为不带元素标签的内容
    function richTextToPlainText(richText) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(richText, 'text/html');
      return doc.body.textContent || '';
    }
    function handleToIntegralPage() {
      router.push("/integral");
    }

    function handleScroll(e) {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; // 滚动条偏移量
      // console.log(scrollTop);
    }


</script>

<style lang="less" scoped>
.container {

  :deep(.van-tabs__line) {
    bottom: 50px;
    width: 120px;
  }
  :deep(.van-tab.van-tab--line) {
    border-bottom: 1px solid #eee;
    height: 70px;
  }

  .my-swipe {
    .van-swipe-item {
      height: 250px;
      line-height: 300px;

      .swipe-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      border-radius: 22px;
      background: rgba(0, 0, 0, 0.3);
    }
  }
.dynamics-banner {
  position: reactive;
  .banner-learn {
    position: absolute;
    top: 460px;
    left: 40px;
    font-size: 25px;
    font-weight: 600;
    background: #fff;
    border-radius: 30px;
    padding: 5px 60px;
    color: #2d68ff;
  }
}
  .content {
    text-align: center;
    padding: 30px;
    box-sizing: border-box;

    .page-title {
      text-align: left;
      position: relative;
      font-size: 35px;
      font-weight: 600;
      margin-bottom: 20px;
      >span {
        padding-left: 20px;
      }
      &::before {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        content: "";
        width: 10px;
        height: 80%;
        background: #2d68ff;
      }
    }
  }

  }


  .card-list {
    display: flex;
    flex-direction: column;
    .card-list-item {
      display: flex;
      align-items: flex-start;
      padding: 30px 0;
      border-bottom: 1px solid #eee;

      .cover {
        width: 220px;
        height: 140px;
      }

      .card-list-item-content {
        text-align: left;
        align-self: normal;
        width: 0;
        flex-grow: 1;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-weight: 600;
          font-size: 25px;
        }

        .sub-title {
          color: #575757;
          font-size: 20px;
          margin-top: 5px;
        }

        .time {
          color: #575757;
          font-size: 20px;
        }
      }
    }
  }


.van-theme-dark {
  .container {
    background-color: #000;
  }
}
</style>
