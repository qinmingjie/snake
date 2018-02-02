
	var box = document.getElementById("box1")
	//用来定义初始化的时候蛇的长度
	var initsnake = 3;
	//用来将生成的蛇放入数组里
	var snake_fa = [];
	//蛇的宽度
	var width = 20;
	//控制速度
	var speed = 150;
	var key = "right"
	//分数
	var n = 0;
	var fawidth = 800;
	var faheight = 500;



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
		for(var i = 0;i<initsnake;i++){
			//调用生成蛇的函数会生成一节蛇，循环三次会生成三节蛇，那么一节的left位置就是节数乘以20，top值不变
			addbody({ x:i*width, y:0});//这里面的x，y的做为实参在addbody中调用
		}
	}

	//让蛇移动
	function snakemove(){
		//获取当前蛇头的位置
		var LEFT = parseInt(snake_fa[snake_fa.length-1].style.left);
		var TOP = parseInt(snake_fa[snake_fa.length-1].style.top);
		//将蛇尾复制一份放在蛇头，即将数组中的第0个身体再插入数组最后
		snake_fa[0].style.left = LEFT + width + "px";
		snake_fa[0].style.top = TOP + "px";
		//当方向键是右键时
		if(key == "rihgt"){
			//改left的值top值不变
			snake_fa[0].style.left = LEFT + width + "px";
			snake_fa[0].style.top = TOP + "px";
		}
		//当方向键为左时
		if(key == "left"){
			snake_fa[0].style.left = LEFT - width + "px";
			snake_fa[0].style.top = TOP + "px";	
		}
		//当方向键为上
		if(key == "top"){
			snake_fa[0].style.left = LEFT  + "px";
			snake_fa[0].style.top = TOP - width + "px";	
		}
		//当方向键为下
		if(key == "bottom"){
			snake_fa[0].style.left = LEFT + "px";
			snake_fa[0].style.top = TOP + width + "px";	
		}
		//将新的蛇头放入当前获取蛇头位置之前
		snake_fa.push(snake_fa[0]);
		//删除蛇尾，即数组中的第一个元素
		snake_fa.shift();
		//插入删除完成之后在获取蛇头的位置
		var headPointer = {};
		headPointer.x = parseInt(snake_fa[snake_fa.length-1].style.left);
		headPointer.y = parseInt(snake_fa[snake_fa.length-1].style.top);
		//吃到食物及碰撞检测
		//如果当前蛇头的坐标等于随机食物的坐标
		if(headPointer.x==parseInt(food.style.left)&&TOP==parseInt(food.style.top)){
			//生成新食物
			newfood();
			addbody({ x:headPointer.x, y:headPointer.y});
			//让新食物的坐标等于蛇头前一个的的坐标
			// if(key=="right"||key=="left"){
			// 	addbody({ x:headPointer.x + 20, y:headPointer.y});
			// }
			// if(key=="left"){
			// 	addbody({ x:headPointer.x - 20, y:headPointer.y});
			// }
			// if(key=="top"){
			// 	addbody({ x:headPointer.x, y:headPointer.y - 20});
			// }
			// if(key=="right"){
			// 	addbody({ x:headPointer.x, y:headPointer.y + 20});
			// }
			n++;
			//获取分数框
			var fenshu = document.getElementById("math");
			fenshu.innerHTML = n*20;
			fenshu.style.color = color();
		}

		//再次获取数组中的位置
		var newheadPointer = {};
		newheadPointer.x = parseInt(snake_fa[snake_fa.length-1].style.left);
		newheadPointer.y = parseInt(snake_fa[snake_fa.length-1].style.top);
		//获取页面中的div,边缘检测时判断在最后一个div的值是否与边缘相等
		//死亡检测
		if(newheadPointer.x>fawidth-width||newheadPointer.x<0||newheadPointer.y>faheight-width||newheadPointer.y<0){
			if(key == "right"){
				//如果此时蛇是向右的那么将超出边界的蛇头放在蛇尾
				snake_fa[snake_fa.length-1].style.left = parseInt(snake_fa[0].style.left) - width + "px";
			}
			if(key == "left"){
				//如果此时蛇是向右的那么将超出边界的蛇头放在蛇尾
				snake_fa[snake_fa.length-1].style.left = parseInt(snake_fa[0].style.left) + width + "px";
			}
			if(key == "top"){
				//如果此时蛇是向右的那么将超出边界的蛇头放在蛇尾
				snake_fa[snake_fa.length-1].style.top = parseInt(snake_fa[0].style.top) + width + "px";
			}
			if(key == "bottom"){
				//如果此时蛇是向右的那么将超出边界的蛇头放在蛇尾
				snake_fa[snake_fa.length-1].style.top = parseInt(snake_fa[0].style.top) - width + "px";
			}
			clearInterval(move)
		}
		for(var i = 0;i<snake_fa.length-3;i++){
			var L = parseInt(snake_fa[i].style.left);
			var T = parseInt(snake_fa[i].style.top);
			if(headPointer.x==L&&headPointer.y==T){
				clearInterval(move);
			}
		}
	}




	//键盘控制移动
	window.onkeydown = function(even){
		//获取方向键键值向上并且不向下时那么让key为top
		if(even.keyCode == 38 && key!=="bottom"){
			key = "top";
		}
		if(even.keyCode == 40 && key!=="top"){
			key = "bottom";
		}
		if(even.keyCode == 37 && key!=="right"){
			key = "left";
		}
		if(even.keyCode == 39 && key!=="left"){
			key = "right";
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
	}


	//生成随机位置不与蛇身重叠
	function ranDom(){
		numx = Math.floor((Math.random()*fawidth)/width);
		numy = Math.floor((Math.random()*faheight)/width);
		for(var i = 0;i<snake_fa.length;i++){
			heady = parseInt(snake_fa[i].style.top);
			headx = parseInt(snake_fa[i].style.left);
			if(headx==numx&&heady==numy){
				ranDom();
			}
		};
	}



	//智能模式
	function godgame(){
		console.log(parseInt(food.style.left));
		console.log(parseInt(food.style.top));
	}
	godgame();

	var btn = document.getElementsByTagName("button")[0];
	var btn1 = document.getElementsByTagName("button")[1]
	var	span1 = 0;
	snak();
	newfood();
	btn.onclick = function(){
		// console.log(span1)
		if(span1==0){
			move = setInterval(function(){
				snakemove();
			},speed)
			span1++
		}else{
			clearInterval(move)
			span1 = 0;
		}
	}
