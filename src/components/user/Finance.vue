<template>
    <div>
        <div class="stat">
            <h3 class="title">我的资金</h3>
            <div class="stat-con">
                <ul class="list">
                    <li class="item">
                        <div class="no">0.00</div>
                        <div class="desc">总收入
                            <a class="link" href="javascript:;">详情</a>
                        </div>
                        
                    </li>
                    <li class="item">
                        <div class="no">0.00</div>
                        <div class="desc">余额</div>
                    </li>
                </ul>
                <button class="btn">提现</button>
                <button class="btn green">充值</button>
            </div>
        </div>
        <div class="finance-con">
            <ul class="u-tabpanel2">
                <li class="item" :class="{active:tab==0}" @click="changeTab(0)">我的消费</li>
                <li class="item" :class="{active:tab==1}" @click="changeTab(1)">我的收入</li>
                <li class="item" :class="{active:tab==2}" @click="changeTab(2)">平台退费</li>
            </ul>
            <div v-show="tab==0" class="myconsume">
                <table class="u-table">
                    <caption>
                        <span class="time">2018-11-11 11:11:00</span>
                        <span class="order">订单号：</span>
                        <span class="orderid">123456</span>
                    </caption>
                    <thead>
                        <tr>
                            <th>项目</th>
                            <th>规格</th>
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
                                    <span>类拼多多APP商城</span>
                                </div>
                            </td>
                            <td>开发定金</td>
                            <td>无</td>
                            <td>1000</td>
                            <td>微信支付</td>
                            <td>
                                <a class="link" href="javascript:;">退定金</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="u-table">
                    <caption>
                        <span class="time">2018-11-11 11:11:00</span>
                        <span class="order">订单号：</span>
                        <span class="orderid">123456</span>
                    </caption>
                    <thead>
                        <tr>
                            <th>项目</th>
                            <th>规格</th>
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
                                    <span>类拼多多APP商城</span>
                                </div>
                            </td>
                            <td>开发定金</td>
                            <td>无</td>
                            <td>1000</td>
                            <td>微信支付</td>
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
                        <el-select v-model="projid" placeholder="请选择">
                            <el-option
                            v-for="item in proj"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="form-item">
                        <ve-line :data="chartData" ref="chart1" style="width:90%"></ve-line>
                    </div>
                </div>
                <div class="stat-list">
                    <div class="item">总浏览人数：<span class="no">500</span></div>
                    <div class="item">总购买人数：<span class="no">10</span></div>
                    <div class="item">项目收入：<span class="no">3000.00</span></div>
                    <div class="item">利润分红：<span class="no">3000.00</span></div>
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
                        prop="col1"
                        label="日期"
                        align="center"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="col2"
                        label="姓名"
                        align="center"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="col3"
                        label="地址"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="col4"
                        label="地址"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="col5"
                        label="地址"
                        align="center">
                        </el-table-column>
                    </el-table>
                    <div class="pager-wrapper">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="1000">
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
                        prop="col1"
                        label="时间"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="col2"
                        label="项目"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="col3"
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
export default {
  data() {
    return {
      tab: 0,
      proj: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      projid: "",
      purchaseDetails: [
        {
          col1: "2018-11-06 19:00:00",
          col2: "D23456",
          col3: "123456",
          col4: "300.00",
          col5: "100.00"
        },
        {
          col1: "2018-11-06 19:00:00",
          col2: "D23456",
          col3: "123456",
          col4: "300.00",
          col5: "100.00"
        },
        {
          col1: "2018-11-06 19:00:00",
          col2: "D23456",
          col3: "123456",
          col4: "300.00",
          col5: "100.00"
        }
      ],
      chartData: {
        columns: ["时间", "人数"],
        rows: [
          { 时间: "2018-11-06", 人数: 14 },
          { 时间: "2018-11-07", 人数: 28 },
          { 时间: "2018-11-08", 人数: 16 },
          { 时间: "2018-11-09", 人数: 39 },
          { 时间: "2018-11-10", 人数: 60 },
          { 时间: "2018-11-11", 人数: 80 }
        ],
        yAxisName: "fdaf"
      },
      payBack: [
        {
          col1: "2018-11-06 19:00:00",
          col2: "拼多多app商城开发",
          col3: "100"
        },
        {
          col1: "2018-11-06 19:00:00",
          col2: "拼多多app商城开发",
          col3: "100"
        },
        {
          col1: "2018-11-06 19:00:00",
          col2: "拼多多app商城开发",
          col3: "100"
        }
      ]
    };
  },
  methods: {
    changeTab(i) {
      this.tab = i;
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
