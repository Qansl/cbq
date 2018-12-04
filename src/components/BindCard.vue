<template>
    <div>
        <div class="main">
            <h3 class="title">绑定银行卡</h3>
            <div class="u-form2">
                <div class="u-form-item">
                    <div class="lb">真实姓名：</div>
                    <div class="disp-txt">*冰</div>
                </div>
                <div class="u-form-item">
                    <div class="lb">身份证：</div>
                    <div class="disp-txt">4**************6</div>
                </div>
                <div class="u-form-item">
                    <div class="lb">银行卡号：</div>
                    <input class="u-input card" type="text" placeholder="输入正确的银行卡号">
                </div>
                <div class="u-form-item">
                    <div class="lb">手机号码：</div>
                    <input class="u-input mobile" type="text" placeholder="输入手机号码">
                </div>
                <div class="u-form-item">
                    <div class="lb">验证码：</div>
                    <div class="validcode">
                        <input class="u-input code" type="text" placeholder="验证码">
                        <button class="btn">获取验证码</button>
                    </div>
                </div>
                <div class="form-tool">
                    <button class="btn disabled" @click="submit">同意绑定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$router.push("/bindcardsuccess");
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
  .u-form2 {
    padding: 30px 0 100px;
    .u-form-item {
      .u-input.card {
        width: 428px;
      }
      .u-input.mobile {
        width: 255px;
      }
      .u-input.code {
        width: 226px;
      }
      .validcode {
        display: flex;
        .btn {
          width: 102px;
          height: 40px;
          line-height: 40px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          border: 1px solid #d9d9d9;
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
