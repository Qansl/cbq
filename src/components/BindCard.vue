<template>
    <div>
        <div class="main">
            <h3 class="title">绑定银行卡</h3>
            <div class="u-form2">
                <div class="u-form-item">
                    <div class="lb">真实姓名：</div>
                    <div class="disp-txt">{{userInfo.real_name}}</div>
                </div>
                <div class="u-form-item">
                    <div class="lb">身份证：</div>
                    <div class="disp-txt">{{userInfo.auth.idcard}}</div>
                </div>
                <div class="u-form-item">
                    <div class="lb">银行卡号：</div>
                    <input class="u-input card" type="text" v-model="card_id" placeholder="输入正确的银行卡号">
                </div>
                <div class="u-form-item">
                    <div class="lb">手机号码：</div>
                    <input class="u-input mobile" type="text" v-model="phone" placeholder="输入手机号码">
                </div>
                <div class="u-form-item">
                    <div class="lb">验证码：</div>
                    <div class="validcode">
                        <input class="u-input code" type="text" maxlength="6" v-model="validcode2" placeholder="验证码">
                        <button class="btn" @click="getEditPwdValidCode">{{codeBtnTxt}}</button>
                    </div>
                </div>
                <div class="form-tool">
                    <button class="btn " @click="onEditPwdCodeChange">同意绑定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { request, upload } from "../api/api";
export default {
  data() {
     return {
       userInfo:{
         auth:{
           idcard:""
         }
       },
       validcode2:"",
       phone:"",
       card_id:"",
       card_name:"",
       codeBtnTxt:"获取验证码"
     };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    submit() {
        if(!this.card_id){
          this.$message.error("您还没实名认证");
          return ;
        }
        var _this = this;
        request(
          "com.iiding.web.personal_center.user_manage.binding_bank_card",
          { card_id: _this.card_id,card_name:_this.card_name},
          res => {
            if(res.code == "success"){
              _this.$router.push("/bindcardsuccess");
            }
          }
        );
    },
    getUserInfo() {
      var userInfo = sessionStorage.getItem("userInfo");
      if (userInfo && userInfo != "") {
        userInfo = JSON.parse(userInfo);
        //获取用户详细信息
        request(
          "com.iiding.web.personal_center.user_manage.find_userinfo",
          { userid: userInfo.userid,type:1 },
          res => {
            this.userInfo = res.data;
          }
        );
      }
    },
    //校验手机验证码
    onEditPwdCodeChange() {
      var _this = this;
      let reg1 = /^1\d{10}$/;
      if (!reg1.test(_this.phone)) {
        _this.$message.error("请输入正确的手机号");
        return;
      }
      let reg = /^\d{6}$/;
      if (reg.test(_this.validcode2)) {
        request(
          "com.iiding.common.user.user_phone_check",
          {
            phone: _this.phone,
            verify_code: _this.validcode2
          },
          res => {
            if (res.code == "success") {
              _this.submit();
            } else {
              _this.$message.error("验证码错误");
            }
          }
        );
      } else {
        _this.$message.error("手机验证码错误");
      }
    },
    //获取手机验证码
    getEditPwdValidCode() {
      if (this.codeBtnTxt != "获取验证码") {
        return;
      }
      let reg1 = /^1\d{10}$/;
      if (!reg1.test(this.phone)) {
        this.$message.error("请输入正确的手机号");
        return;
      }
      request(
        "com.iiding.common.user.verify_code",
        { phone: this.phone },
        res => {
          if (res.code == "success") {
            this.codeBtnTxt = 60;
            this.codeInterval = setInterval(() => {
              if (this.codeBtnTxt > 1) {
                this.codeBtnTxt--;
              } else {
                this.codeInterval = null;
                clearInterval(this.codeInterval);
                this.codeBtnTxt = "获取验证码";
              }
            }, 1000);
          }
        }
      );
    },
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
