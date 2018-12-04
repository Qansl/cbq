<template>
  <div>
    <h1 class="g-title-mobile">
      <i class="icon-back" onclick="history.back()"></i>实名认证
    </h1>
    <div class="main">
      <div class="form">
        <div class="form-item">
          <div class="lb">真实姓名：</div>
          <input class="u-input" type="text" placeholder="请输入真实姓名">
        </div>
        <div class="form-item">
          <div class="lb">身份证号：</div>
          <input class="u-input" type="text" placeholder="请输入身份证号">
        </div>
        <div class="form-item">
          <div class="card-wrapper">
            <img src="//pic.iidingyun.com/1000//file/20181129/75734.png" alt class="pic">
          </div>
          <div class="card-wrapper">
            <img src="//pic.iidingyun.com/1000//file/20181129/75734.png" alt class="pic">
          </div>
        </div>
        <div class="form-tool submit">
          <button class="btn">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../../styles/vars.scss";
.main {
  padding-top: 47px;
  padding-bottom: 56px;
  .form {
    padding: 6px 14px 14px;
    box-sizing: border-box;
    background: #ffffff;
    .form-item {
      display: flex;
      flex-direction: column;
      .lb {
        height: 47px;
        line-height: 47px;
        font-size: 15px;
        color: rgba(51, 51, 51, 1);
      }
      .card-wrapper{
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
      }
    }
    .form-tool {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 24px;
      .btn {
        width: 275px;
        height: 40px;
        line-height: 40px;
        background: $front-color;
        border-radius: 1px;
        color: #ffffff;
        font-size: 16px;
      }
      &.submit{
          width: 100%;
          position: fixed;
          left: 0;
          bottom: 0;
          z-index: 999;
          background: #fff;
          text-align: center;
          padding: 8px 0;
      }
    }
  }
}
</style>
