<template>
    <div class="chat-wrapper">
        <header class="chat-header">
            <img class="avator" src="//pic.iidingyun.com//file/20181126/75684.png" alt="">
            <div class="name-wrapper">
                <div class="name">客服小姐姐</div>
                <div class="status online">在线</div>
            </div>
        </header>
        <div class="chat-con">
            <div class="loadmore">
                <i class="icon"></i>
                <span>点击加载历史记录</span>
            </div>
            <ul class="chat-list">
                <li class="chat-item left">
                    <img class="avator" src="//pic.iidingyun.com//file/20181126/75685.png" alt="">
                    <div class="chat-con-inner">
                        <div class="txt">尊敬的先生/女士您好，请问有什么可以帮助到您的吗？</div>
                        <div class="time">
                            <span class="name">客服小姐姐</span> 18-11-11 18:01:05
                        </div>
                    </div>
                </li>
                <li class="chat-item left">
                    <img class="avator" src="//pic.iidingyun.com//file/20181126/75685.png" alt="">
                    <div class="chat-con-inner">
                        <div class="txt">尊敬的先生/女士您好，请问有什么可以帮助到您的吗？</div>
                        <div class="time">
                            <span class="name">客服小姐姐</span> 18-11-11 18:01:05
                        </div>
                    </div>
                </li>
                <li class="chat-item right">
                    <div class="chat-con-inner">
                        <div class="txt">系统提示：尊敬的客户，您和客服MM的联系已经中断，如您还有问题需要咨询，可以直接发送信息召唤客服MM哦~</div>
                        <div class="time">
                            <span class="name">客服小姐姐</span> 18-11-11 18:01:05
                        </div>
                    </div>
                    <img class="avator" src="//pic.iidingyun.com/1000//file/20181126/75683.png" alt="">
                </li>
                <li class="chat-item right">
                    <div class="chat-con-inner">
                        <div class="txt">系统提示：尊敬的客户，您和客服MM的联系已经中断，如您还有问题需要咨询，可以直接发送信息召唤客服MM哦~</div>
                        <div class="time">
                            <span class="name">客服小姐姐</span> 18-11-11 18:01:05
                        </div>
                    </div>
                    <img class="avator" src="//pic.iidingyun.com/1000//file/20181126/75683.png" alt="">
                </li>
                <li class="chat-item left">
                    <img class="avator" src="//pic.iidingyun.com//file/20181126/75685.png" alt="">
                    <div class="chat-con-inner">
                        <div class="txt">尊敬的先生/女士您好，请问有什么可以帮助到您的吗？</div>
                        <div class="time">
                            <span class="name">客服小姐姐</span> 18-11-11 18:01:05
                        </div>
                    </div>
                </li>
                <li class="chat-item left">
                    <img class="avator" src="//pic.iidingyun.com//file/20181126/75685.png" alt="">
                    <div class="chat-con-inner">
                        <div class="txt">尊敬的先生/女士您好，请问有什么可以帮助到您的吗？</div>
                        <div class="time">
                            <span class="name">客服小姐姐</span> 18-11-11 18:01:05
                        </div>
                    </div>
                </li>
                <li class="chat-item left">
                    <img class="avator" src="//pic.iidingyun.com//file/20181126/75685.png" alt="">
                    <div class="chat-con-inner">
                        <div class="txt">尊敬的先生/女士您好，请问有什么可以帮助到您的吗？</div>
                        <div class="time">
                            <span class="name">客服小姐姐</span> 18-11-11 18:01:05
                        </div>
                    </div>
                </li>
                <li class="chat-item right">
                    <div class="chat-con-inner">
                        <div class="txt">系统提示：尊敬的客户，您和客服MM的联系已经中断，如您还有问题需要咨询，可以直接发送信息召唤客服MM哦~</div>
                        <div class="time">
                            <span class="name">客服小姐姐</span> 18-11-11 18:01:05
                        </div>
                    </div>
                    <img class="avator" src="//pic.iidingyun.com/1000//file/20181126/75683.png" alt="">
                </li>
            </ul>
        </div>
        <footer class="chat-footer">
            <textarea class="area" name="" cols="30" rows="1" placeholder="提出你的想法……"></textarea>
            <button class="btn">发送</button>
        </footer>
    </div>
