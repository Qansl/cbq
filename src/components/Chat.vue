<template>
  <div class="chat-wrapper">
    <header class="chat-header">
      <img class="avator" src="//pic.iidingyun.com//file/20181126/75684.png" alt>
      <div class="name-wrapper">
        <div class="name">客服小姐姐</div>
        <div class="status online">在线</div>
      </div>
    </header>
    <div class="chat-con" id="iidd">
      <div class="loadmore" @click="get_msg_history()" v-show="show_get_history">
        <i class="icon"></i>
        <span>点击加载历史记录</span>
      </div>
      <ul class="chat-list">
        <li class="chat-item" :class="{right:item.sender_id==userid,left:item.receiver_id==userid}" v-for="(item,index) in user_msg_list" :key="index">
						<img class="avator" :src="senderUserInfo.icon==''?'//pic.iidingyun.com/1000//file/20181126/75683.png':senderUserInfo.icon" alt="" v-if="item.receiver_id==userid&&item.sender_id!=userid"/>
						<div class="chat-con-inner">
							<div class="txt">{{item.content}}</div>
							<div class="time">
								<span class="name">{{item.sender_id==userid?userInfo.user_name:'客服小姐姐'}}</span> {{item.send_time}}
							</div>
						</div>
						<img class="avator" :src="userInfo.icon==''?'https://pic.iidingyun.com/1000//file/20181126/75683.png':decodeURIComponent(userInfo.icon)" alt="" v-if="item.sender_id==userid"/>
        </li>
      </ul>
    </div>
    <footer class="chat-footer">
      <textarea class="area" name cols="30" rows="1" placeholder="提出你的想法……" v-model="content"></textarea>
      <button class="btn" @click="sender_message">发送</button>
    </footer>
  </div>
</template>

<script>
import { request,SITEID } from "../api/api";

