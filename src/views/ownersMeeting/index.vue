<template>
  <div class="container">
    <!-- <NavBar title="业主大会" :left-arrow="false" /> -->

    <div class="os-banner" v-if="isAuthentication">
      <div class="os-banner-item" style="margin-right: 10px;">
        <img src="/imgs/ownerServices/carbg3x.png" class="carbg" />
        <div class="banner-text">
          <div class="text-icon">
            <img src="/imgs/ownersMeeting/owner3x.png"  />
          </div>
          <div class="text-title">业主认证</div>
          <div class="text-detail">我要添加房屋</div>
        </div>
      </div>
      <div class="os-banner-item">
        <img src="/imgs/ownerServices/decorationbg@3x.png" />
        <div class="banner-text">
          <div class="text-icon">
            <img src="/imgs/ownersMeeting/household3x.png" />
          </div>
          <div class="text-title">住户认证</div>
          <div class="text-detail">我要入住房屋</div>
        </div>
      </div>
    </div>

    <div class="om-banner" v-else>
      <img src="/imgs/ownersMeeting/OMbg3x.png" class="swipe-img" />
      <div class="banner-text">
        <div class="text-icon">
          <img src="/imgs/ownersMeeting/owner3x.png" class="swipe-img" />
        </div>
        <div class="text-content">
          <div class="content-title">尊敬的业主，</div>
          <div class="content-title">欢迎使用通汇公寓管理</div>
          <div class="content-detail">单元信息：12幢一单元301</div>
        </div>
        <div class="text-status">
          <div class="status-icon">
            <img src="/imgs/ownersMeeting/certified3x.png"  />
          </div>
          <div class="status-text">
            已认证
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="page-title">
        <span>业主大会公示</span>
      </div>
     
      <div class="card-list">
        <div v-for="(item, index) in notifyList" class="card-list-item" :key="index">
          <img class="cover" :src="item.imgUrl" alt="">
          <div class="card-list-item-content">
            <div>
              <div class="title">{{item.title}}</div>
              <van-text-ellipsis class="sub-title" :content="richTextToPlainText(item.content)" />

              <!-- <div class="sub-title">以物业为主</div> -->
            </div>
            <div class="time">{{item.createTime}}</div>
          </div>
        </div>
      </div>
  



    </div>

    <tab-bar></tab-bar>
  </div>
</template>

<script setup name="Home">
import { defineComponent, ref, reactive, onMounted, onActivated, onDeactivated } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { useAppStore } from "@/store";
import { useLoading } from "@/hooks/useLoading";
import ScrollList from "@/components/localComponents/ScrollList/index.vue";
import {getOwnersMeetingNotifyListApi, noSignGetOwnersMeetingNotifyListApi} from "@/api/ownersMeeting.js";
import { getToken} from "@/utils/auth.js"
  components: { ScrollList }
    const router = useRouter();
    const store = useUserStore();
    const appStore = useAppStore();
    const { startLoading, stopLoading } = useLoading();
    const value = ref();

    const notifyList = ref([{
            imgUrl: '/imgs/dynamics/dynamicsBanner@3x.png',
            title: '物业管理显成效',
            content: '以物业为主以物业为主以物业为主以物业为主以物业为主以物业为主',
            createTime: '2024-01-01',
          },{
            imgUrl: '/imgs/dynamics/dynamicsBanner@3x.png',
            title: '物业管理显成效',
            content: '以物业为主以物业为主以物业为主以物业为主',
            createTime: '2024-01-01',
          }]);
    const isAuthentication = ref(false)

    onActivated(() => {
      // console.log("keep-alive初始化");
    });
    onDeactivated(() => {
      // console.log("keep-alive卸载");
    });

    onMounted(() => {
      getOwnersMeetingNotifyList()
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

    function getOwnersMeetingNotifyList() {
      const Api = getToken() ? getOwnersMeetingNotifyListApi() : noSignGetOwnersMeetingNotifyListApi()
      Api.then(res => {
        notifyList.value = res['业主大会公示'].length === 0 ? notifyList.value : res['业主大会公示']
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
  padding-top: 30px;
  :deep(.van-tabs__line) {
    bottom: 50px;
    width: 120px;
  }
  :deep(.van-tab.van-tab--line) {
    border-bottom: 1px solid #eee;
    height: 70px;
  }

  .os-banner {
    display: flex;
    margin: 30px;
    .os-banner-item {
      position: relative;
      .banner-text {
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: space-between;
        top: 30px;
        flex-direction: column;
        color: #fff;
        align-items: center;
        .text-icon {
          width: 60px;
          height: 60px;
        }
        .text-title {
          margin-top: 10px;
          font-size: 30px;
        }
        .text-detail {
          font-size: 20px;
          margin-top: 10px;
        }
      }
    }
  }
  
.om-banner {
  position: relative;
  margin: 30px;
  .banner-text {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    top: 25px;
    padding-left: 25px;
    padding-right: 25px;
    .text-icon {
      width: 60px;
      height: 100%;
    }
    .text-content {
      color: #fff;
      margin-right: 70px;
      .content-title {
        font-size: 30px;
      }
      .content-detail {
        font-size: 20px;
        margin-top: 40px;
      }
    }
    .text-status {
      display: flex;
      background-color: #fff;
      height: 40px;
      align-items: center;
      padding: 10px;
      border-radius: 20px;
      .status-icon {
        width: 30px;
        margin-right: 10px;
      }
      .status-text {
        color: #4ae29c;
        font-size: 20px;
      }
    }
  }
}
  .swipe-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
