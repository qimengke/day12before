$(function(){
	var data = localStorage.getItem("user");
	if(data&&data!=""){
		$("#login_name").val(JSON.parse(data).userID);
		$("#login_psw").val(JSON.parse(data).password);
	}
	
	
})
function _login(){
	var name = $("#login_name").val();
	var psw  = $("#login_psw").val();
	if(name == ""){
		alert("请输入姓名")
	}else{
		if(psw == ""){
			alert("请输入密码")
		}else{
			var user  = getUser(name,psw);
			toLogin(user);
		}
	}
	
	
}

function getUser(name,psw){
	var user = {
		userID:name,
		password:psw
	}
	return user;
}


function toLogin(user){
	var check = $("#checked").attr("checked");
	$.get(" http://datainfo.duapp.com/shopdata/userinfo.php",{status:"login",userID:user.userID,password:user.password},function(data){
		if(data.charAt(0)=="{"){
			alert("登录成功");
			if(check){
		          var str = '{"userID":"'+user.userID+'","password":"'+user.password+'"}';
		          localStorage.setItem("user",str);
	           }
		}else{
			alert("登录失败");
		}
		
	})
	
	
}
