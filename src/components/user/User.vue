<template>
  <div>
    <div class="main">
      <div class="breadcrumb">
        <a class="link" href="javascript:;">个人中心</a>
        <span class="seperator">></span>
        <a class="link" href="javascript:;">我的项目</a>
        <span class="seperator">></span>
        <a class="link" href="javascript:;">预报名项目</a>
      </div>
      <div class="main-con">
        <aside class="aside">
          <div class="basic">
            <img class="avator" :src="decodeURIComponent($store.state.userInfo.icon)" alt>
            <!-- //pic.iidingyun.com/1000//file/20181127/75713.png -->
            <!-- <div class="mobile">{{transferMobile($store.state.userInfo.phone)}}</div> -->
            <div class="account">账户名：{{$store.state.userInfo.user_name}}</div>
            <div class="account">ID：{{$store.state.userInfo.userid}}</div>
          </div>
          <nav class="nav">
            <router-link
              class="nav-link"
              :class="{active:currentRoutePath=='/user/finance'}"
              to="/user/finance"
            >账务管理</router-link>
            <router-link
              class="nav-link"
              :class="{active:currentRoutePath=='/user/myproject'}"
              to="/user/myproject"
            >我的项目</router-link>
            <router-link
              class="nav-link"
              :class="{active:currentRoutePath=='/user/message'}"
              to="/user/message"
            >消息中心</router-link>
          </nav>
        </aside>
        <router-view class="con"/>
      </div>

      <div class="m-project">
        <h1 class="title">
          热门预售
          <a class="more" href="#/projectlist/0">更多 ></a>
        </h1>
        <ul class="list" >
            <li class="item" v-for="item in list" :key="item.id" >
              <a class="item-inner" :href="'#/projectdetails/'+item.status + '/' + item.id">
                <div class="cover-wrapper">
                  <img class="cover" :src="item.shop_piture" alt="">
                </div>
                <h3 class="name">{{item.shop_title}}</h3>
                <div class="price-wrapper">
                  <div class="price">{{item.presell_price}}.<span class="decimal">00</span></div>
                  <div class="status">满额截标</div>
                </div>
                <div class="progress-wrapper">
                  <progress class="u-progress" :value="isNaN(item.plenty)?0:parseInt(item.plenty)" :max="item.plenty > 100 ? item.plenty : 100"></progress>
                </div>
                <ul class="details">
                  <li>
                    <div class="prog">{{isNaN(item.plenty)?0:parseInt(item.plenty)}}%</div>
                    <div class="desc">完成</div>
                  </li>
                  <li>
                    <div class="prog">{{isNaN(item.pre_count)?0:parseInt(item.pre_count)}}人</div>
                    <div class="desc">预报名人数</div>
                  </li>
                  <li>
                    <div class="prog">{{isNaN(item.date_time)?0:parseInt(item.date_time)}}天</div>
                    <div class="desc">剩余时间</div>
                  </li>
                </ul>
                <div class="tag">满{{item.person_count}}人截标</div>
                <div class="qrcode-wrapper">
                  <img class="pic" :src="item.demo_qcode" alt="">
                  <div class="desc">扫码查看样例</div>
                </div>
              </a>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../../api/api";
export default {
  name: "User",
  data() {
    return {
      currentRoutePath: "",
      user_info:{},
      list:[],
      jsons:{}
    };
  },
  mounted() {
    this.handleRouteChange(this.$route.path);
    this.get_user_info();
    this.get_info();
  },
  methods: {
    //获取用户注册信息
    get_user_info(){
      request("com.iiding.common.user.get_user_info",{},res => {
          if(res.code == "success"){
            this.user_info = res.data;
            this.$store.commit("changeUserInfo", this.user_info);
          }
      })
    },
    //获取热门项目
    get_info(){
      var _this = this;
      var param = {};
      param.status = 0;
      param.id = 10173650;
      request("com.iiding.web.index.shop_detials", param, data => {
        console.log(data);
        if(data.code == "success"){
            _this.jsons = data.detial_data;
            var date1 = new Date();
            var date2 = new Date(_this.jsons.presell_finish_time.replace(/-/g, "/"))
            var date = date2.getTime() - date1.getTime();
            _this.jsons["date_time"] = parseInt(date/(1000*3600*24));
            var plenty = parseInt(((_this.jsons.person_count - _this.jsons.residue_count) / _this.jsons.person_count) * 100);
            _this.jsons["plenty"] = plenty;
            _this.list = data.recommend;
            _this.list.forEach(function(ele){
              var date1 = new Date();
              var date2 = new Date(ele.presell_finish_time.replace(/-/g, "/"))
              var date = date2.getTime() - date1.getTime();
              ele["date_time"] = parseInt(date/(1000*3600*24));
              var plenty = parseInt(((ele.person_count - ele.residue_count) / ele.person_count) * 100);
              ele["plenty"] = plenty;
            })
            _this.list.pop(1);
          }
      })
    },
    handleRouteChange(path) {
      this.currentRoutePath = path;
    },
    transferMobile(m) {
      return m.substr(0, 3) + "****" + m.substr(7, 4);
    },
  },
  watch: {
    $route(to, from) {
      this.handleRouteChange(to.path);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/vars.scss";
.main {
  width: 1200px;
  margin: 0 auto;
  .breadcrumb {
    display: flex;
    margin: 20px 0;
    .link {
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
    }
    .seperator {
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
      margin: 0 5px;
    }
  }
  .main-con {
    display: flex;
    //background: rgba(255, 255, 255, 1);
    //box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.05);
    .aside {
      width: 210px;
      background: rgba(255, 237, 230, 1);
      border-radius: 2px 0px 0px 2px;
      border: 1px solid #ffbc9e;
      .basic {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px solid #ffbc9e;
        padding: 19px 0 30px;
        .avator {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        .mobile {
          font-size: 16px;
          font-weight: bold;
          line-height: 20px;
          margin-top: 13px;
        }
        .account {
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
          line-height: 15px;
          margin-top: 4px;
        }
      }
      .nav {
        display: flex;
        flex-direction: column;
        .nav-link {
          height: 83px;
          line-height: 83px;
          background: #ffede6;
          font-size: 18px;
          color: $front-color;
          padding-left: 57px;
          box-sizing: border-box;
          position: relative;
          transition: all ease 0.2s;
          &::before {
            content: "";
            width: 9px;
            height: 2px;
            background: #ffbc9e;
            position: absolute;
            right: 55px;
            top: 37px;
            transform: rotate(60deg);
          }
          &::after {
            content: "";
            width: 9px;
            height: 2px;
            background: #ffbc9e;
            position: absolute;
            right: 55px;
            top: 44px;
            transform: rotate(-60deg);
          }
          &:hover {
            background: rgba(255, 255, 255, 1);
            font-weight: bold;
            &::before,
            &::after {
              background: $front-color;
            }
          }
          &.active {
            background: rgba(255, 255, 255, 1);
            font-weight: bold;
            &::before,
            &::after {
              background: $front-color;
            }
          }
        }
      }
    }
    .con {
      flex: 1;
    }
  }
  .m-project {
    margin-top: 100px;
  }
}
</style>

