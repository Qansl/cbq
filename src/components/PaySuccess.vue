<template>
    <div >
        <h1 class="g-title-mobile"><i class="icon-back" onclick="history.back()"></i>支付</h1>
        <div class="main">
            <h3 class="title">订单信息</h3>
            <div class="pay-result">
                <i class="icon icon-success"></i>
                <div class="desc">支付成功</div>
                <button class="btn" @click="handleBack">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        handleBack(){
            history.go(-2);
        }
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
  .pay-result{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      .icon{
          width: 72px;
          height: 72px;
          &.icon-success{
              background: url('//pic.iidingyun.com//file/20181126/75651.png') no-repeat;
          }
      }
      .desc{
        font-size:24px;
        line-height:32px;
        margin-top: 24px;
      }
      .btn{
        width:142px;
        height:46px;
        line-height:46px;
        background:rgba(255,80,0,1);
        border-radius:2px;
        font-size:16px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        margin-top: 40px;
      }
  }
}


@media (max-width: 767px){
    .main{
        width: 100%;
        padding-top: 50px;
        background: transparent;
        .title{
            display: none;
        }
        .pay-result{
            .btn{
                width: 81px;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
            }
        }
    }
}
</style>
