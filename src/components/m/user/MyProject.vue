<template>
  <div>
    <ul class="u-tabpanel2">
      <i class="icon-back" onclick="history.back()"></i>
      <li class="item" :class="{active:tab==0}" @click="changeTab(0)">预报名项目</li>
      <li class="item" :class="{active:tab==1}" @click="changeTab(1)">开发项目</li>
      <li class="item" :class="{active:tab==2}" @click="changeTab(2)">定制项目</li>
    </ul>
    <div class="main">
      <div v-show="tab==0">
        <ul class="proj-list">
          <li class="form" :key="index" v-for="(item,index) in project_list1">
            <div class="form-item">
              <span class="lb">商品名称：</span>
              <span class="disp-txt">{{item.project_name}}</span>
            </div>
            <div class="form-item">
              <span class="lb">报名时间：</span>
              <span class="disp-txt">{{item.participation_time}}</span>
            </div>
            <div class="form-item" v-if="item.status == 1">
              <span class="lb">开发均摊费用：</span>
              <span class="disp-txt">
                <span class="im">{{item.presell_price}}</span>
                <span class="del">开发总费：{{item.dev_sum_money}}</span>
              </span>
            </div>
            <div class="form-item" v-if="item.status == 2">
              <span class="lb">开发尾款：</span>
              <span class="disp-txt">
                <span class="im">{{item.dev_tail_money}}</span>
                <span class="del">开发总费：{{item.dev_sum_money}}</span>
              </span>
            </div>
            <div class="form-item" v-if="item.status == 3">
                  <div class="disp-txt del">恭喜，你已获得预售名额</div>
            </div>
            <div class="form-tool" v-if="item.status == 1">
              <button class="btn active" @click="go_to_pay(item,1)">预报名参与</button>
              <button class="btn">项目进度</button>
              <span style="flex:1"></span>
              <button class="btn small" @click="remove_concerns(item.projectid)">取消关注</button>
            </div>
            <div class="form-tool" v-if="item.status == 2">
              <button class="btn active" @click="go_to_pay(item,2)">支付尾款</button>
              <button class="btn">项目进度</button>
              <span style="flex:1"></span>
            </div>
            <div class="form-tool" v-if="item.status == 3">
              <button class="btn active" >支付完成</button>
              <button class="btn">项目进度</button>
              <span style="flex:1"></span>
            </div>
          </li>
        </ul>
      </div>
      <div v-show="tab==1">
        <ul class="proj-list">
          <li class="form" :key="index" v-for="(item,index) in project_list1">
            <div class="form-item">
              <span class="lb">商品名称：</span>
              <span class="disp-txt">{{item.project_name}}</span>
            </div>
            <div class="form-item">
              <span class="lb">签约时间：</span>
              <span class="disp-txt">{{item.sign_time}}</span>
            </div>
            <div class="form-item">
              <span class="lb">开发截止时间：</span>
              <span class="disp-txt">
                <span class="im">{{item.dev_end_time}}</span>
                <!-- <span class="del">开发总费：6000</span> -->
              </span>
            </div>
            <div class="form-tool">
              <button class="btn2"><a class="link active" :href="item.development_details">开发明细</a></button>
              <button class="btn2 active"><a class="link active" href="javascript:;">项目进度</a></button>
              <button class="btn2 active"><a class="link active" :href="item.development_contract">预览合同</a></button>
              <span style="flex:1"></span>
              <button class="btn2 green"> <a class="link green" :href="item.personalized_demand">个性化需求</a></button>
            </div>
          </li>
        </ul>
      </div>
      <div v-show="tab==2" class="plan_table-wrapper">
                    <div class="tools">
                <el-select v-model="projectid" placeholder="请选择" @change="get_project_plans">
                    <el-option
                    v-for="item in options"
                    :key="item.projectid"
                    :label="item.project_name"
                    :value="item.projectid">
                    </el-option>
                </el-select>
                <a class="link" href="javascript:;">预览合同</a>
                <a class="contact" href="#/chat" target="_blank">
                    <i class="icon"></i>
                    <div class="txt">联系客服，提交个性化需求</div>
                </a>
            </div>
            <h3 class="title">项目进度</h3>
            <div class="plan_table">
                <ul>
                    <li class="item" v-for="item in plans" :key="item.id">
                        <div class="option">
                            <div class="words">{{item.create_date}}</div>
                            <div class="circle"></div>
                        </div>
                        <div class="word">
                            {{item.plan_content}}
                        </div>
                        <div class="imgs_box">
                            <img  v-for="(its,index) in item.plan_picture" :key="index" :src="its" alt="" class="imgs">
                        </div>
                    </li>
                </ul>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request,SITEID } from "../../../api/api";
