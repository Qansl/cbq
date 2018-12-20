<!-- 下单 -->
<template>
    <div>
        <div class="main">
            <h3 class="title">充值信息</h3>
            <div class="orderinfo">
                <div class="basic-wrapper">
                    <div class="form basic">
                        <div class="form-item">
                            <div class="lb">我的余额：</div>
                            <div class="disp-txt">{{userInfo.current_coin}}</div>
                        </div>
                        <div class="form-item" v-show="jsons.status == 0">
                            <div class="lb">充值金额：</div>
                           <input class="u-input" type="text" v-model="recharge_money" placeholder="请输入充值金额" >
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
                            <label class="u-radio" :class="{ischecked:payWay2==2}" @change="change_pay_method">
                                <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="1">
                                <span class="u-radio__label">支付宝支付</span>
                            </label>
                            <label class="u-radio" :class="{ischecked:payWay2==3}" @change="change_pay_method">
                                <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="2">
                                <span class="u-radio__label">微信支付</span>
                            </label>
                        </div>
                    </div>
                    <div  class="form-item" v-show="showAlipayQrcode">
                        <div class="fieldset">
                            <div class="qrcode">
                                <img class="pic" :src="qr_code" alt="">
                                <div class="desc">请用支付宝扫码支付</div>
                            </div>
                        </div>
                    </div>
                    <div  class="form-item" v-show="showWxpayQrcode">
                        <div class="fieldset">
                            <div class="qrcode">
                                <img class="pic" :src="qr_code" alt="">
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
            </div>
        </div>
    </div>
</template>

<script>

import { request,SITEID } from "../../api/api";

export default {
  name: "RechargeMoney",
  data() {
    return {
      payWay2: 1, //支付方式
      showWxpayQrcode:false,
      showAlipayQrcode:true,
      recharge_money:"",
      userInfo:{
          "current_coin":0
      },
      order_number:""
    };
  },
  mounted:function(){
    this.getUserInfo();
  },
  methods:{
    //改变购买数量
    change_pay_method(){
        if(_this.payWay2 == 1){
            var _this = this;
            var url = "com.iiding.web.personal_center.money_manage.recharge.recharge_my_money";
            var param = {money:_this.recharge_money,pay_method:"alipayweb"};
            request(url, param, result => {
                if(res.payinfo){
                    loading.close();
                    _this.order_number = res.tradeno;
                    _this.qr_code = "http://iidingyun.com/barcodeImage.do?text=" + res.payinfo;
                    _this.showAlipayQrcode = true;
                    _this.showWxpayQrcode = false;
                    _this.get_payResult();
                }else{
                    loading.close();
                    _this.showWxpayQrcode = false;
                    _this.showAlipayQrcode = false;
                    var msg = res.msg;
                    _this.$message.error(msg)
                }
            })
        }else{
            var _this = this;
            var url = "com.iiding.web.personal_center.money_manage.recharge.recharge_my_money";
            var param = {money:_this.recharge_money,pay_method:"wxweb"};
            request(url, param, result => {
                if(res.payinfo){
                    loading.close();
                    _this.order_number = res.tradeno;
                    _this.qr_code = "http://iidingyun.com/barcodeImage.do?text=" + res.payinfo;
                    _this.showWxpayQrcode = true;
                    _this.showAlipayQrcode = false;
                    _this.get_payResult();
                }else{
                    loading.close();
                    _this.showWxpayQrcode = false;
                    _this.showAlipayQrcode = false;
                    var msg = res.msg;
                    _this.$message.error(msg)
                }
            })
        }
    },
    //获取支付结果
    get_payResult: function () {
        this.payDialogVisible++;
        console.log("payDialogVisible",this.payDialogVisible);
        var _this = this;
        var url = "com.iiding.web.personal_center.money_manage.get_order_info";
        var param = {order_number:_this.order_number};
        request(url, param, result => {
            console.log("get_payResult",result);
            if (result.code == "order_not_exist"){

            }else if(result.code == 'success') {
                 _this.$router.push("/paysuccess");
                 return true;
            }else{
                _this.$message({ type: 'error', message: "支付失败"});
            }
            if(_this.payDialogVisible >= 180){
                _this.payDialogVisible = false;
                _this.$message({ type: 'error', message: "支付失败"});
                setTimeout(function(){
                      _this.$router.push('/home');
                },1000)
                return false;
            }
            setTimeout(function(){
                _this.get_payResult();
            },1200)
        });
    },
    //获取用户余额
    getUserInfo(){
        var _this = this;
        request("com.iiding.common.user.get_user_detail",{},res => {
            if(res.code == "success"){
                _this.userInfo = res.data;
             }
         })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/vars.scss";
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