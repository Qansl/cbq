<template>
  <div class="info-con">
    <ul class="u-tabpanel2">
      <li class="item" :class="{active:tab==0}" @click="changeTab(0)">个人资料</li>
      <li class="item" :class="{active:tab==1}" @click="changeTab(1)">实名认证</li>
    </ul>
    <div v-show="tab==0" class="u-form">
      <div class="u-form-item avator-wrapper">
        <div class="lb">用户头像：</div>
        <div class="disp-txt">
          <img class="avator" :src="decodeURIComponent($store.state.userInfo.icon)" alt>
        </div>
        <a class="link upload" href="javascript:;">
          修改
          <input
            class="upload-btn"
            type="file"
            capture="camera"
            accept="image/*"
            @change="uploadImg"
          >
        </a>
      </div>
      <div class="u-form-item">
        <div class="lb">
          <span class="im">*</span>用户昵称：
        </div>
        <div v-show="!editUserNameVisible" class="disp-txt">
          {{userInfo.user_name}}
          <a class="link" href="javascript:;" @click="showEditUserName">修改</a>
        </div>
        <div v-show="editUserNameVisible" class="edit-confirm">
          <input v-model="userInfo.user_name" class="u-input nick" type="text">
          <a class="link green" href="javascript:;" @click="editUserNameSubmit">完成</a>
        </div>
      </div>
      <div class="u-form-item">
        <div class="lb">账号：</div>
        <div class="disp-txt">{{userInfo.userid}}</div>
      </div>
      <div class="u-form-item">
        <div class="lb">
          <span class="im">*</span>绑定手机：
        </div>
        <div class="disp-txt">{{transferMobile($store.state.userInfo.phone)}}</div>
        <a class="link" href="javascript:;" @click="showPhoneValid">修改</a>
      </div>
      <div class="u-form-item">
        <div class="lb">密码设置：</div>
        <div class="disp-txt">*********</div>
        <a class="link" href="javascript:;" @click="showEditPwd">修改</a>
      </div>
      <div class="u-form-item hobby">
        <div class="lb">兴趣爱好：</div>
        <div class="disp-txt hobby-con">
          <div class="desc">请选择您感兴趣的分类，给您最精准的推荐</div>
          <div class="hobby-list">
            <div class="u-checkbox-group1">
              <label
                v-for="(item,index) in hobby"
                :key="index"
                class="u-checkbox1"
                :class="{ischecked:item.checked}"
              >
                <input
                  v-model="item.checked"
                  type="checkbox"
                  tabindex="-1"
                  value="1"
                  class="u-checkbox__original"
                >
                <span class="u-checkbox__label">{{item.type_name}}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div v-show="userInfo.auth_status==0" class="u-form-item">
        <div class="lb">实名认证：</div>
        <div class="disp-txt">你尚未实名认证，请进行实名认证</div>
        <a class="link" href="javascript:;" @click="toAuth">认证</a>
      </div>
      <div v-show="userInfo.auth_status==1&&userInfo.auth.check_status!=0" class="u-form-item">
        <div class="lb">实名认证：</div>
        <div class="disp-txt">正在审核中</div>
      </div>
      <div
        v-show="userInfo.auth_status==1&&userInfo.auth.check_status==0"
        class="u-form-item vertify"
      >
        <div class="lb">实名认证：</div>
        <div class="disp-txt vertify-con">
          <div class="vertify-item">
            <span class="vertify-lb">您已经实名认证</span>
            <a class="link" href="javascript:;">修改认证</a>
          </div>
          <div class="vertify-item">
            <span class="vertify-lb">姓名：</span>
            <span class="vertify-disp">{{userInfo.auth.real_name}}</span>
          </div>
          <div class="vertify-item">
            <span class="vertify-lb">身份证号：</span>
            <span class="vertify-disp">{{userInfo.auth.idcard2}}</span>
          </div>
        </div>
      </div>
      <div class="u-form-item card-wrapper">
        <div class="lb">绑定的银行卡：</div>
        <div class="card-con">
          <div class="add" @click="toBindCard">
            <i class="icon-add"></i>
            <div class="desc">添加银行卡</div>
          </div>
          <div class="upload-img">
            <!-- <img class="pic" src="http://pic.iidingyun.com//file/20181120/75487.png" alt> -->
            <div class="pic">
              <div class="card-icon"></div>
              <div class="card-info">
                <div class="name">广发银行</div>
                <div class="id">**** **** **** 1111</div>
              </div>
            </div>
            <a class="link" href="#/bindcard">修改</a>
          </div>
          <div class="tips">注：提现及充值，只能同卡进出，姓名需与实名认证相同</div>
        </div>
      </div>
    </div>

    <div v-show="tab==1" class="auth-con">
      <div class="steps">
        <div class="item step1 separator" :class="{active:step==1,complete:step>=2}">请阅读特别提示</div>
        <div class="item step2 separator" :class="{active:step==2,complete:step>=3}">填写信息资料</div>
        <div class="item step3" :class="{active:step==3,complete:step>3}">{{step>3?'认证完成':'等待审核'}}</div>
      </div>

      <div
        class="auth-con-inner"
        v-show="!(auth.check_status==='0' || auth.check_status=='3')&&(step==1)"
      >
        <div class="step1">
          <div class="title" style="padding-left:0;height: auto;">*特别提示：</div>
          <p style="margin-top: 10px;">每个帐号对应一个身份信息，相同身份信息提交多个帐号申请将只通过其中一个。</p>
          <p>若发现帐号有违规违法行为，或其它形式的恶劣情节，产生后果将由您自行承担！</p>
          <!-- <p>*后期实名认证与主播认证需逐一独立申请。</p> -->
        </div>
        <button class="btn agree" @click="goTo(1,2)">同意</button>
      </div>

      <div
        class="auth-con-inner auth-con-inner-step2"
        v-show="!(auth.check_status==='0' || auth.check_status=='3')&&(step==2)"
      >
        <div class="form-auth-info">
          <div class="form-item">
            <span class="lb">填写姓名:</span>
            <input v-model="auth.real_name" class="u-input2 name" type="text" maxlength="10">
          </div>
          <div class="form-item">
            <span class="lb">身份证号:</span>
            <input v-model="auth.idcard" class="u-input2 card" type="text" maxlength="18">
          </div>
          <!-- <div class="form-item">
            <span class="lb">是否为大陆地区:</span>
            <el-radio-group v-model="auth.is_mainland">
              <el-radio :label="0" :value="0">是</el-radio>
              <el-radio :label="1" :value="1">否</el-radio>
            </el-radio-group>
          </div>-->
          <div class="form-item">
            <span class="lb" style="align-self:flex-start">上传身份证:</span>
            <div class="card-wrapper">
              <img class="pic" :src="auth.front_photo" alt>
              <input
                class="upload-btn"
                type="file"
                capture="camera"
                accept="image/*"
                @change="uploadImgIDCard($event,'front_photo')"
              >
            </div>
            <div class="card-wrapper">
              <img class="pic" :src="auth.rear_photo" alt>
              <input
                class="upload-btn"
                type="file"
                capture="camera"
                accept="image/*"
                @change="uploadImgIDCard($event,'rear_photo')"
              >
            </div>
          </div>
          <div class="form-item">
            <span class="lb"></span>
            <div class="notice">
              <div class="notice-title">
                <span class="im">*</span>身份证照将会进行人工审核，务必做到以下几点：
              </div>
              <p style="margin-top: 10px;">1.您需要年满18周岁</p>
              <p>2.全面：照片内容包含整个身份证面板</p>
              <p>3.清晰：身份证文字及图片清晰可见无PS</p>
              <p>4.格式：小于2MB的jpg、png、bmp等格式的图片</p>
              <p class="tip">如果有不符，实名认证将被驳回</p>
            </div>
          </div>
          <div class="form-tool">
            <button class="btn2" @click="goTo(2,1)">上一步</button>
            <button class="btn2" @click="goTo(2,3)">下一步</button>
          </div>
        </div>
      </div>

      <div
        class="auth-con-inner"
        v-show="!(auth.check_status==='0' || auth.check_status=='3')&&(step==3)"
      >
        <div class="step3">
          <img class="pic" src="//pic.iidingyun.com//file/20181129/75730.png" alt>
          <div class="desc1">提交成功，等待审核</div>
          <div class="desc2">预计1-2个工作日完成，请耐心等待</div>
        </div>
      </div>

      <!-- 认证成功 -->
      <div
        v-show="auth.check_status!='' && (auth.check_status==='0' || auth.check_status=='3')"
        class="auth-con-inner"
      >
        <div class="step-complete">
          <img class="pic" src="//pic.iidingyun.com//file/20181129/75733.png" alt>
          <div class="desc">审核通过</div>
        </div>
        <button class="btn btn3" @click="changeTab(0)">返回个人资料</button>
      </div>
    </div>

    <!-- 绑定新手机号 -->
    <transition name="dialogfade">
      <div v-show="phoneValidDialogVisible" class="u-dialog-wrapper">
        <div class="u-dialog dialog-login">
          <header class="dialog-title">绑定新手机号
            <div class="icon-close" @click="hidePhoneValid"></div>
          </header>
          <section class="dialog-body">
            <div class="login-wrapper phone-wrapper">
              <div class="input-wrapper">
                <input
                  v-model="editMobile.phone"
                  class="input"
                  type="text"
                  placeholder="输入11位手机号"
                  maxlength="11"
                >
              </div>
              <div class="input-wrapper validcode icon-right">
                <input
                  v-model="editMobile.validCode"
                  class="input"
                  type="text"
                  placeholder="验证码"
                  maxlength="6"
                  @change="onEditMobileCodeChange"
                >
                <i
                  class="icon"
                  :class="{'icon-valid-success':editMobile.validCodePass===true,'icon-valid-error':editMobile.validCodePass===false}"
                ></i>
                <button class="btn" @click="getValidCode">{{editMobile.codeBtnTxt}}</button>
              </div>
              <button
                class="btn"
                :class="{disabled:editMobile.validCodePass!==true}"
                @click="showPhone"
              >确定</button>
            </div>
          </section>
          <footer class="dialog-footer"></footer>
        </div>
      </div>
    </transition>
    <!-- 绑定新手机号
    <transition name="dialogfade">
      <div v-show="phoneDialogVisible" class="u-dialog-wrapper">
        <div class="u-dialog dialog-login">
          <header class="dialog-title">绑定新手机号
            <div class="icon-close" @click="hidePhone"></div>
          </header>
          <section class="dialog-body">
            <div class="login-wrapper phone-wrapper">
              <div class="input-wrapper">
                <input class="input" type="text" placeholder="输入11位手机号" maxlength="11">
                <div class="warning-txt"></div>
              </div>
              <div class="input-wrapper validcode icon-right">
                <input class="input" type="text" placeholder="验证码" maxlength="6">
                <i class="icon icon-valid-success"></i>
                <button class="btn">获取验证码</button>
              </div>
              <button class="btn disabled">确定</button>
            </div>
          </section>
          <footer class="dialog-footer"></footer>
        </div>
      </div>
    </transition>-->
    <!-- 修改密码 -->
    <transition name="dialogfade">
      <div v-show="editPwdDialogVisible" class="u-dialog-wrapper">
        <div class="u-dialog dialog-login">
          <header class="dialog-title">修改密码
            <div class="icon-close" @click="hideEditPwd"></div>
          </header>
          <section class="dialog-body">
            <div class="login-wrapper editpwd-wrapper">
              <div class="input-wrapper">
                <input
                  v-model="editPwd.phone"
                  class="input"
                  type="text"
                  placeholder="输入11位手机号"
                  maxlength="11"
                >
              </div>
              <div class="input-wrapper validcode icon-right">
                <input
                  v-model="editPwd.validCode"
                  class="input"
                  type="text"
                  placeholder="验证码"
                  maxlength="6"
                  @change="onEditPwdCodeChange"
                >
                <i
                  class="icon"
                  :class="{'icon-valid-success':editPwd.validCodePass===true,'icon-valid-error':editPwd.validCodePass===false}"
                ></i>
                <button class="btn" @click="getEditPwdValidCode">{{editPwd.codeBtnTxt}}</button>
              </div>
              <div class="input-wrapper">
                <input
                  v-model="editPwd.pwd1"
                  class="input"
                  type="password"
                  placeholder="新密码"
                  maxlength="6"
                >
              </div>
              <div class="input-wrapper">
                <input
                  v-model="editPwd.pwd2"
                  class="input"
                  type="password"
                  placeholder="确认新密码"
                  maxlength="6"
                >
              </div>
              <button
                class="btn"
                :class="{disabled:editPwd.validCodePass!==true}"
                @click="editPwdSubmit"
              >确定</button>
            </div>
          </section>
          <footer class="dialog-footer"></footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { request, upload } from "../../api/api";
