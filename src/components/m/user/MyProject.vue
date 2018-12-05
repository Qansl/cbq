<template>
  <div>
    <ul class="u-tabpanel2">
      <i class="icon-back" onclick="history.back()"></i>
      <li class="item" :class="{active:tab==0}" @click="changeTab(0)">预报名项目</li>
      <li class="item" :class="{active:tab==1}" @click="changeTab(1)">开发项目</li>
      <li class="item" :class="{active:tab==2}" @click="changeTab(2)">定制项目</li>
    </ul>
    <div class="main">
      <div v-show="tab==0">
        <ul class="proj-list">
          <li class="form">
            <div class="form-item">
              <span class="lb">商品名称：</span>
              <span class="disp-txt">类拼多多APP商城</span>
            </div>
            <div class="form-item">
              <span class="lb">报名时间：</span>
              <span class="disp-txt">18-11-11 19:22:22</span>
            </div>
            <div class="form-item">
              <span class="lb">开发均摊费用：</span>
              <span class="disp-txt">
                <span class="im">1000</span>
                <span class="del">开发总费：6000</span>
              </span>
            </div>
            <div class="form-tool">
              <button class="btn active">预报名</button>
              <button class="btn">项目进度</button>
              <span style="flex:1"></span>
              <button class="btn small">取消关注</button>
            </div>
            <div class="tips">
              <i class="icon-clock"></i>
              <div class="txt">只剩5个名额 12月30日截止</div>
            </div>
          </li>
          <li class="form">
            <div class="form-item">
              <span class="lb">商品名称：</span>
              <span class="disp-txt">类拼多多APP商城</span>
            </div>
            <div class="form-item">
              <span class="lb">报名时间：</span>
              <span class="disp-txt">18-11-11 19:22:22</span>
            </div>
            <div class="form-item">
              <span class="lb">开发均摊费用：</span>
              <span class="disp-txt">
                <span class="im">1000</span>
                <span class="del">开发总费：6000</span>
              </span>
            </div>
            <div class="form-tool">
              <button class="btn active">支付尾款</button>
              <button class="btn">项目进度</button>
              <span style="flex:1"></span>
              <button class="btn small">取消关注</button>
            </div>
          </li>
          <li class="form">
            <div class="form-item">
              <span class="lb">商品名称：</span>
              <span class="disp-txt">类拼多多APP商城</span>
            </div>
            <div class="form-item">
              <span class="lb">报名时间：</span>
              <span class="disp-txt">18-11-11 19:22:22</span>
            </div>
            <div class="form-item">
              <span class="lb">开发均摊费用：</span>
              <span class="disp-txt">
                <span class="im">1000</span>
                <span class="del">开发总费：6000</span>
              </span>
            </div>
            <div class="form-tool">
              <button class="btn active">支付尾款</button>
              <button class="btn">项目进度</button>
              <span style="flex:1"></span>
              <button class="btn small">取消关注</button>
            </div>
          </li>
        </ul>
      </div>
      <div v-show="tab==1">
        <ul class="proj-list">
          <li class="form">
            <div class="form-item">
              <span class="lb">商品名称：</span>
              <span class="disp-txt">类拼多多APP商城</span>
            </div>
            <div class="form-item">
              <span class="lb">报名时间：</span>
              <span class="disp-txt">18-11-11 19:22:22</span>
            </div>
            <div class="form-item">
              <span class="lb">开发均摊费用：</span>
              <span class="disp-txt">
                <span class="im">1000</span>
                <span class="del">开发总费：6000</span>
              </span>
            </div>
            <div class="form-tool">
              <button class="btn2">支付尾款</button>
              <button class="btn2 active">项目进度</button>
              <button class="btn2 active">项目进度</button>
              <span style="flex:1"></span>
              <button class="btn2 green">取消关注</button>
            </div>
          </li>
          <li class="form">
            <div class="form-item">
              <span class="lb">商品名称：</span>
              <span class="disp-txt">类拼多多APP商城</span>
            </div>
            <div class="form-item">
              <span class="lb">报名时间：</span>
              <span class="disp-txt">18-11-11 19:22:22</span>
            </div>
            <div class="form-item">
              <span class="lb">开发均摊费用：</span>
              <span class="disp-txt">
                <span class="im">1000</span>
                <span class="del">开发总费：6000</span>
              </span>
            </div>
            <div class="form-tool">
              <button class="btn2">支付尾款</button>
              <button class="btn2 active">项目进度</button>
              <button class="btn2 active">项目进度</button>
              <span style="flex:1"></span>
              <button class="btn2 green">取消关注</button>
            </div>
          </li>
        </ul>
      </div>
      <div v-show="tab==2" class="plan_table-wrapper">
        <div class="plan_table">
          <ul>
            <li class="item">
              <div class="option">
                <div class="words">今天</div>
                <div class="circle"></div>
              </div>
              <div class="word">
                非常感谢大家的支持，截止到目前众筹已经突破800万，其中难免有一些售后问题，
                在此声明我们的售后地址只有一个，以下是唯一退换货地址，请大家不要寄错！
                地址：联系人：东方酷音客服部，13692119804退货地址：
                广东省深圳市南山区科技园特发信息科技大厦1802
                （请大家在包裹里备注退换货信息，订单编号，回寄地址和联系人信息。
                请牢记退换货地址仅此一个）
              </div>
              <div class="imgs_box">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
              </div>
            </li>
            <li class="item">
              <div class="option">
                <div class="words">今天</div>
                <div class="circle"></div>
              </div>
              <div class="word">
                非常感谢大家的支持，截止到目前众筹已经突破800万，其中难免有一些售后问题，
                在此声明我们的售后地址只有一个，以下是唯一退换货地址，请大家不要寄错！
                地址：联系人：东方酷音客服部，13692119804退货地址：
                广东省深圳市南山区科技园特发信息科技大厦1802
                （请大家在包裹里备注退换货信息，订单编号，回寄地址和联系人信息。
                请牢记退换货地址仅此一个）
              </div>
              <div class="imgs_box">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
              </div>
            </li>
            <li class="item">
              <div class="option">
                <div class="words">今天</div>
                <div class="circle"></div>
              </div>
              <div class="word">
                非常感谢大家的支持，截止到目前众筹已经突破800万，其中难免有一些售后问题，
                在此声明我们的售后地址只有一个，以下是唯一退换货地址，请大家不要寄错！
                地址：联系人：东方酷音客服部，13692119804退货地址：
                广东省深圳市南山区科技园特发信息科技大厦1802
                （请大家在包裹里备注退换货信息，订单编号，回寄地址和联系人信息。
                请牢记退换货地址仅此一个）
              </div>
              <div class="imgs_box">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
              </div>
            </li>
            <li class="item">
              <div class="option">
                <div class="words">今天</div>
                <div class="circle"></div>
              </div>
              <div class="word">
                非常感谢大家的支持，截止到目前众筹已经突破800万，其中难免有一些售后问题，
                在此声明我们的售后地址只有一个，以下是唯一退换货地址，请大家不要寄错！
                地址：联系人：东方酷音客服部，13692119804退货地址：
                广东省深圳市南山区科技园特发信息科技大厦1802
                （请大家在包裹里备注退换货信息，订单编号，回寄地址和联系人信息。
                请牢记退换货地址仅此一个）
              </div>
              <div class="imgs_box">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
              </div>
            </li>
            <li class="item">
              <div class="option">
                <div class="words">今天</div>
                <div class="circle"></div>
              </div>
              <div class="word">
                非常感谢大家的支持，截止到目前众筹已经突破800万，其中难免有一些售后问题，
                在此声明我们的售后地址只有一个，以下是唯一退换货地址，请大家不要寄错！
                地址：联系人：东方酷音客服部，13692119804退货地址：
                广东省深圳市南山区科技园特发信息科技大厦1802
                （请大家在包裹里备注退换货信息，订单编号，回寄地址和联系人信息。
                请牢记退换货地址仅此一个）
              </div>
              <div class="imgs_box">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
                <img src="http://pic.iidingyun.com/1000//file/20181122/75592.png" alt class="imgs">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0
    };
  },
  methods: {
    changeTab(i) {
      this.tab = i;
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
  padding-top: 47px;
  .proj-list {
    .form {
      padding: 11px 14px;
      box-sizing: border-box;
      margin-top: 15px;
      background: #ffffff;
      position: relative;
      .form-item {
        & + .form-item {
          margin-top: 15px;
        }
        .lb {
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          line-height: 17px;
        }
        .disp-txt {
          font-size: 14px;
          color: #999999;
          .im {
            color: $front-color;
          }
          .del {
            text-decoration: line-through;
          }
        }
      }
      .form-tool {
        border-top: 1px solid rgba(231, 231, 231, 1);
        display: flex;
        padding: 15px 0 6px;
        box-sizing: border-box;
        margin-top: 15px;
        .btn {
          height: 30px;
          line-height: 30px;
          background: #ffffff;
          border-radius: 15px;
          font-size: 14px;
          padding: 0 20px;
          box-sizing: border-box;
          color: #666666;
          &.active {
            background: $front-color;
            color: #ffffff;
          }
          &.small {
            font-size: 12px;
            color: #999999;
            padding: 0;
          }
        }
        .btn2 {
          background: #f5f5f5;
          height: 22px;
          line-height: 22px;
          font-size: 13px;
          color: rgba(51, 51, 51, 1);
          padding: 0 5px;
          &.active {
            color: $front-color;
          }
          &.green {
            background: transparent;
            color: #19dce4;
          }
          & + .btn2 {
            margin-left: 15px;
          }
        }
      }
      .tips {
        width: 75px;
        position: absolute;
        right: 14px;
        top: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        color: $front-color;
        .txt {
          line-height: 14px;
          text-align: center;
        }
      }
    }
  }

  .plan_table {
    border-left: 2px solid #e7e7e7;
    margin: 30px 0px 0px 39px;
    padding: 25px 0px 0px 25px;
    .item {
      position: relative;
      .option {
        position: absolute;
        display: flex;
        height: 12px;
        transform: translate(-112px, 4px);
        background: #ffffff;
        .words {
          height: 12px;
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
          margin-top: 0;
          margin-right: 10px;
          text-align: right;
          width: 70px;
        }
        .circle {
          width: 8px;
          height: 8px;
          border: 2px solid $front-color;
          border-radius: 50%;
        }
      }
      .word {
        width: 664px;
        font-size: 14px;
        line-height: 21px;
      }
      .imgs_box {
        width: 664px;
        margin: 0px auto 30px;
        display: flex;
        flex-flow: wrap;
        .imgs {
          width: 100px;
          height: 100px;
          margin-right: 30px;
          margin-top: 20px;
        }
      }
    }
    .item:last-child {
      margin-bottom: -20px;
    }
  }

  .plan_table {
    background: #ffffff;
    margin: 0px 0px 0px 39px;
    padding: 5px 0px 0px 21px;
    .item {
      .word {
        width: 100%;
        font-size: 14px;
        line-height: 21px;
        color: #666666;
      }
      .imgs_box {
        width: 100%;
        .imgs {
          margin-right: 24px;
          margin-top: 12px;
        }
      }
      .option {
        .words {
          width: 79px;
          margin-top: 0;
          margin-right: 5px;
        }
      }
    }
  }

  .plan_table-wrapper{
    background: #ffffff;  
    margin-top: 10px;
  }
}
</style>
