<template>
  <div>
    <h1 class="g-title-mobile">
      <i class="icon-back" onclick="history.back()"></i>实名认证
    </h1>
    <div class="main">
      <div class="form">
        <div class="form-item">
          <div class="lb">真实姓名：</div>
          <input v-model="auth.real_name" class="u-input" type="text" placeholder="请输入真实姓名">
        </div>
        <div class="form-item">
          <div class="lb">身份证号：</div>
          <input v-model="auth.idcard" class="u-input" type="text" placeholder="请输入身份证号">
        </div>
        <div class="form-item">
          <div class="card-wrapper">
            <img :src="auth.front_photo" alt class="pic">
            <input
              class="upload-btn"
              type="file"
              capture="camera"
              accept="image/*"
              @change="uploadImgIDCard($event,'front_photo')"
            >
          </div>
          <div class="card-wrapper">
            <img :src="auth.rear_photo" alt class="pic">
            <input
              class="upload-btn"
              type="file"
              capture="camera"
              accept="image/*"
              @change="uploadImgIDCard($event,'rear_photo')"
            >
          </div>
        </div>
        <div class="form-tool submit">
          <button class="btn" @click="submit">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request, upload } from "../../../api/api";
export default {
  data() {
    return {
      auth: {
        phone: "",
        validcode: "",
        real_name: "",
        idcard: "",
        is_mainland: 0,
        front_photo: "//pic.iidingyun.com/1000//file/20181129/75734.png",
        rear_photo: "//pic.iidingyun.com/1000//file/20181129/75734.png",
        typeid: "",
        second_typeid: "",
        third_typeid: "",
        experience: "",
        professional: "",
        certification: [],
        check_status: ""
      }
    };
  },
  methods: {
    uploadImgIDCard(e, field) {
      upload.chooseImg(e.target, url => {
        this.auth[field] = url;
      });
    },
    submit() {
      if (this.auth.real_name == "" || this.auth.idcard == "") {
        return;
      }

      let para = {};
      para.real_name = this.auth.real_name;
      para.idcard = this.auth.idcard;
      para.front_photo = encodeURIComponent(this.auth.front_photo);
      para.rear_photo = encodeURIComponent(this.auth.rear_photo);
      request("com.iiding.user.authentication.auth_info_upload", para, res => {
        if (res.code == "success") {
          this.$message({
            message: "提交成功，等待审核，预计1-2个工作日完成",
            type: "success"
          });
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
      .card-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        position: relative;
        .pic {
          width: 260px;
          height: 172px;
        }
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
      &.submit {
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
