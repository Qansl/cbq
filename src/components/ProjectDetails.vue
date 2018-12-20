<template>
    <div>
        <div class="main">
            <div class="intro-container">
                <el-carousel class="cover" height="400px">
                  <el-carousel-item v-for="(item,index) in jsons.pic_list" :key="index">
                      <img  :src="item" alt="" >
                  </el-carousel-item>
                </el-carousel>
                <div class="intro-details">
                    <h2 class="title">{{jsons.shop_title}}</h2>
                    <div class="desc">{{jsons.shop_next_title}}</div>
                    <ul class="stat" :class="{afters:jsons.status != 2}">
                        <li class="item">
                            <div class="lb" v-show="jsons.status != 2">参与费用：</div>
                            <div class="lb" v-show="jsons.status == 2 && tcps != 2">费用：</div>
                            <div class="lb" v-show="jsons.status == 2 && tcps == 2">单价：</div>
                            <div class="num">
                                <span class="unit-price">¥</span>
                                <span v-if="tcps == 0">{{jsons.dev_standard_price}}</span>
                                <span v-else-if="tcps == 1">{{jsons.dev_custom_price}}</span>
                                <span v-else>{{jsons.dev_special_unit_price}}</span>
                            </div>
                        </li>
                        <li class="item" v-show="jsons.status != 2">
                            <div class="lb">参与名额：</div>
                            <div class="num">
                                <span>{{jsons.person_count}}</span>
                                <span class="unit-person">人</span>
                            </div>
                        </li>
                    </ul>
                    <div class="prog-wrapper" v-show="jsons.status != 2">
                        <progress class="u-progress" :value="jsons.plenty" :max="jsons.plenty > 100 ? jsons.plenty : 100"></progress>
                        <ul class="prog-details">
                            <li>
                                <div class="prog">{{jsons.plenty}}%</div>
                                <div class="desc2">完成</div>
                            </li>
                            <li v-show="jsons.status == 0">
                                <div class="prog">{{jsons.pre_count}}人</div>
                                <div class="desc2">预报名人数</div>
                            </li>
                            <li>
                                <div class="prog">{{jsons.date_time}}天</div>
                                <div class="desc2">剩余时间</div>
                            </li>
                        </ul>
                    </div>
                    <div class="special" v-show="jsons.status == 2">
                        <div class="car-list">
                            <div class="cards" :class="{isselect:tcps==0}" @click="changeCards(0)">标准版</div>
                            <div class="cards" :class="{isselect:tcps==1}" @click="changeCards(1)">外观定制</div>
                            <div class="card" :class="{isselect:tcps==2}" @click="changeCards(2)">高级定制
                              <div class="rot"></div>
                            </div>
                            
                        </div>
                        <button class="sales" @click="changeSale(jsons)">购买</button>
                    </div>
                    <div class="tips" v-show="jsons.status == 0">预报名需支付100元报名费（可退）预售成功后再缴纳其他费用</div>
                    <button class="btn" @click="handleOrder(jsons)" v-show="jsons.status == 0">预报名参与</button>
                    <div class="u-share" v-show="jsons.status != 1">
                        <span class="lb">分享到</span>
                        <!-- <ul class="list">
                            <li class="icon icon-weibo"></li>
                            <li class="icon icon-qq"></li>
                            <li class="icon icon-dou"></li>
                            <li class="icon icon-ren"></li>
                            <li class="icon icon-wechat"></li>
                        </ul> -->
                        <div class="bdsharebuttonbox bdshare-button-style0-16">
                            <a href="#" class="bds_more" data-cmd="more"></a>
                            <a href="#" class="bds_qzone" data-cmd="qzone"></a>
                            <a href="#" class="bds_tsina" data-cmd="tsina"></a>
                            <a href="#" class="bds_tqq" data-cmd="tqq"></a>
                            <a href="#" class="bds_renren" data-cmd="renren"></a>
                            <a href="#" class="bds_weixin" data-cmd="weixin"></a>
                        </div>
                    </div>
                    <a class="star" href="javascript:;" v-show="jsons.status == 0 && attentions == 0" @click="attention">关注</a>
                    <a class="starg" href="javascript:;" v-show="jsons.status == 0 && attentions == 1" @click="cancel_attention">已关注</a>
                </div>
            </div>
            <div class="project-details">
                <div class="details-main">
                    <ul id="tabProjectDetails" class="u-tabpanel">
                        <li class="item" :class="{active:tab==0}" @click="changeTab(0)">项目介绍</li>
                        <li class="item" :class="{active:tab==1}" @click="changeTab(1)" v-show="jsons.status != 2">项目回报</li>
                        <li class="item" :class="{active:tab==2}" @click="changeTab(2)">功能说明</li>
                        <li class="item" :class="{active:tab==3}" @click="changeTab(3)" v-show="jsons.status != 2">项目进展</li>
                        <li class="item" :class="{active:tab==4}" @click="changeTab(4)">项目答疑</li>
                        <li class="item" :class="{active:tab==5}" @click="changeTab(5)" v-show="jsons.status == 2">体验中心</li>
                    </ul>
                    <div v-show="tab==0" class="proj-intro" v-html="shop_info.content">
                        <!-- <img src="//pic.iidingyun.com//file/20181122/75576.png" alt=""> -->
                    </div>
                    <div v-show="tab==1 && jsons.status != 2" class="proj-intro" v-html="shop_info.content">
                        
                    </div>
                    <div v-show="tab==2" class="proj-intro" v-html="shop_info.content">
                        
                    </div>
                    <div v-show="tab==3 && jsons.status != 2" class="proj-intro">
                        <div class="summary">
                            这里记录了项目发起人更新的项目进展，您可以提问了解更多项目相关细节。
                        </div>
                        <div class="plan_table">
                            <ul>
                                <li class="item" v-for="item in shop_plan" :key="item.id">
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
                    <div v-show="tab==4" class="proj-intro q-a-wrapper">
                        <ul class="q-a">
                            <li class="item" v-for="item in metor" :key="item.id">
                                <div class="ques">{{item.question}}</div>
                                <div class="answer">{{item.answer}}</div>
                            </li>
                        </ul>
                    </div>
                    <div v-show="tab==5 && jsons.status == 2" class="proj-intro" v-html="shop_info.content">
                    </div>
                </div>
                <aside class="aside">
                    <div class="service-wrapper">
                        <h3 class="title">客服热线</h3>
                        <div class="no">{{contact.web_constract}}</div>
                        <div class="time">周一至周五（09:00-18:00）</div>
                        <div class="tips">* 项目最终解释权归平台所有</div>
                    </div>
                    <div class="m-project">
                        <ul class="list" v-if="jsons.status == 0">
                            <li class="item" v-for="item in list" :key="item.id" >
                              <a class="item-inner" :href="'#/projectdetails/'+item.status + '/' + item.id" @click="preinfo(item)">
                                <div class="cover-wrapper">
                                  <img class="cover" :src="item.shop_piture" alt="">
                                </div>
                                <h3 class="name">{{item.shop_title}}</h3>
                                <div class="price-wrapper">
                                  <div class="price">{{item.presell_price}}.<span class="decimal">00</span></div>
                                  <div class="status">满额截标</div>
                                </div>
                                <div class="progress-wrapper">
                                  <progress class="u-progress" :value="item.plenty" :max="item.plenty > 100 ? item.plenty : 100"></progress>
                                </div>
                                <ul class="details">
                                  <li>
                                    <div class="prog">{{item.plenty}}%</div>
                                    <div class="desc">完成</div>
                                  </li>
                                  <li>
                                    <div class="prog">{{item.pre_count}}人</div>
                                    <div class="desc">预报名人数</div>
                                  </li>
                                  <li>
                                    <div class="prog">{{item.date_time}}天</div>
                                    <div class="desc">剩余时间</div>
                                  </li>
                                </ul>
                                <div class="tag">满{{item.person_count}}人截标</div>
                                <div class="qrcode-wrapper">
                                  <img class="pic" :src="item.demo_qcode" alt="">
                                  <div class="desc">扫码查看样例</div>
                                </div>
                              </a>
                            </li>
                          </ul>
                          <ul class="list" v-else-if="jsons.status == 1">
                            <li class="item" v-for="item in list" :key="item.id" >
                              <a class="item-inner" :href="'#/projectdetails/'+item.status + '/' + item.id" @click="preinfo(item)">
                                <div class="cover-wrapper">
                                  <img class="cover" :src="item.shop_piture" alt="">
                                </div>
                                <h3 class="name">{{item.shop_title}}</h3>
                                <div class="price-wrapper">
                                  <div class="price">{{item.presell_price}}.<span class="decimal">00</span></div>
                                  <div class="status">开发进度</div>
                                </div>
                                <div class="progress-wrapper">
                                  <progress class="u-progress green" :value="item.plenty" max="100"></progress>
                                </div>
                                <ul class="details">
                                  <li>
                                    <div class="prog">{{item.plenty}}%</div>
                                    <div class="desc">完成</div>
                                  </li>
                                  <li>
                                    <div class="prog"></div>
                                    <div class="desc"></div>
                                  </li>
                                  <li>
                                    <div class="prog">{{item.date_time}}天</div>
                                    <div class="desc">剩余时间</div>
                                  </li>
                                </ul>
                                <div class="modal">
                                  <a class="link" href="javascript:;" target="_blank">查看进度</a>
                                </div>
                              </a>
                            </li>
                          </ul>
                          <ul class="list" v-else>
                            <li class="item" v-for="item in list" :key="item.id" >
                              <a class="item-inner" :href="'#/projectdetails/'+item.status + '/' + item.id" @click="preinfo(item)">
                                <div class="cover-wrapper">
                                  <img class="cover" :src="item.shop_piture" alt="">
                                </div>
                                <h3 class="name">{{item.shop_title}}</h3>
                                <div class="price-wrapper">
                                  <div class="price">{{item.dev_standard_price}}.<span class="decimal">00</span></div>
                                </div>
                                <div class="qrcode-wrapper">
                                  <img class="pic" :src="item.demo_qcode" alt="">
                                  <div class="desc">扫码查看样例</div>
                                </div>
                              </a>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
            <el-dialog title="注意" center :modal="true" :visible.sync="dialogVisible" width="400px" :close-on-click-modal="false">
              <span class="tip-words">总价格务必请联系客服进行确认,否则付款立即退回！</span>
              <span slot="footer" class="dialog-footer">
                <el-button class="buttons" @click="constract">联系客服</el-button>
                <el-button class="steps" @click="step(jsons)">下一步
                   <div class="tipcs">(已确定金额)</div>
                </el-button>
              </span>
            </el-dialog>
            <dir class="fixed-tool-mobile">
                <i class="icon icon-tel"></i>
                <i class="icon icon-star" v-show="jsons.status == 0 && attentions == 0" @click="attention"></i>
                <i class="icon icon-star active" v-show="jsons.status == 0 && attentions == 1" @click="cancel_attention"></i>
                <span style="flex:1"></span>
                <button class="btn" @click="handleOrderM">预报名参与</button>
            </dir>
        </div>
    </div>
