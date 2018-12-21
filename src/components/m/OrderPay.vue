<template>
    <div>
        <h1 class="g-title-mobile"><i class="icon-back" onclick="history.back()"></i>支付</h1>
        <div class="main">
            <div class="form">
                <div class="form-item pay-all">
                    <div class="lb">全额支付：</div>
                    <div class="disp-txt im">{{presell_price}}</div>
                </div>
                <div class="form-item methods">
                    <div class="u-radio-group1"> 
                        <label class="u-radio" :class="{ischecked:payWay2==1}">
                            <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="1" @change="changePayType">
                            <span class="u-radio__label">支付宝支付</span>
                        </label>
                        <label class="u-radio" :class="{ischecked:payWay2==2}">
                            <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="2" @change="changePayType">
                            <span class="u-radio__label">微信支付</span>
                        </label>
                        <label class="u-radio" :class="{ischecked:payWay2==3}">
                            <input v-model="payWay2" class="u-radio__original" type="radio" tabindex="-1" value="3" @change="changePayType"> 
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
      presell_price:0.00,
      payWay1:"",
      devType:"",
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
          if(this.m_product_type == 2){
                this.onEditPwdCodeChange2();
          }else{
              this.onEditPwdCodeChange();
          }
      },
      //改变支付方式
      changePayType(){
          if(this.m_product_type == 2){
                this.change_pay_method2();
          }else{
              this.change_pay_method();
          }
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
        this.presell_price = m_presell_price;
        //获取支付选项
        var m_payWay1 = sessionStorage.getItem("m_payWay1");
        this.payWay1 = m_payWay1;
        //获取开发类型
        var m_devType = sessionStorage.getItem("m_devType");
        this.devType = m_devType;
        //获取开发类型
        var m_product_type = sessionStorage.getItem("m_product_type");
        this.product_type = m_product_type; 
      },
    //改变支付方式
    change_pay_method(){
        var _this = this;
        if(_this.payWay2 == 1){
            var current_coin = Number(_this.userInfo.current_coin);
            var pay_money = Number(_this.pay_money);
            var num = current_coin - pay_money;
            if(num > 0){
                _this.commit_pay = false;
            }else{
                _this.commit_pay = true;
            }
            _this.showPhoneValidCode = true;
            _this.showAlipayQrcode = false;
            _this.showWxpayQrcode = false;
          }else if(_this.payWay2 == 2){
            _this.commit_pay = false;
            _this.showPhoneValidCode = false;
            _this.showWxpayQrcode = false;
            var loading = _this.$loading({
                lock: true,
                text: '正在拉起支付...',
            });
            var postData = {};
            if(_this.payWay1 == 1){
                postData.op = "participate";
            }else if(_this.payWay1 == 2){
                postData.op = "signing";
                postData.pay_type = 2;
                postData.id = _this.my_project_id;
            }else{
                postData.op = "signing";
                postData.pay_type = 1;
            }
            postData.pay_method = "alipayweb";
            var projectid = sessionStorage.getItem("select_projectid");
            postData.projectid = projectid;
            postData.quota_number = _this.devType;
             console.log("参数",postData);
            request("com.iiding.web.personal_center.money_manage.pay_interface",postData,res => {
                console.log("返回值",res);
                if(res.payinfo){
                    loading.close();
                    _this.order_number = res.tradeno;
                    _this.qr_code = "http://iidingyun.com/barcodeImage.do?text=" + res.payinfo;
                    _this.showAlipayQrcode = true;
                    _this.get_payResult();
                }else{
                    loading.close();
                    _this.showAlipayQrcode = false;
                    var msg = res.msg;
                    _this.$message.error(msg)
                }
            })
          }else{
                _this.commit_pay = false;
                _this.showPhoneValidCode = false;
                _this.showAlipayQrcode = false;
                var loading = _this.$loading({
                    lock: true,
                    text: '正在拉起支付...',
                });
                var postData = {};
                if(_this.payWay1 == 1){
                    postData.op = "participate";
                }else if(_this.payWay1 == 2){
                    postData.op = "signing";
                    postData.pay_type = 2;
                    postData.id = _this.my_project_id;
                }else{
                    postData.op = "signing";
                    postData.pay_type = 1;
                }
                postData.pay_method = "wxweb";
                var projectid = sessionStorage.getItem("select_projectid");
                postData.projectid = projectid;
                postData.quota_number = _this.devType;
                console.log("参数",postData);
                request("com.iiding.web.personal_center.money_manage.pay_interface",postData,res => {
                    console.log("返回值",res);
                    if(res.payinfo){
                        loading.close();
                        _this.order_number = res.tradeno;
                        _this.qr_code = "http://iidingyun.com/barcodeImage.do?text=" + res.payinfo;
                        _this.showWxpayQrcode = true;
                        _this.get_payResult();
                    }else{
                        loading.close();
                        _this.showWxpayQrcode = false;
                        var msg = res.msg;
                        _this.$message.error(msg)
                    }
                   
                })
          }
    },
    //改变支付方式
    change_pay_method2(){
        var _this = this;
        if(_this.payWay2 == 1){
            var current_coin = Number(_this.userInfo.current_coin);
            var pay_money = Number(_this.pay_money);
            var num = current_coin - pay_money;
            if(num > 0){
                _this.commit_pay = false;
            }else{
                _this.commit_pay = true;
            }
            _this.showPhoneValidCode = true;
            _this.showAlipayQrcode = false;
            _this.showWxpayQrcode = false;
          }else if(_this.payWay2 == 2){
            _this.commit_pay = false;
            _this.showPhoneValidCode = false;
            _this.showWxpayQrcode = false;
            var loading = _this.$loading({
                lock: true,
                text: '正在拉起支付...',
            });
            var postData = {};
            var projectid = sessionStorage.getItem("select_projectid");
            postData.projectid = projectid;
            //支付方式
            postData.pay_method = "alipayweb";
            if(_this.tcps == 0){
                postData.purchase_customized_type = 1;
            }else if(_this.tcps == 1){
                postData.purchase_customized_type = 2;
            }else{
                postData.purchase_customized_type = 3;
                postData.quota_number = _this.num1;
            }  
             console.log("参数",postData);
            request("com.iiding.web.personal_center.money_manage.purchase_customized_project_pay",postData,res => {
                console.log("返回值",res);
                if(res.payinfo){
                    loading.close();
                    _this.order_number = res.tradeno;
                    _this.qr_code = "http://iidingyun.com/barcodeImage.do?text=" + res.payinfo;
                    _this.showAlipayQrcode = true;
                    _this.get_payResult();
                }else{
                    loading.close();
                    _this.showAlipayQrcode = false;
                    var msg = res.msg;
                    _this.$message.error(msg)
                }
            })
          }else{
                _this.commit_pay = false;
                _this.showPhoneValidCode = false;
                _this.showAlipayQrcode = false;
                var loading = _this.$loading({
                    lock: true,
                    text: '正在拉起支付...',
                });
                var postData = {};
                var projectid = sessionStorage.getItem("select_projectid");
                postData.projectid = projectid;
                //支付方式
                postData.pay_method = "wxweb";
                if(_this.tcps == 0){
                    postData.purchase_customized_type = 1;
                }else if(_this.tcps == 1){
                    postData.purchase_customized_type = 2;
                }else{
                    postData.purchase_customized_type = 3;
                    postData.quota_number = _this.num1;
                }  
                console.log("参数",postData);
                request("com.iiding.web.personal_center.money_manage.purchase_customized_project_pay",postData,res => {
                    console.log("返回值",res);
                    if(res.payinfo){
                        loading.close();
                        _this.order_number = res.tradeno;
                        _this.qr_code = "http://iidingyun.com/barcodeImage.do?text=" + res.payinfo;
                        _this.showWxpayQrcode = true;
                        _this.get_payResult();
                    }else{
                        loading.close();
                        _this.showWxpayQrcode = false;
                        var msg = res.msg;
                        _this.$message.error(msg)
                    }
                   
                })
          }
    },
    //获取支付结果
    get_payResult: function () {
        this.payDialogVisible++;
        console.log("payDialogVisible",this.payDialogVisible);
        var _this = this;
        var url = "com.iiding.web.personal_center.money_manage.get_order_info";
        var param = {order_number:_this.order_number};
        request(url, param, result => {
            console.log("get_payResult",result);
            if (result.code == "order_not_exist"){

            }else if(result.code == 'success') {
                 _this.$router.push("/paysuccess");
                 return true;
            }else{
                _this.$message({ type: 'error', message: "支付失败"});
            }
            if(_this.payDialogVisible >= 180){
                _this.payDialogVisible = false;
                _this.$message({ type: 'error', message: "支付失败"});
                setTimeout(function(){
				    _this.$router.push('/home');
			    },1000)
                return false;
            }
            setTimeout(function(){
                _this.get_payResult();
            },1200)
        });
    },
    //二次预售校验验证码
    onEditPwdCodeChange2(){
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
                this.purchase_customized_project();
            } else {
              this.$message.error("请输入正确的验证码");
            }
          }
        );
      } else {
          this.$message.error("请输入正确的验证码");
      }
    },
    //余额支付，购买二次预售项目
    purchase_customized_project(){
        var _this = this;
        var postData = {};
        var projectid = sessionStorage.getItem("select_projectid");
        postData.projectid = projectid;
        //支付方式
        postData.pay_method = 3;
        if(_this.tcps == 0){
            postData.purchase_customized_type = 1;
        }else if(_this.tcps == 1){
            postData.purchase_customized_type = 2;
        }else{
            postData.purchase_customized_type = 3;
            postData.quota_number = _this.num1;
        }  
        request("com.iiding.web.personal_center.user_project.purchase_customized_project",postData,res => {
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
