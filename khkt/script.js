function createObject() {
   var request_type;
   var browser = navigator.appName;
   if(browser == "Microsoft Internet Explorer"){
       request_type = new ActiveXObject("Microsoft.XMLHTTP");
    }else{
       request_type = new XMLHttpRequest();
   }
     return request_type;
  }

var http = createObject();
var sendAndLoad=function(){
	var _self=this;
	this.type="POST";
	this.params="";
	this.url="";
	this.Load=null;
	this.http=http?http:new XMLHttpRequest();
	this.send=function() {
		switch(_self.type) {
		  case "POST":
			http.open('POST', _self.url,true);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
            http.setRequestHeader("Content-length", _self.params.length); 
            http.setRequestHeader("Connection", "close");
            http.onreadystatechange = _self.reply;
            http.send(_self.params);
			break;
		 case "GET":
		    _self.url = _self.url+'nocache='+Math.random();
	        http.open('get',_self.url);
            http.onreadystatechange = _self.reply;
            http.send(null);
			break;
		 default:
		}
	}
	this.reply=function() {
		if(_self.http.readyState == 4){
          var response = _self.http.responseText;
		  _self.Load(response);
		}
	}
	
}
function showlogin() {
	$('#login').css('display','inline-block');
}
function closeLogin() {
	$('#login').css('display','none');
}
function login() {
	$('#loginform').submit();
}
function showLostCode() {
	$('#lostCode').css('display','inline-block');
}
function closeLostCode(){
	$('#lostCode').css('display','none');
}
function getLostCode(){
	if ($("#email_lostCode").val()=="") {
		alert("Hãy nhập địa chỉ email đã đăng ký!");
		return;
	}
	if ($("#captcha_lostCode").val()=="") {
		alert("Hãy nhập mã xác nhận trong ảnh bên!");
		return;
	}
	var data=$("#email_lostCode").val()+"|"+$("#captcha_lostCode").val();
	var sal=new sendAndLoad();
	sal.url="getLostCode.php";
	sal.params="data="+data;
	sal.Load=function(response) {
		if (response=="OK") {
			alert("Mã dự thi đã được gửi đến địa chỉ email của ban!");
			$("#lostCode").css("display","none");
		}else{
			$("#mess_lostCode").html(response);
		}
	}
	sal.send();
}
function getPassword() {
	if ($("#usename").val()=="") {
		alert("Hãy nhập địa chỉ email của bạn để lấy lại mật khẩu!");
		return;
	}
	if ($("#text-captcha").val()=="") {
		alert("Hãy nhập mã xác nhận!");
		return;
	}
	var sal=new sendAndLoad();
	sal.url="getPassword.php";
	sal.params="email="+$("#usename").val()+"&captcha="+$("#text-captcha").val();
	sal.Load=function(response) {
		alert(response);
	}
	sal.send();
}