</template>

<script>
import { request } from "../api/api";
export default {
  name: "ProjectDetails",
  data() {
    return {
      tab: 0,
      jsons:{},
      contact:{},
      list:[],
      shop_info:{},
      shop_plan:[],
      metor:[],
      tcps:0,
      dialogVisible:false,
      show_name:'',
      attentions:'',
    };
  },
  mounted() {
    document.documentElement.scrollTop=0;
    document.body.scrollTop=0;
    window.onscroll = function() {
      var topScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      var bignav = document.getElementById("tabProjectDetails");
      if (bignav) {
        if (topScroll > 210) {
          bignav.style.display = "flex";
        } else {
          bignav.style.display = "none";
        }
      }
    };
    this.get_info();
    // this.show_name = "11111";
    // setTimeout(()=>{
    //      this.setup();
    //  },500)
    console.log(window.location.href);
    this.follows();
  },
  methods: {
    //判断是否已关注
    follows(){
      var _this = this;
      var param = {}
          param.projectid = _this.$route.params.shopid;
      request("com.iiding.web.personal_center.user_project.get_product_price",param,res => {
        if(res.code == "success"){
           if(res.my_project_status == "project_not_exist"){
              _this.attentions = 0;
           }else{
              _this.attentions = 1;
           }
        }
      })
    },
    //取消关注
    cancel_attention(){
      var _this = this;
      var param = {}
          param.projectid = _this.$route.params.shopid;
      request("com.iiding.web.personal_center.user_project.delete_project",param,res => {
        if(res.code == "success"){
            _this.$message({
              message: '关注成功',
              type: 'success'
            }); 
            _this.follows();
        }else{
          _this.$message({
              message: res.msg,
              type: 'eroor'
            });
        }
      })
    },
    //关注
    attention(){
      var _this = this;
      var param = {}
          param.projectid = _this.$route.params.shopid;
          param.op = "follow";
      request("com.iiding.web.personal_center.user_project.add_project",param,res => {
        if(res.code == "success"){
           _this.$message({
              message: '关注成功',
              type: 'success'
            });
           _this.follows();
        }
      })
    },
    //分享
    setup(){  
      var _this = this; 
      console.log("qqq"+_this.show_name);
         window._bd_share_config={
             "common":{
                 "bdSnsKey":{},
                 "bdText":_this.show_name,
                 "bdUrl":"http://www.baidu.com",
                 "bdSize":"16"
             },
             "share":{},
             "selectShare":{
                 "bdContainerClass":null,
                 "bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]
             }
         };
         const s = document.createElement('script');
         s.type = 'text/javascript';
         s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
         document.body.appendChild(s);
     },
    //下一步
    step(val){
      var _this = this;
      request("com.iiding.web.personal_center.user_project.get_product_price",{"projectid":val.id},res => {
        if(res.code == "success"){
          _this.projectInfo = res.data;
          if(res.my_project_status == "project_not_exist"){
              sessionStorage.setItem("select_projectid",val.id);
              _this.$router.push({ path: "/order/" + val.id + "/" + val.status + "/2"});
          }else if(res.my_project_status == "project_exist_follow"){
              sessionStorage.setItem("select_projectid",val.id);
              _this.$router.push({ path: "/order/" + val.id + "/" + val.status + "/2"});
          }else if(res.my_project_status == "project_exist_participate"){
              sessionStorage.setItem("select_projectid",val.id);
              _this.$router.push({ path: "/order/" + val.id + "/" + val.status + "/2"});
          }else if(res.my_project_status == "project_exist_signing"){
              _this.$message.error("此项目您已经签约");
          }else{
          }
        }
      })

    },
    //联系客服
    constract(){
      // this.$router.push({ path: "/chat" });
      window.open("#/chat");
    },
    //定制开发的跳转
    changeSale(val){
      var _this = this;
      request("com.iiding.web.personal_center.user_project.get_product_price",{"projectid":val.id},res => {
        if(res.code == "success"){
          _this.projectInfo = res.data;
          if(res.my_project_status == "project_not_exist"){
              sessionStorage.setItem("select_projectid",val.id);
              _this.$router.push({ path: "/order/" + val.id + "/" + val.status + "/" + this.tcps});
          }else if(res.my_project_status == "project_exist_follow"){
              sessionStorage.setItem("select_projectid",val.id);
              _this.$router.push({ path: "/order/" + val.id + "/" + val.status + "/" + this.tcps});
          }else if(res.my_project_status == "project_exist_participate"){
              sessionStorage.setItem("select_projectid",val.id);
              _this.$router.push({ path: "/order/" + val.id + "/" + val.status + "/" + this.tcps});
          }else if(res.my_project_status == "project_exist_signing"){
              _this.$message.error("此项目您已经签约");
          }else{
          }
        }
      })

    },
    //选择不同的版本
    changeCards(i){
      this.tcps = i;
      if(this.tcps == 2){
        this.dialogVisible = true;
      }
    },
    //根据shopid获取信息
    get_info(){
      var _this = this;
      var param = {};
      param.status = _this.$route.params.type;
      param.id = _this.$route.params.shopid;
      request("com.iiding.web.index.shop_detials", param, data => {
        console.log(data);
        if(data.code == "success"){
          _this.contact = data.constract;
          _this.jsons = data.detial_data;
          _this.show_name = data.detial_data.shop_title;
          _this.setup();
          if(_this.jsons.status == 0){
            var date1 = new Date();
            var date2 = new Date(_this.jsons.presell_finish_time.replace(/-/g, "/"))
            var date = date2.getTime() - date1.getTime();
            _this.jsons["date_time"] = parseInt(date/(1000*3600*24));
            var plenty = parseInt((_this.jsons.pre_count / _this.jsons.person_count) * 100);
            _this.jsons["plenty"] = plenty;
            _this.list = data.recommend;
            _this.list.forEach(function(ele){
              var date1 = new Date();
              var date2 = new Date(ele.presell_finish_time.replace(/-/g, "/"))
              var date = date2.getTime() - date1.getTime();
              ele["date_time"] = parseInt(date/(1000*3600*24));
              var plenty = parseInt((ele.pre_count / ele.person_count) * 100);
              ele["plenty"] = plenty;
            })
          }
          else if(_this.jsons.status == 1){
            var date1 = new Date();
            var date2 = new Date(_this.jsons.dev_end_time.replace(/-/g, "/"))
            var date3 = new Date(_this.jsons.dev_start_time.replace(/-/g, "/"))
            var date = date2.getTime() - date1.getTime();
            var dates = date1.getTime() - date3.getTime();
            _this.jsons["date_time"] = parseInt(date/(1000*3600*24));
            var plenty = parseInt(( dates / (date2.getTime() - date3.getTime())) * 100);
            _this.jsons["plenty"] = plenty;
            _this.list = data.recommend;
            _this.list.forEach(function(ele){
              var date1 = new Date();
              var date2 = new Date(ele.dev_end_time.replace(/-/g, "/"))
              var date3 = new Date(ele.dev_start_time.replace(/-/g, "/"))
              var date = date2.getTime() - date1.getTime();
              var dates = date1.getTime() - date3.getTime();
              ele["date_time"] = parseInt(date/(1000*3600*24));
              var plenty = parseInt(( dates / (date2.getTime() - date3.getTime())) * 100);
              ele["plenty"] = plenty;
            })
          }else{
            _this.list = data.recommend;
          }
          _this.changeTab(0);
        }
      })
    },
    //推荐的详情
    preinfo(val){
      var _this = this;
      _this.$route.params.type = val.status;
      _this.$route.params.shopid = val.id;
      _this.get_info();
    },
    changeTab(i) {
      this.tab = i;
      var _this = this;
      var param = {};
      document.documentElement.scrollTop = 432;
      document.body.scrollTop = 432;
      if(i==0){
        param.shopid = _this.jsons.id;
        param.type = 0;
        request("com.iiding.admin.shop_management.shop_info.query",param,data=>{
          if(data.list.length > 0){
            _this.shop_info = data.list[0];
          }else{
            _this.shop_info.content = "";
          }
        })
      }
      else if(i==1){
        param.shopid = _this.jsons.id;
        param.type = 1;
        request("com.iiding.admin.shop_management.shop_info.query",param,data=>{
          if(data.list.length > 0){
            _this.shop_info = data.list[0];
          }else{
            _this.shop_info.content = "";
          }
        })
      }
      else if(i==2){
        param.shopid = _this.jsons.id;
        param.type = 2;
        request("com.iiding.admin.shop_management.shop_info.query",param,data=>{
          if(data.list.length > 0){
            _this.shop_info = data.list[0];
          }else{
            _this.shop_info.content = "";
          }
        })
      }
      else if(i==3){
        param.shopid = _this.jsons.id;
        request("com.iiding.admin.project_plans.select",param,data=>{
          _this.shop_plan = data.list;
          _this.shop_plan.forEach(function(ele){
              ele.plan_picture = ele.plan_picture.split(",");
              ele.create_date = ele.create_date.substring(5);
          })
        })
      }
      else if(i==4){
        param.shopid = _this.jsons.id;
        request("com.iiding.admin.shop_management.shop_mentoring.select",param,data=>{
          _this.metor = data.list;
        })
      }
      else if(i==5){
        param.shopid = _this.jsons.id;
        param.type = 3;
        request("com.iiding.admin.shop_management.shop_info.query",param,data=>{
          if(data.list.length > 0){
            _this.shop_info = data.list[0];
          }else{
            _this.shop_info.content = "";
          }
        })
      }
    },
    handleOrder(val) {
      var _this = this;
      request("com.iiding.web.personal_center.user_project.get_product_price",{"projectid":val.id},res => {
        if(res.code == "success"){
          _this.projectInfo = res.data;
          if(res.my_project_status == "project_not_exist"){
              sessionStorage.setItem("select_projectid",val.id);
              _this.$router.push({ path: "/order/" + val.id + "/" + val.status +"/5"});
          }else if(res.my_project_status == "project_exist_follow"){
              sessionStorage.setItem("select_projectid",val.id);
              _this.$router.push({ path: "/order/" + val.id + "/" + val.status +"/5"});
          }else if(res.my_project_status == "project_exist_participate"){
              _this.$message.error("此项目您已经签约");
          }else if(res.my_project_status == "project_exist_signing"){
              _this.$message.error("此项目您已经签约");
          }else{
          }
        }
      })

    },
    // //查询此项目是否已经签约
    // query_project_is_exist(){
    //   var _this = this;
    //   var projectid = sessionStorage.getItem("select_projectid");
    //   var select_type = sessionStorage.getItem("select_type");
    //   request("com.iiding.web.personal_center.user_project.get_product_price",{"projectid":projectid},res => {
    //     if(res.code == "success"){
    //       _this.projectInfo = res.data;
    //       if(res.my_project_status == "project_not_exist"){
    //       }else if(res.my_project_status == "project_exist_follow"){
    //       }else if(res.my_project_status == "project_exist_participate"){
    //       }else if(res.my_project_status == "project_exist_signing"){
    //           _this.$message.error("此项目您已经签约");
    //       }else{
    //       }
    //     }
    //   })
    // },
    handleOrderM() {
      this.$router.push({ path: "/morder" });
    }
  }
};
</script>
<style>
  .el-dialog__header {
    background:rgba(231,231,231,1);
    border-radius:2px 2px 0px 0px;
  }
  .el-dialog__title {
    color:rgba(228,57,60,1)
  }
  .tip-words {
    width:340px;
    height:20px;
    font-size:14px;
    font-family:MicrosoftYaHeiUI;
    color:rgba(51,51,51,1);
    line-height:18px;
    text-indent: 2em;
  }
  .buttons {
    width: 96px;
    height: 30px;
    background:rgba(255,80,0,1);
    border-radius:2px;
    font-size:14px;
    font-family:MicrosoftYaHeiUI;
    color:rgba(255,255,255,1);
    line-height:14px;
    text-align:center;
    padding-top:8px;
  }
  .buttons:hover {
    background:rgba(255,80,0,.9);
    border-radius:2px;
    color:rgba(255,255,255,1);
  }
  .steps{
    display: inline-block;
    width: 96px;
    height: 30px;
    font-size:14px;
    font-family:MicrosoftYaHeiUI;
    color:rgba(153,153,153,1);
    line-height:14px;
    text-align:center;
    padding-top:8px;
    position: relative;
  }
  .steps:hover {
    background:rgba(255,255,255,1);
    border-radius:2px;
    color:rgba(153,153,153,1);
  }
  .tipcs {
      width:69px;
      height:13px;
      font-size:10px;
      font-family:MicrosoftYaHeiUI;
      color:rgba(228,57,60,1);
      line-height:13px;
      position: absolute;
      right:-70px;
      bottom:0px;
    }
