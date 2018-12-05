<template>
  <div id="app">
    <header class="header1">
      <div class="header1-inner">
        <i class="icon icon-tel"></i>
        <span class="txt">官方咨询电话</span>
        <span class="txt tel im">000 - 444 1234</span>
        <span style="flex:1"></span>
        <template v-if="!login">
          <a class="link active" href="javascript:;" @click="showLogin">请登录</a>
          <a class="link register" href="javascript:;" @click="showRegister">免费注册</a>
        </template>
        <template v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <a class="link" href="javascript:;">{{userInfo.user_name}}</a>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toUserCenter">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="toUserInfo">我的资料</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <a class="link logout" href="javascript:;" @click="logout">退出</a>
          <div class="seperator"></div>
          <a class="link" href="#/user/myproject" target="_blank">我的项目</a>
        </template>
        <div class="seperator"></div>
        <a class="link sel market" href="javascript:;">
          手机商城
          <i class="arr"></i>
          <div class="qrcode">
            <img class="pic" src="//pic.iidingyun.com//file/20181120/75482.png" alt>
          </div>
        </a>
      </div>
    </header>

    <header v-show="pathHideHav.indexOf(currentRoutePath)==-1" class="header2">
      <div class="header2-inner">
        <a class="logo" href="#/home"></a>
      </div>
    </header>

    <div class="g-nav-wrapper">
      <nav v-show="pathHideHav.indexOf(currentRoutePath)==-1" class="g-nav">
        <router-link class="link" to="/home">首页</router-link>
        <router-link class="link" to="/projectlist">预售项目</router-link>
        <a class="link" href="#/chat" target="_blank">发起项目</a>
        <router-link class="link" to="/proc">参与流程</router-link>
        <router-link class="link" to="/intro">平台介绍</router-link>
        <router-link class="link" to="/service">客服中心</router-link>
      </nav>
    </div>

    <!-- 手机底部导航 -->
    <nav class="g-nav-mobile">
      <router-link class="link home" to="/home">首页</router-link>
      <router-link class="link project" to="/chat">发起项目</router-link>
      <router-link class="link join" to="/proc">参与</router-link>
      <router-link class="link user" to="/muser/home">我的</router-link>
      <a class="link" href="javascript:;" @click="showLogin">请登录</a>
      <a class="link register" href="javascript:;" @click="showRegister">免费注册</a>
    </nav>

    <!-- <img src="./assets/logo.png"> -->
    <!-- <p>
          <router-link to="/">首页</router-link>
          <router-link to="/projectlist">预售项目</router-link>
          <router-link to="/user/home">个人中心</router-link>
        </p>
        <p>
          <router-link to="/user/profile">个人中心-用户资料</router-link>
    </p>-->
    <router-view/>

    <footer class="footer">
      <div class="footer-inner">
        <nav class="nav">
          <a class="link" href="javascript:;">关于我们</a>
          <a class="link" href="javascript:;">联系我们</a>
          <a class="link" href="javascript:;">帮助中心</a>
          <a class="link" href="javascript:;">参与项目</a>
        </nav>
        <div class="copyright">©1997-2018 爱订云公司 版权所有</div>
      </div>
    </footer>

    <!-- 登录 -->
    <transition name="dialogfade">
      <div v-show="loginDialogVisible" class="u-dialog-wrapper">
        <div class="u-dialog dialog-login">
          <header class="dialog-title">登录
            <div class="icon-back" @click="hideLogin"></div>
            <div class="icon-close" @click="hideLogin"></div>
          </header>
          <section class="dialog-body">
            <div class="login-wrapper">
              <div class="input-wrapper icon-left">
                <input
                  v-model="loginInfo.account"
                  class="input"
                  type="text"
                  placeholder="手机号"
                  maxlength="11"
                >
                <i class="icon icon-phone"></i>
                <div class="warning-txt"></div>
              </div>
              <div class="input-wrapper icon-left">
                <input
                  v-model="loginInfo.password"
                  class="input"
                  type="password"
                  placeholder="密码"
                  maxlength="16"
                >
                <i class="icon icon-pwd"></i>
                <div class="warning-txt"></div>
              </div>
              <button class="btn" @click="loginSubmit">登录</button>
              <div class="tool">
                <label class="u-checkbox">
                  <span class="u-checkbox__input">
                    <span class="u-checkbox__inner" :class="{ischecked:autoLogin}"></span>
                    <input v-model="autoLogin" type="checkbox" class="u-checkbox__original" value>
                  </span>
                  <span class="u-checkbox__label">自动登录</span>
                </label>
                <a class="link" href="javascript:;" @click="showPwd">忘记密码</a>
              </div>
              <div class="other-method">
                <div class="desc">第三方账号登录</div>
                <div class="method">
                  <a class="icon icon-wechat" href="javascript:;"></a>
                  <a class="icon icon-qq" href="javascript:;"></a>
                </div>
              </div>
            </div>
          </section>
          <footer class="dialog-footer"></footer>
        </div>
      </div>
    </transition>

    <!-- 找回密码 -->
    <transition name="dialogfade">
      <div v-show="pwdDialogVisible" class="u-dialog-wrapper">
        <div class="u-dialog dialog-login">
          <header class="dialog-title">找回密码
            <div class="icon-back" @click="showLogin"></div>
            <div class="icon-close" @click="hidePwd"></div>
          </header>
          <section class="dialog-body">
            <div class="login-wrapper pwd-wrapper">
              <div class="input-wrapper" :class="{warning:findPwdInfo.phoneErr!=''}">
                <input v-model="findPwdInfo.phone" class="input" type="text" placeholder="输入11位手机号" maxlength="11" @input="onFindPwdPhoneChange">
                <div class="warning-txt">{{findPwdInfo.phoneErr}}</div>
              </div>
              <div class="input-wrapper validcode icon-right">
                <input v-model="findPwdInfo.verify_code" class="input" type="text" placeholder="验证码" maxlength="6" @change="onFindPwdCodeChange">
                <i class="icon " :class="{'icon-valid-success':findPwdInfo.verify_codePass===true,'icon-valid-error':findPwdInfo.verify_codePass===false}"></i>
                <button class="btn" @click="findPwdGetValidCode">{{findPwdInfo.codeBtnTxt}}</button>
              </div>
              <div class="input-wrapper">
                <input v-model="findPwdInfo.pwd1" class="input" type="password" placeholder="6-16位密码，区分大小写" maxlength="16">
                <div class="warning-txt"></div>
              </div>
              <div class="input-wrapper ">
                <input v-model="findPwdInfo.pwd2" class="input" type="password" placeholder="确认密码" maxlength="16">
                <div class="warning-txt"></div>
              </div>
              <button class="btn " @click="findPwdSubmit">确认重置</button>
            </div>
          </section>
          <footer class="dialog-footer"></footer>
        </div>
      </div>
    </transition>

    <!-- 注册 -->
    <transition name="dialogfade">
      <div v-show="registerDialogVisible" class="u-dialog-wrapper">
        <div class="u-dialog dialog-login">
          <header class="dialog-title">注册
            <div class="icon-back" @click="hideRegister"></div>
            <div class="icon-close" @click="hideRegister"></div>
          </header>
          <section class="dialog-body">
            <div class="login-wrapper">
              <div class="input-wrapper" :class="{warning:registerInfo.phoneErr!=''}">
                <input
                  v-model="registerInfo.phone"
                  class="input"
                  type="text"
                  placeholder="输入11位手机号"
                  maxlength="11"
                  @input="onRegisterPhoneChange"
                >
                <div class="warning-txt">{{registerInfo.phoneErr}}</div>
              </div>
              <div class="input-wrapper validcode icon-right">
                <input
                  v-model="registerInfo.verify_code"
                  class="input"
                  type="text"
                  placeholder="验证码"
                  maxlength="6"
                  @change="onRegisterCodeChange"
                >
                <i
                  class="icon"
                  :class="{'icon-valid-success':registerInfo.verify_codePass===true,'icon-valid-error':registerInfo.verify_codePass===false}"
                ></i>
                <button class="btn" @click="getValidCode">{{registerInfo.codeBtnTxt}}</button>
              </div>
              <div class="input-wrapper">
                <input
                  v-model="registerInfo.password"
                  class="input"
                  type="password"
                  placeholder="6-16位密码，区分大小写"
                  maxlength="16"
                >
                <div class="warning-txt"></div>
              </div>
              <div class="input-wrapper">
                <input
                  v-model="registerInfo.password2"
                  class="input"
                  type="password"
                  placeholder="确认密码"
                  maxlength="16"
                >
                <div class="warning-txt"></div>
              </div>
              <button class="btn" @click="registerSubmit">注册</button>
              <div class="tool">
                <div class="link">第三方账号注册</div>
                <a class="icon icon-wechat" href="javascript:;" @click="showPhone"></a>
                <a class="icon icon-qq" href="javascript:;" @click="showPhone"></a>
                <div style="flex:1"></div>
                <a class="link" href="javascript:;" @click="showLogin">已有账号,立即登录 ></a>
              </div>
            </div>
          </section>
          <footer class="dialog-footer"></footer>
        </div>
      </div>
    </transition>

    <!-- 绑定手机号 -->
    <transition name="dialogfade">
      <div v-show="phoneDialogVisible" class="u-dialog-wrapper">
        <div class="u-dialog dialog-login">
          <header class="dialog-title">绑定手机号
            <div class="icon-back" @click="hidePhone"></div>
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
              <button class="btn disabled">确认绑定</button>
            </div>
          </section>
          <footer class="dialog-footer"></footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { request } from "./api/api";
