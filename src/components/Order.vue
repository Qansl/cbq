<!-- 下单 -->
<template>
    <div>
        <div class="main">
            <h3 class="title">订单信息</h3>
            <div class="orderinfo">
                <div class="basic-wrapper">
                    <div class="form basic">
                        <div class="form-item">
                            <div class="lb">项目名称：</div>
                            <div class="disp-txt">{{jsons.shop_title}}</div>
                        </div>
                        <div class="form-item">
                            <div class="lb top">开发类型：</div>
                            <div class="u-radio-group1"> 
                                <!-- <label class="u-radio" :class="{ischecked:devType==1}" @change="change_quota_number">
                                    <input v-model="devType" :disabled="devTypeIsTrue" class="u-radio__original" type="radio" tabindex="-1" value="1">   
                                    <span class="u-radio__label">1份</span>
                                    <div class="u-radio__desc">软件+10%分红权</div>
                                </label>
                                <label class="u-radio" :class="{ischecked:devType==2}" @change="change_quota_number">
                                    <input v-model="devType" :disabled="devTypeIsTrue" class="u-radio__original" type="radio" tabindex="-1" value="2">
                                    <span class="u-radio__label">2份</span>
                                    <div class="u-radio__desc">软件+20%分红权</div>
                                </label>
                                <label class="u-radio" :class="{ischecked:devType==3}" @change="change_quota_number">
                                    <input v-model="devType" :disabled="devTypeIsTrue" class="u-radio__original" type="radio" tabindex="-1" value="3">
                                    <span class="u-radio__label">3份</span>
                                    <div class="u-radio__desc">软件+30%分红权</div>
                                </label>  -->
                                <label class="u-radio" v-for="item in dev_list" :key="item.id" :class="{ischecked:devType==item.dev_count}">
                                    <input v-model="devType" class="u-radio__original" :class="{ischecked:devType==3}" @change="change_quota_number(item.dev_count)" type="radio" tabindex="-1" :value="item.dev_count">
                                    <span class="u-radio__label">{{item.dev_count}}份</span>
                                    <div class="u-radio__desc">{{item.mark}}</div>
                                </label>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="lb">开发均摊费：</div>
                            <div class="disp-txt im"> {{projectInfo.presell_price}}</div>
                            <div class="del-txt">开发总费：{{projectInfo.dev_sum_money}}</div>

                        </div>
                        <div class="form-item">
                            <div class="lb">支付选项：</div>
                            <div class="u-radio-group2"> 
                                <label class="u-radio down-payment" :class="{ischecked:payWay1==1}" @change="change_order_type">
                                    <input v-model="payWay1" :disabled="is_true" class="u-radio__original" type="radio" tabindex="-1" value="1">
                                    <span class="u-radio__label">¥{{projectInfo.deposit}}定金</span>
                                    <div class="poper">
                                        <span class="im">*</span>预报名需支付{{jsons.deposit * devType}}元报名费（可退） 预售成功后再缴纳其他费用
                                    </div>
                                </label>
                                <label class="u-radio" :class="{ischecked:payWay1==2}" @change="change_order_type">
                                    <input v-model="payWay1" :disabled="is_true" class="u-radio__original" type="radio" tabindex="-1" value="2">
                                    <span class="u-radio__label">支付尾款</span>
                                </label>
                                <label class="u-radio" :class="{ischecked:payWay1==3}" @change="change_order_type">
                                    <input v-model="payWay1" :disabled="is_true" class="u-radio__original" type="radio" tabindex="-1" value="3">
                                    <span class="u-radio__label">全额支付</span>
                                </label>
                            </div>
                        </div>
                         <div class="form-item">
                            <div class="lb">应付金额：</div>
                            <div class="disp-txt im"> {{pay_money}}</div>
                            <!-- <div class="del-txt">开发总费：6000</div> -->
                        </div>                       
                    </div>
                    <div class="ad">
                        <img class="pic" src="//pic.iidingyun.com//file/20181126/75643.png" alt="">
                        <p class="desc">中国平安为您的资金做财产担保</p>
                    </div>
                </div>
                <div class="seperator"></div>
                <div class="form pay-methods">
                    <div class="form-item">
                        <div class="lb">支付方式：</div>
                        <div class="u-radio-group1"> 
                            <label class="u-radio" :class="{ischecked:payWay2==1}" @change="change_pay_method"> 
                                <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="1">
                                <span class="u-radio__label">余额支付</span>
                            </label>
                            <label class="u-radio" :class="{ischecked:payWay2==2}" @change="change_pay_method">
                                <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="2">
                                <span class="u-radio__label">支付宝支付</span>
                            </label>
                            <label class="u-radio" :class="{ischecked:payWay2==3}" @change="change_pay_method">
                                <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="3">
                                <span class="u-radio__label">微信支付</span>
                            </label>
                        </div>
                    </div>
                    <div v-show="payWay2==1" class="form-item">
                        <div class="fieldset">
                            <div class="field-item">
                                <div class="lb">余额：</div>
                                <div class="disp-txt im">{{userInfo.current_coin}}</div>
                            </div>
                            <div class="field-item">
                                <div class="tips tips-price" v-if="commit_pay == false">
                                    余额充足可支付
                                </div>
                                <div class="tips tips-price" v-else>
                                    余额不足，请点击此处<a href="javascript:;" class="link">前往充值</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div  class="form-item" v-show="showAlipayQrcode">
                        <div class="fieldset">
                            <div class="qrcode">
                                <img class="pic" src="//pic.iidingyun.com//file/20181120/75482.png" alt="">
                                <div class="desc">请用支付宝扫码支付</div>
                            </div>
                        </div>
                    </div>
                    <div  class="form-item" v-show="showWxpayQrcode">
                        <div class="fieldset">
                            <div class="qrcode">
                                <img class="pic" src="//pic.iidingyun.com//file/20181120/75482.png" alt="">
                                <div class="desc">请用微信扫码支付</div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="form-item">
                        <label class="u-checkbox">
                            <span class="u-checkbox__input">
                                <span class="u-checkbox__inner" :class="{ischecked:isAgree}"></span>
                                <input v-model="isAgree" type="checkbox" class="u-checkbox__original" value="">
                            </span>
                            <span class="u-checkbox__label">已阅读并同意<a class="link" target="_blank" href="javascript:;">《支付协议》</a></span>
                        </label>
                    </div> -->
                </div>
                <div class="seperator"></div>
                <div class="form" >
                    <div class="form-item" v-show="showPhoneValidCode">
                        <div class="lb">手机验证：</div>
                        <div class="disp-txt im">{{phone}}</div>
                    </div>
                    <div class="form-item valid" v-show="showPhoneValidCode">
                        <div class="validcode">
                            <input class="u-input" type="text" v-model="validCode3" placeholder="验证码" >
                            <button class="u-btn u-btn-goast" @click="getEditPwdValidCode">{{codeBtnTxt}}</button>
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="disp-tips">
                            <div class="lb">温馨提示：</div>
                            <div class="con">开发项目与阳光保险签订担保合同，项目预售不成功，所有费用原路退回。支付完尾款后，我们会将开发合同与财产险合同，发到你的个人中心与邮箱。</div>
                        </div>
                    </div>
                    <div class="tools">
                        <button class="btn" :class="{isDisabled:commit_pay==false,disabled:commit_pay==true}" :disabled="commit_pay" @click="onEditPwdCodeChange">立即支付</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { request,SITEID } from "../api/api";

