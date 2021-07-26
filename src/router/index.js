import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"
import Home from '../views/Home/'
import Login from '@/views/Login'
import Logon from '@/views/Logon'
import FindBack from '@/views/findBack'
import Loading from '@/views/Loading'
import Statistics from '@/views/Page/Statistics'
import GoodsList from '@/views/Page/goods/Goodslist'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: {
      path: '/statistics'
    },
    children: [
      {
        path: '/statistics',
        name: "Statistics",
        component: Statistics,
        meta: {
          title: '统计',
          icon: 'area-chart',
          isPage: true,
          InspectionRights: true,
        }
      }
    ],
    meta: {
      InspectionRights: true,
      title: '主页',
      icon: 'home',
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true,
    meta: {
      InspectionRights: false,
    }
  },
  {
    path: '/logon',
    name: 'Logon',
    component: Logon,
    hidden: true,
    meta: {
      InspectionRights: false,
    }
  },
  {
    path: '/findBack',
    name: 'FindBack',
    component: FindBack,
    hidden: true,
    meta: {
      InspectionRights: false,
    }
  },
  {
    path: '/loading',
    name: 'Loading',
    component: Loading,
    hidden: true,
    meta: {
      InspectionRights: false,
    }
  }
]
const asyncRouterMap = [
  {
    path: '/goods',
    name: 'goods',
    component: Home,
    redirect: {
      path: '/list'
    },
    meta: {
      title: '商品',
      icon: 'inbox',
      InspectionRights: false,
    },
    children: [
      {
        path: '/list',
        name: 'goodsList',
        meta: {
          title: '商品列表',
          icon: 'unordered-list',
          InspectionRights: true,
        },
        component: GoodsList,
      },
      {
        path: '/add',
        name: 'goodsAdd',
        meta: {
          title: '新增商品',
          icon: 'file-add',
          InspectionRights: true,
        },
        component: () => import('@/views/Page/goods/add.vue'),
      },
      {
        path: '/category',
        name: 'goodsCategory',
        hidden: (() => {
        })(),
        meta: {
          title: '商品类别管理',
          icon: 'category',
          InspectionRights: false,
        },
        component: () => import('@/views/Page/goods/category.vue'),
      },
      {
        path: 'edit/:id',
        name: 'goodsEdit',
        hidden:true,
        meta: {
          title: '编辑商品',
          icon: 'file-add',
          InspectionRights: true,
        },
        component: () => import('@/views/Page/goods/add'),
      }
    ],
  },
];
routes = [
  ...routes,
  ...asyncRouterMap
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
router.beforeEach((to, from, next) => {
  if (to.meta.InspectionRights) {
    const status = store.getters['isLogin/status'];
    if (status == 'loading') {
      next(
        {
          path: '/loading',
          query: {
            returnurl: to.fullPath,
          }
        })
    } else if (status == 'login') {
      next()
    } else {
      alert('请先登录');
      next(
        {
          path: '/logon',
          query: {
            returnurl: to.fullPath,
          }
        })
    }
  } else {
    next();
  }
});
export { routes }

export default router

