<template>
  <div class="container">
    <!-- <NavBar title="业主服务" :left-arrow="false" /> -->
    <div class="os-banner">
      <div class="os-banner-item" style="margin-right: 10px;">
        <img src="/imgs/ownerServices/carbg3x.png" class="carbg" />
        <div class="banner-text">
          <div class="text-icon">
            <img src="/imgs/ownerServices/car3x.png"  />
          </div>
          <div class="text-title">租赁车位申请</div>
          <div class="text-detail">我要租赁车位</div>
        </div>
      </div>
      <div class="os-banner-item">
        <img src="/imgs/ownerServices/decorationbg@3x.png" />
        <div class="banner-text">
          <div class="text-icon">
            <img src="/imgs/ownerServices/decoration3x.png" />
          </div>
          <div class="text-title">房屋装修申请</div>
          <div class="text-detail">我要装修房屋</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="page-title">
        <span>便携服务</span>
        <span class="title-more">更多></span>
      </div> 
      <div class="content-card card">
        <div class="card-item" v-for="(item,index) in cardList" :key="index">
          <div class="item-icon">
            <img :src="item.img"  />
          </div>
          <div class="item-text">{{item.text}}</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="page-title">
        <span>约定公告</span>
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

<script setup name="OwnerServices">
import { defineComponent, ref, reactive, onMounted ,onActivated, onDeactivated} from "vue";
import ScrollList from "@/components/localComponents/ScrollList/index.vue";
import {getOwnerServicesNotifyListApi, noSignGetOwnerServicesNotifyListApi} from "@/api/ownerServices.js";
import { getToken} from "@/utils/auth.js"
  components: { ScrollList }

    const active = ref('');
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

    const cardList = [
      {
        img: '/imgs/ownerServices/online3x.png',
        text: '线上预约'
      },{
        img: '/imgs/ownerServices/payfees3x.png',
        text: '预约缴费'
      },{
        img: '/imgs/ownerServices/Offline3x.png',
        text: '现场办理'
      },{
        img: '/imgs/ownerServices/transport3x.png',
        text: '搬运计划'
      },
    ];

    onActivated(() => {
      // console.log("keep-alive初始化");
    });
    onDeactivated(() => {
      // console.log("keep-alive卸载");
    });

    onMounted(() => {
      getOwnerServicesNotifyList()
      window.addEventListener("scroll", handleScroll, true);
    });
    // JS富文本内容转化为不带元素标签的内容
    function richTextToPlainText(richText) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(richText, 'text/html');
      return doc.body.textContent || '';
    }
    function getOwnerServicesNotifyList() {
      const Api = getToken() ? getOwnerServicesNotifyListApi() : noSignGetOwnerServicesNotifyListApi()
      Api.then(res =>{
        notifyList.value = res['约定公告'].length === 0 ? notifyList.value : res['约定公告']
      })
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

  .swipe-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content-card {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    .card-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .item-icon {
        width: 70px;
        height: 100%;
      }
      .item-text {
        margin-top: 10px;
        font-size: 20px;
      }
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
      .title-more {
        position: absolute;
        font-size: 25px;
        color: #8484ff;
        right: 0;
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
