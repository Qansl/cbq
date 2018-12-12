<template>
  <div>
    <h1 class="g-title-mobile">
      <i class="icon-back" onclick="history.back()"></i>修改登录密码
    </h1>
    <div class="main">
      <div class="form">
        <div class="form-item">
          <div class="lb">
            请验证
            <span class="im">{{transferMobile($store.state.userInfo.phone)}}</span>手机号
          </div>
          <!-- <input class="u-input" type="text" placeholder="输入11位手机号" maxlength="11"> -->
        </div>
        <div class="form-item" style="margin-top:0">
          <div class="validcode-wrapper">
            <div class="validcode">
              <input
                v-model="editPwd.validCode"
                class="u-input"
                type="text"
                placeholder="验证码"
                @change="onEditPwdCodeChange"
              >
              <i
                class="icon"
                :class="{'icon-valid-success':editPwd.validCodePass===true,'icon-valid-error':editPwd.validCodePass===false}"
              ></i>
            </div>
            <button class="btn" @click="getEditPwdValidCode">{{editPwd.codeBtnTxt}}</button>
          </div>
        </div>
        <div class="form-item">
          <input
            v-model="editPwd.pwd1"
            class="u-input"
            type="text"
            placeholder="输入6-16位密码，区分大小写"
            maxlength="16"
          >
        </div>
        <div class="form-item">
          <input v-model="editPwd.pwd2" class="u-input" type="text" placeholder="确认密码">
        </div>
        <div class="form-tool">
          <button class="btn" @click="editPwdSubmit">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../../api/api";
export default {
  data() {
    return {
      editPwd: {
        phone: "",
        validCode: "",
        validCodePass: "",
        pwd1: "",
        pwd2: "",
        codeBtnTxt: "获取验证码",
        codeInterval: null
      }
    };
  },
  mounted() {
    this.editPwd.phone = this.$store.state.userInfo.phone;
  },
  methods: {
    transferMobile(v) {
      return v.substr(0, 3) + "****" + v.substr(7, 4);
    },
    onEditPwdCodeChange() {
      let reg = /^\d{6}$/;
      if (reg.test(this.editPwd.validCode)) {
        request(
          "com.iiding.common.user.user_phone_check",
          {
            phone: this.editPwd.phone,
            verify_code: this.editPwd.validCode
          },
          res => {
            if (res.code == "success") {
              this.editPwd.validCodePass = true;
            } else {
              this.editPwd.validCodePass = false;
            }
          }
        );
      } else {
        this.editPwd.validCodePass = "";
      }
    },
    getEditPwdValidCode() {
      if (this.editPwd.codeBtnTxt != "获取验证码") {
        return;
      }
      let reg1 = /^1\d{10}$/;
      if (!reg1.test(this.editPwd.phone)) {
        this.$message.error("请输入正确的手机号");
        return;
      }
      request(
        "com.iiding.common.user.verify_code",
        { phone: this.editPwd.phone },
        res => {
          if (res.code == "success") {
            this.editPwd.codeBtnTxt = 60;
            this.editPwd.codeInterval = setInterval(() => {
              if (this.editPwd.codeBtnTxt > 1) {
                this.editPwd.codeBtnTxt--;
              } else {
                this.editPwd.codeInterval = null;
                clearInterval(this.editPwd.codeInterval);
                this.editPwd.codeBtnTxt = "获取验证码";
              }
            }, 1000);
          }
        }
      );
    },
    editPwdSubmit() {
      if (this.editPwd.validCodePass !== true) return;

      let para = {};
      para.phone = this.editPwd.phone;
      para.verify_code = this.editPwd.validCode;
      para.pwd1 = md5(this.editPwd.pwd1);
      para.pwd2 = md5(this.editPwd.pwd2);
      let reg1 = /^1\d{10}$/;
      if (!reg1.test(para.phone)) {
        this.$message.error("请输入正确的手机号");
        return;
      }
      if (para.pwd1 != para.pwd2) {
        this.$message.error("两次密码输入不一致");
        return;
      }
      request("com.iiding.user.account.user_forget_password", para, res => {
        if (res.code == "success") {
          this.$message({ message: "修改成功，请重新登录", type: "success" });
          setTimeout(() => {
            this.logout();
            //this.$router.push("/home");
          }, 1000);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    logout() {
      sessionStorage.removeItem("userInfo");
      localStorage.removeItem("autoLogin");
      localStorage.removeItem("loginInfo");
      this.$store.commit("changeLogin", false);
    }
  }
};
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
        .im {
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
