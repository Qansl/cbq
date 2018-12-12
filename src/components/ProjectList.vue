<!--预售项目-->
<template>
    <div>
        <div class="type-wrapper">
            <div class="type-inner">
                <div class="type-item">
                    <div class="lb">类型</div>
                    <ul class="type">
                        <li class="item" :class="{active:tops == 0}" @click="changeTab(0)">预售项目</li>
                        <li class="item" :class="{active:tops == 1}" @click="changeTab(1)">开发中项目</li>
                        <li class="item" :class="{active:tops == 2}" @click="changeTab(2)">定制项目</li>
                    </ul>
                </div>
                <div class="type-item">
                    <div class="lb">品类</div>
                    <ul class="type">
                        <!-- <li class="item active">全部</li>
                        <li class="item">游戏</li>
                        <li class="item">直播</li>
                        <li class="item">硬件</li>
                        <li class="item">旅游</li>
                        <li class="item">餐厅</li>
                        <li class="item">小程序</li>
                        <li class="item">商城</li> -->
                        <li class="item" :class="{active:op == 0}" @click="changeType(0)">全部</li>
                        <li class="item" v-for="item in type_list" :key="item.type_id" @click="changeType(item.type_id)" :class="{active:op == item.type_id}">{{item.type_name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="order">
                <div class="lb">排序:</div>
                <ul class="field">
                    <li class="item down-single active">综合</li>
                    <li class="item down-single">参与人数</li>
                    <li class="item up-down up">价格</li>
                    <li class="item up-down down">截止日期</li>
                </ul>
            </div>

            <div class="m-project">
                <ul class="list">
                <li class="item">
                    <a class="item-inner" href="javascript:;">
                    <div class="cover-wrapper">
                        <img class="cover" src="//pic.iidingyun.com//file/20181120/75485.png" alt="">
                    </div>
                    <h3 class="name">拼多多类APP商城 定制开发</h3>
                    <div class="price-wrapper">
                        <div class="price">3000.<span class="decimal">00</span></div>
                        <div class="status">满额截标</div>
                    </div>
                    <div class="progress-wrapper">
                        <progress class="u-progress" value="22" max="100"></progress>
                    </div>
                    <ul class="details">
                        <li>
                        <div class="prog">60%</div>
                        <div class="desc">完成</div>
                        </li>
                        <li>
                        <div class="prog">6人</div>
                        <div class="desc">参与人数</div>
                        </li>
                        <li>
                        <div class="prog">30天</div>
                        <div class="desc">剩余时间</div>
                        </li>
                    </ul>
                    <div class="tag">满10人截标</div>
                    <div class="qrcode-wrapper">
                        <img class="pic" src="//pic.iidingyun.com//file/20181120/75482.png" alt="">
                        <div class="desc">扫码查看样例</div>
                    </div>
                    </a>
                </li>
                <li class="item">
                    <a class="item-inner" href="javascript:;">
                    <div class="cover-wrapper">
                        <img class="cover" src="//pic.iidingyun.com//file/20181120/75485.png" alt="">
                    </div>
                    <h3 class="name">拼多多类APP商城 定制开发</h3>
                    <div class="price-wrapper">
                        <div class="price">3000.<span class="decimal">00</span></div>
                        <div class="status">满额截标</div>
                    </div>
                    <div class="progress-wrapper">
                        <progress class="u-progress" value="22" max="100"></progress>
                    </div>
                    <ul class="details">
                        <li>
                        <div class="prog">60%</div>
                        <div class="desc">完成</div>
                        </li>
                        <li>
                        <div class="prog">6人</div>
                        <div class="desc">参与人数</div>
                        </li>
                        <li>
                        <div class="prog">30天</div>
                        <div class="desc">剩余时间</div>
                        </li>
                    </ul>
                    <div class="tag">满10人截标</div>
                    <div class="qrcode-wrapper">
                        <img class="pic" src="//pic.iidingyun.com//file/20181120/75482.png" alt="">
                        <div class="desc">扫码查看样例</div>
                    </div>
                    </a>
                </li>
                <li class="item">
                    <a class="item-inner" href="javascript:;">
                    <div class="cover-wrapper">
                        <img class="cover" src="//pic.iidingyun.com//file/20181120/75485.png" alt="">
                    </div>
                    <h3 class="name">拼多多类APP商城 定制开发</h3>
                    <div class="price-wrapper">
                        <div class="price">3000.<span class="decimal">00</span></div>
                        <div class="status">满额截标</div>
                    </div>
                    <div class="progress-wrapper">
                        <progress class="u-progress" value="22" max="100"></progress>
                    </div>
                    <ul class="details">
                        <li>
                        <div class="prog">60%</div>
                        <div class="desc">完成</div>
                        </li>
                        <li>
                        <div class="prog">6人</div>
                        <div class="desc">参与人数</div>
                        </li>
                        <li>
                        <div class="prog">30天</div>
                        <div class="desc">剩余时间</div>
                        </li>
                    </ul>
                    <div class="tag">满10人截标</div>
                    <div class="qrcode-wrapper">
                        <img class="pic" src="//pic.iidingyun.com//file/20181120/75482.png" alt="">
                        <div class="desc">扫码查看样例</div>
                    </div>
                    </a>
                </li>
                <li class="item">
                    <a class="item-inner" href="javascript:;">
                    <div class="cover-wrapper">
                        <img class="cover" src="//pic.iidingyun.com//file/20181120/75485.png" alt="">
                    </div>
                    <h3 class="name">拼多多类APP商城 定制开发</h3>
                    <div class="price-wrapper">
                        <div class="price">3000.<span class="decimal">00</span></div>
                        <div class="status">满额截标</div>
                    </div>
                    <div class="progress-wrapper">
                        <progress class="u-progress" value="22" max="100"></progress>
                    </div>
                    <ul class="details">
                        <li>
                        <div class="prog">60%</div>
                        <div class="desc">完成</div>
                        </li>
                        <li>
                        <div class="prog">6人</div>
                        <div class="desc">参与人数</div>
                        </li>
                        <li>
                        <div class="prog">30天</div>
                        <div class="desc">剩余时间</div>
                        </li>
                    </ul>
                    <div class="tag">满10人截标</div>
                    <div class="qrcode-wrapper">
                        <img class="pic" src="//pic.iidingyun.com//file/20181120/75482.png" alt="">
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
import { request } from "../api/api";
export default {
  name: "ProjectList",
  data(){
      return {
          tops:0,
          type_list:[],
          op:0,
      }
  },
  mounted(){
      this.get_list();
      this.tops = this.$route.params.type;
  },
  methods:{
      //获取列表
      get_list(){
          var _this = this;
          var param = {};
          param.status = _this.$route.params.type;
          request("com.iiding.web.index.shop_list",param,data => {
              console.log(data);
              _this.type_list = data.type_list;
          })
      },
      //切换
      changeTab(i){
          this.tops = i;
      },
      changeType(i){
          this.op = i;
      },
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/vars.scss";
.type-wrapper {
  background: #f7f7f7;
  padding: 20px 0;
  box-sizing: border-box;
  .type-inner {
    width: 1200px;
    margin: 0 auto;
    border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
    .type-item {
      display: flex;
      .lb {
        width: 110px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
      }
      .type {
        flex: 1;
        display: flex;
        flex-flow: wrap;
        .item {
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          line-height: 18px;
          width: 106px;
          height: 28px;
          line-height: 28px;
          margin: 3px 0 0 2px;
          text-align: center;
          cursor: pointer;
          background: transparent;
          transition: background ease 0.2s;
          &:not(.active):hover {
            background: rgba(231, 231, 231, 1);
            border-radius: 4px;
          }
          &.active {
            color: $front-color;
          }
        }
        & + .type {
          margin-top: 6px;
        }
      }
    }
  }
}

.main {
  width: 1200px;
  margin: 40px auto 90px;
  .order {
    width: 395px;
    height: 26px;
    line-height: 26px;
    background: #f7f7f7;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding: 4px 0;
    .lb {
      padding: 0 19px;
    }
    .field {
      color: #666666;
      display: flex;
      .item {
        padding: 0 24px 0 10px;
        cursor: pointer;
        & + .item {
          border-left: 1px solid #e7e7e7;
        }
        &.up-down {
          position: relative;
          &::before {
            content: "";
            width: 0px;
            height: 0px;
            position: absolute;
            border-width: 6px 4px 0;
            right: 10px;
            top: 14px;
            border-style: solid;
            border-color: #b0b0b0 transparent transparent;
          }
          &::after {
            content: "";
            width: 0px;
            height: 0px;
            position: absolute;
            transform: rotate(180deg);
            border-width: 6px 4px 0;
            right: 10px;
            top: 6px;
            border-style: solid;
            border-color: #b0b0b0 transparent transparent;
          }
          &.up::after {
            border-color: $front-color transparent transparent;
          }
          &.down::before {
            border-color: $front-color transparent transparent;
          }
        }
        &.down-single {
          position: relative;
          &::before {
            content: "";
            width: 0px;
            height: 0px;
            position: absolute;
            border-width: 6px 4px 0;
            right: 10px;
            top: 14px;
            border-style: solid;
            border-color: #b0b0b0 transparent transparent;
          }
          &::after {
            content: "";
            width: 4px;
            height: 8px;
            position: absolute;
            right: 12px;
            top: 7px;
            background: #b0b0b0;
          }
          &.active::before {
            border-color: $front-color transparent transparent;
          }
          &.active::after {
            background: $front-color;
          }
        }
        &.active {
          color: $front-color;
        }
      }
    }
  }
}
</style>

