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
  initOptions:function(options,data,loseConfig){
      var _data = data;
      for(var key in options){
        this.config[key] = options[key];
      }
      this.data = data ? data : [];
      //构造未中奖项
      if(loseConfig){
           var item = {};
           item["prize_icon"] = loseConfig.img;
           item["prize_name"] = loseConfig.msg;
           _data.push(item);
      }
      //初始化容器
      this.container =  $("#"+this.config.containerId);

      this.initDegs(this.data.length);//初始化角度数据
      this.drawRotate();
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
win.Rotate =  Rotate;
})(window,jQuery);