export default {
  data() {
    return {
            plans:[],
      tab: 0,
      project_list1:[],
      projectid:"",
      options: [
        {
          "projectid":-0.01,
          "project_name":"请选择"
        }
        
      ]
    };
  },
   mounted:function(){
    this.get_my_project();
  },
  methods: {
    changeTab(i) {
      this.tab = i;
      this.get_my_project();
    },
    //查询我的项目
    get_my_project:function(){
      var _this = this;
      var project_status = 0;
      if(this.tab == 0){
        project_status = 0;
      }else if(this.tab == 1){
        project_status = 1;
      }else{
        project_status = 2;
      }
      request("com.iiding.web.personal_center.user_project.query_user_project",{"project_status":project_status},res => {
        if(res.code == "success"){
          _this.project_list1 = res.data;
          console.log("dad",_this.project_list1);
          if(_this.tab == 2){
              _this.options = res.data;
              if(res.data != [] && res.data.length > 0){
                  _this.projectid = res.data[0].projectid;
              }else{
                  _this.projectid = -0.01;
              }
              _this.get_project_plans()
          }
        }
      })
    },
    //去支付页面
    go_to_pay:function(project,i){
        sessionStorage.setItem("select_projectid",project.projectid);
        sessionStorage.setItem("my_projectid",project.id);
        sessionStorage.setItem("select_type",i);
        location.href="/#/morder/" + project.projectid + "/0/" + 0;
    },
    //取消关注
    remove_concerns:function(projectid){
        var _this = this;
        request("com.iiding.web.personal_center.user_project.delete_project",{"projectid":projectid},result => {
            if(result.code == "success"){
                _this.$message.success("取消成功");
                _this.get_my_project();
            }else{
                var msg = result.msg;
                _this.$message.success(msg);
            }
        }) 

    },
    //根据项目id查询项目进度
    get_project_plans:function(){
        var _this = this;
        request("com.iiding.admin.project_plans.select",{"shopid":_this.projectid},result => {
            if(result.code == "success"){
                _this.plans = result.list;
                _this.plans.forEach(function(ele){
                    ele.plan_picture = ele.plan_picture.split(",");
                    ele.create_date = ele.create_date.substring(5);
                })
                // console.log(_this.plans)
            }
        })    
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

.main {
  padding-top: 47px;
  .proj-list {
    .form {
      padding: 11px 14px;
      box-sizing: border-box;
      margin-top: 15px;
      background: #ffffff;
      position: relative;
      .form-item {
        & + .form-item {
          margin-top: 15px;
        }
        .lb {
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          line-height: 17px;
        }
        .disp-txt {
          font-size: 14px;
          color: #999999;
          .im {
            color: $front-color;
          }
          .del {
            text-decoration: line-through;
          }
        }
      }
      .form-tool {
        border-top: 1px solid rgba(231, 231, 231, 1);
        display: flex;
        padding: 15px 0 6px;
        box-sizing: border-box;
        margin-top: 15px;
        .btn {
          height: 30px;
          line-height: 30px;
          background: #ffffff;
          border-radius: 15px;
          font-size: 14px;
          padding: 0 20px;
          box-sizing: border-box;
          color: #666666;
          &.active {
            background: $front-color;
            color: #ffffff;
          }
          &.small {
            font-size: 12px;
            color: #999999;
            padding: 0;
          }
        }
        .btn2 {
          background: #f5f5f5;
          height: 22px;
          line-height: 22px;
          font-size: 13px;
          color: rgba(51, 51, 51, 1);
          padding: 0 5px;
          &.active {
            color: $front-color;
          }
          &.green {
            background: transparent;
            color: #19dce4;
          }
          & + .btn2 {
            margin-left: 15px;
          }
        }
      }
      .tips {
        width: 75px;
        position: absolute;
        right: 14px;
        top: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        color: $front-color;
        .txt {
          line-height: 14px;
          text-align: center;
        }
      }
    }
  }

  .plan_table {
    border-left: 2px solid #e7e7e7;
    margin: 30px 0px 0px 39px;
    padding: 25px 0px 0px 25px;
    .item {
      position: relative;
      .option {
        position: absolute;
        display: flex;
        height: 12px;
        transform: translate(-112px, 4px);
        background: #ffffff;
        .words {
          height: 12px;
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
          margin-top: 0;
          margin-right: 10px;
          text-align: right;
          width: 70px;
        }
        .circle {
          width: 8px;
          height: 8px;
          border: 2px solid $front-color;
          border-radius: 50%;
        }
      }
      .word {
        width: 664px;
        font-size: 14px;
        line-height: 21px;
      }
      .imgs_box {
        width: 664px;
        margin: 0px auto 30px;
        display: flex;
        flex-flow: wrap;
        .imgs {
          width: 100px;
          height: 100px;
          margin-right: 30px;
          margin-top: 20px;
        }
      }
    }
    .item:last-child {
      margin-bottom: -20px;
    }
  }

  .plan_table {
    background: #ffffff;
    margin: 0px 0px 0px 39px;
    padding: 5px 0px 0px 21px;
    .item {
      .word {
        width: 100%;
        font-size: 14px;
        line-height: 21px;
        color: #666666;
      }
      .imgs_box {
        width: 100%;
        .imgs {
          margin-right: 24px;
          margin-top: 12px;
        }
      }
      .option {
        .words {
          width: 79px;
          margin-top: 0;
          margin-right: 5px;
        }
      }
    }
  }

  .plan_table-wrapper{
    background: #ffffff;  
    margin-top: 10px;
  }
}
</style>
