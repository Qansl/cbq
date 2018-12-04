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
                    <img class="avator" src="http://pic.iidingyun.com/1000//file/20181127/75713.png" alt="">
                </div>
                <a class="link" href="javascript:;">修改</a>
            </div>
            <div class="u-form-item">
                <div class="lb"><span class="im">*</span>用户昵称：</div>
                <div class="disp-txt">132456789
                    <a class="link" href="javascript:;">修改</a>
                </div>
                <div class="edit-confirm">
                    <input class="u-input nick" type="text">
                    <a class="link green" href="javascript:;">完成</a>
                </div>
            </div>
            <div class="u-form-item">
                <div class="lb">账号：</div>
                <div class="disp-txt">132456</div>
            </div>
            <div class="u-form-item">
                <div class="lb"><span class="im">*</span>绑定手机：</div>
                <div class="disp-txt">123****4567</div>
                <a class="link" href="javascript:;" @click="showPhoneValid">修改</a>
            </div>
            <div class="u-form-item">
                <div class="lb">密码设置：</div>
                <div class="disp-txt">*********</div>
                <a class="link" href="javascript:;">修改</a>
            </div>
            <div class="u-form-item hobby">
                <div class="lb">兴趣爱好：</div>
                <div class="disp-txt hobby-con">
                    <div class="desc">请选择您感兴趣的分类，给您最精准的推荐</div>
                    <div class="hobby-list">
                        <div class="u-checkbox-group1">
                            <label v-for="(item,index) in hobby" :key="index" class="u-checkbox1" :class="{ischecked:item.checked}">
                                <input v-model="item.checked" type="checkbox" tabindex="-1" value="1" class="u-checkbox__original">
                                <span  class="u-checkbox__label">{{item.name}}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="u-form-item">
                <div class="lb">实名认证：</div>
                <div class="disp-txt">你尚未实名认证，请进行实名认证</div>
                <a class="link" href="javascript:;">修改</a>
            </div>
            <div class="u-form-item vertify">
                <div class="lb">实名认证：</div>
                <div class="disp-txt vertify-con">
                    <div class="vertify-item">
                        <span class="vertify-lb">您已经实名认证</span>
                        <a class="link" href="javascript:;">修改认证</a>
                    </div>
                    <div class="vertify-item">
                        <span class="vertify-lb">姓名：</span>
                        <span class="vertify-disp">吕涛</span>
                    </div>
                    <div class="vertify-item">
                        <span class="vertify-lb">身份证号：</span>
                        <span class="vertify-disp">1234*********12354</span>
                    </div>
                </div>
            </div>
            <div class="u-form-item card-wrapper">
                <div class="lb">绑定的银行卡：</div>
                <div class="card-con">
                    <div class="add">
                        <i class="icon-add"></i>
                        <div class="desc">添加银行卡</div>
                    </div>
                    <div class="upload-img">
                        <img class="pic" src="http://pic.iidingyun.com//file/20181120/75487.png" alt="">
                        <a class="link" href="#/user/bindcard">修改</a>
                    </div>
                    <div class="tips">注：提现及充值，只能同卡进出，姓名需与实名认证相同</div>
                </div>
            </div>
        </div>

        <div v-show="tab==1" class="auth-con">
            <div class="steps">
                <div class="item step1 separator" :class="{active:step==1,complete:step>=2}">
                    请阅读特别提示
                </div>
                <div class="item step2 separator" :class="{active:step==2,complete:step>=3}">
                    填写信息资料
                </div>
                <div class="item step3" :class="{active:step==3,complete:step>3}">
                    {{step>3?'认证完成':'等待审核'}}
                </div>
            </div>

            <div class="auth-con-inner" v-show="!(auth.check_status==='0' || auth.check_status=='3')&&(step==1)">
                <div class="step1">
                    <div class="title" style="padding-left:0;height: auto;">*特别提示：</div>
                    <p style="margin-top: 10px;">每个帐号对应一个身份信息，相同身份信息提交多个帐号申请将只通过其中一个。</p>
                    <p>若发现帐号有违规违法行为，或其它形式的恶劣情节，产生后果将由您自行承担！</p>
                    <!-- <p>*后期实名认证与主播认证需逐一独立申请。</p> -->
                </div>
                <button class="btn agree" @click="goTo(1,2)">同意</button>
            </div>

            <div class="auth-con-inner auth-con-inner-step2" v-show="!(auth.check_status==='0' || auth.check_status=='3')&&(step==2)">
                <div class="form-auth-info">
                    <div class="form-item">
                        <span class="lb">填写姓名:</span>
                        <input v-model="auth.realname" class="u-input2 name" type="text" maxlength="10">
                    </div>
                    <div class="form-item">
                        <span class="lb">身份证号:</span>
                        <input v-model="auth.idcard" class="u-input2 card" type="text" maxlength="18">
                    </div>
                    <div class="form-item">
                        <span class="lb">是否为大陆地区:</span>
                        <el-radio-group v-model="auth.is_mainland">
                            <el-radio :label="0" :value="0">是</el-radio>
                            <el-radio :label="1" :value="1">否</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="form-item">
                        <span class="lb" style="align-self:flex-start">上传身份证:</span>
                        <div class="card-wrapper"> 
                           <img class="pic" src="//pic.iidingyun.com/1000//file/20181129/75734.png" alt="">
                        </div>
                        <div class="card-wrapper">
                            <img class="pic" src="//pic.iidingyun.com/1000//file/20181129/75734.png" alt="">
                        </div>
                    </div>
                    <div class="form-item">
                        <span class="lb"></span>
                        <div class="notice">
                            <div class="notice-title"><span class="im">*</span>身份证照将会进行人工审核，务必做到以下几点：</div>
                            <p style="margin-top: 10px;">1.您需要年满18周岁 </p>
                            <p>2.全面：照片内容包含整个身份证面板 </p>
                            <p>3.清晰：身份证文字及图片清晰可见无PS </p>
                            <p>4.格式：小于2MB的jpg、png、bmp等格式的图片</p>
                            <p class="tip">如果有不符，实名认证将被驳回</p>
                        </div>
                    </div>
                    <div class="form-tool">
                        <button class="btn2" @click="goTo(2,1)">上一步</button>
                        <button class="btn2 disabled" @click="goTo(2,3)">下一步</button>
                    </div>
                </div>
            </div>

            <div class="auth-con-inner" v-show="!(auth.check_status==='0' || auth.check_status=='3')&&(step==3)">
                <div class="step3">
                    <img class="pic" src="//pic.iidingyun.com//file/20181129/75730.png" alt="">
                    <div class="desc1">提交成功，等待审核</div>
                    <div class="desc2">预计1-2个工作日完成，请耐心等待</div>
                </div>
            </div>

            <!-- 认证成功 -->
            <div v-show="auth.check_status!='' && (auth.check_status==='0' || auth.check_status=='3')" class="auth-con-inner">
                <div class="step-complete">
                    <img class="pic" src="//pic.iidingyun.com//file/20181129/75733.png" alt="">
                    <div class="desc">审核通过</div>
                </div>	 
                <button class="btn btn3" @click="changeTab(0)">返回个人资料</button>
            </div>

        </div>

        <!-- 手机号验证 -->
        <transition name="dialogfade">
            <div v-show="phoneValidDialogVisible" class="u-dialog-wrapper">
                <div class="u-dialog dialog-login">
                <header class="dialog-title">手机号验证
                    <div class="icon-close" @click="hidePhoneValid"></div>
                </header>
                <section class="dialog-body">
                    <div class="login-wrapper phone-wrapper">
                    <div class="input-wrapper">
                        当前手机号：134****0000
                    </div>
                    <div class="input-wrapper validcode icon-right">
                        <input class="input" type="text" placeholder="验证码" maxlength="6">
                        <i class="icon icon-valid-success"></i>
                        <button class="btn">获取验证码</button>
                    </div>
                    <button class="btn disabled" @click="showPhone">下一步</button>
                    </div>
                </section>
                <footer class="dialog-footer">
                </footer>
                </div>
            </div>
        </transition>
         <!-- 绑定新手机号 -->
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
                <footer class="dialog-footer">
                </footer>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      hobby: [
        {
          name: "电商",
          checked: false
        },
        {
          name: "软件",
          checked: false
        },
        {
          name: "应用",
          checked: false
        },
        {
          name: "游戏",
          checked: false
        },
        {
          name: "平台",
          checked: false
        },
        {
          name: "单页",
          checked: false
        }
      ],
      step: 1,
      auth: {
        phone: "",
        validcode: "",
        realname: "",
        idcard: "",
        is_mainland: 0,
        front_photo: "",
        rear_photo: "",
        typeid: "",
        second_typeid: "",
        third_typeid: "",
        experience: "",
        professional: "",
        certification: [],
        check_status: ""
      },
      authValidCode: {
        txt: "获取验证码",
        interval: null
      },
      phoneValidDialogVisible: false,
      phoneDialogVisible: false
    };
  },
  methods: {
    changeTab(i) {
      this.tab = i;
    },
    goTo: function(_from, _to) {
      var _this = this;
      if (_from == 1) {
      }
      if (_to == 3) {
        _this.step = _to;
        _this.auth.check_status = 1;
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
      this.phoneValidDialogVisible = false;
      this.phoneDialogVisible = true;
    },
    hidePhone() {
      this.phoneDialogVisible = false;
    }
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
      &.avator-wrapper {
        .lb {
          align-self: flex-start;
        }
        .link {
          align-self: flex-end;
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
            .pic {
              width: 278px;
              height: 134px;
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
        .pic {
          width: 260px;
          height: 172px;
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
