<template>
  <div>
    <h1 class="g-title-mobile">
      <i class="icon-back" onclick="history.back()"></i>修改登录密码
    </h1>
    <div class="main">
      <div class="form">
        <div class="form-item">
          <div class="lb">请验证<span class="im">134****1111</span>手机号</div>
          <input class="u-input" type="text" placeholder="输入11位手机号" maxlength="11">
        </div>
        <div class="form-item">
          <div class="validcode-wrapper">
            <div class="validcode">
              <input class="u-input" type="text" placeholder="验证码">
              <i class="icon icon-valid-success"></i>
            </div>
            <button class="btn">获取验证码</button>
          </div>
        </div>
        <div class="form-item">
          <input class="u-input" type="text" placeholder="输入6 - 16位密码，区分大小写" maxlength="16">
        </div>
        <div class="form-item">
          <input class="u-input" type="text" placeholder="确认密码">
        </div>
        <div class="form-tool">
          <button class="btn">确定</button>
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
        .im{
            color: $front-color;
        }
      }
      .validcode-wrapper {
        display: flex;
        .validcode {
          flex: 1;
          .u-input {
            width: 100%;
          }
          position: relative;
          .icon {
            position: absolute;
            width: 14px;
            height: 14px;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            &.icon-valid-success {
              background: url("//pic.iidingyun.com/1000//file/20181123/75605.png")
                no-repeat;
              background-size: contain;
            }
            &.icon-valid-error {
              background: url("//pic.iidingyun.com//file/20181123/75606.png")
                no-repeat;
              background-size: contain;
            }
          }
        }
        .btn {
          margin-left: 14px;
          border-radius: 2px;
          border: 1px solid rgba(217, 217, 217, 1);
          background: #ffffff;
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          padding: 0 16px;
        }
      }
      & + .form-item {
        margin-top: 15px;
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
    }
  }
}
</style>
