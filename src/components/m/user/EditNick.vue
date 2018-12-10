<template>
  <div>
    <h1 class="g-title-mobile">
      <i class="icon-back" onclick="history.back()"></i>修改昵称
    </h1>
    <div class="main">
      <div class="form">
        <div class="form-item">
          <div class="lb">当前昵称：</div>
          <input v-model="user_name" class="u-input" type="text" style="width:75%">
        </div>
        <div class="form-tool">
          <button class="btn" @click="submit">提交</button>
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
      user_name: ""
    };
  },
  mounted() {
    this.user_name = this.$store.state.userInfo.user_name;
  },
  methods: {
    submit() {
      if (this.user_name != "") {
        request(
          "com.iiding.web.personal_center.user_manage.update_userinfo",
          { user_name: this.user_name },
          res => {
            if (res.code == "success") {
              //更新session中的头像icon
              let userInfo = sessionStorage.getItem("userInfo");
              if (userInfo && userInfo != "") {
                userInfo = JSON.parse(userInfo);
                userInfo.user_name = this.user_name;
                sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
                this.$store.commit("changeUserInfo", {
                  user_name: userInfo.user_name
                });
              }

              this.$message({ message: "修改成功", type: "success" });
              setTimeout(() => {
                this.$router.push("/muser/info");
              }, 1000);
            } else {
              this.$message.error(res.code);
            }
          }
        );
      }
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
