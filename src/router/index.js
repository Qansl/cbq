import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProjectList from '@/components/ProjectList'
import ProjectDetails from '@/components/ProjectDetails'
import Proc from '@/components/Proc'
import Intro from '@/components/Intro'
import Service from '@/components/Service'
import Order from '@/components/Order'
import PaySuccess from '@/components/PaySuccess'
import Chat from '@/components/Chat'
import User from '@/components/user/User.vue'
import UserHome from '@/components/user/Home.vue'
import UserProfile from '@/components/user/Profile.vue'
import MyProject from '@/components/user/MyProject.vue'
import Finance from '@/components/user/Finance.vue'
import Message from '@/components/user/Message.vue'
import Info from '@/components/user/Info.vue'
import BindCard from '@/components/BindCard.vue'
import BindCardSuccess from '@/components/BindCardSuccess.vue'

import MOrder from '@/components/m/Order'
import MOrderPay from '@/components/m/OrderPay'
import MUser from '@/components/m/user/User.vue'
import MUserHome from '@/components/m/user/Home'
import MUserInfo from '@/components/m/user/Info'
import MEditNick from '@/components/m/user/EditNick'
import MEditMobile from '@/components/m/user/EditMobile'
import MEditPwd from '@/components/m/user/EditPwd'
import MMessage from '@/components/m/user/Message'
import MAuth from '@/components/m/user/Auth'
import MFinance from '@/components/m/user/Finance'
import MMyProject from '@/components/m/user/MyProject'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/projectlist',
      component: ProjectList
    },
    {
      path: '/projectdetails/:type/:shopid',
      component: ProjectDetails
    },
    {
      path: '/proc',
      component: Proc
    },
    {
      path: '/intro',
      component: Intro
    },
    {
      path: '/service',
      component: Service
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/paysuccess',
      component: PaySuccess
    },
    {
      path: '/chat',
      component: Chat
    },
    {
      path: '/user',
      component: User,
      children: [
        {
          path: 'home',
          component: UserHome
        },
        {
          path: 'profile',
          component: UserProfile
        },
        {
          path: 'myproject',
          component: MyProject
        },
        {
          path: 'finance',
          component: Finance
        },
        {
          path: 'message',
          component: Message
        },
        {
          path: 'info',
          component: Info
        }
      ]
    },
    {
      path: '/bindcard',
      component: BindCard
    },
    {
      path: '/bindcardsuccess',
      component: BindCardSuccess
    },
    {
      path: '/morder',
      component: MOrder
    },
    {
      path: '/morderpay',
      component: MOrderPay
    },
    {
      path: '/muser',
      component: MUser,
      children: [
        {
          path: 'home',
          component: MUserHome
        },
        {
          path: 'info',
          component: MUserInfo
        },
        {
          path: 'editnick',
          component: MEditNick
        },
        {
          path: 'editmobile',
          component: MEditMobile
        },
        {
          path: 'editpwd',
          component: MEditPwd
        },
        {
          path: 'message',
          component: MMessage
        },
        {
          path: 'auth',
          component: MAuth
        },
        {
          path: 'finance',
          component: MFinance
        },
        {
          path: 'myproject',
          component: MMyProject
        },
      ]
    },
  ]
})
