<template>
    <div class="message-con">
        <ul class="u-tabpanel2">
            <li class="item active">系统消息</li>
        </ul>
        <ul class="message-list">
            <li class="item">
                <h3 class="title"><span>消费成功提醒</span><i class="icon-new"></i></h3>
                <div class="desc">（3期免息）您于 10月8日打白条279.00元（订单尾号 0975）。前往白条主页查看更多 btm.jd.com</div>
                <span class="time">2018-11-11 22:22:22</span>
            </li>
            <li class="item">
                <h3 class="title"><span>消费成功提醒</span><i class="icon-new"></i></h3>
                <div class="desc">（3期免息）您于 10月8日打白条279.00元（订单尾号 0975）。前往白条主页查看更多 btm.jd.com</div>
                <span class="time">2018-11-11 22:22:22</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.message-con {
  background: #ffffff;
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.05);
  .message-list {
    padding: 0 30px;
    .item {
      position: relative;
      border-bottom: 2px solid #e7e7e7;
      padding: 30px 0 20px;
      .title {
        font-size: 16px;
        line-height: 20px;
        font-weight: normal;
        margin: 0;
        display: flex;
        align-items: center;
        .icon-new {
          display: inline-block;
          width: 25px;
          height: 12px;
          background: url("//pic.iidingyun.com/1000//file/20181128/75716.png")
            no-repeat;
          margin-left: 4px;
        }
      }
      .desc {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
        margin-top: 10px;
      }
      .time {
        position: absolute;
        right: 0;
        top: 32px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
      }
    }
  }
}
</style>
