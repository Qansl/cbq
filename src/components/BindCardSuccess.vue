<template>
    <div>
        <div class="main">
            <h3 class="title">绑定银行卡</h3>
            <div class="result">
                <i class="icon icon-success"></i>
                <p class="desc">绑定成功</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
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
  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 72px;
      height: 72px;
      margin-top: 34px;
      &.icon-success {
        background: url("http://pic.iidingyun.com//file/20181126/75651.png")
          no-repeat;
        background-size: contain;
      }
      .desc {
        font-size: 24px;
        line-height: 32px;
        margin: 0;
        margin-top: 24px;
      }
    }
  }
}
</style>
