<template>
    <div>
        <div class="stat">
            <h3 class="title">我的资金</h3>
            <div class="stat-con">
                <ul class="list">
                    <li class="item">
                        <div class="no">{{user_sum_income}}</div>
                        <div class="desc">总收入
                            <!-- <a class="link" href="javascript:;">详情</a> -->
                        </div>
                        
                    </li>
                    <li class="item">
                        <div class="no">{{userInfo.current_coin}}</div>
                        <div class="desc">余额</div>
                    </li>
                </ul>
                <button class="btn">提现</button>
                <button class="btn green" @click="go_recharge">充值</button>
            </div>
        </div>
        <div class="finance-con">
            <ul class="u-tabpanel2">
                <li class="item" :class="{active:tab==0}" @click="changeTab(0)">我的消费</li>
                <li class="item" :class="{active:tab==1}" @click="changeTab(1)">我的收入</li>
                <li class="item" :class="{active:tab==2}" @click="changeTab(2)">平台退费</li>
            </ul>
            <div v-show="tab==0" class="myconsume">
                <table class="u-table" :key="index" v-for="(item,index) in history_record">
                    <caption>
                        <span class="time">{{item.create_time}}</span>
                        <span class="order">订单号：</span>
                        <span class="orderid">{{item.order_number}}</span>
                    </caption>
                    <thead>
                        <tr>
                            <th>项目</th>
                            <th>订单类型</th>
                            <th>分红权</th>
                            <th>金额</th>
                            <th>支付方式</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="cover-wrapper">
                                    <img class="cover" src="http://pic.iidingyun.com//file/20181120/75487.png" alt="">
                                    <span>{{item.product_name}}</span>
                                </div>
                            </td>
                            <td>{{item.order_type==1?'充值':item.order_type==2?'项目预报名':item.order_type==3?'项目分红收入':item.order_type==4?'参与项目购买名额':item.order_type==5?'平台退款':'购买二次预售项目'}}</td>
                            <td>{{item.is_dividend_right==1?item.dividend_right:'无'}}</td>
                            <td>{{item.order_money}}</td>
                            <td>{{item.payment_method==1?'微信支付':item.payment_method==2?'支付宝支付':'余额支付'}}</td>
                            <td>
                                <a class="link" href="javascript:;">退定金</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-show="tab==1" class="myincome">
                <div class="form">
                    <div class="form-item">
                        <div class="lb">选择项目：</div>
                        <el-select v-model="order_product" placeholder="请选择" @change="change_project_query_rocord">
                            <el-option
                            v-for="item in my_project"
                            :key="item.projectid"
                            :label="item.project_name"
                            :value="item.projectid">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="form-item">
                        <ve-line :data="chartData" ref="chart1" style="width:90%"></ve-line>
                    </div>
                </div>
                <div class="stat-list">
                    <div class="item">总浏览人数：<span class="no">{{number_of_visitors}}</span></div>
                    <div class="item">总购买人数：<span class="no">{{number_of_buyers}}</span></div>
                    <div class="item">项目收入：<span class="no">{{total_income}}</span></div>
                    <div class="item">利润分红：<span class="no">{{project_bonus}}</span></div>
                </div>
                <div class="u-el-table-wrapper">
                    <div class="table-head">
                        购买详单
                    </div>
                    <el-table
                        :data="purchaseDetails"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="create_time"
                        label="日期"
                        align="center"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="order_number"
                        label="订单号"
                        align="center"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="order_money"
                        label="购买价格"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="dividend_right"
                        label="利润分红"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="product_type"
                        label="购买类型"
                        align="center">
                            <template slot-scope="scope">
                              <div v-show="scope.row.product_type==1">标准版</div>
                              <div v-show="scope.row.product_type==2">外观定制版</div>
                              <div v-show="scope.row.product_type==3">高级定制版</div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pager-wrapper">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="totalCount">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div v-show="tab==2">
                <div class="u-el-table-wrapper">
                    <el-table
                        :data="payBack"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="creat_time"
                        label="时间"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="product_name"
                        label="项目"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="order_money"
                        label="退费金额"
                        align="center">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { request,SITEID } from "../../api/api";
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
@import "../../styles/vars.scss";
.u-tabpanel2 {
  margin-top: 20px;
}
.stat {
  background: #ffffff;
  padding: 20px 40px 30px;
  .title {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    color: $front-color;
    line-height: 20px;
  }
  .stat-con {
    display: flex;
    align-items: center;
    margin-top: 30px;
    .list {
      display: flex;
      .item {
        width: 162px;
        position: relative;
        .no {
          font-size: 36px;
          font-weight: bold;
          color: $front-color;
          line-height: 42px;
          font-family: MyFont;
        }
        .desc {
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          line-height: 18px;
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
          margin-left: 60px;
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
      margin-left: 194px;
      &.green {
        background: rgba(25, 220, 228, 1);
      }
      & + .btn {
        margin-left: 34px;
      }
    }
  }

  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.05);
}
.finance-con {
  background: #ffffff;
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.05);
  .myconsume {
    padding: 30px;
    box-sizing: border-box;
    .u-table {
      .cover-wrapper {
        width: 100%;
        text-align: left;
        display: flex;
        align-items: center;
        .cover {
          width: 112px;
          height: 68px;
          margin-right: 42px;
        }
      }
      & + .u-table {
        margin-top: 20px;
      }
    }
  }
}

.myincome {
  .form {
    padding: 30px 30px 0;
    box-sizing: border-box;
    .form-item {
      display: flex;
      align-items: center;
      .el-select {
        width: 400px;
      }
      .ve-line {
        margin: 40px auto 0;
      }
    }
  }
  .stat-list {
    padding: 20px 0;
    background: rgba(255, 249, 242, 1);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .item {
      font-size: 14px;
      color: rgba(102, 102, 102, 1);
      line-height: 18px;
      & + .item {
        margin-left: 50px;
      }
      .no {
        font-size: 18px;
        color: rgba(255, 80, 0, 1);
        line-height: 23px;
        margin-left: 4px;
      }
    }
  }
}
</style>
