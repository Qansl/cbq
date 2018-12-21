<template>
  <div>
    <h1 class="g-title-mobile">个人中心</h1>
    <div class="main">
      <div class="basic-wrapper">
        <div class="basic" @click="toInfo">
          <img class="avator" :src="decodeURIComponent($store.state.userInfo.icon)" alt>
          <div class="account">
            <div class="mobile">{{transferMobile($store.state.userInfo.phone)}}</div>
            <div class="no">账号：{{$store.state.userInfo.userid}}</div>
          </div>
          <i class="icon-more"></i>
        </div>
      </div>
      <div class="stat-con">
        <ul class="list">
          <li class="item">
            <div class="no">{{user_sum_income}}</div>
            <div class="desc">总收入</div>
          </li>
          <li class="item">
            <div class="no">{{userInfo.current_coin}}</div>
            <div class="desc">余额</div>
          </li>
        </ul>
        <span style="flex:1"></span>
        <button class="btn">提现</button>
        <button class="btn green">充值</button>
      </div>
      <ul class="menu">
        <li class="item" @click="toFinance">
          <i class="icon icon-finance"></i>
          <span>财务管理</span>
          <i class="icon-more"></i>
        </li>
        <li class="item" @click="toMyProject">
          <i class="icon icon-project"></i>
          <span>项目管理</span>
          <i class="icon-more"></i>
        </li>
      </ul>
      <ul class="menu">
        <li class="item" @click="toMessage">
          <span>消息中心</span>
          <i class="icon-more"></i>
        </li>
      </ul>
      <ul class="menu">
        <li class="item">
          <span>联系我们</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { request,SITEID } from "../../../api/api";
export default {
    data() {
      return {
        userInfo:{},
        user_sum_income:0.00
      }
    },
    mounted:function(){
     this.get_user_details();
     this.get_user_sum_income();
    },
  methods: {
    //获取用户详细信息
    get_user_details:function(){
      var _this = this;
      request("com.iiding.common.user.get_user_detail",{},res => {
        if(res.code == "success"){
          _this.userInfo = res.data;
        }
      })
    },
        //查询用户总收入
    get_user_sum_income:function(){
      var _this = this;
      request("com.iiding.web.personal_center.user_manage.get_all_income",{},res => {
        if(res.code == "success"){
          _this.user_sum_income = res.data;
        }
      })
    },
    transferMobile(v) {
      return v.substr(0, 3) + "****" + v.substr(7, 4);
    },
    toInfo() {
      this.$router.push("/muser/info");
    },
    toMessage() {
      this.$router.push("/muser/message");
    },
    toFinance() {
      this.$router.push("/muser/finance");
    },
    toMyProject() {
      this.$router.push("/muser/myproject");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/vars.scss";
.main {
  padding-top: 47px;
  .basic-wrapper {
    height: 110px;
    background: rgba(255, 255, 255, 1);
    padding: 10px 14px;
    box-sizing: border-box;
    .basic {
      width: 100%;
      height: 90px;
      background: linear-gradient(
        135deg,
        rgba(255, 136, 0, 1) 0%,
        rgba(255, 80, 0, 1) 100%
      );
      box-shadow: 0px 1px 7px 0px rgba(255, 81, 2, 0.7);
      border-radius: 4px;
      padding: 15px;
      box-sizing: border-box;
      display: flex;
      position: relative;
      .avator {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 15px;
      }
      .account {
        display: flex;
        flex-direction: column;
        .mobile {
          font-size: 18px;
          color: rgba(255, 255, 255, 1);
          line-height: 23px;
        }
        .no {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 19px;
          margin-top: 6px;
        }
      }
      .icon-more {
        width: 18px;
        height: 32px;
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        background: url("//pic.iidingyun.com/1000//file/20181201/75797.png")
          no-repeat center center;
        background-size: 50% 50%;
      }
    }
  }
  .stat-con {
    display: flex;
    align-items: center;
    margin-top: 15px;
    background: #ffffff;
    padding: 15px 19px;
    box-sizing: border-box;
    .list {
      display: flex;
      .item {
        position: relative;
        .no {
          font-size: 20px;
          font-weight: bold;
          color: $front-color;
          line-height: 23px;
          font-family: MyFont;
        }
        .desc {
          font-size: 12px;
          color: rgba(51, 51, 51, 1);
          line-height: 15px;
          margin-top: 12px;
          .link {
            font-size: 14px;
            color: rgba(153, 153, 153, 1);
            line-height: 18px;
            margin-left: 16px;
            position: relative;
            padding-left: 17px;
            &::before {
              content: "";
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 16px;
              height: 16px;
              background: url("http://pic.iidingyun.com//file/20181120/75487.png")
                no-repeat;
            }
          }
        }
        &:after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 30px;
          background: rgba(255, 188, 158, 1);
        }
        & + .item {
          margin-left: 30px;
        }
        &:first-child {
          padding-right: 30px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .btn {
      height: 30px;
      line-height: 30px;
      background: $front-color;
      border-radius: 2px;
      padding: 0 20px;
      box-sizing: border-box;
      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      &.green {
        background: rgba(25, 220, 228, 1);
      }
      & + .btn {
        margin-left: 15px;
      }
    }
  }
  .menu {
    background: #ffffff;
    margin-top: 15px;
    padding: 0 14px;
    box-sizing: border-box;
    .item {
      height: 47px;
      line-height: 47px;
      font-size: 14px;
      position: relative;
      display: flex;
      align-items: center;
      .icon {
        width: 20px;
        height: 20px;
        margin-right: 15px;
        &.icon-finance {
          background: url("//pic.iidingyun.com/1000//file/20181201/75815.png")
            no-repeat;
          background-size: contain;
        }
        &.icon-project {
          background: url("//pic.iidingyun.com//file/20181201/75816.png")
            no-repeat;
          background-size: contain;
        }
      }
      .icon-more {
        width: 18px;
        height: 32px;
        background: url("//pic.iidingyun.com//file/20181201/75813.png")
          no-repeat center center;
        background-size: 50% 50%;
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
      }
      & + .item {
        border-top: 1px solid #e7e7e7;
      }
    }
  }
}
</style>
