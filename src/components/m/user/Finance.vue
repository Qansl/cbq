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
          </li>
        </ul>
      </div>
      <div v-show="tab==1">
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
        </div>
      </div>
      <div v-show="tab==2">
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
        line-height: 30px;
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
