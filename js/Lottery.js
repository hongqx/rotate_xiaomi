(function(win,$){
   var Rotate = {
   	  config:{
   	  	colors:["#bef1f4","#85dee4","#60d0d8"],//大转盘奖品区块对应背景颜色
   	  	angle:0,//变形的角度
   	  	rotateDeg:0,//旋转的角度，通过计算获取
   	  	startDeg:-10,//转盘绘制开始的角度
   	  	itemHtml:"",//转盘中的内容
   	  	container:null
   	  },
   	  data:{},//需要展现的数据
   	  initOptions:function(options,data){
          for(var key in options){
          	this.config[key] = options[key];
          }
          this.data = data ? data : {};
          this.initDegs(_len);//初始化角度数据
   	  },
   	  //计算初始化需要旋转的角度
   	  initDegs:function(num){
          this.config.angle = 90- (360/_len);
          this.config.angle = 360/_len;
   	  },
   	  drawRotate:function(){
          var _len = data.length;
          var itemArr = [];
          //绘制转盘
          for(var i = 0 ; i < _len ;i++){
              item.push('<div class="item"></div>')
          }
   	  },
   }
})(window,jQuery);