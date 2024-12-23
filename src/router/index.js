import { createRouter, createWebHashHistory } from "vue-router";
import useSettingsStore from "@/store/modules/settings";

let routes = [
  { path: "/", redirect: "/dynamics" },
  {
    path: "/dynamics",
    name: "Dynamics",
    meta: { title: "小区动态", keepAlive: true },
    component: () => import("@/views/dynamics/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录" },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { title: "注册" },
    component: () => import("@/views/login/register.vue"),
  },
  {
    path: "/ownersMeeting",
    name: "OwnersMeeting",
    meta: { title: "业主大会" },
    component: () => import("@/views/ownersMeeting/index.vue"),
  },
  {
    path: "/ownerServices",
    name: "OwnerServices",
    meta: { title: "业主服务" },
    component: () => import("@/views/ownerServices/index.vue"),
  },
  {
    path: "/mine",
    name: "Mine",
    meta: { title: "我的" },
    component: () => import("@/views/mine/index.vue"),
  },
  {
    path: "/integral",
    name: "Integral",
    meta: { title: "积分商城", keepAlive: true },
    component: () => import("@/views/integral/index.vue"),
  },
  {
    // 配置404页面
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("@/views/exception/NotFound.vue"),
  },
];
// 路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // scrollBehavior: () => ({ left: 0, top: 0 }),
  scrollBehavior(to, from, savePosition) {
    // console.log('savePosition:', savePosition);
    if (savePosition) {
      // 解决页面从列表页跳转到详情页返回,初始在原来位置
      return savePosition;
    } else {
      // 解决页面跳转后页面高度和前一个页面高度一样
      return { left: 0, top: 0 };
    }
  },
});

// 导航守卫
router.beforeEach((to, from, next) => {
  to.meta.title && useSettingsStore().setTitle(to.meta.title);
  next();
});
// 导出
export default router;
