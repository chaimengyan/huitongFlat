<template>
  <div class="container">
    <NavBar title="个人中心" :left-arrow="false" />
    <div class="mine-banner">
      <img src="/imgs/mine/minebg3x.png" class="swipe-img" />
      <div class="banner-info">
        <img src="/imgs/mine/avatar3x.png" class="avatar-img" />
        <div class="info-text">
          <div class="text-name">hello,xiaoming</div>
          <div class="text-des">欢迎使用通汇公寓管理</div>
        </div>
      </div>
    </div>
    <div class="content">
      <van-row :gutter="[20, 20]">
        <van-col span="12" v-for="(item,index) in cardList" :key="index">
          <div :class="[0,2].includes(index) ? 'mine-card card mr' : 'mine-card card'">
            <img :src="item.img" class="card-img" />
            <div class="card-text">
              <div class="text-title">{{item.text}}</div>
              <div class="text-des">{{item.des}}</div>
            </div>
          </div>
        </van-col>
      </van-row>

      <div class="mine-cell card">
        <van-cell icon="/imgs/mine/household3x.png" title="住户认证" is-link >
          <template #right-icon>
            <div style="display: flex;align-items: center;">
              <div class="cell-value-yes">已认证</div>
              <van-icon name="arrow" />
            </div>
          </template>
        </van-cell>
        <van-cell icon="/imgs/mine/OwnerCertification3x.png" title="业主认证" is-link >
          <template #right-icon>
            <div style="display: flex;align-items: center;">
              <div class="cell-value-no">未认证</div>
              <van-icon name="arrow" />
            </div>
          </template>
        </van-cell>
        <van-cell icon="/imgs/mine/collect3x.png" title="意见收集" is-link>
          <template #right-icon>
            <div style="display: flex;align-items: center;">
              <van-icon name="arrow" />
            </div>
          </template>
        </van-cell>
      </div>
      <div class="mine-btn">
        <van-button round block color="#1989fa" style="margin-top:40px;width: 50%;" >
          退出登录  
        </van-button>
      </div>
     
    </div>

    <tab-bar></tab-bar>
  </div>
</template>

<script setup name="Mine">
import { defineComponent, ref, reactive, onMounted ,onActivated, onDeactivated} from "vue";
import ScrollList from "@/components/localComponents/ScrollList/index.vue";
  components: { ScrollList }

    const active = ref('');
    const list = ref([{}, {}]);

    const cardList = [
      {
        img: '/imgs/mine/unit3x.png',
        text: '单元信息',
        des: '17幢 一单元 502'
      },{
        img: '/imgs/mine/parkingLot3x.png',
        text: '车位信息',
        des: 'AG-03-1002'
      },{
        img: '/imgs/mine/authentication3x.png',
        text: '尊敬的住户',
        des: '已完成当前身份认证'
      },{
        img: '/imgs/mine/contact3x.png',
        text: '联系方式',
        des: '18236466372'
      },
    ];

    onActivated(() => {
      // console.log("keep-alive初始化");
    });
    onDeactivated(() => {
      // console.log("keep-alive卸载");
    });

    onMounted(() => {

      window.addEventListener("scroll", handleScroll, true);
    });


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

  .mine-btn {
    width: 100%;
    display: flex;
    justify-content: center;
  }
.mine-banner {
  position: reactive;
  .banner-info {
    position: absolute;
    top: 240px;
    left: 40px;
    color: #fff;
    display: flex;
    justify-content: start;
    width: 100%;
    align-items: center;
    .avatar-img {
      border-radius: 50%;
      width: 160px;
      margin-right: 40px;
    }
    .info-text {
      .text-name {
        font-size: 30px;
      }
      .text-des {
        font-size: 20px;
        margin-top: 10px;
      }
    }
  }
}
  .mr {
    margin-right: 20px;
  }
  .content {
    text-align: center;
    padding: 30px;
    box-sizing: border-box;
    margin-top: -140px;
    .mine-card {
      display: flex;
      align-items: center;
      margin-top: 20px;
      .card-img {
        border-radius: 50%;
        width: 80px;
      }
      .card-text {
        margin-left: 20px;
        .text-title {
          font-size: 26px;
          font-weight: 600;
        }
        .text-des {
          font-size: 20px;
          color: #7e7e7e;
          margin-top: 10px;
        }
      }
    }
    .mine-cell {
      margin-top: 40px;
      text-align: left;
      .cell-value-yes {
        color: #16d0af;
      }
      .cell-value-no {
        color: red;
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

    }
  }


.van-theme-dark {
  .container {
    background-color: #000;
  }
}
</style>
