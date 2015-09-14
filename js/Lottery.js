(function(win,$){
   var Lottery = {
        //奖品信息
        lotteryInfo:null,
        //抽奖参数配置
        lotteryConfig:{
            id:132,//抽奖id
            sourceUrl:"http://v.youku.com/x_mLotteryInfo",//奖品信息获取接口
            actUrl:"http://v.youku.com/x_mLotteryDraw"//抽奖接口
        },
        loseConfig:{
          img:'http://r4.ykimg.com/0510000055DD30EB6714C00B6F0DECBB',
          msg:"谢谢参与！"
        },
        prizeInfo:null,//抽奖结果
        flag : true,//用于给抽奖按钮加锁
        ifContinue:true,//用于标识是否可以继续抽奖
        ifFirst:true,
        init : function(){
            var _width = $(".turntable").width();
            $(".turntable").height(_width);
            this.tipContainer = $(".tip-content");
            /*this.rotate = Rotate;*/
            /*if(this.lotteryInfo){
               this.initLottery();
            }*/
            this.getLotteryInfo();
        },
        //初始化抽奖信息
        initLottery : function(){
          /*初始化大转盘*/
          Rotate.initOptions({containerId:"js_container",rotateDomId:"js_rotate"},this.lotteryInfo.prizes,this.loseConfig);
          //this.rotate.drawRotate();
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
                   //
                  /* if(_this.ifFirst){
                      _this.checkIfLogin(_this.getLotteryInfo);
                   }else{
                      _this.checkIfLogin(_this.getLotteryInfo);
                   }*/
                   //检查登录情况
                  _this.checkIfLogin();
                   
                }else{
                    //如果不能继续了，直接显示提示信息
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
        /**
         *登录状态检查接口
         *fn为回调函数
         */
        checkIfLogin : function(){
          var _this =  this;
          if(!islogin()){
            $(document).bind("userlogin",function(){
                _this.actLottery();
            });
            login();
          }else{
             _this.actLottery();
          }
        },
        /**
         *抽奖信息获取接口
         */
        getLotteryInfo : function(){
            var _this = this;
            this.getData(this.lotteryConfig.sourceUrl,{"id":this.lotteryConfig.id,"uid":""},function(data){
               if(data && data.error_code === 0){
                 _this.lotteryInfo = data.result;
                 //_this.ifFirst = false;
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
        /**
         * 请求后台接口，进行抽奖
         */
        actLottery : function(){
            var _this = this;
            var data ={
              "id":_this.lotteryConfig.id,
              "source":location.href
            }
            this.getData(this.lotteryConfig.actUrl,data,function(data){
               _this.checkActResult(data);
            });
        },
        /**
         * 抽奖结果处理
         * @param  {Object} data 接口返回数据
         * @return 
         */
        checkActResult : function(data){
            var _code = data.error_code;
            this.error_msg = data.error_content ? data.error_content:"用户当日没有抽奖机会!!";
            switch(_code){
                //正常
                case 0:
                    this.prizeInfo = data.prize;
                    //正常结果，开始显示结果
                    this.show(this.prizeInfo.prize_no);
                    break;
                //未登录
                case -2:
                   login();
                   break;
                //未中奖
                case -21:
                   var item = this.lotteryInfo.prizes.length+1;
                   this.show(item);
                   break;
                //用户当日没有抽奖机会了
                case -22:
                   this.ifContinue = false;
                   //显示提示信息
                   this.showErrorMessage();
                   break;
                default:
                   this.ifContinue = false;
                   this.showErrorMessage();
                   break;
            }
        },
        /**
         * 显示抽奖结果
         * @return {[type]} [description]
         */
        show : function(num){
           var msg = this.prizeInfo ? this.prizeInfo.prize_copy : this.error_msg;
           var _this = this;
           Rotate.rotateFn(num,this.error_msg,_this.showResultMessage);
        }
   };
   win.Lottery = Lottery;
    win.onload = function(){
      /*win.Rotate = Rotate;
       Rotate.initOptions({containerId:"js_container",rotateDomId:"js_rotate"},data.prizes);
       Rotate.drawRotate();*/
       Lottery.init();
    };
       
})(window,jQuery);