(function(win,$){
   var Rotate = {
      config:{
        colors:["#bef1f4","#85dee4","#60d0d8"],//大转盘奖品区块对应背景颜色
        angle:0,//变形的角度
        rotateDeg:0,//旋转的角度，通过计算获取
        startDeg:-10,//转盘绘制开始的角度
        backDeg:-60,//内部元素回转角度，该角度需要按照实际需求调试指定
        containerId:null,//转盘选项容器id
        rotateDomId:null,//转动的domid
        bRotate:false//是否正在转动标志位
      },
      data:{},//需要展现的数据
      initOptions:function(options,data){
          for(var key in options){
            this.config[key] = options[key];
          }
          this.data = data ? data : {};
          //初始化容器
          this.container =  $("#"+this.config.containerId);
          this.initDegs(this.data.length);//初始化角度数据
      },
      //计算初始化需要旋转的角度
      initDegs:function(num){
          this.config.angle = 90- (360/num);
          this.config.rotateDeg = 360/num;
      },
      drawRotate:function(){
          var _len = this.data.length;
          var itemArr = [];
          //绘制转盘
          for(var i = 0 ; i < _len ;i++){
              var _deg = this.config.rotateDeg*i+this.config.startDeg;
              var _color = i < (_len-1) ? this.config.colors[i%2] : (this.config.colors.length > 2 ? this.config.colors[2]:this.config.colors[i%2]);
              var _div = $(document.createElement("div"));
              var _infoDiv = $(document.createElement("div"));

              _div.addClass("item");
              _div.css({
                "transform":"rotate("+_deg+"deg) skew("+this.config.angle+"deg) ",
                "background-color":_color
              });
              _infoDiv.addClass("i_info");
              _infoDiv.css({
                  "transform":"skew(-"+this.config.angle+"deg) rotate(-"+(this.config.angle+30)+"deg)"
              });
              _infoDiv.html('<span class="txt">'+this.data[i].prize_name+'</span><img src="'+this.data[i].prize_icon+'" alt=""/>');
              _div.append(_infoDiv);
              this.container.append(_div);
          }
      },
      /*转盘转动逻辑*/
      rotateFn : function (item,txt,fn){
          this.endFn =  fn;
          var angles = 90- item * this.config.rotateDeg - this.config.startDeg + this.config.rotateDeg / 2;
          if(angles < 0){
            angles += 360;
          }
          console.info("转动的角度为："+angles);
          $("#"+this.config.rotateDomId).stopRotate();
          var _this =this;
          _this.config.bRotate = false;
          $("#"+this.config.rotateDomId).rotate({
            angle:0,
            animateTo:angles+360*10,
            duration:1000,
            callback:function (){
              _this.config.bRotate = !_this.config.bRotate;
              ////////////////
              _this.endFn ? _this.endFn(txt) : alert(txt);       
              ////////////////
            }
          });
        }
   };
   var Lottery = {
        //奖品信息
        lotteryInfo:{
              "lottery_id": 133,
              "title": "小米应用商店抽奖（正式）",
              "lottery_icon": "http://r4.ykimg.com/0510000055DD7A6E6714C02FD407FC14",
              "begintime": "2015-08-28 00:00:00",
              "expiretime": "2015-09-05 00:00:00",
              "_inserttime": "2015-08-26 16:36:13",
              "_updatetime": "2015-08-27 14:36:49",
              "prizes": [
                  {
                      "prize_id": "604",
                      "prize_no": "1",
                      "prize_level": "一等奖",
                      "prize_name": "小米55寸电视",
                      "prize_copy": "恭喜您获得小米55寸电视1台！",
                      "prize_icon": "http://r1.ykimg.com/0510000055DD82006714C00F66069508",
                      "message_content": "【中奖通知】恭喜亲获得小米55寸电视1台，如您已经将收货信息（包括姓名、地址、手机号码）填写完成，我们会在活动结束后10个工作日内与您联系并寄出奖品，若未按提示填写收货信息或信息填写有误将均视为弃奖，感谢您的参与。",
                      "user_type": "0",
                      "remain_num": 2
                  },
                  {
                      "prize_id": "605",
                      "prize_no": "2",
                      "prize_level": "二等奖",
                      "prize_name": "Xbox One体感游戏机",
                      "prize_copy": "恭喜您获得Xbox One体感游戏机1台！",
                      "prize_icon": "http://r3.ykimg.com/0510000055DD30466714C07F120ED0AE",
                      "message_content": "【中奖通知】恭喜亲获得Xbox One体感游戏机1台，如您已经将收货信息（包括姓名、地址、手机号码）填写完成，我们会在活动结束后10个工作日内与您联系并寄出奖品，若未按提示填写收货信息或信息填写有误将均视为弃奖，感谢您的参与。",
                      "user_type": "0",
                      "remain_num": 2
                  },
                  {
                      "prize_id": "606",
                      "prize_no": "3",
                      "prize_level": "三等奖",
                      "prize_name": "小米4手机",
                      "prize_copy": "恭喜您获得小米4手机1台！",
                      "prize_icon": "http://r2.ykimg.com/0510000055DD82756714C076940163E0",
                      "message_content": "【中奖通知】恭喜亲获得小米4手机1台，如您已经将收货信息（包括姓名、地址、手机号码）填写完成，我们会在活动结束后10个工作日内与您联系并寄出奖品，若未按提示填写收货信息或信息填写有误将均视为弃奖，感谢您的参与。",
                      "user_type": "0",
                      "remain_num": 6
                  },
                  {
                      "prize_id": "611",
                      "prize_no": "4",
                      "prize_level": "四等奖",
                      "prize_name": "优酷会员周卡",
                      "prize_copy": "恭喜您获得优酷会员周卡1张！",
                      "prize_icon": "http://r3.ykimg.com/0510000055DEEA5E6714C02A7000D088",
                      "message_content": "【中奖通知】恭喜您获得优酷会员周卡1张。会员周卡使用方法：1、登录http://vip.youku.com/；2、点击”我的账户“-会员卡激活 输入密码和验证码即可。",
                      "user_type": "0",
                      "remain_num": 48
                  },
                  {
                      "prize_id": "612",
                      "prize_no": "99",
                      "prize_level": "谢谢参与",
                      "prize_name": "谢谢参与",
                      "prize_copy": "谢谢参与",
                      "prize_icon": "http://r1.ykimg.com/0510000055DEEA806714C073A0008879",
                      "message_content": "",
                      "user_type": "0",
                      "remain_num": 72442
                  }
              ],
              "tasks": []
          },
        //抽奖参数配置
        lotteryConfig:{
            id:133,//抽奖id
            sourceUrl:"http://v.youku.com/x_mLotteryInfo",//奖品信息获取接口
            actUrl:"http://v.youku.com/x_mLotteryDraw"//抽奖接口
        },
        loseNum:1,//为中奖信息显示模块数
        loseConfig:{

        },
        prizeInfo:{},//抽奖结果
        flag : true,//用于给抽奖按钮加锁
        ifContinue:true,//用于标识是否可以继续抽奖
        init : function(){
            var _width = $(".turntable").width();
            $(".turntable").height(_width);
            this.rotate = Rotate;
            this.initLottery();
            this.tipContainer = $(".tip-content");
        },
        //初始化抽奖信息
        initLottery : function(){
          /*初始化大转盘*/
          this.rotate.initOptions({containerId:"js_container",rotateDomId:"js_rotate"},this.lotteryInfo.prizes);
          this.rotate.drawRotate();
          //初始化时间信息
          var beginTime = this.lotteryInfo.begintime.split(" ")[0].split("-").join(".");
          var deadLineTime = this.lotteryInfo.expiretime.split(" ")[0].split("-").join(".");
          $("#js_dateLine").html("活动日期："+beginTime+"-"+deadLineTime);
          var _result = this.checkTime(this.lotteryInfo.begintime,this.lotteryInfo.expiretime);
          if(_result === 0){
             var _this =  this;
             $('#js_pointer').on("click",function(){
                if(_this.ifContinue && _this.flag){
                   _this.flag = false;
                   _this.checkIfLogin(_this.getLotteryInfo);
                }else{
                    _this.showResultMessage(this.error_msg,1);
                    return;
                } 
             });
          }else if(_result===-1){
              alert("活动还未开始，请您稍后再参加！");
              $('#js_pointer').on("click",function(){
                 alert("活动还未开始，请您稍后再参加！");
              });
          }else{
              alert("活动已经结束,期待您的下次参与！");
              $('#js_pointer').on("click",function(){
                 alert("活动已经结束，期待您的下次参与！");
              });
          }
        },
        /*信息获取接口*/
        getData : function(url,data,fn){
           $.ajax({
            url:url,
            type:"get",
            data:data,
            dataType:"jsonp",
            crossDomain:"true",
            success:function(data){
              fn(data);
            }
           });
        },
        checkIfLogin : function(fn){
          var _this =  this;
          if(!islogin()){
            $(document).bind("userlogin",function(){
                fn();
            });
            login();
          }else{
             fn();
          }
        },
        getLotteryInfo : function(){
            var _this = this;
            this.getData(this.lotteryConfig.sourceUrl,{"id":this.lotteryConfig.id},function(data){
               if(data && data.error_code === 0){
                 _this.lotteryInfo = data.result;
                 _this.initLottery();
               }else{
                 alert("获取信息失败，请重试!");
               }
            });
        },
        showResultMessage:function(){

        },
        //检查是否过期
        checkTime:function(sDate,dDate){
               var nowTime = new Date().getTime();
               var sTime = new Date(sDate.split("-").join("/")).getTime();
               var dTime = new Date(dDate.split("-").join("/")).getTime();
               if(nowTime >= sTime && nowTime <= dTime){
                 return 0;
               }else if(nowTime <sTime){
                 return -1;
               }else{
                  return -2;
               }
        },
   };
   win.Lottery = Lottery;
    win.onload = function(){
      /*win.Rotate = Rotate;
       Rotate.initOptions({containerId:"js_container",rotateDomId:"js_rotate"},data.prizes);
       Rotate.drawRotate();*/
       Lottery.init();
    };
       
})(window,jQuery);