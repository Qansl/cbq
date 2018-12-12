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
                                <!-- <label class="u-radio" :class="{ischecked:devType==1}">
                                    <input v-model="devType" class="u-radio__original" type="radio" tabindex="-1" value="1">
                                    <span class="u-radio__label">1份</span>
                                    <div class="u-radio__desc">软件+10%分红权</div>
                                </label>
                                <label class="u-radio" :class="{ischecked:devType==2}">
                                    <input v-model="devType" class="u-radio__original" type="radio" tabindex="-1" value="2">
                                    <span class="u-radio__label">2份</span>
                                    <div class="u-radio__desc">软件+20%分红权</div>
                                </label>
                                <label class="u-radio" :class="{ischecked:devType==3}">
                                    <input v-model="devType" class="u-radio__original" type="radio" tabindex="-1" value="3">
                                    <span class="u-radio__label">3份</span>
                                    <div class="u-radio__desc">软件+30%分红权</div>
                                </label> -->
                                <label class="u-radio" v-for="item in dev_list" :key="item.id" :class="{ischecked:devType==item.dev_count}">
                                    <input v-model="devType" class="u-radio__original" type="radio" tabindex="-1" :value="item.dev_count">
                                    <span class="u-radio__label">{{item.dev_count}}份</span>
                                    <div class="u-radio__desc">{{item.mark}}</div>
                                </label>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="lb">开发均摊费：</div>
                            <div class="disp-txt im">{{jsons.presell_price}}</div>
                            <div class="del-txt">开发总费：{{jsons.presell_price * jsons.person_count}}</div>
                        </div>
                        <div class="form-item">
                            <div class="lb">支付选项：</div>
                            <div class="u-radio-group2"> 
                                <label class="u-radio down-payment" :class="{ischecked:payWay1==1}">
                                    <input v-model="payWay1" class="u-radio__original" type="radio" tabindex="-1" value="1">
                                    <span class="u-radio__label">¥{{jsons.deposit * devType}}定金</span>
                                    <div class="poper">
                                        <span class="im">*</span>预报名需支付{{jsons.deposit * devType}}元报名费（可退） 预售成功后再缴纳其他费用
                                    </div>
                                </label>
                                <label class="u-radio" :class="{ischecked:payWay1==2}">
                                    <input v-model="payWay1" class="u-radio__original" type="radio" tabindex="-1" value="2">
                                    <span class="u-radio__label">全额支付</span>
                                </label>
                            </div>
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
                            <label class="u-radio" :class="{ischecked:payWay2==1}">
                                <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="1">
                                <span class="u-radio__label">余额支付</span>
                            </label>
                            <label class="u-radio" :class="{ischecked:payWay2==2}">
                                <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="2">
                                <span class="u-radio__label">支付宝支付</span>
                            </label>
                            <label class="u-radio" :class="{ischecked:payWay2==3}">
                                <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="3">
                                <span class="u-radio__label">微信支付</span>
                            </label>
                        </div>
                    </div>
                    <div v-show="payWay2==1" class="form-item">
                        <div class="fieldset">
                            <div class="field-item">
                                <div class="lb">余额：</div>
                                <div class="disp-txt im">10000</div>
                            </div>
                            <div class="field-item">
                                <div class="tips tips-price">
                                    余额充足可支付
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="payWay2==2" class="form-item">
                        <div class="fieldset">
                            <div class="qrcode">
                                <img class="pic" src="//pic.iidingyun.com//file/20181120/75482.png" alt="">
                                <div class="desc">请用支付宝扫码支付</div>
                            </div>
                        </div>
                    </div>
                    <div v-show="payWay2==3" class="form-item">
                        <div class="fieldset">
                            <div class="qrcode">
                                <img class="pic" src="//pic.iidingyun.com//file/20181120/75482.png" alt="">
                                <div class="desc">请用微信扫码支付</div>
                            </div>
                        </div>
                    </div>
                    <div class="form-item">
                        <label class="u-checkbox">
                            <span class="u-checkbox__input">
                                <span class="u-checkbox__inner" :class="{ischecked:isAgree}"></span>
                                <input v-model="isAgree" type="checkbox" class="u-checkbox__original" value="">
                            </span>
                            <span class="u-checkbox__label">已阅读并同意<a class="link" target="_blank" href="javascript:;">《支付协议》</a></span>
                        </label>
                    </div>
                </div>
                <div class="seperator"></div>
                <div class="form">
                    <div class="form-item">
                        <div class="lb">手机验证：</div>
                        <div class="disp-txt im">{{phone}}</div>
                    </div>
                    <div class="form-item valid">
                        <div class="validcode">
                            <input class="u-input" type="text" placeholder="验证码">
                            <button class="u-btn u-btn-goast">获取验证码</button>
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="disp-tips">
                            <div class="lb">温馨提示：</div>
                            <div class="con">开发项目与阳光保险签订担保合同，项目预售不成功，所有费用原路退回。支付完尾款后，我们会将开发合同与财产险合同，发到你的个人中心与邮箱。</div>
                        </div>
                    </div>
                    <div class="tools">
                        <button class="btn disabled" @click="handlePay">立即支付</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { request } from "../api/api";
export default {
  name: "Service",
  data() {
    return {
      payWay1: 1, //支付选项
      payWay2: 1, //支付方式
      devType: 1, //开发类型
      isAgree: false,
      status:'',
      dev_list:[],
      jsons:{},
    };
  },
  mounted(){
      this.status = this.$route.params.status;
      console.log(this.status);
      this.get_dev_type();
      this.get_shop_info();
    //this.$store.commit('changeUserInfo',{phone:'fdsfs'})
  },
  computed:{
      phone:function(){
          return this.$store.state.userInfo.phone.substr(0,3) + "****" + this.$store.state.userInfo.phone.substr(7);
      }
  },
  methods:{
    handlePay() {
      this.$router.push("/paysuccess");
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
  }
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