import md5 from "blueimp-md5/js/md5";
export default {
  data() {
    return {
      tab: 0,
      userInfo: {
        accountStatus: true,
        account_status: "0",
        auth: {},
        auth_status: 0,
        create_time: "",
        current_coin: "0",
        gender: "",
        //icon:"//pic.iidingyun.com/file/2778/top_head portrait_default@2x-2.png",
        label: [],
        //phone: "13428898189",
        real_name: "",
        send_status: "",
        signature: "",
        spread_person: "",
        star_level: "",
        user_name: "",
        user_region: {},
        user_source: "",
        user_status: "",
        userid: "",
        wealth: ""
      },
      hobby: [],
      step: 1,
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
      },
      editMobile: {
        phone: "",
        validCode: "",
        validCodePass: "",
        codeBtnTxt: "获取验证码",
        codeInterval: null
      },
      editPwd: {
        phone: "",
        validCode: "",
        validCodePass: "",
        pwd1: "",
        pwd2: "",
        codeBtnTxt: "获取验证码",
        codeInterval: null
      },
      editPwdDialogVisible: false,

      phoneValidDialogVisible: false,
      phoneDialogVisible: false,

      editUserNameVisible: false
    };
  },
  mounted() {
    this.getUserInfo();
  },
  watch: {
    hobby: {
      handler(v) {
        this.editHobby();
      },
      deep: true
    }
  },
  methods: {
    changeTab(i) {
      this.tab = i;
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

            request("com.iiding.common.label.type_select", {}, res => {
              this.hobby = [];
              res.data.forEach(v => {
                this.hobby.push({
                  typeid: v.typeid,
                  type_name: v.type_name,
                  checked: false
                });
              });

              this.hobby.forEach(v => {
                this.userInfo.label.forEach(v2 => {
                  if (v2.label_id == v.typeid) {
                    v.checked = true;
                  }
                });
              });
            });
          }
        );
      }
    },
    goTo: function(_from, _to) {
      var _this = this;
      if (_from == 1) {
      }
      if (_to == 3) {
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
            this.step = _to;
          } else {
            this.$message.error(res.msg);
          }
        });

        //_this.step = _to;
        //_this.auth.check_status = 1;
      } else {
        _this.step = _to;
      }
    },
    showPhoneValid() {
      this.phoneDialogVisible = false;
      this.phoneValidDialogVisible = true;
    },
    hidePhoneValid() {
      this.phoneValidDialogVisible = false;
    },
    showPhone() {
      if (this.editMobile.validCodePass !== true) {
        return;
      }
      // this.phoneValidDialogVisible = false;
      // this.phoneDialogVisible = true;
      var para = {};
      para.phone = this.editMobile.phone;
      para.verify_code = this.editMobile.validCode;
      request("com.iiding.user.account.user_phone_update", para, res => {
        if (res.code == "success") {
          this.$message({
            message: "绑定成功",
            type: "success"
          });
          this.phoneValidDialogVisible = false;
          this.$store.commit("changeUserInfo", { phone: para.phone });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    hidePhone() {
      this.phoneDialogVisible = false;
    },
    transferMobile(m) {
      return m.substr(0, 3) + "****" + m.substr(7, 4);
    },
    uploadImg(e) {
      upload.chooseImg(e.target, url => {
        request(
          "com.iiding.web.personal_center.user_manage.update_userinfo",
          { icon: encodeURIComponent(url) },
          res => {
            if (res.code == "success") {
              this.userInfo.icon = url;
              this.$store.commit("changeUserInfo", { icon: url });
              //更新session中的头像icon
              let userInfo = sessionStorage.getItem("userInfo");
              if (userInfo && userInfo != "") {
                userInfo = JSON.parse(userInfo);
                userInfo.icon = url;
                sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              }
            } else {
              this.$message.error(res.code);
            }
          }
        );
      });
    },
    showEditUserName() {
      this.editUserNameVisible = true;
    },
    editUserNameSubmit() {
      request(
        "com.iiding.web.personal_center.user_manage.update_userinfo",
        { user_name: this.userInfo.user_name },
        res => {
          if (res.code == "success") {
            //this.$store.commit("changeUserInfo", { icon: url });
            //更新session中的头像icon
            let userInfo = sessionStorage.getItem("userInfo");
            if (userInfo && userInfo != "") {
              userInfo = JSON.parse(userInfo);
              userInfo.user_name = this.userInfo.user_name;
              sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              this.$store.commit("changeUserInfo", {
                user_name: userInfo.user_name
              });
              this.editUserNameVisible = false;
            }
          } else {
            this.$message.error(res.code);
          }
        }
      );
    },
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

    showEditPwd() {
      this.editPwdDialogVisible = true;
    },
    hideEditPwd() {
      this.editPwdDialogVisible = false;
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
          this.editPwdDialogVisible = false;
          setTimeout(() => {
            this.logout();
            this.$router.push("/home");
          }, 500);
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
    },

    //修改兴趣
    editHobby() {
      var label = [];
      this.hobby.forEach(v => {
        if (v.checked) {
          label.push(v.typeid);
        }
      });
      if (label.length > 0) {
        request(
          "com.iiding.user.account.user_info_update",
          { label: label.join(",") },
          res => {
            if (res.code == "success") {
            } else {
              this.$message.error(res.msg);
            }
          }
        );
      }
    },

    toAuth() {
      this.changeTab(1);
    },

    uploadImgIDCard(e, field) {
      upload.chooseImg(e.target, url => {
        this.auth[field] = url;
      });
    },

    toBindCard(){
      this.$router.push('/bindcard');
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/vars.scss";
p {
  margin: 0;
}
.info-con {
  background: #ffffff;
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.05);
  .u-form {
    padding-top: 57px;
    padding-bottom: 100px;
    .u-form-item {
      .link {
        &.upload {
          position: relative;
          display: block;
          .upload-btn {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            height: 100%;
            cursor: pointer;
            font-size: 0px;
          }
        }
      }
      &.avator-wrapper {
        .lb {
          align-self: flex-start;
        }
        .link {
          align-self: flex-end;
        }
        .avator {
          width: 80px;
          height: 80px;
        }
      }
      &.card-wrapper {
        .lb {
          align-self: flex-start;
        }
        .card-con {
          .add {
            width: 278px;
            height: 134px;
            border-radius: 4px;
            border: 1px solid #b0b0b0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            .icon-add {
              width: 40px;
              height: 40px;
              background: url("//pic.iidingyun.com/1000//file/20181128/75722.png")
                no-repeat;
            }
            .desc {
              font-size: 16px;
              font-weight: bold;
              color: rgba(255, 80, 0, 0.6);
              line-height: 20px;
              margin-top: 13px;
            }
          }
          .tips {
            font-size: 12px;
            color: #999999;
            line-height: 15px;
            margin-top: 20px;
            .tips-lb {
              color: $front-color;
            }
          }
          .upload-img {
            display: flex;
            align-items: flex-end;
            .pic {
              width: 278px;
              height: 134px;
              background: linear-gradient(to right,#FF8570,#FE5765);
              display: flex;
              color: #ffffff;
              padding: 20px;
              box-sizing: border-box;
              .card-icon{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #ffffff;
                margin-right: 14px;
              }
              .card-info{
                display: flex;
                flex-direction: column;
                .name{
                  font-size:16px;
                  line-height:20px;
                }
                .id{
                  font-size:16px;
                  line-height:20px;
                  margin-top: 40px;
                }
              }
            }
          }
        }
      }
      &.hobby {
        .lb {
          align-self: flex-start;
        }
        .hobby-con {
          .desc {
            font-size: 12px;
            color: rgba(102, 102, 102, 1);
            line-height: 18px;
            margin-bottom: 10px;
          }
        }
      }
      &.vertify {
        .lb {
          align-self: flex-start;
        }
        .vertify-con {
          .vertify-item {
            .vertify-lb {
              font-size: 14px;
              color: #666666;
              line-height: 18px;
            }
            .vertify-disp {
              font-size: 14px;
              color: #999999;
              line-height: 18px;
            }
            & + .vertify-item {
              margin-top: 10px;
            }
          }
        }
      }
      .edit-confirm {
        .u-input.nick {
          width: 88px;
        }
      }
    }
  }
}

.steps {
  display: flex;
  justify-content: space-between;
  padding: 58px 83px 0;
  font-size: 16px;
  color: #999999;
  height: 34px;
  line-height: 34px;
}

.steps .item {
  margin-left: 40px;
  position: relative;
}

.steps .item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -40px;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border: 1px solid #b0b0b0;
  border-radius: 50%;
  font-size: 16px;
  color: #999999;
}

.steps .item.step1::before {
  content: "1";
}

.steps .item.step2::before {
  content: "2";
}

.steps .item.step3::before {
  content: "3";
}

.steps .item.active {
  color: #333333;
}
.steps .item.active::before {
  background: $front-color;
  color: #ffffff;
  border: 0;
}

.steps .item.complete {
  color: $front-color;
}

.steps .item.complete::before {
  content: "";
  background: url("//pic.iidingyun.com/1000//file/20181129/75728.png") no-repeat
    center center;
  border: 1px solid $front-color;
}

.steps .item.separator::after {
  content: "";
  position: absolute;
  right: -197px;
  top: 17px;
  width: 184px;
  height: 1px;
  background: #e7e7e7;
}

.auth-con .auth-con-inner {
  margin-top: 50px;
  margin-bottom: 315px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btn {
    height: 46px;
    line-height: 46px;
    background: $front-color;
    border-radius: 2px;
    padding: 0 53px;
    font-size: 16px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    &.agree {
      margin-top: 100px;
      margin-bottom: 284px;
    }
    &.btn3 {
      padding: 0 24px;
    }
  }
}

.auth-con .auth-con-inner .step1 {
  width: 558px;
  border-radius: 2px;
  padding: 0 23px;
  box-sizing: border-box;
}

.auth-con .auth-con-inner .step1 .title {
  font-size: 16px;
  color: $warning;
  line-height: 20px;
  margin-top: 27px;
}

.auth-con .auth-con-inner .step1 p {
  font-size: 14px;
  color: #333333;
  line-height: 40px;
}

.auth-con .auth-con-inner .step3 {
  width: 558px;
  background: rgba(250, 250, 250, 1);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-con .auth-con-inner .step3 .desc1 {
  font-size: 24px;
  color: rgba(51, 51, 51, 1);
  line-height: 32px;
  margin-top: 40px;
}

.auth-con .auth-con-inner .step3 .desc2 {
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
  line-height: 22px;
  margin-top: 8px;
}

.auth-con .auth-con-inner .step3 .pic {
  width: 154px;
  height: 112px;
}

.auth-con .auth-con-inner .step-complete {
  width: 558px;
  background: rgba(250, 250, 250, 1);
  border-radius: 2px;
  padding: 26px 23px 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-con .auth-con-inner .step-complete .pic {
  width: 72px;
  height: 72px;
}

.auth-con .auth-con-inner .step-complete .desc {
  font-size: 24px;
  color: rgba(23, 46, 77, 1);
  line-height: 32px;
  margin-top: 50px;
}

.auth-con .auth-con-inner .u-btn.back {
  margin-top: 60px;
  margin-bottom: 30px;
}

.auth-con .auth-con-inner .btn-agree {
  margin-top: 20px;
}

.auth-con .auth-con-inner .u-btn.next {
  margin-top: 40px;
  margin-bottom: 101px;
}

.auth-con .auth-con-inner .u-btn.start {
  margin-top: 60px;
  margin-bottom: 30px;
}

.auth-con .auth-con-inner .auth-result {
  padding-top: 16px;
}

.auth-con .auth-con-inner .auth-result .item {
  font-size: 14px;
  color: #172e4d;
  line-height: 18px;
  margin-top: 14px;
}

.auth-con .auth-con-inner .auth-result .item .lb {
  color: #419dfb;
}

.auth-con .title {
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  color: rgba(92, 119, 153, 1);
  padding: 0 10px;
  position: relative;
}
.auth-con .title .u-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.auth-con-inner {
  .form-auth-info {
    width: 100%;
    .form-item {
      display: flex;
      .lb {
        width: 132px;
        margin-right: 20px;
        text-align: right;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
        align-self: flex-start;
      }
      .notice {
        .notice-title {
          font-size: 16px;
          color: #333333;
          line-height: 20px;
          .im {
            color: $front-color;
          }
        }
        p {
          font-size: 14px;
          color: rgba(102, 102, 102, 1);
          line-height: 21px;
          &.tip {
            color: $warning;
          }
        }
      }
      & + .form-item {
        margin-top: 40px;
      }
      .u-input2.name {
        width: 120px;
      }
      .u-input2.card {
        width: 250px;
      }
      .card-wrapper {
        cursor: pointer;
        display: flex;
        position: relative;
        .pic {
          width: 260px;
          height: 172px;
        }
        .upload-btn {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          height: 100%;
          cursor: pointer;
          font-size: 0px;
        }
        & + .card-wrapper {
          margin-left: 40px;
        }
      }
    }
    .form-tool {
      padding-left: 132px;
      box-sizing: border-box;
      margin-top: 100px;
      .btn2 {
        height: 46px;
        line-height: 46px;
        background: $front-color;
        border-radius: 2px;
        padding: 0 48px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        &.disabled {
          background: rgba(255, 80, 0, 0.6);
        }
        & + .btn2 {
          margin-left: 50px;
        }
      }
    }
  }
}
</style>