//import "./blueimp-md5/js/md5.min.js"
import md5 from "blueimp-md5/js/md5";
export default {
  name: "App",
  data() {
    return {
      currentRoutePath: "",
      pathHideHav: [
        "/order",
        "/paysuccess",
        "/chat",
        "/bindcard",
        "/bindcardsuccess"
      ],
      userInfo: {
        user_name: ""
      },
      //登录
      login: false,
      loginDialogVisible: false,
      autoLogin: false,
      loginInfo: {
        account: "",
        password: ""
      },

      //找回密码
      pwdDialogVisible: false,
      findPwdInfo:{
        phone:'',
        verify_code:'',
        verify_codePass: "", //验证码是否验证通过
        pwd1:'',
        pwd2:'',

        phoneErr:'',

        codeBtnTxt: '获取验证码',
        codeInterval: null,
      },

      //注册
      registerDialogVisible: false,
      registerInfo: {
        phone: "",
        verify_code: "",
        verify_codePass: "", //验证码是否验证通过
        password: "",
        password2: "",

        phoneErr: "",
        //verify_codeErr: "",
        passwordErr: "",
        password2Err: "",

        codeBtnTxt: '获取验证码',
        codeInterval: null,
      },

      //绑定手机
      phoneDialogVisible: false
    };
  },
  mounted() {
    this.handleRouteChange(this.$route.path);

    // var data;

    // axios
    //   .get("https://s3.iidingyun.com/api/get_service_to_json.vm")
    //   .then(function(response) {
    //     // handle success
    //     console.log(response);
    //     data = response.data;

    //     data.forEach(v => {
    //       if (
    //         v.service_name ==
    //         "com.iiding.admin.shop_management.base_param.query"
    //       ) {
    //         axios
    //           .post(v.service_path, {
    //             siteid: siteid
    //           })
    //           .then(re => {
    //             console.log(re);
    //           });
    //       }
    //     });
    //   })
    //   .catch(function(error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function() {
    //     // always executed
    //   });

    // request("com.iiding.admin.shop_management.base_param.query", {}, data => {
    //   console.log(data);
    // });

    let userInfo = sessionStorage.getItem("userInfo");
    if (userInfo && userInfo != "") {
      this.login = true;
      this.userInfo = JSON.parse(userInfo);
    }else{
      
      //自动登录
      let autoLogin = localStorage.getItem("autoLogin");
      let loginInfo = localStorage.getItem("loginInfo");
      if (autoLogin) {
        loginInfo = JSON.parse(loginInfo);
        request(
          "com.iiding.user.account.user_login",
          { account: loginInfo.account, password: loginInfo.password },
          res => {
            console.log(res);
            if (res.code == "success") {
              sessionStorage.setItem("userInfo", JSON.stringify(res));
              this.userInfo = res;
              this.login = true;
            } else {
              this.$message.error(res.msg);
            }
          }
        );
      }

    }
  },
  methods: {
    handleRouteChange(path) {
      this.currentRoutePath = path;
      // if (this.pathHideHav.indexOf(path) >= 0) {
      //   document.body.style.background = "#f2f2f2";
      // } else {
      //   document.body.style.background = "#ffffff";
      // }

      // if (path.indexOf("/user/") >= 0) {
      //   document.body.style.background = "#f2f2f2";
      // }
      // if (path.indexOf("/projectdetails") >= 0) {
      //   document.body.style.background = "#f2f2f2";
      // }
    },

    showLogin() {
      this.registerDialogVisible = false;
      this.pwdDialogVisible = false;
      this.loginDialogVisible = true;
    },
    hideLogin() {
      this.loginDialogVisible = false;
    },
    showPwd() {
      this.loginDialogVisible = false;
      this.pwdDialogVisible = true;
    },
    hidePwd() {
      this.pwdDialogVisible = false;
    },
    showRegister() {
      this.registerDialogVisible = true;
    },
    hideRegister() {
      this.registerDialogVisible = false;
    },
    showPhone() {
      this.registerDialogVisible = false;
      this.phoneDialogVisible = true;
    },
    hidePhone() {
      this.phoneDialogVisible = false;
    },
    toUserCenter() {
      window.open("#/user/info");
    },
    toUserInfo() {
      window.open("#/user/info");
    },

    getValidCode() {
      if(this.registerInfo.codeBtnTxt != '获取验证码'){
        return;
      }
      if (this.registerInfo.phone == "") {
        //this.$message("请输入手机号");
        this.registerInfo.phoneErr = "请输入手机号";
        return;
      }
      let reg = /^1\d{10}$/;
      if (!reg.test(this.registerInfo.phone)) {
        //this.$message("请输入正确的手机号");
        this.registerInfo.phoneErr = "请输入正确的手机号";
        return;
      }
      request(
        "com.iiding.common.user.verify_code",
        { phone: this.registerInfo.phone },
        res => {
          if(res.code=='success'){
            this.registerInfo.codeBtnTxt = 60;
            this.registerInfo.codeInterval = setInterval(() => {
              if(this.registerInfo.codeBtnTxt>1){
                this.registerInfo.codeBtnTxt --;
              }else{
                this.registerInfo.codeInterval = null;
                clearInterval(this.registerInfo.codeInterval);
                this.registerInfo.codeBtnTxt = '获取验证码';
              }
            }, 1000);
          }
        }
      );
    },
    onRegisterPhoneChange() {
      let reg = /^1\d{10}$/;
      if (reg.test(this.registerInfo.phone)) {
        this.registerInfo.phoneErr = "";
      }
    },
    onRegisterCodeChange() {
      let reg = /^\d{6}$/;
      if (reg.test(this.registerInfo.verify_code)) {
        request(
          "com.iiding.common.user.user_phone_check",
          {
            phone: this.registerInfo.phone,
            verify_code: this.registerInfo.verify_code
          },
          res => {
            if (res.code == "success") {
              this.registerInfo.verify_codePass = true;
            } else {
              this.registerInfo.verify_codePass = false;
            }
          }
        );
      } else {
        this.registerInfo.verify_codePass = "";
      }
    },
    //注册
    registerSubmit() {
      let reg1 = /^1\d{10}$/;
      let reg2 = /^\d{6}$/;
      let para = {};
      para.phone = this.registerInfo.phone;
      para.verify_code = this.registerInfo.verify_code;
      para.password = this.registerInfo.password;
      if (!reg1.test(para.phone)) {
        this.$message("请输入正确的手机号");
        return;
      }
      if (!reg2.test(this.registerInfo.verify_code)) {
        this.$message("验证码错误");
        return;
      }
      if (para.password != this.registerInfo.password2) {
        this.$message("密码输入错误");
        return;
      }
      para.password = md5(para.password);
      //console.log(para);
      request("com.iiding.user.account.user_register", para, res => {
        if (res.code == "success") {
          this.$message({
            message: "注册成功",
            type: "success"
          });
          setTimeout(() => {
            this.showLogin();
          }, 1000);
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    //登录
    loginSubmit() {
      var para = {};
      para.account = this.loginInfo.account;
      para.password = md5(this.loginInfo.password);
      let reg = /^1\d{10}$/;
      if (!reg.test(para.account)) {
        this.$message("请输入正确的手机号");
        return;
      }
      if (para.password == "") {
        this.$message("请输入密码");
        return;
      }
      console.log(para)
      request("com.iiding.user.account.user_login", para, res => {
        console.log(res);
        if (res.code == "success") {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          sessionStorage.setItem("userInfo", JSON.stringify(res));
          this.userInfo = res;
          this.loginDialogVisible = false;
          this.login = true;

          if (this.autoLogin) {
            localStorage.setItem("autoLogin", true);
            localStorage.setItem(
              "loginInfo",
              JSON.stringify({ account: para.account, password: para.password })
            );
          } else {
            localStorage.removeItem("autoLogin");
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    logout() {
      sessionStorage.removeItem("userInfo");
      localStorage.removeItem('autoLogin');
      localStorage.removeItem('loginInfo');
      this.login = false;
    },

    //找回密码
    findPwdSubmit(){
      let reg1 = /^1\d{10}$/;
      let reg2 = /^\d{6}$/;
      let para = {};
      para.phone = this.findPwdInfo.phone;
      para.verify_code = this.findPwdInfo.verify_code;
      para.pwd1 = this.findPwdInfo.pwd1;
      para.pwd2 = this.findPwdInfo.pwd2;
      if (!reg1.test(para.phone)) {
        this.$message("请输入正确的手机号");
        return;
      }
      if (!reg2.test(this.findPwdInfo.verify_code)) {
        this.$message("验证码错误");
        return;
      }
      if (para.pwd1 != this.findPwdInfo.pwd2) {
        this.$message("密码输入错误");
        return;
      }
      para.pwd1 = md5(para.pwd1);
      para.pwd2 = md5(para.pwd2);
      //console.log(para);
      request("com.iiding.user.account.user_forget_password", para, res => {
        if (res.code == "success") {
          this.$message({
            message: "重置成功",
            type: "success"
          });
          this.logout();
          setTimeout(() => {
            this.showLogin();
          }, 1000);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    findPwdGetValidCode() {
      if(this.findPwdInfo.codeBtnTxt != '获取验证码'){
        return;
      }
      if (this.findPwdInfo.phone == "") {
        this.findPwdInfo.phoneErr = "请输入手机号";
        return;
      }
      let reg = /^1\d{10}$/;
      if (!reg.test(this.findPwdInfo.phone)) {
        this.findPwdInfo.phoneErr = "请输入正确的手机号";
        return;
      }
      request(
        "com.iiding.common.user.verify_code",
        { phone: this.findPwdInfo.phone },
        res => {
          if(res.code=='success'){
            this.findPwdInfo.codeBtnTxt = 60;
            this.findPwdInfo.codeInterval = setInterval(() => {
              if(this.findPwdInfo.codeBtnTxt>1){
                this.findPwdInfo.codeBtnTxt --;
              }else{
                this.findPwdInfo.codeInterval = null;
                clearInterval(this.findPwdInfo.codeInterval);
                this.findPwdInfo.codeBtnTxt = '获取验证码';
              }
            }, 1000);
          }
        }
      );
    },
    onFindPwdPhoneChange() {
      let reg = /^1\d{10}$/;
      if (reg.test(this.findPwdInfo.phone)) {
        this.findPwdInfo.phoneErr = "";
      }
    },
    onFindPwdCodeChange() {
      let reg = /^\d{6}$/;
      if (reg.test(this.findPwdInfo.verify_code)) {
        request(
          "com.iiding.common.user.user_phone_check",
          {
            phone: this.findPwdInfo.phone,
            verify_code: this.findPwdInfo.verify_code
          },
          res => {
            if (res.code == "success") {
              this.findPwdInfo.verify_codePass = true;
            } else {
              this.findPwdInfo.verify_codePass = false;
            }
          }
        );
      } else {
        this.findPwdInfo.verify_codePass = "";
      }
    },


  },
  watch: {
    $route(to, from) {
      this.handleRouteChange(to.path);
    }
  }
};
</script>

<style lang="scss">
@import "styles/vars.scss";
@font-face {
  font-family: myFont;
  src: url("assets/DINAlternateBold.ttf");
}
body {
  background: #f2f2f2;
}
a {
  text-decoration: none;
  color: #333333;
}

ul,
li {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}
button {
  outline: none;
  cursor: pointer;
  border: 0;
  transition: opacity ease 0.2s;
  &.disabled {
    cursor: not-allowed;
  }
  &:not(.disabled):hover {
    opacity: 0.9;
  }
}
textarea {
  resize: none;
}

.dialogfade-enter-active,
.dialogfade-leave-active {
  transition: opacity 0.2s;
}
.dialogfade-enter, .dialogfade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.u-progress {
  width: 100%;
  height: 8px;
  /* border: 1px solid #0064B4;   */
  background-color: #e6e6e6;
  color: linear-gradient(
    90deg,
    rgba(255, 144, 0, 1) 0%,
    rgba(255, 80, 0, 1) 100%
  );
  /*IE10*/
  border-radius: 6px;
}

.u-progress::-moz-progress-bar {
  background: linear-gradient(
    90deg,
    rgba(255, 144, 0, 1) 0%,
    rgba(255, 80, 0, 1) 100%
  );
  border-radius: 6px;
}

.u-progress::-webkit-progress-bar {
  background: #e6e6e6;
  border-radius: 6px;
}

.u-progress::-webkit-progress-value {
  background: linear-gradient(
    90deg,
    rgba(255, 144, 0, 1) 0%,
    rgba(255, 80, 0, 1) 100%
  );
  border-radius: 6px;
}

.u-progress.green {
  width: 100%;
  height: 8px;
  /* border: 1px solid #0064B4;   */
  background-color: #e6e6e6;
  color: linear-gradient(
    90deg,
    rgba(57, 233, 201, 1) 0%,
    rgba(25, 220, 228, 1) 100%
  );
  /*IE10*/
  border-radius: 6px;
}

.u-progress.green::-moz-progress-bar {
  background: linear-gradient(
    90deg,
    rgba(57, 233, 201, 1) 0%,
    rgba(25, 220, 228, 1) 100%
  );
  border-radius: 6px;
}

.u-progress.green::-webkit-progress-bar {
  background: #e6e6e6;
  border-radius: 6px;
}

.u-progress.green::-webkit-progress-value {
  background: linear-gradient(
    90deg,
    rgba(57, 233, 201, 1) 0%,
    rgba(25, 220, 228, 1) 100%
  );
  border-radius: 6px;
}

.u-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  .u-checkbox__input {
    .u-checkbox__inner {
      display: inline-block;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #fff;
      z-index: 1;
      transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
        background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
      margin-top: 4px;
      &::after {
        box-sizing: content-box;
        content: "";
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }
      // &.ischecked::after{
      //   transform: rotate(45deg) scaleY(1);
      // }
      &.ischecked {
        background: $front-color;
        border: 1px solid $front-color;
      }
      &.ischecked::after {
        transform: rotate(45deg) scaleY(1);
      }
    }
    .u-checkbox__original {
      opacity: 0;
      outline: 0;
      position: absolute;
      margin: 0;
      width: 0;
      height: 0;
      z-index: -1;
    }
  }
  .u-checkbox__label {
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 22px;
    margin-left: 8px;
    .link {
      font-size: 14px;
      color: $front-color;
    }
  }
}

.u-radio-group1 {
  display: flex;
}
.u-radio {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .u-radio__label {
    min-width: 92px;
    height: 26px;
    line-height: 26px;
    border-radius: 2px;
    border: 1px solid #b0b0b0;
    font-size: 14px;
    color: rgba(153, 153, 153, 1);
    text-align: center;
    display: block;
    transition: border ease 0.2s;
    position: relative;
    &:hover {
      border: 1px solid $front-color;
    }
  }
  .u-radio__desc {
    font-size: 14px;
    color: rgba(153, 153, 153, 1);
    line-height: 18px;
    margin-top: 8px;
  }
  .u-radio__original {
    opacity: 0;
    outline: 0;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }
  & + .u-radio {
    margin-left: 20px;
  }
  &.ischecked {
    .u-radio__label {
      border: 1px solid $front-color;
      color: $front-color;
      &::before {
        content: "";
        width: 16px;
        height: 16px;
        background: linear-gradient(
            to right bottom,
            transparent 50%,
            $front-color 0
          )
          no-repeat 100% 0/16px 16px;
        position: absolute;
        right: 0;
        bottom: 0;
      }
      &::after {
        content: "";
        width: 4px;
        height: 8px;
        border: 1px solid #ffffff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg);
        position: absolute;
        right: 2px;
        bottom: 1px;
      }
    }
  }
}
.u-radio-group2 {
  display: flex;
  .u-radio {
    &.ischecked {
      .u-radio__label {
        border: 1px solid $front-color;
        color: #ffffff;
        background: $front-color;
        position: relative;
        &::before {
          background: linear-gradient(
              to right bottom,
              transparent 50%,
              #ffffff 0
            )
            no-repeat 100% 0/16px 16px;
        }
        &::after {
          border: 1px solid $front-color;
          border-top: 0;
          border-left: 0;
        }
      }
    }
  }
}
.u-checkbox-group1 {
  display: flex;
}
.u-checkbox1 {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .u-checkbox__label {
    // min-width: 92px;
    padding: 0 20px;
    box-sizing: border-box;
    height: 26px;
    line-height: 26px;
    border-radius: 2px;
    border: 1px solid #b0b0b0;
    font-size: 14px;
    color: rgba(153, 153, 153, 1);
    text-align: center;
    display: block;
    transition: border ease 0.2s;
    position: relative;
    &:hover {
      border: 1px solid $front-color;
    }
  }
  .u-checkbox__desc {
    font-size: 14px;
    color: rgba(153, 153, 153, 1);
    line-height: 18px;
    margin-top: 8px;
  }
  .u-checkbox__original {
    opacity: 0;
    outline: 0;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }
  & + .u-checkbox1 {
    margin-left: 20px;
  }
  &.ischecked {
    .u-checkbox__label {
      border: 1px solid $front-color;
      color: $front-color;
      &::before {
        content: "";
        width: 16px;
        height: 16px;
        background: linear-gradient(
            to right bottom,
            transparent 50%,
            $front-color 0
          )
          no-repeat 100% 0/16px 16px;
        position: absolute;
        right: 0;
        bottom: 0;
      }
      &::after {
        content: "";
        width: 4px;
        height: 8px;
        border: 1px solid #ffffff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg);
        position: absolute;
        right: 2px;
        bottom: 1px;
      }
    }
  }
}
.u-input {
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 16px;
  color: #333333;
  line-height: 24px;
  outline: none;
}
.u-input:-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.25);
}
.u-input2 {
  height: 32px;
  line-height: 32x;
  border-radius: 4px;
  border: 1px solid #b0b0b0;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 16px;
  color: #333333;
  outline: none;
}
.u-input2:-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.25);
}
.u-btn {
  height: 40px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 0 16px;
  font-size: 14px;
  color: rgba(102, 102, 102, 1);
  line-height: 22px;
  background: #ffffff;
  outline: none;
  cursor: pointer;
}
/* 分享 */
.u-share {
  display: flex;
  align-items: center;
  .lb {
    font-size: 14px;
    color: rgba(153, 153, 153, 1);
    line-height: 18px;
  }
  .list {
    display: flex;
    align-items: center;
    .icon {
      width: 22px;
      height: 22px;
      margin-left: 10px;
      cursor: pointer;
      &.icon-weibo {
        background: url("//pic.iidingyun.com/1000//file/20181122/75574.png")
          no-repeat;
      }
      &.icon-qq {
        background: url("//pic.iidingyun.com//file/20181122/75571.png")
          no-repeat;
      }
      &.icon-dou {
        background: url("//pic.iidingyun.com//file/20181122/75570.png")
          no-repeat;
      }
      &.icon-ren {
        background: url("//pic.iidingyun.com//file/20181122/75572.png")
          no-repeat;
      }
      &.icon-wechat {
        background: url("//pic.iidingyun.com/1000//file/20181122/75573.png")
          no-repeat;
      }
    }
  }
}
// tab
.u-tabpanel {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e7e7e7;
  background: #ffffff;
  .item {
    width: 112px;
    height: 42px;
    line-height: 42px;
    text-align: center; // padding: 0 28px; // box-sizing: border-box;
    font-size: 14px;
    transition: all ease 0.2s;
    cursor: pointer;
    position: relative;
    & + .item {
      margin-left: 8px;
    }
    &.active {
      color: $front-color;
      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background: $front-color;
      }
    }
    &:not(.active):hover {
      color: $front-color;
      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background: $front-color;
        animation: ani-u-tabpanel linear 0.2s;
      }
    }
  }
}
.u-tabpanel2 {
  width: 100%;
  display: flex;
  border-bottom: 2px solid #e7e7e7;
  .item {
    width: 144px;
    height: 62px;
    line-height: 62px;
    text-align: center;
    // padding: 0 28px;
    // box-sizing: border-box;
    font-size: 16px;
    font-weight: bold;
    transition: all ease 0.2s;
    cursor: pointer;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 16px;
      background: rgba(231, 231, 231, 1);
    }
    & + .item {
      margin-left: 1px;
    }
    &.active {
      color: $front-color;
      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background: $front-color;
      }
    }
    &:not(.active):hover {
      color: $front-color;
      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background: $front-color;
        animation: ani-u-tabpanel linear 0.2s;
      }
    }
  }
}
@keyframes ani-u-tabpanel {
  0% {
    bottom: -10px;
    opacity: 0;
    height: 0px;
  }
  100% {
    bottom: -1px;
    opacity: 1;
    height: 2px;
  }
}
// 弹出框
.u-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  background: rgba(0, 0, 0, 0.5);
  .u-dialog {
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    box-sizing: border-box;
    width: 50%;
    margin-top: 15vh;
    min-height: 100px;
    padding: 30px 32px 0;
    animation: dialog-ani 0.2s ease-in-out;
    .dialog-title {
      text-align: center;
      font-size: 18px;
      line-height: 23px;
      position: relative;
      .icon-close {
        width: 20px;
        height: 20px;
        position: absolute;
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
        background: url("//pic.iidingyun.com//file/20181123/75594.png")
          no-repeat center center;
        cursor: pointer;
      }
      .icon-back {
        width: 20px;
        height: 20px;
        position: absolute;
        left: -6px;
        top: 50%;
        transform: translateY(-50%);
        background: url("//pic.iidingyun.com//file/20181123/75603.png")
          no-repeat center center;
        cursor: pointer;
      }
    }
  }
}
@keyframes dialog-ani {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
.u-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e8e8e8;
  tr {
    th,
    td {
      border: 1px solid #e8e8e8;
    }
    th {
      padding: 16px 13px 17px;
      box-sizing: border-box;
      text-align: center;
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
    }
    td {
      padding: 10px 12px;
      box-sizing: border-box;
      text-align: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 21px;
    }
  }
  caption {
    border: 1px solid #e8e8e8;
    border-bottom: 0;
    text-align: left;
    height: 33px;
    line-height: 33px;
    background: $gray-bg;
    border-radius: 4px 4px 0px 0px;
    color: #999999;
    font-size: 12px;
    padding: 0 16px;
    .order {
      margin-left: 20px;
    }
    .orderid {
      color: #333333;
    }
  }
  thead {
    background: $gray-bg;
  }
}
.u-el-table-wrapper {
  padding: 29px 31px 80px 31px;
  box-sizing: border-box;
  .table-head {
    height: 54px;
    line-height: 54px;
    border-radius: 4px 4px 0px 0px;
    padding: 0 16px;
    border: 1px solid #ebeef5;
    border-bottom: 0;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
  }
  .pager-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
.u-form {
  .u-form-item {
    display: flex;
    align-items: center;
    .lb {
      width: 150px;
      font-size: 14px;
      color: #666666;
      line-height: 18px;
      margin-right: 20px;
      text-align: right;
      .im {
        color: $front-color;
      }
    }
    .disp-txt {
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
    }
    .link {
      font-size: 14px;
      color: $front-color;
      line-height: 18px;
      margin-left: 20px;
      transition: opacity ease 0.2s;
      &.green {
        color: #19dce4;
      }
      &:hover {
        opacity: 0.8;
      }
    }
    .edit-confirm {
      display: flex;
      align-items: flex-end;
      .u-input {
        height: 32px;
        line-height: 32px;
        &:focus,
        &:active {
          border: 1px solid $front-color;
          box-shadow: 0 0 0 2px #ffbc9e;
        }
      }
    }
    & + .u-form-item {
      margin-top: 40px;
    }
  }
}
.u-form2 {
  .u-form-item {
    display: flex;
    align-items: center;
    .lb {
      font-size: 16px;
      color: #333333;
      line-height: 20px;
      margin-right: 20px;
      .im {
        color: $front-color;
      }
    }
    .disp-txt {
      font-size: 16px;
      color: #333333;
      line-height: 20px;
    }
    .link {
      font-size: 14px;
      color: $front-color;
      line-height: 18px;
      margin-left: 20px;
      transition: opacity ease 0.2s;
      &:hover {
        opacity: 0.8;
      }
    }
    & + .u-form-item {
      margin-top: 40px;
    }
  }
  .form-tool {
    margin-top: 70px;
    .btn {
      height: 46px;
      line-height: 46px;
      background: $front-color;
      border-radius: 2px;
      padding: 0 39px;
      font-size: 16px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
      &.disabled {
        background: #ffb999;
      }
    }
  }
}
.m-project {
  .title {
    height: 30px;
    font-size: 24px;
    font-weight: bold;
    line-height: 30px;
    padding-left: 16px;
    position: relative;
    margin: 50px 0 20px;
    &::before {
      content: "";
      width: 4px;
      height: 24px;
      background: $front-color;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .more {
      font-size: 18px;
      color: rgba(153, 153, 153, 1);
      line-height: 23px;
      position: absolute;
      right: 0;
      font-weight: normal;
      transition: all ease 0.2s;
      &:hover {
        color: #333333;
      }
    }
  }
  .list {
    width: 1230px;
    display: flex;
    flex-flow: wrap;
    margin-left: -30px;
    .item {
      width: 380px;
      height: 472px;
      overflow: hidden;
      margin-left: 30px;
      margin-bottom: 30px;
      box-shadow: 0px 0px 40px 0px rgba(216, 216, 216, 0.5);
      border-radius: 2px;
      background: #ffffff;
      .item-inner {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        .cover-wrapper {
          width: 380px;
          height: 300px;
          overflow: hidden;
          .cover {
            width: 380px;
            height: 300px;
            transition: transform 0.6s ease;
          }
        }
        .name {
          font-size: 14px;
          font-weight: bold;
          line-height: 18px;
          margin: 20px 20px 0 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .price-wrapper {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0 20px;
          box-sizing: border-box;
          margin-top: 12px;
          .price {
            font-size: 28px;
            color: $front-color;
            font-weight: bold;
            .decimal {
              font-size: 18px;
            }
          }
          .status {
            font-size: 16px;
            color: rgba(102, 102, 102, 1);
            line-height: 20px;
            margin-bottom: 2px;
          }
        }
        .progress-wrapper {
          padding: 0 20px;
          box-sizing: border-box;
          margin-top: 13px;
        }
        .details {
          width: 100%;
          display: flex;
          box-sizing: border-box;
          margin-top: 5px;
          li {
            flex: 1;
            padding-left: 20px;
            box-sizing: border-box;
            .prog {
              font-size: 16px;
              color: rgba(102, 102, 102, 1);
              line-height: 20px;
            }
            .desc {
              font-size: 12px;
              color: rgba(153, 153, 153, 1);
              line-height: 15px;
              margin-top: 2px;
            }
            & + li {
              border-left: 1px solid #e7e7e7;
            }
          }
        }
        .tag {
          width: 110px;
          height: 36px;
          line-height: 36px;
          color: #ffffff;
          background: url("//pic.iidingyun.com/1000//file/20181120/75483.png")
            no-repeat;
          font-size: 16px;
          padding-left: 12px;
          position: absolute;
          top: 0;
          left: 0;
        }
        .qrcode-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 300px;
          background: rgba(0, 0, 0, 0.5);
          // display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1;
          display: none;
          .pic {
            width: 118px;
            height: 118px;
          }
          .desc {
            font-size: 18px;
            color: rgba(255, 255, 255, 1);
            line-height: 23px;
            margin-top: 10px;
          }
        }
        .modal {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          // display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          display: none;
          .link {
            font-size: 24px;
            color: rgba(255, 255, 255, 1);
            line-height: 30px;
          }
        }
      }
      &:hover {
        .item-inner {
          .cover {
            transform: scale(1.2);
          }
          .qrcode-wrapper {
            display: flex;
          }
          .modal {
            display: flex;
          }
        }
      }
    }
    .item.col2 {
      width: 790px;
      .item-inner {
        .ad {
          width: 790px;
          height: 472px;
        }
      }
    }
  }
  &.custom {
    .list {
      .item {
        height: 401px;
      }
    }
  }
}
.m-project + .m-project {
  .title {
    margin-top: 20px;
  }
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
}
.header1 {
  height: 36px;
  background: rgba(51, 51, 51, 1);
  .header1-inner {
    width: 1200px;
    height: 36px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
    .icon.icon-tel {
      background: url("http://pic.iidingyun.com//file/20181120/75481.png")
        no-repeat;
    }
    .txt {
      font-size: 12px;
      color: rgba(176, 176, 176, 1);
      line-height: 15px;
    }
    .txt.im {
      color: $front-color;
    }
    .txt.tel {
      margin-left: 4px;
    }
    .link {
      font-size: 12px;
      color: rgba(176, 176, 176, 1);
      line-height: 15px;
      position: relative;
      height: 100%;
      line-height: 36px;
      &.sel {
        padding-right: 17px;
      }
      .arr {
        width: 8px;
        height: 4px;
        background: url("http://pic.iidingyun.com//file/20181120/75476.png")
          no-repeat;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .qrcode {
        width: 90px;
        height: 90px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.08);
        border-radius: 2px;
        padding: 5px;
        box-sizing: border-box;
        position: absolute;
        left: -26px;
        bottom: -88px;
        display: none;
        .pic {
          width: 80px;
          height: 80px;
        }
      }
      &.market:hover {
        .qrcode {
          display: block;
        }
      }
    }
    .link.active {
      color: $front-color;
    }
    .link.register {
      margin-left: 10px;
    }
    .link.logout {
      margin-left: 10px;
    }
    .seperator {
      width: 1px;
      height: 12px;
      background: rgba(102, 102, 102, 1);
      margin: 0 20px;
    }
  }
}
.header2 {
  height: 80px;
  background: #ffffff;
  .header2-inner {
    height: 80px;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .logo {
      display: block;
      width: 172px;
      height: 70px;
      background: url("http://pic.iidingyun.com//file/20181120/75480.png")
        no-repeat;
    }
  }
}
.g-nav-wrapper {
  background: #ffffff;
  .g-nav {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    .link {
      width: 123px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      display: block;
      font-size: 16px;
      color: #333333;
      transition: all ease 0.2s;
    }
    .link.router-link-active {
      color: #ffffff;
      background: $front-color;
    }
    .link:hover {
      color: #ffffff;
      background: $front-color;
    }
  }
}
.g-nav-mobile {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 0px 0px rgba(229, 229, 229, 1);
  display: flex;
  display: none;
  justify-content: space-around;
  align-items: flex-end;
  z-index: 999;
  .link {
    flex: 1;
    font-size: 10px;
    color: rgba(102, 102, 102, 1);
    position: relative;
    display: block;
    height: 50px;
    line-height: 80px;
    text-align: center;
    &.router-link-active {
      color: $front-color;
    }
    &::before {
      content: "";
      width: 22px;
      height: 22px;
      position: absolute;
      top: 9px;
      left: 50%;
      transform: translateX(-50%);
    }
    &.home {
      &::before {
        background: url("//pic.iidingyun.com/1000//file/20181130/75758.png")
          no-repeat;
        background-size: contain;
      }
      &.router-link-active {
        &::before {
          background: url("//pic.iidingyun.com/1000//file/20181130/75755.png")
            no-repeat;
          background-size: contain;
        }
      }
    }
    &.project {
      &::before {
        background: url("//pic.iidingyun.com//file/20181130/75751.png")
          no-repeat;
        background-size: contain;
      }
      &.router-link-active {
        &::before {
          background: url("//pic.iidingyun.com/1000//file/20181130/75752.png")
            no-repeat;
          background-size: contain;
        }
      }
    }
    &.join {
      &::before {
        background: url("//pic.iidingyun.com//file/20181130/75753.png")
          no-repeat;
        background-size: contain;
      }
      &.router-link-active {
        &::before {
          background: url("//pic.iidingyun.com//file/20181130/75756.png")
            no-repeat;
          background-size: contain;
        }
      }
    }
    &.user {
      &::before {
        background: url("//pic.iidingyun.com//file/20181130/75754.png")
          no-repeat;
        background-size: contain;
      }
      &.router-link-active {
        &::before {
          background: url("//pic.iidingyun.com//file/20181130/75757.png")
            no-repeat;
          background-size: contain;
        }
      }
    }
  }
}
.footer {
  height: 150px;
  background: rgba(51, 51, 51, 1);
  .footer-inner {
    width: 1200px;
    margin: 0 auto;
    .nav {
      display: flex;
      padding-top: 46px;
      box-sizing: border-box;
      .link {
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
      }
      .link + .link {
        margin-left: 20px;
      }
    }
    .copyright {
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
      margin-top: 20px;
      text-align: left;
    }
  }
}
.u-dialog.dialog-login {
  width: 400px;
}
.login-wrapper {
  margin-top: 50px;
  padding-bottom: 54px;
  .input-wrapper {
    position: relative;
    .input {
      width: 100%;
      border: 1px solid #d9d9d9;
      height: 40px;
      line-height: 40px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      background: #f4f4f4;
      transition: background ease 0.2s;
      &:-webkit-input-placeholder {
        color: #b0b0b0;
      }
      &:focus {
        background: #ffffff;
      }
    }
    &.icon-left {
      .input {
        padding-left: 36px;
      }
    }
    &.icon-right {
      .input {
        padding-right: 36px;
      }
    }
    & + .input-wrapper {
      margin-top: 24px;
    }
    .icon {
      width: 16px;
      height: 16px;
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      &.icon-phone {
        background: url("//pic.iidingyun.com//file/20181123/75602.png")
          no-repeat;
      }
      &.icon-pwd {
        background: url("//pic.iidingyun.com//file/20181123/75601.png")
          no-repeat;
      }
      &.icon-valid-success {
        left: auto;
        right: 122px;
        width: 14px;
        height: 14px;
        background: url("//pic.iidingyun.com/1000//file/20181123/75605.png")
          no-repeat;
      }
      &.icon-valid-error {
        left: auto;
        right: 122px;
        width: 14px;
        height: 14px;
        background: url("//pic.iidingyun.com//file/20181123/75606.png")
          no-repeat;
      }
    }
    .warning-txt {
      position: absolute;
      bottom: -21px;
      left: 0;
      font-size: 12px;
      color: $warning;
      line-height: 15px;
      display: none;
    }
    &.warning {
      .input {
        border: 1px solid $warning;
      }
      .warning-txt {
        display: block;
      }
    }
    &.validcode {
      display: flex;
      .input {
        flex: 1;
      }
      .btn {
        width: 102px;
        height: 40px;
        line-height: 40px;
        border-radius: 4px;
        border: 1px solid #d9d9d9;
        text-align: center;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        line-height: 22px;
        background: #ffffff;
        cursor: pointer;
        outline: none;
        margin: 0;
        margin-left: 8px;
      }
    }
  }
  .btn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: $front-color;
    border-radius: 2px;
    font-size: 16px;
    color: #ffffff;
    outline: none;
    cursor: pointer;
    border: 0;
    margin-top: 24px;
    &.disabled {
      background: rgba(255, 80, 0, 0.6);
      cursor: not-allowed;
    }
    &:not(.disabled):hover {
      opacity: 0.9;
    }
  }
  .tool {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    .link {
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      line-height: 22px;
    }
    .icon {
      width: 25px;
      height: 25px;
      margin-left: 10px;
      background-size: contain;
      &.icon-wechat {
        margin-left: 8px;
        background-image: url("//pic.iidingyun.com/1000//file/20181123/75598.png");
      }
      &.icon-qq {
        background-image: url("//pic.iidingyun.com/1000//file/20181123/75597.png");
      }
    }
  }
  .other-method {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    .desc {
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      line-height: 22px;
    }
    .method {
      display: flex;
      margin-top: 15px;
      .icon {
        width: 42px;
        height: 42px;
        transition: background ease 0.2s;
        &.icon-wechat {
          background: url("//pic.iidingyun.com/1000//file/20181123/75598.png")
            no-repeat;
          &:hover {
            background: url("//pic.iidingyun.com//file/20181123/75599.png")
              no-repeat;
          }
        }
        &.icon-qq {
          background: url("//pic.iidingyun.com/1000//file/20181123/75597.png")
            no-repeat;
          &:hover {
            background: url("//pic.iidingyun.com//file/20181123/75600.png")
              no-repeat;
          }
        }
        & + .icon {
          margin-left: 40px;
        }
      }
    }
  }
  &.pwd-wrapper {
    padding-bottom: 101px;
  }
  &.phone-wrapper {
    padding-bottom: 229px;
  }
}
.contact-wrapper {
  width: 80px;
  position: fixed;
  top: 65%;
  right: 10px;
  z-index: 1;
  .item {
    width: 100%;
    height: 80px;
    background: $front-color;
    color: #ffffff;
    font-size: 22px;
    font-weight: bold;
    line-height: 30px;
    letter-spacing: 3px;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 3px 3px 8px 0px rgba(255, 80, 0, 0.49);
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    &.chat {
      .icon-chat {
        display: block;
        font-style: normal;
        margin: 0 0 0 6px;
        &:hover {
          width: 60px;
          height: 60px;
          background: url("//pic.iidingyun.com//file/20181129/75738.png")
            no-repeat;
          margin: 0;
          .txt {
            display: none;
          }
        }
      }
    }
    &.wechat {
      .qrcode-inner {
        position: absolute;
        bottom: 0;
        left: -100px;
        width: 90px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px 0px rgba(231, 231, 231, 1);
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 0;
        box-sizing: border-box;
        display: none;
        .pic {
          width: 80px;
          height: 80px;
        }
        .desc {
          font-size: 12px;
          color: rgba(51, 51, 51, 1);
          line-height: 15px;
          margin-top: 6px;
          letter-spacing: initial;
        }
      }
      .icon-qrcode {
        display: block;
        width: 48px;
        height: 48px;
        background: url("//pic.iidingyun.com//file/20181129/75735.png")
          no-repeat;
        margin: 6px 0 0 6px;
        &:hover {
          width: 60px;
          height: 60px;
          background: url("//pic.iidingyun.com//file/20181129/75736.png")
            no-repeat;
          margin: 0;
        }
      }
      &:hover {
        .qrcode-inner {
          display: flex;
        }
      }
    }
    a {
      color: #ffffff;
    }
    & + .item {
      margin-top: 20px;
    }
  }
}
.g-title-mobile {
  display: none;
}
@media (max-width: 767px) {
  .u-progress {
    height: 4px;
    border-radius: 3px;
    &.green {
      height: 4px;
      border-radius: 3px;
    }
  }
  .g-title-mobile {
    width: 100%;
    display: block;
    font-size: 18px;
    color: #333333;
    line-height: 46px;
    font-weight: normal;
    text-align: center;
    border-bottom: 1px solid #e7e7e7;
    margin: 0;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    .icon-back {
      width: 18px;
      height: 32px;
      background: url("//pic.iidingyun.com//file/20181201/75781.png") no-repeat
        center center;
      background-size: 50% 50%;
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
    }
  }
  .g-footer-mobile {
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    background: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }
  .header1 {
    display: none;
  }
  .header2 {
    display: none;
  }
  .g-nav-wrapper {
    display: none;
  }
  .footer {
    display: none;
  }
  .contact-wrapper {
    display: none;
  }
  .g-nav-mobile {
    display: flex;
  }
  .u-dialog-wrapper {
    .u-dialog {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 17.5px 20px 0;
      .dialog-title {
        .icon-close {
          display: none;
        }
      }
    }
  }
  .login-wrapper {
    .input-wrapper {
      & + .input-wrapper {
        margin-top: 28px;
      }
    }
    .other-method {
      margin-top: 145px;
    }
  }
}
</style>
