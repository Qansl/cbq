<template>
  <div>
    <ul class="u-tabpanel2">
      <i class="icon-back" onclick="history.back()"></i>
      <li class="item" :class="{active:tab==0}" @click="changeTab(0)">我的消费</li>
      <li class="item" :class="{active:tab==1}" @click="changeTab(1)">我的收入</li>
      <li class="item" :class="{active:tab==2}" @click="changeTab(2)">平台退费</li>
    </ul>
    <div class="main">
      <div v-show="tab==0">
        <ul class="myconsume">
          <li class="form" :key="index" v-for="(item,index) in history_record">
            <div class="form-item">
              <span class="lb">购买时间：</span>
              <span class="disp-txt">{{item.create_time}}</span>
            </div>
            <div class="form-item">
              <span class="lb">订单号：</span>
              <span class="disp-txt">{{item.order_number}}</span>
            </div>
            <div class="form-item">
              <span class="lb">商品名称：</span>
              <span class="disp-txt">{{item.product_name}}</span>
            </div>
            <div class="form-item">
              <span class="lb">订单类型：</span>
              <span class="disp-txt">{{item.order_type==1?'充值':item.order_type==2?'项目预报名':item.order_type==3?'项目分红收入':item.order_type==4?'参与项目购买名额':item.order_type==5?'平台退款':'购买二次预售项目'}}</span>
            </div>
            <div class="form-item">
              <span class="lb">金额：</span>
              <span class="disp-txt im">{{item.order_money}}</span>
            </div>
            <div class="form-item">
              <span class="lb">支付方式：</span>
              <span class="disp-txt">{{item.payment_method==1?'微信支付':item.payment_method==2?'支付宝支付':'余额支付'}}</span>
            </div>
            <div class="form-item">
              <span class="lb">分红权：</span>
              <span class="disp-txt">{{item.is_dividend_right==1?item.dividend_right:'无'}}</span>
            </div>
            <button class="btn">退定金</button>
          </li>
          <!-- <li class="form">
            <div class="form-item">
              <span class="lb">购买时间：</span>
              <span class="disp-txt">18-11-11 19:22:22</span>
            </div>
            <div class="form-item">
              <span class="lb">订单号：</span>
              <span class="disp-txt">135982315</span>
            </div>
            <div class="form-item">
              <span class="lb">商品名称</span>
              <span class="disp-txt">类拼多多APP商城</span>
            </div>
            <div class="form-item">
              <span class="lb">规格：</span>
              <span class="disp-txt">定金</span>
            </div>
            <div class="form-item">
              <span class="lb">金额：</span>
              <span class="disp-txt im">100</span>
            </div>
            <div class="form-item">
              <span class="lb">支付方式：</span>
              <span class="disp-txt">余额支付</span>
            </div>
            <div class="form-item">
              <span class="lb">分红权：</span>
              <span class="disp-txt">无</span>
            </div>
            <button class="btn">退定金</button>
          </li>
          <li class="form">
            <div class="form-item">
              <span class="lb">购买时间：</span>
              <span class="disp-txt">18-11-11 19:22:22</span>
            </div>
            <div class="form-item">
              <span class="lb">订单号：</span>
              <span class="disp-txt">135982315</span>
            </div>
            <div class="form-item">
              <span class="lb">商品名称</span>
              <span class="disp-txt">类拼多多APP商城</span>
            </div>
            <div class="form-item">
              <span class="lb">规格：</span>
              <span class="disp-txt">定金</span>
            </div>
            <div class="form-item">
              <span class="lb">金额：</span>
              <span class="disp-txt im">100</span>
            </div>
            <div class="form-item">
              <span class="lb">支付方式：</span>
              <span class="disp-txt">余额支付</span>
            </div>
            <div class="form-item">
              <span class="lb">分红权：</span>
              <span class="disp-txt">无</span>
            </div>
            <button class="btn">退定金</button>
          </li> -->
        </ul>
      </div>
      <div v-show="tab==1">
        <div class="table-wrapper" :key="index" v-for="(item,index) in purchaseDetails">
          <table class="u-table" >
            <caption>
              <span class="order">订单号：{{item.order_number}}</span>
              <span class="time">时间：{{item.create_time}}</span>
            </caption>
            <thead>
              <tr>
                <th>买家ID</th>
                <th>价格</th>
                <th>利润分红</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{item.userid}}</td>
                <td>{{item.order_money}}</td>
                <td>{{item.dividend_right}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="table-wrapper">
          <table class="u-table">
            <caption>
              <span class="order">订单号：123456</span>
              <span class="time">时间：2018-11-11 11:11:00</span>
            </caption>
            <thead>
              <tr>
                <th>买家账号</th>
                <th>价格</th>
                <th>利润分红</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>fsaf</td>
                <td>开发定金</td>
                <td>无</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-wrapper">
          <table class="u-table">
            <caption>
              <span class="order">订单号：123456</span>
              <span class="time">时间：2018-11-11 11:11:00</span>
            </caption>
            <thead>
              <tr>
                <th>买家账号</th>
                <th>价格</th>
                <th>利润分红</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>fsaf</td>
                <td>开发定金</td>
                <td>无</td>
              </tr>
            </tbody>
          </table>
        </div> -->
      </div>
      <div v-show="tab==2">
        <div class="table-wrapper" :key="index" v-for="(item,index) in payBack">
          <table class="u-table">
            <caption>
              <span class="order">时间：{{item.creat_time}}</span>
            </caption>
            <thead>
              <tr>
                <th>产品名</th>
                <th>退费金额</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{item.product_name}}</td>
                <td>{{item.order_money}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="table-wrapper">
          <table class="u-table">
            <caption>
              <span class="order">时间：2018-11-11 11:11:00</span>
            </caption>
            <thead>
              <tr>
                <th>产品名</th>
                <th>退费金额</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>fsaf</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-wrapper">
          <table class="u-table">
            <caption>
              <span class="order">时间：2018-11-11 11:11:00</span>
            </caption>
            <thead>
              <tr>
                <th>产品名</th>
                <th>退费金额</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>fsaf</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { request,SITEID } from "../../../api/api";
export default {
  data() {
    return {
      history_record:[],
      tab: 0,
      order_product:'',
      my_project:[
        {
          "projectid":-0.01,
          "project_name":"请选择"
        }
      ],
      totalCount:0,
      total_income:0,
      project_bonus:0,
      number_of_buyers:0,
      number_of_visitors:0,
      userInfo:{},
      user_sum_income:0,
      purchaseDetails: [],
      chartData: {
        columns: ["时间", "人数","分红收入"],
        rows: [],
        yAxisName: "fdaf"
      },
      payBack: []
    };
  },
  mounted:function(){
    this.query_history_record();
    this.get_my_project();
    this.get_user_details();
    this.get_user_sum_income();
  },
  methods: {
    //去充值
    go_recharge(){
      this.$router.push('/rechargeMoney');
    },
    changeTab(i) { 
      var _this = this;
      _this.tab = i;   
      // _this.get_my_project();
      _this.query_chart_data();
      if(i == 0 || i == 2){
        _this.query_history_record();
      }else if(i == 1){
        _this.query_income_order();
      }
    },
    //切换项目进行查询财务信息
    change_project_query_rocord:function(){
      this.query_chart_data();
      this.query_history_record();
    },
    //查询图标数据和统计数据
    query_chart_data:function(){
      var _this = this;
      var postData = {};
      postData.projectid = _this.order_product;
      request("com.iiding.web.personal_center.money_manage.query_chart_data",postData,res => {
        if(res.code == "success"){
            _this.chartData.rows = res.data;
            _this.total_income = res.total_income;
            _this.project_bonus = res.project_bonus;
            _this.number_of_buyers = res.number_of_buyers;
            _this.number_of_visitors = res.number_of_visitors;
        }
      })
    },
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
    //查询收入订单记录
    query_income_order:function(){
      var _this = this;
      var postData = {};
      postData.order_type = 6;
      postData.order_product = _this.order_product;
      request("com.iiding.web.personal_center.query_income_order",postData,res => {
          if(res.code == "success"){
            _this.purchaseDetails = res.list;
            _this.totalCount = res.totalCount;
          }else{
            var msg = res.msg;
            _this.$message.error(msg);
          }
      })
    },
    //查询用户所有具有分红权的项目
    get_my_project:function(){
      var _this = this;
      request("com.iiding.web.personal_center.user_project.query_all_project",{},res => {
        if(res.code == "success"){
            _this.my_project = res.data;
            if(res.data != [] && res.data.length > 0){
              _this.order_product = res.data[0].projectid;
            }else{
                _this.order_product = -0.01;
            }
            
        }
      })
    },
    //查询订单
    query_history_record:function(){
      var _this = this;
      var postData = {};
				if(_this.tab == 2){
					postData.order_type = "(5)";
				}else if(_this.tab == 1){
          postData.order_type = "(3)";
          postData.order_product = _this.order_product;
				}else{
					postData.order_type = "(1,2,4,6)";
        }
      request("com.iiding.web.personal_center.money_manage.historical_record", postData, res => {
          if(res.code == "success"){
            if(_this.tab == 0){
             _this.history_record = res.list;
            }else{
              _this.payBack = res.list;
            }

          }else{
            var msg = res.msg;
            _this.$message.error(msg);
          }
      });
    }
  },
  watch: {
    tab(v) {
      if (v == 1) {
        this.$nextTick(_ => {
          this.$refs[`chart${v}`].echarts.resize();
        });
      }
    }
  }

};
</script>

<style lang="scss" scoped>
@import "../../../styles/vars.scss";
.u-tabpanel2 {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #ffffff;
  z-index: 999;
  position: relative;
  padding-left: 30px;
  box-sizing: border-box;
  .item {
    height: 48px;
    line-height: 50px;
    color: #666666;
    font-size: 14px;
    width: auto;
    flex: 1;
    &.active {
      color: $front-color;
    }
    &::before {
      display: none;
    }
    &.active::after {
      width: 30px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .icon-back {
    width: 18px;
    height: 32px;
    background: url("//pic.iidingyun.com//file/20181201/75781.png") no-repeat
      center center;
    background-size: 50% 50%;
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
  }
}

.main {
  padding-top: 48px;
  .myconsume {
    .form {
      padding: 10px 14px 22px;
      box-sizing: border-box;
      background: #ffffff;
      margin-top: 15px;
      position: relative;
      .form-item {
        display: flex;
        & + .form-item {
          margin-top: 12px;
        }
        .lb {
          font-size: 14px;
          color: #333333;
        }
        .disp-txt {
          font-size: 14px;
          color: #999999;
          margin-left: 6px;
          &.im {
            color: $front-color;
          }
        }
      }
      .btn {
        position: absolute;
        right: 14px;
        bottom: 22px;
        width: 70px;
        height: 30px;
        line-height: 22px;
        background: rgba(231, 231, 231, 1);
        border-radius: 15px;
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .table-wrapper {
    background: #ffffff;
    padding: 0 15px;
    margin-top: 15px;
    .u-table {
      caption {
        background: #ffffff;
        .order {
          margin-left: 0;
        }
        .time {
          margin-left: 10px;
        }
      }
      tr {
        th,
        td {
          padding: 4px 0 2px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