export default {
  name: "Service",
  data() {
    return {
      payWay1: 1, //支付选项
      payWay2: 1, //支付方式
      devType: 1, //开发类型
      devTypeIsTrue:false,
      showPhoneValidCode:true,
      isAgree: false,
      is_true:false,
      commit_pay:false,
      codeBtnTxt:"获取验证码",
      validCode3:"",
      projectInfo:{},
      userInfo:{},
      pay_money:0,
      isAgree: false,
      showWxpayQrcode:false,
      showAlipayQrcode:false,
      status:'',
      dev_list:[],
      jsons:{},
    };
  },
  mounted:function(){
    this.get_product_price();
    this.getUserInfo();
    this.status = this.$route.params.status;
    console.log(this.status);
    this.get_dev_type();
    this.get_shop_info();
  },
    computed:{
      phone:function(){
          return this.$store.state.userInfo.phone.substr(0,3) + "****" + this.$store.state.userInfo.phone.substr(7);
      }
  },
  methods:{
    // handlePay() {
    //   this.$router.push("/paysuccess");
    // },
    //改变购买数量
    change_quota_number(i){
        var _this = this;
        if(_this.payWay1 == 1){
              _this.pay_money = Number(_this.projectInfo.deposit);
          }else if(_this.payWay1 == 2){
              var deposit_money = Number(_this.projectInfo.deposit);
              var presell_price = Number(_this.projectInfo.presell_price) * _this.devType;
              _this.pay_money = presell_price - deposit_money;
          }else{
              _this.pay_money = Number(_this.projectInfo.presell_price) * _this.devType;
          } 
        var current_coin = Number(_this.userInfo.current_coin);
        var pay_money = Number(_this.pay_money);
        var num = current_coin - pay_money;
        if(num > 0){
            _this.commit_pay = false;
        }else{
            _this.commit_pay = true;
        }
    },
    //改变订单类型
    change_order_type(){
        var _this = this;
        if(_this.payWay1 == 1){
              _this.pay_money = Number(_this.projectInfo.deposit);
              _this.devTypeIsTrue = true;
          }else if(_this.payWay1 == 2){
              var deposit_money = Number(_this.projectInfo.deposit);
              var presell_price = Number(_this.projectInfo.presell_price) * _this.devType;
              _this.pay_money = presell_price - deposit_money;
              _this.devTypeIsTrue = false;
          }else{
              _this.pay_money = Number(_this.projectInfo.presell_price) * _this.devType;
              _this.devTypeIsTrue = false;
          }
        var current_coin = Number(_this.userInfo.current_coin);
        var pay_money = Number(_this.pay_money);
        var num = current_coin - pay_money;
        if(num > 0){
            _this.commit_pay = false;
        }else{
            _this.commit_pay = true;
        }
    },
    //改变支付方式
    change_pay_method(){
        var _this = this;
        if(_this.payWay2 == 1){
            var current_coin = Number(_this.userInfo.current_coin);
            var pay_money = Number(_this.pay_money);
            var num = current_coin - pay_money;
            if(num > 0){
                _this.commit_pay = false;
            }else{
                _this.commit_pay = true;
            }
            _this.showPhoneValidCode = true;
          }else if(_this.payWay2 == 2){
              _this.commit_pay = false;
              _this.showPhoneValidCode = false;
            var postData = {};
            if(_this.payWay1 == 1){
                postData.op = "participate";
            }else{
                postData.op = "signing";
            }
            postData.pay_method = "alipayweb";
            var projectid = sessionStorage.getItem("select_projectid");
            postData.projectid = projectid;
            postData.quota_number = _this.devType;
            request("com.iiding.web.personal_center.user_project.get_product_price",postData,res => {
                console.log("返回值",res);
                _this.showAlipayQrcode = true;
            })
          }else{
              _this.commit_pay = false;
              _this.showPhoneValidCode = false;
                var postData = {};
                if(_this.payWay1 == 1){
                    postData.op = "participate";
                }else{
                    postData.op = "signing";
                }
                postData.pay_method = "wxweb";
                var projectid = sessionStorage.getItem("select_projectid");
                postData.projectid = projectid;
                postData.quota_number = _this.devType;
                request("com.iiding.web.personal_center.user_project.get_product_price",postData,res => {
                    console.log("返回值",res);
                    _this.showWxpayQrcode = true;
                })
          }
    },
    //获取产品价格以及产品信息
    get_product_price(){
      var _this = this;
      var projectid = sessionStorage.getItem("select_projectid");
      var select_type = sessionStorage.getItem("select_type");
      request("com.iiding.web.personal_center.user_project.get_product_price",{"projectid":projectid},res => {
        if(res.code == "success"){
          _this.projectInfo = res.data;
          if(select_type == 1){
              _this.payWay1 = 1;
              _this.is_true = true;
              _this.pay_money = Number(res.data.deposit);
              _this.devTypeIsTrue = true;
          }else if(select_type == 2){
              _this.payWay1 = 2;
              _this.is_true = true;
              var deposit_money = Number(res.data.deposit);
              var presell_price = Number(res.data.presell_price);
              _this.pay_money = presell_price - deposit_money;
              _this.devTypeIsTrue = false;
          }else{
              _this.is_true = false;
              _this.payWay1 = 1;
              _this.pay_money = Number(res.data.deposit);
              _this.devTypeIsTrue = true;
          }
        }
      })
    },
    //获取用户余额
    getUserInfo(){
        var _this = this;
        request("com.iiding.common.user.get_user_detail",{},res => {
            if(res.code == "success"){
                _this.userInfo = res.data;
                setTimeout(function(){
                    var num = Number(_this.userInfo.current_coin) - Number(_this.pay_money);
                    if(num > 0){
                        _this.commit_pay = false;
                    }else{
                        _this.commit_pay = true;
                    }
                },300);
             }
         })
    },
    //校验验证码
    onEditPwdCodeChange() {
      let reg = /^\d{6}$/;
      if (reg.test(this.validCode3)) {
        request(
          "com.iiding.common.user.user_phone_check",
          {
            phone: this.userInfo.phone,
            verify_code: this.validCode3
          },
          res => {
            if (res.code == "success") {
                this.commit_pay_button();
            } else {
              this.$message.error("请输入正确的验证码");
            }
          }
        );
      } else {
          this.$message.error("请输入正确的验证码");
      }
    },
    //获取验证码
    getEditPwdValidCode() {
      if (this.codeBtnTxt != "获取验证码") {
        return;
      }
      let reg1 = /^1\d{10}$/;
      console.log(this.userInfo.phone);
      if (!reg1.test(this.userInfo.phone)) {
        this.$message.error("请输入正确的手机号");
        return;
      }
      request(
        "com.iiding.common.user.verify_code",
        { phone: this.userInfo.phone },
        res => {
          if (res.code == "success") {
            this.codeBtnTxt = 60;
            this.codeInterval = setInterval(() => {
              if (this.codeBtnTxt > 1) {
                this.codeBtnTxt--;
              } else {
                this.codeInterval = null;
                clearInterval(this.codeInterval);
                this.codeBtnTxt = "获取验证码";
              }
            }, 1000);
          }
        }
      );
    },
    //确认支付
    commit_pay_button(){
        var _this = this;
        var postData = {};
        var projectid = sessionStorage.getItem("select_projectid");
        postData.projectid = _this.projectid;
        //支付方式
        if(_this.payWay2 == 3){
            postData.pay_method = 1;
        }else if(_this.payWay2 == 2){
            postData.pay_method = 2;
        }else{
            postData.pay_method = 3;
        }
        //操作类型，1预报名，2支付尾款，3支付全额
        if(_this.payWay1 == 1){
            postData.op = "participate";
        }else if(_this.payWay1 == 2){
            var id = sessionStorage.getItem("my_projectid");
            postData.op = "signing";
            postData.quota_number = _this.devType;
            postData.pay_type = 1;
            postData.id = id;
        }else{
            postData.op = "signing";
            postData.quota_number = _this.devType;
            postData.pay_type = 2;
        }
        request("com.iiding.web.personal_center.user_project.add_project",postData,res => {
            if(res.code == "success"){
                _this.$router.push("/paysuccess");
             }else{
                 var msg = res.msg;
                _this.$message.error(msg);
             }
         })
    },
    //获取开发类型
    get_dev_type(){
        var _this = this;
        var param = {};
        param.shopid = _this.$route.params.shopid;
        request("com.iiding.web.shop_management.select_devtype_by_shopid",param,data => {
            _this.dev_list = data.list;
            _this.dev_list.forEach(function(ele){
                ele.dev_count = parseInt(ele.dev_count);
            })
        })
    },
    //获取项目信息
    get_shop_info(){
        var _this = this;
        var param = {};
        param.id = _this.$route.params.shopid;
        request("com.iiding.web.shop_management.select_by_shopid",param,data => {
            _this.jsons = data.list;
        })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/vars.scss";
.main {
  width: 1200px;
  margin: 0 auto;
  min-height: 500px;
  padding: 0 30px;
  box-sizing: border-box;
  background: #ffffff;
  .title {
    font-size: 18px;
    line-height: 23px;
    height: 63px;
    line-height: 63px;
    border-bottom: 2px solid #e7e7e7;
    padding-top: 10px;
    margin: 0;
  }
  .orderinfo {
    .form {
      .form-item {
        display: flex;
        align-items: center;
        margin-top: 40px;
        &:first-child {
          margin-top: 30px;
        }
        .lb {
          font-size: 16px;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          margin-right: 20px;
          &.top {
            align-self: flex-start;
            margin-top: 3px;
          }
        }
        .disp-txt {
          font-size: 16px;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
          &.im {
            font-size: 18px;
            color: $front-color;
          }
        }
        .del-txt {
          font-size: 16px;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
          text-decoration: line-through;
          margin-left: 20px;
        }
        .fieldset {
          width: 100%;
          background: rgba(250, 250, 250, 1);
          padding: 30px;
          box-sizing: border-box;
          .field-item {
            display: flex;
            .tips {
              font-size: 12px;
              color: rgba(153, 153, 153, 1);
              line-height: 15px;
              margin-top: 12px;
              &.tips-price {
                padding-left: 68px;
              }
            }
          }
          .qrcode {
            display: flex;
            align-items: center;
            .pic {
              width: 125px;
              height: 125px;
            }
            .desc {
              font-size: 14px;
              color: $front-color;
              line-height: 18px;
              margin-left: 30px;
            }
          }
        }
        .disp-tips {
          width: 478px;
          display: flex;
          .lb {
            width: fit-content;
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
            line-height: 18px;
            margin-right: 10px;
          }
          .con {
            flex: 1;
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
            line-height: 18px;
          }
        }
        .validcode {
          display: flex;
          .u-btn {
            margin-left: 15px;
          }
        }
        .u-radio {
          &.down-payment {
            .poper {
              position: absolute;
              top: -56px;
              left: 50%;
              transform: translateX(-50%);
              width: 230px;
              height: 54px;
              background: rgba(255, 255, 255, 1);
              box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              color: #999999;
              line-height: 18px;
              z-index: 1;
              padding: 10px;
              box-sizing: border-box;
              text-align: center;
              transition: all ease 0.2s;
              display: none;
              .im {
                color: $front-color;
                align-self: flex-start;
                margin: 0 0 0 10px;
              }
            }
            &:hover {
              .poper {
                display: flex;
              }
            }
          }
        }
        &.valid {
          margin-top: 14px;
        }
      }
      .tools {
        margin: 60px 0 100px;
        .btn {
          height: 46px;
          background: $front-color;
          border-radius: 2px;
          font-size: 16px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: 46px;
          padding: 0 39px;
          box-sizing: border-box;
          &.disabled {
            background: rgba(255, 80, 0, 0.6);
          }
          &.isDisabled{
              cursor: pointer;
          }
        }
      }
    }
    .seperator {
      width: 100%;
      height: 2px;
      background: rgba(231, 231, 231, 1);
      margin: 40px 0 30px;
    }
    .basic-wrapper {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .ad {
        margin-top: 40px;
        .pic {
          width: 400px;
          height: 72px;
          margin-top: 20px;
        }
        .desc {
          margin: 30px 0 0;
          font-size: 16px;
          color: $front-color;
          line-height: 20px;
          letter-spacing: 2px;
        }
      }
    }
  }
}
</style>