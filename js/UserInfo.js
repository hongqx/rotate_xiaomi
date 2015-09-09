function UserInfo(data){
  this.infoDoms = $("#js_info input");
  this.container = $("#js_info"); 
  this.data = data ? data :{};
  /*this.data.lid=132;
  this.data.pid=581;*/
  this.infoUrl ="http://v.youku.com/x_mLotteryUserInfo";
  this.flag = false;//为提交数据时间加锁
  this.showUserInfo = function(){
        $(".tip-content").show();
        $(".mask").show();
        $("#js_info").show();
        this.bindEvent();
  };
  
  this.bindEvent = function(){
      var _this = this;
        this.container.on("focus","input",function(){
           var data_msg = $(this).attr("data-msg");
           $(this).attr("placeholder","");
           $(this).parent().removeClass("itermerror");
           //$(this).attr("daitermerrorta-msg",$(this).attr("placeholder"));
           if($(this).val() ===data_msg){
              $(this).val("");
           }
           
       });
       this.container.on("blur","input",function(){
           var data_msg = $(this).attr("data-msg");
           if($(this).val() ==="" || $(this).val()===data_msg){
              _this.showItemError(this);
           }
           
       });
       this.showItemError = function(dom){
            var data_msg = $(dom).attr("data-msg");
            $(dom).parent().addClass("itermerror");
            $(dom).val(data_msg);
       };
        this.container.on("click","button",function(){
          //console.info(_this);
          if(!_this.flag){
            if(!_this.checkUserInfo()){
               //_this.showError();
               return;
            }else{
               _this.sendUserInfo();
            }
          }else{
            return ;
          }
           
       });
  };
  this.sendUserInfo = function(){
     var _this = this;
     this.flag = true;
         $.ajax({
          url:this.infoUrl,
          type:"get",
          data:this.data,
          dataType:"jsonp",
          crossDomain:"true",
            success:function(data){
              _this.showResult(data);
            }
         });
  };
  this.clearInfo = function(){
      for(var i = 0 ; i < this.infoDoms.length; i++){
        var _dom = this.infoDoms[i];
        $(_dom).val("");
        $(_dom).attr("placeholder",$(_dom).attr("data-msg"));
      }
      this.data = {};
  };
  this.showResult = function(data){
    this.flag=false;
        if(data.error_code===0){
            this.container.hide();
            this.clearInfo();
            $("#js_fail").html('<div class="thanks">信息提交成功！</div>');
            $("#js_fail").show();
            setTimeout(function(){
               $(".js_fail").hide();
               $(".tip-content").hide();
               $(".mask").hide();
            }, 4000);
        }else{
            $("#js_submit").html("提交异常，请再次提交！");
        }

  };
  this.filter = function(str){
      str = str.replace(/[`~!@$%^&*()_+<>?:"{},.\/;'[\]]/g, "");
      return str;
  };
  this.checkUserInfo = function(){
    var  re = /^1\d{10}$/;
    var _this = this;
    var _name  = $(_this.infoDoms[0]).val();
        var _tel =  $(_this.infoDoms[1]).val();
        var _addr = $(_this.infoDoms[2]).val();
        if(!re.test(_tel)){
            this.showItemError(_this.infoDoms[1]);
            return false;
        }else if(_name < 3){
            this.showItemError(_this.infoDoms[0]);
            return false;
        }else if(_addr < 4){
          this.showItemError(_this.infoDoms[2]);
          return false;
        }
        this.data.name = _this.filter(_name);
        this.data.tel = _this.filter(_tel);
        this.data.addr = _this.filter(_addr);
        return true;
  };
  this.showError = function(){
        this.container.hide();
  };
  this.showUserInfo();
}