</style>

<style lang="scss" scoped>
@import "../styles/vars.scss";

.main {
  width: 1200px;
  margin: 20px auto 100px auto;
  .intro-container {
    display: flex;
    width: 100%;
    height: 440px;
    box-shadow: 0px 0px 40px 0px rgba(216, 216, 216, 0.5);
    border-radius: 2px;
    padding: 20px 0 20px 20px;
    box-sizing: border-box;
    background: #ffffff;
    .cover {
      flex: 1;
      height: 400px;
    }
    .intro-details {
      width: 390px;
      padding: 0 10px 0 20px;
      box-sizing: border-box;
      position: relative;
      .title {
        margin: 0;
        font-weight: normal;
        line-height: 30px;
        font-size: 24px;
        padding-left: 10px;
      }
      .desc {
        font-size: 14px;
        line-height: 24px;
        margin-top: 10px;
        color: #666666;
        padding-left: 10px;
      }
      .stat {
        width: 100%;
        display: flex;
        margin-top: 20px;
        position: relative;
        padding-left: 10px;
        box-sizing: border-box;
        .item {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          .lb {
            font-size: 16px;
            line-height: 20px;
          }
          .num {
            font-size: 48px;
            color: $front-color;
            line-height: 55px;
            display: flex;
            align-items: flex-end;
            margin-top: 10px;
            .unit-price {
              font-size: 24px;
              line-height: 30px;
              color: #333333;
              margin-right: 4px;
              margin-bottom: 4px;
            }
            .unit-person {
              font-size: 24px;
              line-height: 30px;
              color: #333333;
              margin-left: 4px;
              margin-bottom: 4px;
            }
          }
          & + .item {
            .lb,
            .num {
              margin-left: 45px;
            }
          }
        }
        
      }
      .afters {
        &::after {
          content: "";
          width: 1px;
          height: 62px;
          background: rgba(231, 231, 231, 1);
          position: absolute;
          left: 174px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .special {
          padding-left:10px;
          padding-top:31px;
          .car-list{
              margin-bottom:30px;
              .cards {
                float:left;
                width:92px;
                height:26px;
                line-height: 18px;
                margin-right: 20px;
                border-radius:2px;
                border:1px solid rgba(176,176,176,1);
                font-size:14px;
                font-family:MicrosoftYaHeiUI;
                color:rgba(153,153,153,1);
                text-align:center;
                padding-top:6px;
              }
              .cards:hover {
                cursor:pointer;
              }
              .card {
                float:left;
                width:92px;
                height:26px;
                line-height: 18px;
                margin-right: 20px;
                border-radius:2px;
                border:1px solid rgba(176,176,176,1);
                font-size:14px;
                font-family:MicrosoftYaHeiUI;
                color:rgba(153,153,153,1);
                text-align:center;
                padding-top:6px;
                position:relative;
                .rot{
                  width:16px;
                  height: 0px;
                  padding-top:16px;
                  background-image: url(http://pic.iidingyun.com//file/20181219/76256.png);
                  background-size: 16px 16px;
                  position: absolute;
                  right:-8px;
                  top:-10px;
                }  
              }
              .card:hover {
                cursor:pointer;
              }
              .isselect {
                width:92px;
                height:26px;
                border-radius:2px;
                border:1px solid rgba(255,80,0,1);
                font-size:14px;
                font-family:MicrosoftYaHeiUI;
                color:rgba(255,80,0,1);
                line-height:18px;
                text-align:center;
                padding-top:6px; 
                position:relative;
                &::before{
                    content: "";
                    width: 0px;
                    height: 0px;
                    border-right:8px solid rgba(255,80,0,1);
                    border-bottom:8px solid rgba(255,80,0,1);
                    border-top:8px solid transparent;
                    border-left:8px solid transparent;
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
                    -webkit-transform: rotate(45deg);
                    transform: rotate(45deg);
                    position:absolute;
                    right: 2px;
                    bottom:1px;
                }
              }
              &::after {
                content:"";
                display: block;
                clear:both;
              }
              
          }
          .sales {
            display: inline-block;
            width:170px;
            height:40px;
            background:rgba(255,80,0,1);
            border-radius:2px;
            font-size:16px;
            font-family:MicrosoftYaHeiUI;
            color:rgba(255,255,255,1);
            line-height:20px;
            text-align:center;
            padding-top:2px
          }
          .sales:hover{
              cursor:pointer;
          }
      }
      .prog-wrapper {
        width: 100%;
        height: 80px;
        background: rgba(255, 249, 242, 1);
        border-radius: 2px;
        padding: 10px;
        box-sizing: border-box;
        margin-top: 10px;
        .prog-details {
          display: flex;
          margin-top: 7px;
          li {
            flex: 1;
            overflow: hidden;
            .prog {
              font-size: 16px;
              color: rgba(102, 102, 102, 1);
              line-height: 20px;
            }
            .desc2 {
              font-size: 12px;
              color: rgba(153, 153, 153, 1);
              line-height: 15px;
              margin-top: 2px;
            }
            & + li {
              padding-left: 20px;
              box-sizing: border-box;
              border-left: 1px solid #e7e7e7;
            }
          }
        }
      }
      .tips {
        font-size: 12px;
        color: #999999;
        line-height: 15px;
        margin-top: 10px;
        position: relative;
        box-sizing: border-box;
        padding-left: 18px;
        box-sizing: border-box;
        &::after {
          content: "*";
          font-size: 12px;
          color: $front-color;
          position: absolute;
          left: 10px;
          top: 0;
        }
      }
      .btn {
        height: 40px;
        line-height: 40px;
        background: $front-color;
        border-radius: 2px;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        padding: 0 45px;
        border: 0;
        outline: none;
        cursor: pointer;
        margin-top: 20px;
        margin-left: 10px;
        transition: opacity ease 0.2s;
        &:hover {
          opacity: 0.9;
        }
      }

      .u-share {
        margin-left: 10px;
        margin-top: 30px;
        position:absolute;
        left:0px;
        bottom:0px;
      }
      .star {
        position: absolute;
        right: 20px;
        bottom: 56px;
        padding-left: 26px;
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        height: 22px;
        line-height: 22px;
        display: block;
        &::before {
          content: "";
          width: 22px;
          height: 22px;
          position: absolute;
          left: 0;
          top: 0;
          background: url("//pic.iidingyun.com//file/20181122/75575.png")
            no-repeat;
        }
      }
      .starg {
        position: absolute;
        right: 20px;
        bottom: 56px;
        padding-left: 26px;
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        height: 22px;
        line-height: 22px;
        display: block;
        &::before {
          content: "";
          width: 22px;
          height: 22px;
          position: absolute;
          left: 0;
          top: 0;
          background: url("//pic.iidingyun.com//file/20181220/76312.png")
            no-repeat;
        }
      }
    }
  }
  .project-details {
    display: flex;
    margin-top: 50px;
    .details-main {
      flex: 1;
      box-shadow: 0px 0px 40px 0px rgba(216, 216, 216, 0.5);
      border-radius: 2px;
      background: #ffffff;
      .proj-intro {
        padding: 20px 40px 60px;
        box-sizing: border-box;
        overflow: hidden;
        font-size: 16px;
        line-height: 24px;
        &.q-a-wrapper {
          padding: 0 20px 60px;
        }
        .q-a {
          .item {
            border-bottom: 1px solid #e7e7e7;
            .ques {
              font-size: 16px;
              font-weight: bold;
              line-height: 20px;
              margin-top: 35px;
              padding: 0 20px 0 50px;
              box-sizing: border-box;
              position: relative;
              &::before {
                content: "";
                width: 30px;
                height: 30px;
                background: url("//pic.iidingyun.com/1000//file/20181122/75586.png")
                  no-repeat;
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
              }
            }
            .answer {
              font-size: 14px;
              color: rgba(102, 102, 102, 1);
              line-height: 21px;
              margin-top: 25px;
              padding: 0 20px 30px 50px;
              box-sizing: border-box;
              position: relative;
              &::before {
                content: "";
                width: 30px;
                height: 30px;
                background: url("//pic.iidingyun.com//file/20181122/75587.png")
                  no-repeat;
                position: absolute;
                left: 10px;
                top: 0;
              }
            }
          }
        }
        .summary {
          width: 540px;
          background: rgba(255, 249, 242, 1);
          border-radius: 50px;
          padding: 10px 30px;
          box-sizing: border-box;
          font-size: 14px;
          color: rgba(153, 153, 153, 1);
          line-height: 18px;
          text-align: center;
          margin: 10px auto;
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
                margin-top: -5px;
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
        img {
          max-width: 100%;
        }
      }
    }
    .aside {
      width: 380px;
      margin-left: 10px;
      .service-wrapper {
        box-shadow: 0px 0px 40px 0px rgba(216, 216, 216, 0.5);
        border-radius: 2px;
        padding-bottom: 20px;
        background: #ffffff;
        .title {
          font-size: 18px;
          color: rgba(102, 102, 102, 1);
          line-height: 23px;
          height: 43px;
          line-height: 43px;
          border-bottom: 1px solid #e7e7e7;
          text-align: center;
          margin: 0;
        }
        .no {
          font-size: 36px;
          font-weight: bold;
          color: $front-color;
          line-height: 42px;
          text-align: center;
          margin-top: 30px;
          font-family: myFont;
        }
        .time {
          font-size: 14px;
          color: rgba(102, 102, 102, 1);
          line-height: 18px;
          margin-top: 2px;
          text-align: center;
        }
        .tips {
          font-size: 12px;
          color: rgba(176, 176, 176, 1);
          line-height: 15px;
          margin: 40px 20px 0 0;
          text-align: right;
        }
      }
      .m-project {
        .list {
          width: 410px;
          margin-top: 30px;
        }
      }
    }
  }
  .fixed-tool-mobile {
    display: none;
  }
}

@media (max-width: 767px) {
  .main {
    width: 100%;
    margin: 0;
    .intro-container {
      padding: 0;
      flex-direction: column;
      height: auto;
      .cover {
        height: 210px;
      }
      .intro-details {
        width: 100%;
        padding: 0 14px;
        .u-share {
          display: none;
        }
        .title {
          padding-left: 0;
          font-size: 17px;
          line-height: 22px;
          margin: 0;
          margin-top: 16px;
        }
        .desc {
          margin-top: 0;
          padding-left: 0;
          font-size: 13px;
          line-height: 18px;
          margin-top: 12px;
        }
        .stat {
          margin-top: 12px;
          padding-left: 0;
          padding-top: 12px;
          border-top: 1px solid #e7e7e7;
          .item {
            .lb {
              font-size: 15px;
              line-height: 19px;
            }
            .num {
              font-size: 24px;
              line-height: 27.5px;
              margin-top: 8px;
              .unit-price {
                font-size: 15px;
                line-height: 19px;
                margin-right: 2px;
                margin-bottom: 0;
              }
              .unit-person {
                font-size: 20px;
                line-height: 25.5px;
                margin-left: 2px;
                margin-bottom: 0;
              }
            }
            & + .item {
              align-items: flex-end;
            }
          }
          &:after {
            display: none;
          }
        }
        .tips {
          padding-left: 6px;
          &::after {
            left: 0;
          }
        }
        .btn {
          display: none;
        }
        .star {
          display: none;
        }
        .starg {
          display: none;
        }
        .special {
           .sales {
             display: none;
           }
        }
      }
    }
    .project-details {
      margin-top: 0;
      .details-main {
        .proj-intro {
          padding: 20px 14px 64px;
          font-size: 14px;
          line-height: 21px;
          min-height: 1000px;
          &.q-a-wrapper {
            padding: 0 14px 60px;
          }
          .q-a {
            .item {
              .ques {
                font-size: 15px;
                line-height: 19px;
                margin-top: 21px;
                padding: 0 0 0 40px;
                &::before {
                  left: 0px;
                }
              }
              .answer {
                font-size: 14px;
                line-height: 21px;
                margin-top: 21px;
                padding: 0 0 20px 40px;
                &::before {
                  left: 0px;
                }
              }
            }
          }
          .plan_table {
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
                  margin-top: -3px;
                  margin-right: 5px;
                }
              }
            }
          }
          .summary {
            display: none;
          }
        }
        .u-tabpanel {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1;
          display: none;
          padding: 0 14px;
          box-sizing: border-box;
          .item {
            width: initial;
            &.active::after {
              width: 50%;
              left: 50%;
              transform: translateX(-50%);
            }
          }
        }
      }
      .aside {
        display: none;
      }
    }
    .fixed-tool-mobile {
      width: 100%;
      height: 55px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 0px 0px rgba(229, 229, 229, 0.5);
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0 14px;
      box-sizing: border-box;
      .icon {
        display: block;
        width: 22px;
        height: 22px;
        &.icon-star {
          background: url("//pic.iidingyun.com//file/20181122/75575.png")
            no-repeat;
          background-size: contain;
          margin-left: 55px;
          &.active {
            background: url("//pic.iidingyun.com//file/20181201/75775.png")
              no-repeat;
            background-size: contain;
          }
        }
        &.icon-tel {
          background: url("//pic.iidingyun.com/1000//file/20181201/75776.png")
            no-repeat;
          background-size: contain;
          margin-left: 17px;
        }
      }
      .btn {
        height: 40px;
        background: $front-color;
        border-radius: 2px;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        padding: 0 45px;
      }
    }
  }
}
</style>