var MicroserviceEnv = "dev.";
export default {
  data() {
    return {
      aa: "",
      show_get_history:false,
      userList:[],
      pageCount:10,
      search:"",
      userid:'',
      userInfo:{},
      senderUserInfo:{},
      sender_id:'',
      content:'',
      user_msg_list:[],
    };
  },
  mounted: function(){
      this.init_Below_scroll_bar();
      this.init_websocket();
      this.get_customer_service_msg();
  },
  methods: {
    //获取登录信息，校验用户是否登录
    
    //滚动条固定在下面
    init_Below_scroll_bar:function(){
        var scopll = document.getElementById("iidd");
        var hgt = document.getElementById("iidd");
        scopll.scrollTop = hgt.scrollHeight;
    },
    //发送消息
    sender_message: function() {
      var _this = this;
      request("com.iiding.web.instant_messaging.customer_send_msg", {"content":_this.content}, res => {
          if(res.code == "success"){
            _this.content = "";
            // _this.init_Below_scroll_bar();
            _this.get_customer_service_msg();
          }else{
            var msg = res.msg;
            _this.$message.error(msg);
          }
      });
    },
    //接收并查询消息
    get_customer_service_msg:function(){
      var _this = this;
      request("com.iiding.admin.instant_messaging.query_msg_info",{},result =>{
        if(result.code == "success"){
          _this.user_msg_list = result.list;
          _this.userid = result.userid;
          _this.userInfo = result.userInfo;
          _this.senderUserInfo = result.senderUserInfo;
          _this.pageCount = 10;
          if(result.list.length > 0){
            _this.show_get_history = true;
          }   
          setTimeout(function(){     
            _this.init_Below_scroll_bar();
          },10);
        }
        
      })
    },
    //初始化websocket
    init_websocket:function(){
          var _this = this;
          var userInfo = sessionStorage.getItem("userInfo");
          userInfo = JSON.parse(userInfo);
          var url = "ws://119.23.142.94:8999?siteid=" + SITEID + "&groupid=" + userInfo.userid + "&msg=1";
					_this.socket = new WebSocket(url);
					console.log(url);
					//接收消息
					_this.socket.onmessage = function(event){
						if(event.data == "1"){						
								setTimeout(function(){
									_this.get_customer_service_msg();
								},50)
						}
					}
					_this.socket.onclose = function(evt) {
							_this.init_websocket();
					};   
    },
    //获取历史消息
    get_msg_history:function(){
      var _this = this;
      _this.pageCount += 10;
      request("com.iiding.admin.instant_messaging.query_msg_info",{"pageCount":_this.pageCount},result =>{
        if(result.code == "success"){
          _this.user_msg_list = result.list;
          _this.userid = result.userid;
          _this.userInfo = result.userInfo;
          _this.senderUserInfo = result.senderUserInfo;
          if(result.list.length < _this.pageCount){
            _this.show_get_history = false;
          }
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/vars.scss";
.chat-wrapper {
  width: 650px;
  height: 740px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 0px rgba(231, 231, 231, 1);
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  .chat-header {
    padding: 16px 20px 14px;
    box-sizing: border-box;
    display: flex;
    background: rgba(250, 250, 250, 1);
    height: 78px;
    .avator {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    .name-wrapper {
      margin-left: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name {
        font-size: 16px;
        font-weight: bold;
        line-height: 20px;
      }
      .status {
        font-size: 12px;
        line-height: 15px;
        padding-left: 10px;
        position: relative;
        &::before {
          content: "";
          width: 6px;
          height: 6px;
          background: rgba(122, 223, 151, 1);
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        &.offline::before {
          background: $warning;
        }
      }
    }
  }
  .chat-footer {
    height: 180px;
    box-shadow: 0px -5px 9px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    .area {
      flex: 1;
      width: 100%;
      padding: 18px 20px 18px 14px;
      box-sizing: border-box;
      border: 0;
      outline: none;
      font-size: 16px;
      color: #333333;
      line-height: 20px;
      &::-webkit-input-placeholder {
        color: rgba(176, 176, 176, 1);
      }
    }
    .btn {
      width: 100px;
      height: 40px;
      line-height: 40px;
      background: linear-gradient(
        136deg,
        rgba(255, 144, 0, 1) 0%,
        rgba(255, 80, 0, 1) 100%
      );
      box-shadow: 1px 2px 5px 0px rgba(255, 80, 0, 0.36);
      border-radius: 2px;
      margin: 0px 20px 20px;
      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      line-height: 18px;
      align-self: flex-end;
    }
  }
  .chat-con {
    flex: 1;
    overflow-y: auto;
    padding: 0 25px 20px 20px;
    .loadmore {
      height: 35px;
      line-height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      color: $front-color;
      cursor: pointer;
      .icon {
        width: 12px;
        height: 12px;
        background: url("//pic.iidingyun.com/1000//file/20181126/75686.png")
          no-repeat;
        margin-right: 6px;
      }
    }
    .chat-list {
      .chat-item {
        display: flex;
        margin-top: 30px;
        &:first-child {
          margin-top: 20px;
        }
        &.left + .right {
          margin-top: 47px;
        }
        .avator {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 18px;
        }
        .chat-con-inner {
          flex: 1;
          display: flex;
          flex-direction: column;
          .txt {
            max-width: 80%;
            padding: 14px 21px;
            box-sizing: border-box;
            background: rgba(243, 243, 243, 1);
            border-radius: 6px;
            font-size: 14px;
            line-height: 18px;
            position: relative;
            width: fit-content;
            &::before {
              content: "";
              border-width: 8px 4px 0;
              border-style: solid;
              border-color: rgba(243, 243, 243, 1) transparent transparent;
              position: absolute;
              left: -8px;
              top: 12px;
              transform: rotate(90deg);
            }
          }
          .time {
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
            line-height: 15px;
            margin-top: 8px;
          }
        }
        &.right {
          .avator {
            margin-left: 18px;
            margin-right: 0;
          }
          .chat-con-inner {
            align-items: flex-end;
            .txt {
              background: rgba(255, 249, 242, 1);
              &::before {
                display: none;
              }
              &::after {
                content: "";
                border-width: 8px 4px 0;
                border-style: solid;
                border-color: rgba(255, 249, 242, 1) transparent transparent;
                position: absolute;
                right: -8px;
                top: 12px;
                transform: rotate(-90deg);
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .chat-wrapper {
    width: 100%;
    height: auto;
    margin: 0;
    background: #fff9f2;
    .chat-header {
      display: none;
    }
    .chat-con {
      padding: 0 14px 115px;
      .loadmore {
        font-size: 11px;
      }
      .chat-list {
        .chat-item {
          margin-top: 15px;
          .avator {
            width: 40px;
            height: 40px;
          }
          .chat-con-inner {
            .time {
              color: #666666;
              margin-top: 10px;
              .name {
                display: none;
              }
            }
            .txt {
              max-width: 100%;
              background: #ffffff;
              font-size: 12px;
              &::before {
                border-color: #ffffff transparent transparent;
              }
            }
          }
          &.right {
            .chat-con-inner {
              .txt {
                max-width: 100%;
                background: #ffffff;
                font-size: 12px;
                &::after {
                  border-color: #ffffff transparent transparent;
                }
              }
            }
          }
          &.left + .right {
            margin-top: 15px;
          }
          &:first-child {
            margin-top: 0px;
          }
        }
      }
    }
    .chat-footer {
      width: 100%;
      flex-direction: row;
      align-items: center;
      height: 50px;
      position: fixed;
      bottom: 50px;
      left: 0;
      border-bottom: 1px solid #e5e5e5;
      background: #ffffff;
      .btn {
        width: 61px;
        height: 34px;
        margin: 0 14px 0 20px;
        align-self: center;
      }
      .area {
        flex: 1;
        height: 34px;
        padding: 9px 10px;
        box-sizing: border-box;
        align-self: center;
        background: #fff9f2;
        margin-left: 14px;
        font-size: 14px;
      }
    }
  }
}
</style>
