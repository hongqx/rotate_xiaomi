(function(win,$){
   var Rotate = {
      config:{
        colors:["#bef1f4","#85dee4","#60d0d8"],//大转盘奖品区块对应背景颜色
        angle:0,//变形的角度
        rotateDeg:0,//旋转的角度，通过计算获取
        startDeg:0,//转盘绘制开始的角度
        containerId:null,
        bRotate:false
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
      rotateFn : function (total,item,txt,fn){
          this.endFn =  fn;
          var angles = item * (360 / total) - (360 / (total*2))+270;
          console.info("转动的角度为："+angles);
         /* if(angles<270){
            angles = 270 - angles; 
          }else{
            angles = 360 - angles + 270;
          }*/
          this.container.stopRotate();
          var _this =this;
          this.container.rotate({
            angle:0,
            animateTo:angles,
            duration:1000,
            callback:function (){
              _this.config.bRotate = !_this.config.bRotate;
              ////////////////
              _this.endFn? _this.endFn(txt):alert(txt);       
              ////////////////
            }
          });
        }
   };
   var data = {
        "lottery_id": 132,
        "create_id": "xujiahui",
        "create_source": 0,
        "update_id": "xujiahui",
        "update_source": 0,
        "summary": "",
        "title": "小米应用商店抽奖（张哲）",
        "callback": "",
        "luck_draw_obj": 1,
        "one_day_win_num": 99,
        "one_cycle_win_num": 99,
        "one_day_draw_num": 99,
        "lottery_icon": "http://r4.ykimg.com/0510000055DACE576714C06D3B09716F",
        "layer_top_img": "",
        "layer_left_img": "",
        "layer_center_img": "",
        "act_copy": "",
        "status": 1,
        "risk_control_switch": 0,
        "defense_switch": 0,
        "effective_type": 0,
        "begintime": "2015-08-24 16:40:00",
        "expiretime": "2015-09-04 23:55:00",
        "_inserttime": "2015-08-24 15:57:27",
        "_updatetime": "2015-08-26 11:18:29",
        "prizes": [
        {
        "prize_id": "581",
        "prize_no": "1",
        "prize_level": "一等奖",
        "prize_name": "小米电视55寸",
        "prize_copy": "恭喜您获得小米电视55寸1台！",
        "prize_icon": "http://r3.ykimg.com/0510000055DD303A6714C05A8A014061"
        },
        {
        "prize_id": "582",
        "prize_no": "2",
        "prize_level": "二等奖",
        "prize_name": "Xbox One体感游戏机",
        "prize_copy": "恭喜您获得Xbox One体感游戏机1部！",
        "prize_icon": "http://r3.ykimg.com/0510000055DD30466714C07F120ED0AE"
        },
        {
        "prize_id": "583",
        "prize_no": "3",
        "prize_level": "三等奖",
        "prize_name": "小米4手机",
        "prize_copy": "恭喜您获得小米4手机1部！",
        "prize_icon": "http://r1.ykimg.com/0510000055DD30586714C067F20D2F52"
        },
        {
        "prize_id": "596",
        "prize_no": "4",
        "prize_level": "四等奖",
        "prize_name": "优酷会员周卡",
        "prize_copy": "恭喜您获得优酷会员周卡1张！",
        "prize_icon": "http://r4.ykimg.com/0510000055DD30BF6714C0660603E3FC"
        },
        {
        "prize_id": "597",
        "prize_no": "99",
        "prize_level": "谢谢参与",
        "prize_name": "谢谢参与！",
        "prize_copy": "谢谢参与！",
        "prize_icon": "http://r4.ykimg.com/0510000055DD30EB6714C00B6F0DECBB"
        }
        ],
        "tasks": []
        };
        win.onload = function(){
          win.Rotate = Rotate;
           Rotate.initOptions({containerId:"js_rotate"},data.prizes);
           Rotate.drawRotate();
        }
       
})(window,jQuery);