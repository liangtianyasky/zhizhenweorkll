var myApp=angular.module("myApp",[]);

myApp.controller("app",function($scope,$http){
	//按钮动画
	var a=1;
	$scope.jiantou = function(){
		if(a==1){
			$("#btn").addClass("jiantou-two").removeClass("jiantou").animate({"left":"169px"},1000);
			$("#content").animate({'width':0},1000,function(){
				$("#product-page").animate({'opacity':1},1000);
			});
			a=0;
		}else{
			$("#product-page").animate({'opacity':0},1000,function(){
				$("#content").animate({'width':'1000px'},1000);	
				$("#btn").addClass("jiantou").removeClass("jiantou-two").animate({"left":"966px"},1000);
			});
			a=1;
		}
	}
	//图片轮播动画
	var i=0;
	var z=0;
	$scope.auto = function(){
		i++
		if(i>1) i=0;
		$("#slider ul li").eq(i).animate({"opacity":0},1000,function(){
			$("#slider ul li").eq(i).siblings().css({'opacity':1,'z-index':z+=1})
		});
		
	}

	$scope.auto();
	setInterval($scope.auto,2000)
	//渲染数据
	$http.get("http://localhost/data.json")
		.success(function(data){
			$scope.message=data;
			var arr1=[];
			var arr2=[];

			var len = Math.ceil((data[0].products.length)/data[0].template_type);
			var lens = Math.ceil((data[1].products.length)/data[1].template_type);
			for (var k=0;k<len;k++){
				arr1[k]=[];
				for(var i=0;i<data[0].template_type;i++){
					arr1[k].push(data[0].products[i+data[0].template_type*k])
				}
			}
			for (var k=0;k<len;k++){
				arr2[k]=[];
				for(var i=0;i<data[1].template_type;i++){
					arr2[k].push(data[1].products[i+data[1].template_type*k])
				}
			}
			for(var i in arr1){
				for(j in arr1[i]){
					if(arr1[i][j]==undefined){
						arr1[i][j]={
							"name":"敬请期待"
						}
					}
				}
			}
			for(var i in arr2){
				for(j in arr2[i]){
					if(arr2[i][j]==undefined){
						arr2[i][j]={
							"name":"敬请期待"
						}
					}
				}
			}
			$scope.obj1=arr1;
			$scope.obj2=arr2;
		})
		.error(function(){
			alert("请求不到数据")
		});

$scope.doTab = function (){
		var k=this.$index;
		$(".product-type").eq(k).addClass('cur-type').siblings().removeClass('cur-type')
	}
$scope.asideTab = function(){
		$("#btn").addClass("jiantou-two").removeClass("jiantou").animate({"left":"169px"},1000);
			$("#content").animate({'width':0},1000,function(){
				$("#product-page").animate({'opacity':1},1000);
			});
		var k=this.$index;
		$(".product-type").eq(k).addClass('cur-type').siblings().removeClass('cur-type')
	}
$scope.getSp = function(){
	var dix = this.$index;
	$(".product-page div span").removeClass("curp").eq(dix).addClass('curp');
	$('.product-type.cur-type').stop().animate({marginTop:"-600"*dix},600)

}
})
