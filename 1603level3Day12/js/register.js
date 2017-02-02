$(function(){});
function _register(){
    var name = $("#register_name").val();
    var psw = $("#register_psw").val();
    var repsw = $("#register_repsw").val();
    if(name == ""){
    	alert("请输入用户名")
    }else{
    	if(psw == ""){
    		alert("请输入密码")
    	}else{
    		if(psw != repsw){
    			alert("两次密码输入不一致")
    		}else{
    			var user = getUser(name,psw);
    			toRegister(user);
    		}
    	}
    	
    }
    
    
}

function getUser(name,psw){
	var user ={
		userID:name,
		password:psw
	}
	return user;
}

function toRegister(user){
	$.ajax({
		type:"post",
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		data:{status:"register",userID:user.userID,password:user.password},
		success:function(data){
			if(data==0){
				alert("用户名重名");
			}
			if(data==1){
				alert("亲 注册成功了哟");
			}
			if(data==2){
				alert("浏览器出现异常");
			}
		}
	})
}