</template>

<script>
export default {};
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
        &::before{
            content:'';
            width:6px;
            height:6px;
            background:rgba(122,223,151,1);
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
        &.offline::before{
            background:$warning;
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
    .loadmore{
        height: 35px;
        line-height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:12px;
        color:$front-color;
        cursor: pointer;
        .icon{
            width: 12px;
            height: 12px;
            background: url('//pic.iidingyun.com/1000//file/20181126/75686.png') no-repeat;
            margin-right: 6px;
        }
    }
    .chat-list{
        .chat-item{
            display: flex;
            margin-top: 30px;
            &:first-child{
                margin-top: 20px;
            }
            &.left+.right{
                margin-top: 47px;
            }
            .avator{
                width: 36px;
                height: 36px;
                border-radius: 50%;
                margin-right: 18px;
            }
            .chat-con-inner{
                flex: 1;
                display: flex;
                flex-direction: column;
                .txt{
                    width:80%;
                    padding: 14px 21px;
                    box-sizing: border-box;
                    background:rgba(243,243,243,1);
                    border-radius:6px;
                    font-size:14px;
                    line-height:18px;
                    position: relative;
                    &::before{
                        content: '';
                        border-width:8px 4px 0;
                        border-style:solid;
                        border-color:rgba(243,243,243,1) transparent transparent;
                        position: absolute;
                        left: -8px;
                        top:12px;
                        transform: rotate(90deg);
                    }
                }
                .time{
                    font-size:12px;
                    color:rgba(153,153,153,1);
                    line-height:15px;
                    margin-top: 8px;
                }
            }
            &.right{
                .avator{
                    margin-left: 18px;
                    margin-right: 0;
                }
                .chat-con-inner{
                    align-items: flex-end;
                    .txt{
                        background:rgba(255,249,242,1);
                        &::before{
                            display: none;
                        }
                        &::after{
                            content: '';
                            border-width:8px 4px 0;
                            border-style:solid;
                            border-color:rgba(255,249,242,1) transparent transparent;
                            position: absolute;
                            right: -8px;
                            top:12px;
                            transform: rotate(-90deg);
                        }
                    }
                }
            }
        }
    }
  }
}


@media (max-width: 767px){
    .chat-wrapper{
        width: 100%;
        height: auto;
        margin: 0;
        background: #FFF9F2;
        .chat-header{
            display: none;
        }
        .chat-con{
            padding: 0 14px 115px;
            .loadmore{
                font-size: 11px;
            }
            .chat-list{
                .chat-item{
                    margin-top: 15px;
                    .avator{
                        width: 40px;
                        height: 40px;
                    }
                    .chat-con-inner{
                        .time{
                            color: #666666;
                            margin-top: 10px;
                            .name{
                                display: none;
                            }
                        }
                        .txt{
                            width: 100%;
                            background:#ffffff;
                            font-size: 12px;
                            &::before{
                                border-color: #ffffff transparent transparent;
                            }
                        }
                    }
                    &.right{
                        .chat-con-inner{
                            .txt{
                                width: 100%;
                                background:#ffffff;
                                font-size: 12px;
                                &::after{
                                    border-color: #ffffff transparent transparent;
                                }
                            }
                        }
                    }
                    &.left + .right{
                        margin-top: 15px;
                    }
                    &:first-child{
                        margin-top: 0px;
                    }
                } 
            }
        }
        .chat-footer{
            width: 100%;
            flex-direction: row;
            align-items: center;
            height: 50px;
            position: fixed;
            bottom: 50px;
            left: 0;
            border-bottom: 1px solid #e5e5e5;
            background: #ffffff;
            .btn{
                width: 61px;
                height: 34px;
                margin: 0 14px 0 20px;
                align-self: center;
            }
            .area{
                flex: 1;
                height: 34px;
                padding: 9px 10px;
                box-sizing: border-box;
                align-self: center;
                background: #FFF9F2;
                margin-left: 14px;
                font-size: 14px;
            }
        }
    }
}
</style>
