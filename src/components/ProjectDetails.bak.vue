<template>
    <div>
        <div class="main">
            <div class="intro-container">
                <img class="cover" src="//pic.iidingyun.com//file/20181122/75577.png" alt="">
                <div class="intro-details">
                    <h2 class="title">拼多多类APP商城 定制开发</h2>
                    <div class="desc">近百种营销工具，系统化管理客户，分销拓展销售渠道</div>
                    <ul class="stat">
                        <li class="item">
                            <div class="lb">参与费用：</div>
                            <div class="num">
                                <span class="unit-price">¥</span>
                                <span>3000</span>
                            </div>
                        </li>
                        <li class="item">
                            <div class="lb">参与人数：</div>
                            <div class="num">
                                <span>10</span>
                                <span class="unit-person">人</span>
                            </div>
                        </li>
                    </ul>
                    <div class="prog-wrapper">
                        <progress class="u-progress" value="88" max="100"></progress>
                        <ul class="prog-details">
                            <li>
                                <div class="prog">60%</div>
                                <div class="desc2">完成</div>
                            </li>
                            <li>
                                <div class="prog">6人</div>
                                <div class="desc2">参与人数</div>
                            </li>
                            <li>
                                <div class="prog">30天</div>
                                <div class="desc2">剩余时间</div>
                            </li>
                        </ul>
                    </div>
                    <div class="tips">预报名需支付100元报名费（可退）预售成功后再缴纳其他费用</div>
                    <button class="btn">预报名参与</button>
                    <div class="u-share">
                        <span class="lb">分享到</span>
                        <ul class="list">
                            <li class="icon icon-weibo"></li>
                            <li class="icon icon-qq"></li>
                            <li class="icon icon-dou"></li>
                            <li class="icon icon-ren"></li>
                            <li class="icon icon-wechat"></li>
                        </ul>
                    </div>
                    <a class="star" href="javascript:;">关注</a>
                </div>
            </div>
            <div class="project-details">
                <div class="details-main">
                    <ul class="u-tabpanel">
                        <li class="item" :class="{active:tab==0}" @click="changeTab(0)">项目介绍</li>
                        <li class="item" :class="{active:tab==1}" @click="changeTab(1)">项目回报</li>
                        <li class="item" :class="{active:tab==2}" @click="changeTab(2)">功能说明</li>
                        <li class="item" :class="{active:tab==3}" @click="changeTab(3)">项目进展</li>
                        <li class="item" :class="{active:tab==4}" @click="changeTab(4)">项目答疑</li>
                    </ul>
                    <div v-show="tab==0" class="proj-intro">
                        <img src="//pic.iidingyun.com//file/20181122/75576.png" alt="">
                    </div>
                    <div v-show="tab==1" class="proj-intro">
                        从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。
                    </div>
                    <div v-show="tab==2" class="proj-intro">
                        从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。
                    </div>
                    <div v-show="tab==3" class="proj-intro">
                        项目进展
                    </div>
                    <div v-show="tab==4" class="proj-intro q-a-wrapper">
                        <ul class="q-a">
                            <li class="item">
                                <div class="ques">什么时候发货？</div>
                                <div class="answer">非常感谢大家的支持，截止到目前众筹已经突破800万，其中难免有一些售后问题，在此声明我们的售后地址只有一个，以下是唯一退换货地址，请大家不要寄错！地址：联系人：东方酷音客服部，13692119804退货地址：广东省深圳市南山区科技园特发信息科技大厦1802（请大家在包裹里备注退换货信息，订单编号，回寄地址和联系人信息。请牢记退换货地址仅此一个）</div>
                            </li>
                            <li class="item">
                                <div class="ques">什么时候发货？</div>
                                <div class="answer">非常感谢大家的支持，截止到目前众筹已经突破800万，其中难免有一些售后问题，在此声明我们的售后地址只有一个，以下是唯一退换货地址，请大家不要寄错！地址：联系人：东方酷音客服部，13692119804退货地址：广东省深圳市南山区科技园特发信息科技大厦1802（请大家在包裹里备注退换货信息，订单编号，回寄地址和联系人信息。请牢记退换货地址仅此一个）</div>
                            </li>
                            <li class="item">
                                <div class="ques">什么时候发货？</div>
                                <div class="answer">非常感谢大家的支持，截止到目前众筹已经突破800万，其中难免有一些售后问题，在此声明我们的售后地址只有一个，以下是唯一退换货地址，请大家不要寄错！地址：联系人：东方酷音客服部，13692119804退货地址：广东省深圳市南山区科技园特发信息科技大厦1802（请大家在包裹里备注退换货信息，订单编号，回寄地址和联系人信息。请牢记退换货地址仅此一个）</div>
                            </li>
                            <li class="item">
                                <div class="ques">什么时候发货？</div>
                                <div class="answer">非常感谢大家的支持，截止到目前众筹已经突破800万，其中难免有一些售后问题，在此声明我们的售后地址只有一个，以下是唯一退换货地址，请大家不要寄错！地址：联系人：东方酷音客服部，13692119804退货地址：广东省深圳市南山区科技园特发信息科技大厦1802（请大家在包裹里备注退换货信息，订单编号，回寄地址和联系人信息。请牢记退换货地址仅此一个）</div>
                            </li>
                            <li class="item">
                                <div class="ques">什么时候发货？</div>
                                <div class="answer">非常感谢大家的支持，截止到目前众筹已经突破800万，其中难免有一些售后问题，在此声明我们的售后地址只有一个，以下是唯一退换货地址，请大家不要寄错！地址：联系人：东方酷音客服部，13692119804退货地址：广东省深圳市南山区科技园特发信息科技大厦1802（请大家在包裹里备注退换货信息，订单编号，回寄地址和联系人信息。请牢记退换货地址仅此一个）</div>
                            </li>
                        </ul>
                    </div>
                    
                </div>
                <aside class="aside">
                    <div class="service-wrapper">
                        <h3 class="title">客服热线</h3>
                        <div class="no">400-600-6666</div>
                        <div class="time">周一至周五（09:00-18:00）</div>
                        <div class="tips">* 项目最终解释权归平台所有</div>
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
                </aside>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProjectDetails",
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
@import "../styles/vars.scss";

