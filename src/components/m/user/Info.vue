<template>
    <div>
        <h1 class="g-title-mobile"><i class="icon-back" onclick="history.back()"></i>我的资料</h1>
        <div class="main">
            <ul class="menu">
                <li class="item">
                    <span>我的账号：1234455</span>
                </li>
                <li class="item avator-wrapper">
                    <img class="avator" src="http://pic.iidingyun.com/1000//file/20181127/75713.png" alt="">
                    <span class="lb">修改头像</span>
                    <span style="flex:1"></span>
                    <span class="disp-txt"></span>
                    <i class="icon-more"></i>
                </li>
                <li class="item" @click="toEditNick">
                    <span class="lb">修改昵称</span>
                    <span style="flex:1"></span>
                    <span class="disp-txt">12345678899</span>
                    <i class="icon-more"></i>
                </li>
                <li class="item" @click="toEditMobile">
                    <span class="lb">修改绑定手机号</span>
                    <span style="flex:1"></span>
                    <span class="disp-txt">12345678899</span>
                    <i class="icon-more"></i>
                </li>
                <li class="item">
                    <span class="lb">修改登陆密码</span>
                    <span style="flex:1"></span>
                    <span class="disp-txt"></span>
                    <i class="icon-more"></i>
                </li>
                <li class="item">
                    <span class="lb">实名认证</span>
                    <span style="flex:1"></span>
                    <span class="disp-txt">未认证</span>
                    <i class="icon-more"></i>
                </li>
                <li class="item">
                    <span class="lb">绑定银行卡</span>
                    <span style="flex:1"></span>
                    <span class="disp-txt">未绑定</span>
                    <i class="icon-more"></i>
                </li>
            </ul>
            <button class="btn-logout">退出登陆</button>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        toEditNick(){
            this.$router.push('/muser/editnick');
        },
        toEditMobile(){
            this.$router.push('/muser/editmobile');
        },
    }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/vars.scss";
.main {
  padding-top: 47px;
  .menu {
    background: #ffffff;
    // margin-top: 15px;
    padding: 0 14px;
    padding-top: 5px;
    box-sizing: border-box;
    .item {
      height: 47px;
      line-height: 47px;
      font-size: 14px;
      position: relative;
      display: flex;
      align-items: center;
      .avator {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 12px;
      }
      .icon {
        width: 20px;
        height: 20px;
        margin-right: 15px;
        &.icon-finance {
          background: url("//pic.iidingyun.com/1000//file/20181201/75815.png")
            no-repeat;
          background-size: contain;
        }
        &.icon-project {
          background: url("//pic.iidingyun.com//file/20181201/75816.png")
            no-repeat;
          background-size: contain;
        }
      }
      .icon-more {
        width: 18px;
        height: 32px;
        background: url("//pic.iidingyun.com//file/20181201/75813.png")
          no-repeat center center;
        background-size: 50% 50%;
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
      }
      .lb {
        font-size: 14px;
        color: #999999;
      }
      .disp-txt {
        padding-right: 40px;
      }
      &.avator-wrapper {
        height: 82px;
      }
      & + .item {
        border-top: 1px solid #e7e7e7;
      }
    }
  }
  .btn-logout {
    font-size: 13px;
    color: rgba(153, 153, 153, 1);
    line-height: 15px;
    position: fixed;
    bottom: 66px;
    left: 50%;
    transform: translateX(-50%);
    padding:10px;
    background: transparent;
  }
}
</style>
