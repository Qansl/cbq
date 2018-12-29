 
<template>
  <div>
        <div class="banner-wrapper" :style="{background:background_color}">
          <div class="banner-inner">
            <div class="banner" >
              <img class="pic" v-for="item in banner_list" :key="item.id" :src="item.advertise_piture" alt="" v-show="item.visible">
              <div class="arr left" @click="tetch('left')"></div>
              <div class="arr right" @click="tetch('right')"></div>
              <ul class="dot" >
                <li v-for="item in banner_list" :key="item.id" :class="{active:item.visible}"></li>
              </ul>
            </div>
            <div class="intro">
              <div class="title" :style="{background:background_color}">预定截止日期</div>
              <div class="date">
                <span class="month">{{sales_off_month}}</span>月
                <span class="day">{{sales_off_day}}</span>日
              </div>
              <ul class="seperator">
                <li></li><li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li>
              </ul>
              <div class="desc">{{advertise_title}}</div>
              <a class="ad-wrapper" href="javascript:;">
                <img class="ad"  alt="" :src="advertise_min_piture">
              </a>
            </div>
          </div>
        </div>
  
    <ul class="stat">
      <li class="item">
        <div class="val">
          <span class="no">8</span>
          <span class="unit">年</span>
        </div>
        <div class="desc">建成行业领先的PASS平台</div>
      </li>
      <li class="item">
        <div class="val">
          <span class="no">20</span>
          <span class="unit">款</span>
        </div>
        <div class="desc">行业热门APP预售</div>
      </li>
      <li class="item">
        <div class="val">
          <span class="prev">近</span>
          <span class="no">600</span>
          <span class="unit">人</span>
        </div>
        <div class="desc">行业热门APP预售</div>
      </li>
      <li class="item">
        <div class="val">
          <span class="prev">近</span>
          <span class="no">1000</span>
          <span class="unit">万</span>
        </div>
        <div class="desc">行业热门APP预售</div>
      </li>
    </ul>
  
    <div class="main">
      <div class="m-project">
        <h1 class="title">
          热门预售
          <a class="more" href="#/projectlist/0">更多 ></a>
        </h1>
        <ul class="list">
          <li class="item col2">
              <el-carousel height="472px">
                <el-carousel-item v-for="item in banner_prelist" :key="item.id">
                  <a class="item-inner"  :href="item.advertise_link" target="_blank">
                     <img class="ad" :src="item.advertise_piture" alt="" >
                  </a>
                </el-carousel-item>
              </el-carousel>
          </li>
          <li class="item" v-for="item in pre_list" :key="item.id">
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
                <progress class="u-progress" :value="item.plenty" :max="item.plenty > 100 ? item.plenty : 100"></progress>
              </div>
              <ul class="details">
                <li>
                  <div class="prog">{{item.plenty}}%</div>
                  <div class="desc">完成</div>
                </li>
                <li>
                  <div class="prog">{{item.pre_count}}人</div>
                  <div class="desc">预报名人数</div>
                </li>
                <li>
                  <div class="prog">{{item.date_time}}天</div>
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
  
      <div class="m-project">
        <h1 class="title">
          正在开发
          <a class="more" href="#/projectlist/1">更多 ></a>
        </h1>
        <ul class="list">
          <li class="item" v-for="item in dev_list" :key="item.id">
            <a class="item-inner" :href="'#/projectdetails/'+item.status + '/' + item.id">
              <div class="cover-wrapper">
                <img class="cover" :src="item.shop_piture" alt="">
              </div>
              <h3 class="name">{{item.shop_title}}</h3>
              <div class="price-wrapper">
                <div class="price">{{item.presell_price}}.<span class="decimal">00</span></div>
                <div class="status">开发进度</div>
              </div>
              <div class="progress-wrapper">
                <progress class="u-progress green" :value="item.plenty" max="100"></progress>
              </div>
              <ul class="details">
                <li>
                  <div class="prog">{{item.plenty}}%</div>
                  <div class="desc">完成</div>
                </li>
                <li>
                  <div class="prog"></div>
                  <div class="desc"></div>
                </li>
                <li>
                  <div class="prog">{{item.date_time}}天</div>
                  <div class="desc">剩余时间</div>
                </li>
              </ul>
              <!-- <div class="modal">
                <a class="link" href="javascript:;" target="_blank">查看进度</a>
              </div> -->
            </a>
          </li>
        </ul>
      </div>
  
      <div class="m-project custom">
        <h1 class="title">
          定制开发
          <a class="more" href="#/projectlist/2">更多 ></a>
        </h1>
        <ul class="list">
          <li class="item col2" >
            <el-carousel height="400px">
                <el-carousel-item v-for="item in banner_redlist" :key="item.id">
                  <a class="item-inner"  :href="item.advertise_link" target="_blank">
                     <img class="ad" :src="item.advertise_piture" alt="" >
                  </a>
                </el-carousel-item>
              </el-carousel>
          </li>
          <li class="item" v-for="item in red_list" :key="item.id">
            <a class="item-inner" :href="'#/projectdetails/'+item.status + '/' + item.id">
              <div class="cover-wrapper">
                <img class="cover" :src="item.shop_piture" alt="">
              </div>
              <h3 class="name">{{item.shop_title}}</h3>
              <div class="price-wrapper">
                <div class="price">{{item.dev_standard_price}}.<span class="decimal">00</span></div>
              </div>
              <div class="qrcode-wrapper">
                <img class="pic" :src="item.demo_qcode" alt="">
                <div class="desc">扫码查看样例</div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- contact -->
    <ul class="contact-wrapper">
      <li class="item chat">
        <a href="#/chat" target="_blank">
          <i class="icon icon-chat"><div class="txt">咨询客服</div></i>
        </a>
      </li>
      <li class="item wechat">
        <i class="icon icon-qrcode"></i>
        <div class="qrcode-inner">
          <img class="pic" src="//pic.iidingyun.com/1000//file/20181129/75737.png" alt="">
          <div class="desc">关注我们</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {formatDate} from "../api/moment.js";
