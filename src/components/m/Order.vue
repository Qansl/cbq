<!-- 下单 -->
<template>
    <div>
        <h1 class="g-title-mobile"><i class="icon-back" onclick="history.back()"></i>订单信息</h1>
        <div class="main">
            <div class="orderinfo">
                <div class="basic-wrapper">
                    <div class="ad">
                        <img class="pic" src="//pic.iidingyun.com//file/20181201/75787.png" alt="">
                        <p class="desc">中国平安为您的资金做财产担保</p>
                    </div>
                    <div class="form basic">
                        <div class="form-item">
                            <div class="lb">项目名称：</div>
                            <div class="disp-txt"> 拼多多APP商城开发</div>
                        </div>
                        <div class="form-item">
                            <div class="lb top">开发类型：</div>
                            <div class="u-radio-group1"> 
                                <label class="u-radio" :class="{ischecked:devType==1}">
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
                                </label>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="lb">开发均摊费：</div>
                            <div class="disp-txt im"> 10000</div>
                            <div class="del-txt">开发总费：6000</div>
                        </div>
                        <div class="form-item">
                            <div class="lb">支付选项：</div>
                            <div class="u-radio-group2"> 
                                <label class="u-radio down-payment" :class="{ischecked:payWay1==1}">
                                    <input v-model="payWay1" class="u-radio__original" type="radio" tabindex="-1" value="1">
                                    <span class="u-radio__label">¥100定金</span>
                                    <div class="poper">
                                        <span class="im">*</span>预报名需支付100元报名费（可退） 预售成功后再缴纳其他费用
                                    </div>
                                </label>
                                <label class="u-radio all" :class="{ischecked:payWay1==2}">
                                    <input v-model="payWay1" class="u-radio__original" type="radio" tabindex="-1" value="2">
                                    <span class="u-radio__label">全额支付</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="agree-wrapper">
                        <label class="u-checkbox">
                            <span class="u-checkbox__input">
                                <span class="u-checkbox__inner" :class="{ischecked:isAgree}"></span>
                                <input v-model="isAgree" type="checkbox" class="u-checkbox__original" value="">
                            </span>
                            <span class="u-checkbox__label">同意<a class="link" target="_blank" href="javascript:;">《支付协议》</a></span>
                        </label>
                        <div class="tips">
                            <p class="title"><span class="im">*</span>温馨提示： </p>
                            <p class="txt">开发项目与阳光保险签订担保合同，</p>
                            <p class="txt">项目预售不成功，所有费用原路退回。</p>
                            <p class="txt">支付完尾款后，我们会将开发合同与财产险合同，发到你的个人中心与邮箱。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="g-footer-mobile">
            <button class="btn" @click="handlePay">立即支付</button>
        </div>
    </div>
</template>

<script>
export default {
  name: "Service",
  data() {
    return {
      payWay1: 1, //支付选项
      payWay2: 1, //支付方式
      devType: 1, //开发类型
      isAgree: false
    };
  },
  methods: {
    handlePay() {
      this.$router.push("/morderpay");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/vars.scss";
.main {
  margin-top: 47px;
  padding-bottom: 60px;
  .orderinfo {
    .basic-wrapper {
      .ad {
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px 0 12px;
        .pic {
          width: 200px;
          height: 36px;
          margin-bottom: 12px;
        }
        .desc {
          font-size: 16px;
          color: $front-color;
          line-height: 20px;
          letter-spacing: 5px;
          margin: 0;
        }
      }
    }

    .form {
      background: #ffffff;
      margin-top: 10px;
      padding: 14px;
      .form-item {
        display: flex;
        align-items: center;
        margin-top: 30px;
        &:first-child {
          margin-top: 0;
        }
        .lb {
          font-size: 15px;
          color: rgba(51, 51, 51, 1);
          line-height: 19px;
          margin-right: 5px;
          &.top {
            align-self: flex-start;
            margin-top: 3px;
          }
        }
        .disp-txt {
          font-size: 14px;
          color: rgba(102, 102, 102, 1);
          line-height: 17px;
          &.im {
            font-size: 14px;
            color: $front-color;
          }
        }
        .del-txt {
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
          line-height: 15px;
          text-decoration: line-through;
          margin-left: 10px;
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
        .u-radio-group1 {
          flex-direction: column;
        }
        .u-radio {
          flex-direction: row;
          .u-radio__desc {
            font-size: 12px;
            line-height: 15px;
            margin-left: 12px;
          }
        }
        .u-radio + .u-radio {
          margin-left: 0;
          margin-top: 16px;
        }
        .u-radio.all {
          margin: 0 0 0 20px;
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

    .agree-wrapper {
      margin-top: 12px;
      padding: 0 14px;
      box-sizing: border-box;
      .tips {
        font-size: 12px;
        line-height: 20px;
        color: #999999;
        margin-top: 17px;
        .title {
          margin-bottom: 5px;
          .im {
            color: $front-color;
          }
        }
        p {
          margin: 0;
        }
      }
    }
  }
}
.g-footer-mobile {
  justify-content: center;
  .btn {
    width: 275px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: $front-color;
    color: #ffffff;
    font-size: 16px;
  }
}
</style>