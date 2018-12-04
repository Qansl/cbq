<template>
    <div>
        <h1 class="g-title-mobile"><i class="icon-back" onclick="history.back()"></i>修改绑定手机号</h1>
        <div class="main">
            <div class="form">
                <div class="form-item">
                    <div class="lb">绑定新的手机号</div>
                    <input class="u-input" type="text" placeholder="输入11位手机号" maxlength="11">
                </div>
                <div class="form-item">
                  <div class="validcode-wrapper">
                    <div class="validcode">
                      <input class="u-input" type="text">
                      <i class="icon icon-valid-success"></i>
                    </div>
                    <button class="btn">获取验证码</button>
                  </div>
                </div>
                <div class="form-tool">
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
      .validcode-wrapper {
        display: flex;
        .validcode {
          flex: 1;
          .u-input {
            width: 100%;
          }
        }
        .btn {
          margin-left: 14px;
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
