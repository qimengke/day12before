//开始面板
var startDiv = document.getElementById("startDiv");
//游戏面板
var mainDiv = document.getElementById("mainDiv");
//得分板
var scoreDiv = document.getElementById("scoreDiv");
//暂停板
var suspendDiv = document.getElementById("suspendDiv");
//结束板
var endDiv = document.getElementById("endDiv");
//得分板的分数
var num = document.getElementById("label");
//结束面板里的分数
var planeScore =document.getElementById("planeScore");
//初始化的分数
var scores = 0;
var _set =""
//开始游戏
function begin(){
	startDiv.style.display="none";
	mainDiv.style.display ="block";
	scoreDiv.style.display="block";
	_set = setInterval(function(){
	   start();	
	},20);	
}


//建完飞机大类
function Plane(hp,x,y,sizeX,sizeY,score,dieTime,sudu,boomImage,imgsrc){
	this.hp =hp;
	this.x =x;
	this.y =y;
	this.sizeX =sizeX;
	this.sizeY = sizeY;
	this.score = score;
	this.dieTime = dieTime;
	this.sudu = sudu;
	this.boomImage = boomImage;
	this.imgsrc = imgsrc;
	this.planisdie=false;
	this.imagenode = null;
	this.planemove = function(){
		if(scores<=50000){
            this.imagenode.style.top = this.imagenode.offsetTop+this.sudu+"px"			
		}else if(scores>50000&&scores<=100000){
			this.imagenode.style.top = this.imagenode.offsetTop+this.sudu+1+"px"
		}else if(scores>100000&&scores<=150000){
			this.imagenode.style.top = this.imagenode.offsetTop+this.sudu+2+"px"
		}else{
			this.imagenode.style.top = this.imagenode.offsetTop+this.sudu+3+"px"
		}
	}
	this.init = function(){
		this.imagenode = document.createElement("img");
		this.imagenode.style.top = this.y+"px";
		this.imagenode.style.left = this.x+"px";
		this.imagenode.src=this.imgsrc;
		mainDiv.appendChild(this.imagenode);
	}
	this.init();
}

//创建一个子弹类
function Bullet(x,y,sizeX,sizeY,sudu,imgsrc){
	this.x =x;
	this.y =y;
	this.sizeX = sizeX;
	this.sizeY =sizeY;
	this.sudu = sudu;
	this.imgsrc = imgsrc;
	this.imagenode = null;
	this.bulletmove = function(){
		this.imagenode.style.top = this.imagenode.offsetTop -10+"px";
	}
	this.init = function(){
		this.imagenode =document.createElement("img");
		this.imagenode.style.top = this.y+"px";
		this.imagenode.style.left = this.x+"px";
		this.imagenode.src = this.imgsrc;
		mainDiv.appendChild(this.imagenode);
	}
	this.init();
}

//创建子弹
function Oddbullet(x,y){
	Bullet.call(this,x,y,6,14,1,"img/bullet1.png");
}

//var bullet = new Oddbullet(100,100);

//创建 我方飞机类
function Ourplan(X,Y){
	Plane.call(this,1,X,Y,66,80,0,600,0,"img/本方飞机爆炸.gif","img/我的飞机.gif");
	this.imagenode.setAttribute("id","ourplan")
}

//创建地方飞机类
function Enemy(hp,x,y,sizeX,sizeY,score,dieTime,sudu,boomImage,imgsrc){
	Plane.call(this,hp,random(x,y),-100,sizeX,sizeY,score,dieTime,sudu,boomImage,imgsrc);
}

//随机方法
function random(min,max){
	return min+Math.random()*(max-min);
}

//var enemy = new Enemy(6,100,100,110,164,5000,600,1,"img/大飞机爆炸.gif","img/enemy2_fly_1.png");




var selfplan = new Ourplan(120,470);
var ourplan = document.getElementById("ourplan");
//移动
var yidong = function(){
	//获取事件
	var yevent = window.event||arguments[0];
	//让 移动 这个方法 立即触发
	var chufa = yevent.srcElement||yevent.target;
	var selfPlanX = yevent.clientX;
	var selfPlanY =yevent.clientY;
	ourplan.style.top = selfPlanY-40+"px";
	ourplan.style.left =  selfPlanX-33+"px";
}

var backgroundPositionY =0;
//敌机数组
var enemys =[];
//我来建立子弹组
var bullets =[];
//规则标识
var mark =0;
var marks =0;
function start(){
	mainDiv.style.backgroundPositionY = backgroundPositionY+"px";
	backgroundPositionY+=0.5;
	if(backgroundPositionY>568){
		backgroundPositionY =0;
	}
	//游戏规则
	mark++;
	if(mark == 20){
		marks++
		if(marks==20){
			enemys.push(new Enemy(12,50,250,110,164,5000,600,1,"img/大飞机爆炸.gif","img/enemy2_fly_1.png"));
			marks =0;
		}else{
			enemys.push(new Enemy(1,20,280,34,24,500,360,random(1,4),"img/小飞机爆炸.gif","img/enemy1_fly_1.png"))
		}
		if(marks%5==0){
			enemys.push(new Enemy(6,25,270,46,60,1000,600,random(1,2),"img/中飞机爆炸.gif","img/enemy3_fly_1.png"))
		}
		mark =0;
	}
	
	var enemyslen = enemys.length;
	for(var i=0;i<enemyslen;i++){
		if(enemys[i].planisdie!=true){
		   enemys[i].planemove();	
		}
		//飞机超出 数组删除
		if(enemys[i].imagenode.offsetTop>568-enemys[i].sizeY){
			mainDiv.removeChild(enemys[i].imagenode);
			enemys.splice(i,1);
			enemyslen--;
		}
		
	}
	
    if(mark%5==0){
    	bullets.push(new Oddbullet(selfplan.imagenode.offsetLeft+20,selfplan.imagenode.offsetTop-20));
    	bullets.push(new Oddbullet(selfplan.imagenode.offsetLeft+30,selfplan.imagenode.offsetTop-30));
    	bullets.push(new Oddbullet(selfplan.imagenode.offsetLeft+40,selfplan.imagenode.offsetTop-20));
    }
    
    var bulletslen = bullets.length;
    for(var i =0;i<bulletslen;i++){
    	bullets[i].bulletmove();
    }
    
	
}

//监听
mainDiv.addEventListener("mousemove",yidong,true);