import { request } from "../api/api";
var timer = null;
export default {
  name: "Home",
  data() {
    return {
      banner_list:[],
      banner_prelist:[],
      banner_redlist:[],
      pre_list:[],
      dev_list:[],
      red_list:[],
      background_color:"",
      sales_off_month:"11",
      sales_off_day:"30",
      advertise_min_piture:"",
      advertise_title:"",
    };
  },
  mounted(){
    var _this = this;
    clearInterval(timer);
    _this.slideAuto();
    request("com.iiding.web.index.select", {}, data => {
      _this.banner_list = data.banner_data.filter(function(ele){
          return ele.advertise_place == 0 ? ele : '';
      })
      _this.banner_prelist = data.banner_data.filter(function(ele){
          return ele.advertise_place == 1 ? ele : '';
      })
      _this.banner_redlist = data.banner_data.filter(function(ele){
          return ele.advertise_place == 2 ? ele : '';
      })
      _this.banner_list.forEach(function(ele,index,self){
        if(index == 0){
          ele["visible"] = true;
        }else{
          ele["visible"] = false;
        }
      })
      if(_this.banner_list.length && _this.banner_list.length != ''){
          if(_this.banner_list.length > 0){
            _this.background_color = _this.banner_list[0].background_color;
            _this.sales_off_month = formatDate(new Date(_this.banner_list[0].sales_off_date),"MM");
            _this.sales_off_day = formatDate(new Date(_this.banner_list[0].sales_off_date),"dd");
            _this.advertise_min_piture = _this.banner_list[0].advertise_min_piture;
            _this.advertise_title = _this.banner_list[0].advertise_title;
          }
      }
      _this.banner_prelist.forEach(function(ele,index,self){
        if(index == 0){
          ele["visible"] = true;
        }else{
          ele["visible"] = false;
        }
      })
      _this.banner_redlist.forEach(function(ele,index,self){
        if(index == 0){
          ele["visible"] = true;
        }else{
          ele["visible"] = false;
        }
      })
       console.log(_this.banner_list)
       console.log(_this.banner_prelist)
       console.log(_this.banner_redlist)
      _this.pre_list = data.pre_list;
      _this.pre_list.forEach(function(ele){
        var date1 = new Date();
        var date2 = new Date(ele.presell_finish_time.replace(/-/g, "/"))
        var date = date2.getTime() - date1.getTime();
        ele["date_time"] = parseInt(date/(1000*3600*24));
        var plenty = parseInt((ele.pre_count / ele.person_count) * 100);
        ele["plenty"] = plenty;
      })
      _this.dev_list = data.dev_list;
      _this.dev_list.forEach(function(ele){
        var date1 = new Date();
        var date2 = new Date(ele.dev_end_time.replace(/-/g, "/"))
        var date3 = new Date(ele.dev_start_time.replace(/-/g, "/"))
        var date = date2.getTime() - date1.getTime();
        var dates = date1.getTime() - date3.getTime();
        ele["date_time"] = parseInt(date/(1000*3600*24));
        var plenty = parseInt(( dates / (date2.getTime() - date3.getTime())) * 100);
        ele["plenty"] = plenty;
      })
      _this.red_list = data.red_list;
    });
  },
  methods:{

    tetch(val){
      var _this = this;
      // try{
      //     _this.banner_list.forEach(function(ele,index,self){
      //     if(index < _this.banner_list.length){
      //       if(ele.visible){
      //         ele.visible = false;
      //         if(val == "right"){
      //           if(index < _this.banner_list.length - 1){
      //             self[index + 1].visible = true;
      //           }else{
      //             self[0].visible = true;
      //           }
      //         }else{
      //           if(index > 0){
      //             self[index - 1].visible = true;
      //           }else{
      //             self[_this.banner_list.length - 1].visible = true;
      //           }
      //         }
      //         foreach.break;
      //       }
      //     }
      //   })
      // }catch(e){

      // }
      for(var i = 0 ; i < _this.banner_list.length ; i++){
        if(_this.banner_list[i].visible){
            _this.banner_list[i].visible = false;
            if(val == "right"){
                if(i < _this.banner_list.length - 1){
                  _this.banner_list[i + 1].visible = true;
                  _this.$set(_this.banner_list,i+1,_this.banner_list[i + 1]);
                  _this.background_color = _this.banner_list[i + 1].background_color;
                  _this.advertise_min_piture = _this.banner_list[i + 1].advertise_min_piture;
                  if(_this.banner_list[i + 1].sales_off_date && _this.banner_list[i + 1].sales_off_date != ''){
                      _this.sales_off_month = formatDate(new Date(_this.banner_list[i + 1].sales_off_date),"MM");
                      _this.sales_off_day = formatDate(new Date(_this.banner_list[i + 1].sales_off_date),"dd");
                  }else{
                    _this.sales_off_month = 11;
                    _this.sales_off_day = 30;
                  }
                  _this.advertise_title = _this.banner_list[i+1].advertise_title;
                }else{
                  _this.banner_list[0].visible = true;
                  _this.$set(_this.banner_list,0,_this.banner_list[0])
                  _this.background_color = _this.banner_list[0].background_color;
                  _this.advertise_min_piture = _this.banner_list[0].advertise_min_piture;
                  if(_this.banner_list[0].sales_off_date && _this.banner_list[0].sales_off_date != ''){
                      _this.sales_off_month = formatDate(new Date(_this.banner_list[0].sales_off_date),"MM");
                      _this.sales_off_day = formatDate(new Date(_this.banner_list[0].sales_off_date),"dd");
                  }else{
                    _this.sales_off_month = 11;
                    _this.sales_off_day = 30;
                  }
                  _this.advertise_title = _this.banner_list[0].advertise_title;
                }
            }else{
                if(i > 0){
                  _this.banner_list[i - 1].visible = true;
                  _this.$set(_this.banner_list,i-1,_this.banner_list[i - 1])
                  _this.background_color = _this.banner_list[i - 1].background_color;
                  _this.advertise_min_piture = _this.banner_list[i - 1].advertise_min_piture;
                  if(_this.banner_list[i - 1].sales_off_date && _this.banner_list[i - 1].sales_off_date != ''){
                      _this.sales_off_month = formatDate(new Date(_this.banner_list[i - 1].sales_off_date),"MM");
                      _this.sales_off_day = formatDate(new Date(_this.banner_list[i - 1].sales_off_date),"dd");
                  }else{
                    _this.sales_off_month = 11;
                    _this.sales_off_day = 30;
                  }
                  _this.advertise_title = _this.banner_list[i - 1].advertise_title;
                }else{
                  _this.banner_list[_this.banner_list.length - 1].visible = true;
                  _this.$set(_this.banner_list,_this.banner_list.length - 1,_this.banner_list[_this.banner_list.length - 1])
                  _this.background_color = _this.banner_list[_this.banner_list.length - 1].background_color;
                  _this.advertise_min_piture = _this.banner_list[_this.banner_list.length - 1].advertise_min_piture;
                  if(_this.banner_list[_this.banner_list.length - 1].sales_off_date && _this.banner_list[_this.banner_list.length - 1].sales_off_date != ''){
                      _this.sales_off_month = formatDate(new Date(_this.banner_list[_this.banner_list.length - 1].sales_off_date),"MM");
                      _this.sales_off_day = formatDate(new Date(_this.banner_list[_this.banner_list.length - 1].sales_off_date),"dd");
                  }else{
                    _this.sales_off_month = 11;
                    _this.sales_off_day = 30;
                  }
                  _this.advertise_title = _this.banner_list[_this.banner_list.length - 1].advertise_title;
                }
            }
            break;
          }
      }
      clearInterval(timer);
      // setTimeout(function(){
        _this.slideAuto();
      // },3000);
    },
    tetch2(val){
      var _this = this;
      for(var i = 0 ; i < _this.banner_list.length ; i++){
        if(_this.banner_list[i].visible){
            _this.banner_list[i].visible = false;
            if(val == "right"){
                if(i < _this.banner_list.length - 1){
                  _this.banner_list[i + 1].visible = true;
                  _this.$set(_this.banner_list,i+1,_this.banner_list[i + 1]);
                  _this.background_color = _this.banner_list[i + 1].background_color;
                  _this.advertise_min_piture = _this.banner_list[i + 1].advertise_min_piture;
                  if(_this.banner_list[i + 1].sales_off_date && _this.banner_list[i + 1].sales_off_date != ''){
                      _this.sales_off_month = formatDate(new Date(_this.banner_list[i + 1].sales_off_date),"MM");
                      _this.sales_off_day = formatDate(new Date(_this.banner_list[i + 1].sales_off_date),"dd");
                  }else{
                    _this.sales_off_month = 11;
                    _this.sales_off_day = 30;
                  }
                  _this.advertise_title = _this.banner_list[i+1].advertise_title;
                }else{
                  _this.banner_list[0].visible = true;
                  _this.$set(_this.banner_list,0,_this.banner_list[0])
                  _this.background_color = _this.banner_list[0].background_color;
                  _this.advertise_min_piture = _this.banner_list[0].advertise_min_piture;
                  if(_this.banner_list[0].sales_off_date && _this.banner_list[0].sales_off_date != ''){
                      _this.sales_off_month = formatDate(new Date(_this.banner_list[0].sales_off_date),"MM");
                      _this.sales_off_day = formatDate(new Date(_this.banner_list[0].sales_off_date),"dd");
                  }else{
                    _this.sales_off_month = 11;
                    _this.sales_off_day = 30;
                  }
                  _this.advertise_title = _this.banner_list[0].advertise_title;
                }
            }else{
                if(i > 0){
                  _this.banner_list[i - 1].visible = true;
                  _this.$set(_this.banner_list,i-1,_this.banner_list[i - 1])
                  _this.background_color = _this.banner_list[i - 1].background_color;
                  _this.advertise_min_piture = _this.banner_list[i - 1].advertise_min_piture;
                  if(_this.banner_list[i - 1].sales_off_date && _this.banner_list[i - 1].sales_off_date != ''){
                      _this.sales_off_month = formatDate(new Date(_this.banner_list[i - 1].sales_off_date),"MM");
                      _this.sales_off_day = formatDate(new Date(_this.banner_list[i - 1].sales_off_date),"dd");
                  }else{
                    _this.sales_off_month = 11;
                    _this.sales_off_day = 30;
                  }
                  _this.advertise_title = _this.banner_list[i - 1].advertise_title;
                }else{
                  _this.banner_list[_this.banner_list.length - 1].visible = true;
                  _this.$set(_this.banner_list,_this.banner_list.length - 1,_this.banner_list[_this.banner_list.length - 1])
                  _this.background_color = _this.banner_list[_this.banner_list.length - 1].background_color;
                  _this.advertise_min_piture = _this.banner_list[_this.banner_list.length - 1].advertise_min_piture;
                  if(_this.banner_list[_this.banner_list.length - 1].sales_off_date && _this.banner_list[_this.banner_list.length - 1].sales_off_date != ''){
                      _this.sales_off_month = formatDate(new Date(_this.banner_list[_this.banner_list.length - 1].sales_off_date),"MM");
                      _this.sales_off_day = formatDate(new Date(_this.banner_list[_this.banner_list.length - 1].sales_off_date),"dd");
                  }else{
                    _this.sales_off_month = 11;
                    _this.sales_off_day = 30;
                  }
                  _this.advertise_title = _this.banner_list[_this.banner_list.length - 1].advertise_title;
                }
            }
            break;
          }
      }
    },
    //定时轮播
    slideAuto:function () { 
      var that=this; 
      timer=setInterval(function(){  
          that.tetch2("right");    
      },3500) 
    //clearInterval(timer); 
   }, 

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/vars.scss";
    .show-enter-active,.show-leave-active{
        transition:all 2s;
    }
    .show-enter,.show-leave-to{
        margin-left: 100px;
    }
    .show-enter-to,.show-leave{
        margin-left:0px;
    }
.banner-wrapper {
  height: 456px;
  background: #ea7a20;
  display: flex;
  .banner-inner {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    .banner {
      flex: 1;
      position: relative;
      .pic {
        width: 930px;
        height: 456px;
      }
      .dot {
        display: flex;
        position: absolute;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
        li {
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          &.active {
            width: 26px;
            height: 4px;
            background: rgba(255, 255, 255, 1);
            border-radius: 2px;
          }
          & + li {
            margin-left: 8px;
          }
        }
      }
      .arr {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        transition: background ease 0.4s;
        &::after {
          content: "";
          width: 10px;
          height: 18px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        &.left {
          left: 20px;
          &::after {
            left: 8px;
            background: url("//pic.iidingyun.com//file/20181120/75491.png")
              no-repeat;
          }
        }
        &.right {
          right: 20px;
          &::after {
            right: 8px;
            background: url("//pic.iidingyun.com//file/20181120/75492.png")
              no-repeat;
          }
        }
      }
    }
    .intro {
      width: 270px;
      height: 456px;
      display: flex;
      flex-direction: column;
      background: #ffffff;
      position: relative;
      .title {
        height: 63px;
        line-height: 63px;
        color: #ffffff;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        background: url("//pic.iidingyun.com/1000//file/20181120/75478.png")
          no-repeat;
      }
      .date {
        height: 128px;
        line-height: 128px;
        text-align: center;
        .month,
        .day {
          font-size: 60px;
          color: $front-color;
          text-shadow:0px 4px 10px rgba(255,80,0,0.4);
          font-family: myFont;
        }
      }
      .desc {
        text-align: center;
        font-size: 18px;
        line-height: 23px;
        margin-top: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ad-wrapper {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        .ad {
          width: 270px;
          height: 204px;
        }
      }
      .seperator {
        width: 100%;
        display: flex;
        overflow: hidden;
        li {
          width: 14px;
          height: 2px;
          background: $front-color;
          margin-left: 10px;
          &:first-child {
            margin-left: 8px;
          }
        }
      }
    }
  }
  &:hover {
    .arr {
      // background: rgba(0, 0, 0, 0.4);
    }
  }
}

.stat {
  width: 1200px;
  margin: 0 auto;
  height: 111px;
  box-shadow: 0px 0px 40px 0px rgba(216, 216, 216, 0.5);
  border-radius: 0px 0px 4px 4px;
  background:hsl(0, 0%, 100%);
  display: flex;
  .item {
    flex: 1;
    text-align: center;
    .val {
      display: flex;
      justify-content: center;
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
      margin-top: 12px;
      .no {
        align-self: center;
        font-size: 50px;
        color: rgba(51, 51, 51, 1);
        line-height: 58px;
        font-family: myFont;
      }
      .prev {
        align-self: flex-end;
        margin-bottom: 8px;
        margin-right: 8px;
      }
      .unit {
        align-self: flex-start;
        margin-top: 11px;
        margin-left: 8px;
      }
    }
    .desc {
      font-size: 12px;
      color: rgba(51, 51, 51, 1);
      line-height: 15px;
      margin-top: 2px;
    }
  }
}

.main {
  width: 1200px;
  margin: 10px auto 90px;
}




@media (max-width: 767px){
  .banner-wrapper{
    height: auto;
    .banner-inner{
      width: 100%;
      .banner{
        display:flex;
        .pic{
          width:100%;
          height: 210px;
        }
        .arr{
          display: none;
        }
      }
      .intro{
        display: none;
      }
    }
  }
  .stat{
    display: none;
  }
  .main{
    width: 100%;
  }
  .m-project{
    .title{
      font-size: 18px;
      padding-left: 23px;
      margin: 25px 0 12px;
      .more{
        font-size:14px;
        color:rgba(153,153,153,1);
        line-height:17.5px;
        top:50%;
        transform: translateY(-50%);
        right: 15px;
      }
      &::before{
        width: 2px;
        height: 15px;
        left: 15px;
      }
    }
    .list{
      width: 100%;
      margin: 0;
      justify-content: space-between;
      padding: 0 15px;
      box-sizing: border-box;
      line-height:23px;
      .item{
        width: 165px;
        height: auto;
        margin: 0;
        margin-bottom: 10px;
        .item-inner{
          .cover-wrapper{
            width: 165px;
            height: 131px;
            .cover{
              width: 165px;
              height: 131px;
            }
          }
          .name{
            font-size:14px;
            line-height:17.5px;
            margin: 12px 0 0;
            font-weight: normal;
          }
          .details{
            display: none;
          }
          .price-wrapper{
            padding: 0;
            .price{
              font-size:15px;
              font-weight:normal;
              line-height:17px;
              .decimal{
                font-size: 10px;
              }
            }
            .status{
              display: none;
            }
          }
          .progress-wrapper{
            padding: 0;
            margin: 0;
            margin-bottom: 10px;
            line-height: 4px;
          }
          .tag{
            width:65px;
            height: 21px;
            line-height: 21px;
            font-size:10px;
            padding-left: 4px;
            background: url('//pic.iidingyun.com//file/20181130/75750.png') no-repeat;
            background-size: contain;
          }
        }
        &.col2{
          display: none;
        }
      }
    }
  }
  
}
</style>
