<template>
  <div>
    <h1 class="g-title-mobile">
      <i class="icon-back" onclick="history.back()"></i>修改绑定手机号
    </h1>
    <div class="main">
      <div class="form">
        <div class="form-item">
          <div class="lb">绑定新的手机号</div>
          <input
            v-model="editMobile.phone"
            class="u-input"
            type="text"
            placeholder="输入11位手机号"
            maxlength="11"
          >
        </div>
        <div class="form-item">
          <div class="validcode-wrapper">
            <div class="validcode">
              <input
                v-model="editMobile.validCode"
                class="u-input"
                type="text"
                placeholder="验证码"
                @change="onEditMobileCodeChange"
              >
              <i
                class="icon"
                :class="{'icon-valid-success':editMobile.validCodePass===true,'icon-valid-error':editMobile.validCodePass===false}"
              ></i>
            </div>
            <button class="btn" @click="getValidCode">{{editMobile.codeBtnTxt}}</button>
          </div>
        </div>
        <div class="form-tool">
          <button
            class="btn"
            :class="{disabled:editMobile.validCodePass!==true}"
            @click="showPhone"
          >提交</button>
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
      editMobile: {
        phone: "",
        validCode: "",
        validCodePass: "",
        codeBtnTxt: "获取验证码",
        codeInterval: null
      }
    };
  },
  methods: {
    getValidCode() {
      if (this.editMobile.codeBtnTxt != "获取验证码") {
        return;
      }
      let reg1 = /^1\d{10}$/;
      if (!reg1.test(this.editMobile.phone)) {
        this.$message.error("请输入正确的手机号");
        return;
      }
      request(
        "com.iiding.common.user.verify_code",
        { phone: this.editMobile.phone },
        res => {
          if (res.code == "success") {
            this.editMobile.codeBtnTxt = 60;
            this.editMobile.codeInterval = setInterval(() => {
              if (this.editMobile.codeBtnTxt > 1) {
                this.editMobile.codeBtnTxt--;
              } else {
                this.editMobile.codeInterval = null;
                clearInterval(this.editMobile.codeInterval);
                this.editMobile.codeBtnTxt = "获取验证码";
              }
            }, 1000);
          }
        }
      );
    },
    onEditMobileCodeChange() {
      let reg = /^\d{6}$/;
      if (reg.test(this.editMobile.validCode)) {
        request(
          "com.iiding.common.user.user_phone_check",
          {
            phone: this.editMobile.phone,
            verify_code: this.editMobile.validCode
          },
          res => {
            if (res.code == "success") {
              this.editMobile.validCodePass = true;
            } else {
              this.editMobile.validCodePass = false;
            }
          }
        );
      } else {
        this.editMobile.validCodePass = "";
      }
    },
    showPhone() {
      if (this.editMobile.validCodePass !== true) {
        return;
      }
      var para = {};
      para.phone = this.editMobile.phone;
      para.verify_code = this.editMobile.validCode;
      request("com.iiding.user.account.user_phone_update", para, res => {
        if (res.code == "success") {
          this.$message({
            message: "绑定成功",
            type: "success"
          });
          this.$store.commit("changeUserInfo", { phone: para.phone });
          setTimeout(() => {
            this.$router.push("/muser/info");
          }, 1000);
        } else {
          this.$message.error(res.msg);
        }
      });
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
