<template>
    <div>
        <h1 class="g-title-mobile"><i class="icon-back" onclick="history.back()"></i>支付</h1>
        <div class="main">
            <div class="form">
                <div class="form-item pay-all">
                    <div class="lb">全额支付：</div>
                    <div class="disp-txt im">{{m_presell_price}}</div>
                </div>
                <div class="form-item methods">
                    <div class="u-radio-group1"> 
                        <label class="u-radio" :class="{ischecked:payWay2==1}">
                            <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="1">
                            <span class="u-radio__label">支付宝支付</span>
                        </label>
                        <label class="u-radio" :class="{ischecked:payWay2==2}">
                            <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="2">
                            <span class="u-radio__label">微信支付</span>
                        </label>
                        <label class="u-radio" :class="{ischecked:payWay2==3}">
                            <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="3">
                            <span class="u-radio__label">余额支付</span>
                            <div class="desc1">余额：<span class="im">1000</span></div>
                            <div class="desc2">余额充足可支付</div>
                        </label>
                    </div>
                </div>
                <div class="form-item pay-all">
                    <label class="u-checkbox">
                        <span class="u-checkbox__input">
                            <span class="u-checkbox__inner" :class="{ischecked:isAgree}"></span>
                            <input v-model="isAgree" type="checkbox" class="u-checkbox__original" value="">
                        </span>
                        <span class="u-checkbox__label">已阅读并同意<a class="link" target="_blank" href="javascript:;">《支付协议》</a></span>
                    </label>
                </div>
                <div class="form-item valid">
                    <h3 class="title">手机验证</h3>
                    {{phone}}
                    <div class="validcode-wrapper">
                        <div class="validcode">
                            <input class="u-input" type="text" maxlength="6" v-model="validCode3" placeholder="验证码">
                            <i class="icon icon-valid-success"></i>
                        </div>
                        <button class="btn" @click="getEditPwdValidCode">{{codeBtnTxt}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="g-footer-mobile">
            <button class="btn" @click="handleSubmit">确定</button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      payWay2: 3,
      isAgree: true,
      m_presell_price:0.00,
      m_payWay1:"",
      m_devType:"",
      codeBtnTxt:"获取验证码",
      userInfo:{}
    };
  },
  computed:{
      phone:function(){
          return this.$store.state.userInfo.phone.substr(0,3) + "****" + this.$store.state.userInfo.phone.substr(7);
      }
  },
  mounted(){
      this.init_get_orderinfo();
      this.getUserInfo();
  },
  methods:{
      handleSubmit(){
          this.$router.push('/paysuccess');
      },
        //获取用户余额
        getUserInfo(){
            var _this = this;
            request("com.iiding.common.user.get_user_detail",{},res => {
                if(res.code == "success"){
                    _this.userInfo = res.data;
                    setTimeout(function(){
                        var num = Number(_this.userInfo.current_coin) - Number(_this.pay_money);
                        if(num > 0){
                            _this.commit_pay = false;
                        }else{
                            _this.commit_pay = true;
                        }
                    },300);
                }
            })
        },
      //初始化获取session中缓存的数据
      init_get_orderinfo(){
        //获取开发价格
        var m_presell_price = sessionStorage.getItem("m_presell_price");
        this.m_presell_price = m_presell_price;
        //获取支付选项
        var m_payWay1 = sessionStorage.getItem("m_payWay1");
        this.m_payWay1 = m_payWay1;
        //获取开发类型
        var m_devType = sessionStorage.getItem("m_devType");
        this.m_devType = m_devType;
      },
       //校验验证码
    onEditPwdCodeChange() {
      let reg = /^\d{6}$/;
      if (reg.test(this.validCode3)) {
        request(
          "com.iiding.common.user.user_phone_check",
          {
            phone: this.userInfo.phone,
            verify_code: this.validCode3
          },
          res => {
            if (res.code == "success") {
                this.commit_pay_button();
            } else {
              this.$message.error("请输入正确的验证码");
            }
          }
        );
      } else {
          this.$message.error("请输入正确的验证码");
      }
    },
    //获取验证码
    getEditPwdValidCode() {
      if (this.codeBtnTxt != "获取验证码") {
        return;
      }
      let reg1 = /^1\d{10}$/;
      console.log(this.userInfo.phone);
      if (!reg1.test(this.userInfo.phone)) {
        this.$message.error("请输入正确的手机号");
        return;
      }
      request(
        "com.iiding.common.user.verify_code",
        { phone: this.userInfo.phone },
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
    //余额支付确认支付
    commit_pay_button(){
        var _this = this;
        var postData = {};
        var projectid = sessionStorage.getItem("select_projectid");
        postData.projectid = projectid;
        //支付方式
        if(_this.payWay2 == 3){
            postData.pay_method = 1;
        }else if(_this.payWay2 == 2){
            postData.pay_method = 2;
        }else{
            postData.pay_method = 3;
        }
        //操作类型，1预报名，2支付尾款，3支付全额
        if(_this.payWay1 == 1){
            postData.op = "participate";
        }else if(_this.payWay1 == 2){
            var id = sessionStorage.getItem("my_projectid");

            postData.op = "signing";
            postData.quota_number = _this.devType;
            postData.pay_type = 1;
            postData.id = id;
        }else{
            postData.op = "signing";
            postData.quota_number = _this.devType;
            postData.pay_type = 2;
        }
        request("com.iiding.web.personal_center.user_project.add_project",postData,res => {
            if(res.code == "success"){
                _this.$router.push("/paysuccess");
             }else{
                 var msg = res.msg;
                _this.$message.error(msg);
             }
         })
    },

  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/vars.scss";
.main {
  padding: 47px 0 55px;
  .form {
    .form-item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .lb {
        font-size: 12px;
        color: #333333;
      }
      .disp-txt {
        &.im {
          color: $front-color;
        }
      }
      &.pay-all {
        margin: 15px 14px;
      }
      &.methods {
        background: #ffffff;
        .u-radio-group1 {
          width: 100%;
          flex-direction: column;
          .u-radio {
            border-bottom: 1px solid #e7e7e7;
            flex-direction: row;
            padding: 15px 14px 15px 24px;
            box-sizing: border-box;
            .desc1 {
              font-size: 11px;
              align-self: flex-end;
              margin-left: 15px;
              color: #999999;
              .im {
                color: $front-color;
              }
            }
            .desc2 {
              font-size: 11px;
              margin-left: 15px;
              color: #999999;
              flex: 1;
              text-align: right;
            }
            & + .u-radio {
              margin-left: 0;
            }
          }
        }
      }
      &.valid {
        background: #ffffff;
        padding: 10px 18px 18px;
        box-sizing: border-box;
        flex-direction: column;
        align-items: flex-start;
        .title {
          margin: 0;
          font-size: 14px;
          line-height: 17px;
          font-weight: normal;
          margin-bottom: 15px;
        }
        .u-input {
          width: 100%;
          background: #F4F4F4;
          &:focus{
              background: #ffffff;
          }
        }
        .validcode-wrapper {
          margin-top: 20px;
          width: 100%;
          display: flex;
          .validcode{
              flex:1;
              position: relative;
              .icon{
                  width: 14px;
                  height: 14px;
                  position: absolute;
                  top: 50%;
                  right: 12px;
                  transform: translateY(-50%);
                  &.icon-valid-success{
                      background: url('//pic.iidingyun.com/1000//file/20181123/75605.png') no-repeat;
                      background-size: contain;
                  }
                  &.icon-valid-error{
                      background: url('//pic.iidingyun.com//file/20181123/75606.png') no-repeat;
                      background-size: contain;
                  }
              }
          }
          .btn {
            width: 102px;
            height: 40px;
            line-height: 40px;
            background: rgba(255, 255, 255, 1);
            border-radius: 2px;
            border: 1px solid #D9D9D9;
            color: #666666;
            margin-left: 14px;
          }
        }
      }
    }
  }
}

.g-footer-mobile {
  justify-content: center;
  .btn {
    width: 275px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: $front-color;
    color: #ffffff;
    font-size: 16px;
  }
}
</style>
