<template>
    <div class="proj-wrapper">
        <ul class="u-tabpanel2">
            <li class="item" :class="{active:tab==0}" @click="changeTab(0)">预报名项目</li>
            <li class="item" :class="{active:tab==1}" @click="changeTab(1)">预售开发项目</li>
            <li class="item" :class="{active:tab==2}" @click="changeTab(2)">定制开发项目</li>
        </ul>
        <div v-show="tab==0" class="proj-list">
            <ul class="proj-list-inner">
                <li class="item" :key="index" v-for="(item,index) in project_list1">
                    <div class="basic">
                        <div class="item-field">
                            <div class="lb">项目名称：</div>
                            <div class="disp-txt">{{item.project_name}}</div>
                        </div>
                        <div class="item-field">
                            <div class="lb">报名时间：</div>
                            <div class="disp-txt">{{item.participation_time}}</div>
                        </div>
                        <div class="item-field" v-if="item.status == 1">
                            <div class="lb">开发均摊费：</div>
                            <div class="disp-txt im">{{item.presell_price}}</div>
                            <div class="disp-txt del">开发总费：{{item.dev_sum_money}}</div>
                        </div>
                        <div class="item-field" v-if="item.status == 2">
                            <div class="lb">开发尾款：</div>
                            <div class="disp-txt im">{{item.dev_tail_money}}</div>
                            <div class="disp-txt del">开发总费：{{item.dev_sum_money}}</div>
                        </div>
                        <div class="item-field" v-if="item.status == 3">
                            <div class="disp-txt del">恭喜，你已获得预售名额</div>
                        </div>
                        <div class="tools" v-if="item.status == 1">
                            <button class="btn" @click="go_to_pay(item,1)">预报名参与</button>
                            <a class="link" href="javascript:;" @click="remove_concerns(item.projectid)">取消关注</a>
                            <a class="link active" href="javascript:;">项目进度</a>
                        </div>
                        <div class="tools" v-if="item.status == 2">
                            <button class="btn" @click="go_to_pay(item,2)">支付尾款</button>
                            <a class="link" href="javascript:;">已预报名</a>
                            <a class="link active" href="javascript:;">项目进度</a>
                        </div>
                        <div class="tools" v-if="item.status == 3">
                            <button class="btn">支付完成</button>
                            <a class="link" href="javascript:;">支付完成</a>
                            <a class="link active" href="javascript:;">项目进度</a>
                        </div>
                    </div>
                    <div class="other">
                        <span class="no">{{item.residue_count}}</span>
                        <span class="deadline">报名截止时间 {{item.presell_finish_time}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div v-show="tab==1" class="proj-list proj-list2">
            <ul class="proj-list-inner">
                <li class="item" :key="index" v-for="(item,index) in project_list1">
                    <div class="basic">
                        <div class="item-field">
                            <div class="lb">项目名称：</div>
                            <div class="disp-txt">{{item.project_name}}</div>
                        </div>
                        <div class="item-field">
                            <div class="lb">签约时间：</div>
                            <div class="disp-txt">{{item.sign_time}}</div>
                        </div>
                        <div class="tools">
                            <a class="link active" :href="item.development_details">开发明细</a>
                            <a class="link active" href="javascript:;">项目进度</a>
                            <a class="link active" :href="item.development_contract">预览合同</a>
                            <a class="link green" :href="item.personalized_demand">个性化需求</a>
                        </div>
                    </div>
                    <div class="other pre-proj">
                        <span class="deadline">开发截止时间 {{item.dev_end_time}}</span>
                    </div>
                </li>

            </ul>
        </div>  
        <div v-show="tab==2" class="custom-proj">
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
</template>

<script>
import { request,SITEID } from "../../api/api";
export default {
  data() {
    return {
      plans:[],
      tab: 0,
      project_list1:[],
      projectid:"",
      options: [
        {
          projectid: "选项1",
          project_name: "拼多多开发平台"
        },
        {
          projectid: "选项2",
          project_name: "拼多多开发平台"
        },
        {
          projectid: "选项3",
          project_name: "拼多多开发平台"
        },
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
        location.href="/#/order/" + project.projectid + "/0/" + 0;
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
@import "../../styles/vars.scss";
.proj-wrapper{
    background: #ffffff;
    box-shadow:2px 2px 6px 2px rgba(0,0,0,0.05);
    .proj-list {
    .proj-list-inner {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        .item {
        background: rgba(255, 255, 255, 1);
        border-radius: 2px;
        border: 1px solid #ffbc9e;
        display: flex;
        justify-content: space-between;
        padding: 25px 10px 25px 30px;
        box-sizing: border-box;
        transition: border ease 0.2s;
        .basic {
            flex: 1;
            .item-field {
            display: flex;
            &:first-child {
                margin-top: 5px;
            }
            & + .item-field {
                margin-top: 30px;
            }
            .lb {
                font-size: 16px;
                color: #333333;
            }
            .disp-txt {
                font-size: 16px;
                color: #666666;
                &.im {
                color: $front-color;
                }
                &.del {
                color: #999999;
                text-decoration: line-through;
                margin-left: 26px;
                }
            }
            }
            .tools {
            width: 90%;
            padding: 20px;
            box-sizing: border-box;
            background: #f2f2f2;
            margin-top: 30px;
            display: flex;
            align-items: flex-end;
            .btn {
                height: 40px;
                line-height: 40px;
                background: $front-color;
                color: #ffffff;
                font-size: 16px;
                padding: 0 45px;
            }
            .status {
                font-size: 16px;
                color: rgba(153, 153, 153, 1);
                line-height: 20px;
                margin-left: 50px;
            }
            .link {
                font-size: 16px;
                color: rgba(153, 153, 153, 1);
                line-height: 20px;
                margin-left: 30px;
                transition: color ease 0.2s;
                &.active {
                color: $front-color;
                }
                &:hover {
                color: rgba(255, 80, 0, 0.8);
                }
                &.green {
                color: rgba(25, 220, 228, 1);
                &:hover {
                    color: rgba(25, 220, 228, 0.8);
                }
                }
                &.disabled {
                color: rgba(153, 153, 153, 1);
                cursor: default;
                }
            }
            }
        }
        .other {
            width: 420px;
            height: 231px;
            background: url("//pic.iidingyun.com/1000//file/20181127/75701.png")
            no-repeat;
            position: relative;
            .no {
                position: absolute;
                display: inline-block;
                width: 80px;
                text-align: center;
                align-items: center;
                left: 77px;
                top: 70px;
                font-size: 50px;
                font-family: MyFont;
                font-weight: bold;
                color: white;
                line-height: 82px;
                text-shadow: 0px 3px 8px rgba(0, 0, 0, 0.26);
            }
            .deadline {
            position: absolute;
            left: 50%;
            bottom: 20px;
            transform: translateX(-50%);
            width: 167px;
            font-size: 14px;
            color: rgba(255, 255, 255, 1);
            line-height: 18px;
            }
            &.pre-proj {
            width: 382px;
            height: 143px;
            background: url("//pic.iidingyun.com//file/20181127/75712.png")
                no-repeat;
            }
        }
        &:hover {
            border-color: $front-color;
        }
        & + .item {
            margin-top: 30px;
        }
        }
    }
    &.proj-list2 .basic .tools .link:first-child {
        margin-left: 0;
    }
    }

    .custom-proj {
    .title {
        font-size: 16px;
        font-weight: bold;
        color: $front-color;
        line-height: 20px;
        padding: 0 40px;
        margin: 30px 0;
        box-sizing: border-box;
    }
    .tools {
        display: flex;
        align-items: flex-end;
        padding: 0 40px;
        margin: 30px 0;
        box-sizing: border-box;
        position: relative;
        .link {
        font-size: 16px;
        color: $front-color;
        line-height: 20px;
        margin-left: 30px;
        }
        .el-select{
            width: 400px;
        }
        .contact{
            display: flex;
            align-items: center;
            position: absolute;
            right:72px;
            top:0;
            .icon{
                width:30px;
                height: 30px;
                background: url('//pic.iidingyun.com//file/20181127/75714.png') no-repeat;
            }
            .txt{
                font-size:14px;
                color:rgba(102,102,102,1);
                line-height:18px;
                margin-left: 12px;
            }
        }
    }
    }

    .plan_table {
    border-left: 2px solid #e7e7e7;
    margin: 30px 0px 0px 80px;
    padding: 25px 0px 0px 25px;
    .item {
        position: relative;
        .option {
        position: absolute;
        display: flex;
        height: 12px;
        transform: translate(-112px, 4px);
        background: transparent;
        .words {
            height: 12px;
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
            // margin-top: -5px;
            margin-right: 10px;
            text-align: right;
            width: 70px;
        }
        .circle {
            width: 8px;
            height: 8px;
            border: 2px solid $front-color;
            border-radius: 50%;
            background: #ffffff;
        }
        }
        .word {
        width: 664px;
        font-size: 14px;
        line-height: 21px;
        }
        .imgs_box {
        width: 664px;
        //   margin: 0px auto 30px;
        margin-bottom: 30px;
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

}
</style>
