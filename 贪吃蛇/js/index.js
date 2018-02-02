
	var box = document.getElementById("box1");
	var btn = document.getElementsByTagName("button")[0];
	var btn1 = document.getElementsByTagName("button")[1]
	var btn2 = document.getElementsByTagName("button")[2]
	var grade = document.getElementById("diffic");
	var iElement = document.getElementById("math");
	var snake_fa = [];


	//设置游戏变量
	var gameSeting = {
		//初始化蛇的长度
		initsnake:3,
		//蛇的宽度
		width:20,
		//控制速度
		speed:grade.value,
		key:"right",
		//分数
		n:0,
		//检测游戏状态
		pause:0,

		fawidth:800,
		faheight:500,
	}
	
	iElement.innerHTML = gameSeting.n;

	//随机颜色函数
	function color(){
		var shu = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]
		var color = "#";
		for(var i = 0;i<6;i++){
			var random = Math.floor(Math.random()*16);
			color = color + shu[random]
		}
		return color;
	}

	//生成一节身体
	function addbody(obj){
		//生成一个div做蛇的身体
		var onebody = document.createElement("div");
		//将身体插入盒子中
		box.appendChild(onebody)
		//将身体放入蛇数组
		snake_fa.push(onebody);
		onebody.className = "jie"
		//设置蛇的身体位置
		//传入的对象中x代表一节蛇所在的left位置
		onebody.style.left = obj.x + "px";
		//y代表一节蛇的top位置
		onebody.style.top = obj.y + "px";
	}

	//初始化一条蛇
	function snak(){
		for(var i = 0;i<gameSeting.initsnake;i++){
			//调用生成蛇的函数会生成一节蛇，循环三次会生成三节蛇，那么一节的left位置就是节数乘以20，top值不变
			addbody({ x:i*gameSeting.width, y:0});//这里面的x，y的做为实参在addbody中调用
		}
	}

	//让蛇移动
	function snakemove(){
		//获取当前蛇头的位置
		var LEFT = parseInt(snake_fa[snake_fa.length-1].style.left);
		var TOP = parseInt(snake_fa[snake_fa.length-1].style.top);

		//将蛇尾复制一份放在蛇头，即将数组中的第0个身体再插入数组最后
		snake_fa[0].style.left = LEFT + gameSeting.width + "px";
		snake_fa[0].style.top = TOP + "px";

		//当方向键是右键时
		if(gameSeting.key == "rihgt"){
			//改left的值top值不变
			snake_fa[0].style.left = LEFT + gameSeting.width + "px";
			snake_fa[0].style.top = TOP + "px";
		}

		//当方向键为左时
		if(gameSeting.key == "left"){
			snake_fa[0].style.left = LEFT - gameSeting.width + "px";
			snake_fa[0].style.top = TOP + "px";	
		}

		//当方向键为上
		if(gameSeting.key == "top"){
			snake_fa[0].style.left = LEFT  + "px";
			snake_fa[0].style.top = TOP - gameSeting.width + "px";	
		}

		//当方向键为下
		if(gameSeting.key == "bottom"){
			snake_fa[0].style.left = LEFT + "px";
			snake_fa[0].style.top = TOP + gameSeting.width + "px";	
		}

		//将新的蛇头放入当前获取蛇头位置之前
		snake_fa.push(snake_fa[0]);

		//删除蛇尾，即数组中的第一个元素
		snake_fa.shift();

		//插入删除完成之后在获取蛇头的位置
		headPointer = {};
		headPointer.x = parseInt(snake_fa[snake_fa.length-1].style.left);
		headPointer.y = parseInt(snake_fa[snake_fa.length-1].style.top);

		


		//吃到食物及碰撞检测
		//如果当前蛇头的坐标等于随机食物的坐标
		if(headPointer.x==parseInt(food.style.left)&&TOP==parseInt(food.style.top)){
			//生成新食物
			newfood();
			addbody({ x:headPointer.x, y:headPointer.y});
			gameSeting.n++;
			//加分函数
			math();
		}

		godGame();


		//碰撞边缘死亡检测
		if(headPointer.x>gameSeting.fawidth-gameSeting.width||headPointer.x<0||headPointer.y>gameSeting.faheight-gameSeting.width||headPointer.y<0){
			if(gameSeting.key == "right"){
				//如果此时蛇是向右的那么将超出边界的蛇头放在蛇尾
				snake_fa[snake_fa.length-1].style.left = parseInt(snake_fa[0].style.left) - gameSeting.width + "px";
			}
			if(gameSeting.key == "left"){
				//如果此时蛇是向右的那么将超出边界的蛇头放在蛇尾
				snake_fa[snake_fa.length-1].style.left = parseInt(snake_fa[0].style.left) + gameSeting.width + "px";
			}
			if(gameSeting.key == "top"){
				//如果此时蛇是向右的那么将超出边界的蛇头放在蛇尾
				snake_fa[snake_fa.length-1].style.top = parseInt(snake_fa[0].style.top) + gameSeting.width + "px";
			}
			if(gameSeting.key == "bottom"){
				//如果此时蛇是向右的那么将超出边界的蛇头放在蛇尾
				snake_fa[snake_fa.length-1].style.top = parseInt(snake_fa[0].style.top) - gameSeting.width + "px";
			}
			clearInterval(move)
		}

		//碰撞自身死亡检测
		for(var i = 0;i<snake_fa.length-3;i++){
			//枚举身体每一节的left,top
			var L = parseInt(snake_fa[i].style.left);
			var T = parseInt(snake_fa[i].style.top);
			if(headPointer.x==L&&headPointer.y==T){
				clearInterval(move);
			}
		}
	}

	//键盘控制移动
	window.onkeydown = function(even){
		//获取方向键键值向上并且不向下时那么让gameSeting.key为top
		if(even.keyCode == 38 && gameSeting.key!=="bottom"){
			gameSeting.key = "top";
		}
		if(even.keyCode == 40 && gameSeting.key!=="top"){
			gameSeting.key = "bottom";
		}
		if(even.keyCode == 37 && gameSeting.key!=="right"){
			gameSeting.key = "left";
		}
		if(even.keyCode == 39 && gameSeting.key!=="left"){
			gameSeting.key = "right";
		}
	}

	//生成随机食物
	function newfood(){
		ranDom();
		//清除食物
		var span = document.getElementsByTagName("span")[0]
		var box = document.getElementById("box1");
		if(span){
			// console.log(span)
			box.removeChild(span)
		}
		// console.log(span)
		//向页面中插入一个节点作为食物
		food = document.createElement("span");
		box.appendChild(food)
		//设置食物的样式
		food.className = "food";
		food.style.backgroundColor = color();
		//让食物的位置随机
		food.style.top = numy*20 + "px";
		food.style.left = numx*20 + "px";
		foodPoint = {
			x:numx*20,
			y:numy*20,
		}
	}


	//生成随机位置不与蛇身重叠
	function ranDom(){
		numx = Math.floor((Math.random()*gameSeting.fawidth)/gameSeting.width);
		numy = Math.floor((Math.random()*gameSeting.faheight)/gameSeting.width);
		for(var i = 0;i<snake_fa.length;i++){
			heady = parseInt(snake_fa[i].style.top);
			headx = parseInt(snake_fa[i].style.left);
			if(headx == numx&&heady == numy){
				ranDom();
			}
		}
	}

	//设置分数动画
	function math(){
		iElement.innerHTML = gameSeting.n*20;
		iElement.style.color = color();
		iElement.className = "top";
		setTimeout(function(){
		iElement.className = "";
		},400)
	}
	snak();
	newfood();
	
	//智能模式
	function godGame(){
		//当头部x不等于食物的x时
		// console.log(headPointer.x)
		// console.log(foodPoint.x)
		if(headPointer.x!==foodPoint.x){
			//当头部x值小于食物x时
			if(headPointer.x>foodPoint.x){
				//如果此时默认是向右的
				if(gameSeting.key == "right"){
					// if()
					gameSeting.key = "top"
				}else{
					gameSeting.key = "left"
				}
			}
			if(headPointer.x<foodPoint.x){
				// console.log(1)
				if(gameSeting.key == "left"){
					// if()
					gameSeting.key = "bottom"
				}else{
					gameSeting.key = "right"
				}
			}
		}
		//当头部的y值不等于食物的y值时
		if(headPointer.y!==foodPoint.y && headPointer.x==foodPoint.x){
			if(headPointer.y < foodPoint.y){
				if(gameSeting.key == "top"){
					gameSeting.key = "left";
				}else{
					gameSeting.key = "bottom"
				}
			}
			if(headPointer.y>foodPoint.y){
				if(gameSeting.key == "bottom"){
					gameSeting.key = "left";
				}else{
					gameSeting.key = "top";
				}
			}
		}
	}

	btn.onclick = function(){
		gameSeting.puase++;
		gameSeting.speed = grade.value
		move = setInterval(function(){
			snakemove();
		},gameSeting.speed)
		btn.className = "hide";
		btn1.className = "";
	}

	btn1.onclick = function(){
		clearInterval(move);
		btn.className = "";
		btn1.className = "hide";
	}