.main {
  width: 1200px;
  margin: 0 auto 100px auto;
  .intro-container {
    display: flex;
    width: 100%;
    height: 440px;
    box-shadow: 0px 0px 40px 0px rgba(216, 216, 216, 0.5);
    border-radius: 2px;
    padding: 20px 0 20px 20px;
    box-sizing: border-box;
    .cover {
      flex: 1;
      height: 400px;
    }
    .intro-details {
      width: 390px;
      padding: 0 10px 0 20px;
      box-sizing: border-box;
      position: relative;
      .title {
        margin: 0;
        font-weight: normal;
        height: 30px;
        line-height: 30px;
        font-size: 24px;
        padding-left: 10px;
      }
      .desc {
        height: 24px;
        font-size: 14px;
        line-height: 24px;
        margin-top: 10px;
        color: #666666;
        padding-left: 10px;
      }
      .stat {
        width: 100%;
        display: flex;
        margin-top: 20px;
        position: relative;
        padding-left: 10px;
        box-sizing: border-box;
        .item {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          .lb {
            font-size: 16px;
            line-height: 20px;
          }
          .num {
            font-size: 48px;
            color: $front-color;
            line-height: 55px;
            display: flex;
            align-items: flex-end;
            margin-top: 10px;
            .unit-price {
              font-size: 24px;
              line-height: 30px;
              color: #333333;
              margin-right: 4px;
              margin-bottom: 4px;
            }
            .unit-person {
              font-size: 24px;
              line-height: 30px;
              color: #333333;
              margin-left: 4px;
              margin-bottom: 4px;
            }
          }
          & + .item {
            .lb,
            .num {
              margin-left: 45px;
            }
          }
        }
        &::after {
          content: "";
          width: 1px;
          height: 62px;
          background: rgba(231, 231, 231, 1);
          position: absolute;
          left: 174px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .prog-wrapper {
        width: 100%;
        height: 80px;
        background: rgba(255, 249, 242, 1);
        border-radius: 2px;
        padding: 10px;
        box-sizing: border-box;
        margin-top: 10px;
        .prog-details {
          display: flex;
          margin-top: 7px;
          li {
            flex: 1;
            overflow: hidden;
            .prog {
              font-size: 16px;
              color: rgba(102, 102, 102, 1);
              line-height: 20px;
            }
            .desc2 {
              font-size: 12px;
              color: rgba(153, 153, 153, 1);
              line-height: 15px;
              margin-top: 2px;
            }
            & + li {
              padding-left: 20px;
              box-sizing: border-box;
              border-left: 1px solid #e7e7e7;
            }
          }
        }
      }
      .tips {
        font-size: 12px;
        color: #999999;
        line-height: 15px;
        margin-top: 10px;
        position: relative;
        box-sizing: border-box;
        padding-left: 18px;
        box-sizing: border-box;
        &::after {
          content: "*";
          font-size: 12px;
          color: $front-color;
          position: absolute;
          left: 10px;
          top: 0;
        }
      }
      .btn {
        height: 40px;
        line-height: 40px;
        background: $front-color;
        border-radius: 2px;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        padding: 0 45px;
        border: 0;
        outline: none;
        cursor: pointer;
        margin-top: 20px;
        margin-left: 10px;
        transition: opacity ease 0.2s;
        &:hover {
          opacity: 0.9;
        }
      }

      .u-share {
        margin-left: 10px;
        margin-top: 30px;
      }
      .star {
        position: absolute;
        right: 20px;
        bottom: 56px;
        padding-left: 26px;
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        height: 22px;
        line-height: 22px;
        display: block;
        &::before {
          content: "";
          width: 22px;
          height: 22px;
          position: absolute;
          left: 0;
          top: 0;
          background: url("//pic.iidingyun.com//file/20181122/75575.png")
            no-repeat;
        }
      }
    }
  }
  .project-details {
    display: flex;
    margin-top: 50px;
    .details-main {
      flex: 1;
      box-shadow: 0px 0px 40px 0px rgba(216, 216, 216, 0.5);
      border-radius: 2px;
      .proj-intro {
        padding: 20px 40px 60px;
        box-sizing: border-box;
        overflow: hidden;
        font-size: 16px;
        line-height: 24px;
        &.q-a-wrapper{
            padding: 0 20px 60px;
        }
        .q-a {
          .item {
            border-bottom: 1px solid #e7e7e7;
            .ques {
              font-size: 16px;
              font-weight: bold;
              line-height: 20px;
              margin-top: 35px;
              padding: 0 20px 0 50px;
              box-sizing: border-box;
              position: relative;
              &::before {
                content: "";
                width: 30px;
                height: 30px;
                background: url("//pic.iidingyun.com/1000//file/20181122/75586.png")
                  no-repeat;
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
              }
            }
            .answer {
              font-size: 14px;
              color: rgba(102, 102, 102, 1);
              line-height: 21px;
              margin-top: 25px;
              padding: 0 20px 30px 50px;
              box-sizing: border-box;
              position: relative;
              &::before {
                content: "";
                width: 30px;
                height: 30px;
                background: url("//pic.iidingyun.com//file/20181122/75587.png")
                  no-repeat;
                position: absolute;
                left: 10px;
                top: 0;
              }
            }
          }
        }
      }
    }
    .aside {
      width: 380px;
      margin-left: 10px;
      .service-wrapper {
        box-shadow: 0px 0px 40px 0px rgba(216, 216, 216, 0.5);
        border-radius: 2px;
        padding-bottom: 20px;
        .title {
          font-size: 18px;
          color: rgba(102, 102, 102, 1);
          line-height: 23px;
          height: 43px;
          line-height: 43px;
          border-bottom: 1px solid #e7e7e7;
          text-align: center;
          margin: 0;
        }
        .no {
          font-size: 36px;
          font-weight: bold;
          color: $front-color;
          line-height: 42px;
          text-align: center;
          margin-top: 30px;
          font-family: myFont;
        }
        .time {
          font-size: 14px;
          color: rgba(102, 102, 102, 1);
          line-height: 18px;
          margin-top: 2px;
          text-align: center;
        }
        .tips {
          font-size: 12px;
          color: rgba(176, 176, 176, 1);
          line-height: 15px;
          margin: 40px 20px 0 0;
          text-align: right;
        }
      }
      .m-project {
        .list {
          width: 410px;
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
