<template>
  <div>
    <ul class="u-tabpanel2">
      <i class="icon-back" onclick="history.back()"></i>
      <li class="item" :class="{active:tab==0}" @click="changeTab(0)">预报名项目</li>
      <li class="item" :class="{active:tab==1}" @click="changeTab(1)">开发项目</li>
      <li class="item" :class="{active:tab==2}" @click="changeTab(2)">定制项目</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0
    };
  },
  methods: {
    changeTab(i) {
      this.tab = i;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/vars.scss";
.u-tabpanel2 {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #ffffff;
  z-index: 999;
  position: relative;
  padding-left: 30px;
  box-sizing: border-box;
  .item {
    height: 48px;
    line-height: 50px;
    color: #666666;
    font-size: 14px;
    width: auto;
    flex: 1;
    &.active {
      color: $front-color;
    }
    &::before {
      display: none;
    }
    &.active::after {
      width: 30px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
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
</style>
