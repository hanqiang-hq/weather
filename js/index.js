var weather;

$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=吕梁",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather = obj.data.weather;
		console.log(weather);
	}
})

var city;
$.ajax({
	url:'https://www.toutiao.com/stream/widget/local_weather/city/',
	dataType:'jsonp',
	type:'get',
	success:function(o){
		//console.log(o);
		city = o.data;
		console.log(city);
	}	
})

function updata(){
	// 城市名称
	var city_name=document.querySelector(".city");
	city_name.innerHTML=weather.city_name;

	// 当前温度
	var temperature=document.querySelector(".tempature");
	temperature.innerHTML=weather.current_temperature+"°";
	console.log(temperature);

	// 当前天气情况
	var condition=document.querySelector(".condition");
	condition.innerHTML=weather.current_condition;

	// 今天的最高温
	var dat_high_temperature=document.querySelector("#dat_high_temperature");
	dat_high_temperature.innerHTML=weather.dat_high_temperature;

	// 今天的最低温
	var dat_low_temperature=document.querySelector("#dat_low_temperature");
	dat_low_temperature.innerHTML=weather.dat_low_temperature+"°";

	// 今天icon
	var dat_weather_icon_id=document.querySelector("#dat_weather_icon_id");
	dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png)`;

	// 明天的天气情况
	
	// 数组类型的对象
	for(var i in weather.hourly_forecast){
		// 创建now元素
		// 1、创建div
		var now=document.createElement("div");
		// 2、添加类名
		now.className="now";
		// 3、插入到页面中
		 //获取父元素
		var wrap=document.querySelector(".wrap");
		wrap.appendChild(now);

		// 创建时间元素
		var h2=document.createElement("h2");
		h2.className="now_time";
		h2.innerHTML=weather.hourly_forecast[i].hour+":00";
		now.appendChild(h2);

		// icon
		var icon=document.createElement("div");
		icon.className="now_icon";
		icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png)`
		now.appendChild(icon);
		//温度
		var temp=document.createElement("h2");
		temp.className="now_temp";
		temp.innerHTML=weather.hourly_forecast[i].temperature+"°";
		now.appendChild(temp);
}
// 声明变量是字符串类型
var str="";
// 循环  es6  模板字符串
weather.hourly_forecast.forEach((item,index)=>{
	str=str+`
		<div class="con">
			<h2 class="con_weaH">${item.hour}:00</h2>
			<div class="con_picH" style="background-image:url(img/'+weather.forecast_list[i].weather_icon_id+'.png)"></div>
			<h2 class="con_high">${item.temperature}°</h2>
		</div>
		`
})
$(".wrap").html(str);
//近期天气情况
for(var i in weather.forecast_list){
		var warp1=document.querySelector(".warp1");
		var str = '';
		str += '<div class="con">';
		str += '<div class="con_date">'+weather.forecast_list[i].date.slice(5,7) +'/'+weather.forecast_list[i].date.slice(8)+'</div>'; 
		str += '<div class="con_weaH">'+weather.forecast_list[i].condition+'</div>';
		str += '<div class="con_picH" style="background-image:url(img/'+weather.forecast_list[i].weather_icon_id+'.png)"></div>';
		str += '<div class="con_high">'+weather.forecast_list[i].high_temperature+'°'+'</div>';
		str += '<div class="con_low">'+weather.forecast_list[i].low_temperature+'°'+'</div>';
		str += '<div class="con_wind">'+weather.forecast_list[i].wind_direction+'</div>';
		str += '<div class="con_level">'+weather.forecast_list[i].wind_level+'级</div>';
		str += '</div>';
		
		//console.log(str);
		warp1.innerHTML += str;
			
			


			// 2018-04-01
			// var a="2018-04-01";
			// var b=a.slice(5.7);
			// console.log(b);
			// var c=a.slice(8);
			// console.log(c);
			// var d=b+"/"+c;
			// console.log(d);
			// 
			// 
		}


for(var i in city){
			console.log(i);
			var p=document.createElement("p");
			var ul=document.createElement("ul");
			var city_box=document.querySelector(".city-list");
			p.innerHTML=i;
			for(var j in city[i]){
				console.log(j);
				var li=document.createElement("li");
				li.innerHTML=j;
				ul.appendChild(li);
				}
			city_box.appendChild(p);
			city_box.appendChild(ul);



	// 输出
	// console.log(city[i]);


	for(var n in city[i]){
		var son=document.createElement("div");
		son.className="son";
	}

		}				
}
function AJAX(str){
	var url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
	$.ajax({
		url:url1,
		dataType:"jsonp",
		type:"get",
		success:function(obj){
			// 获取数据
			weather=obj.data.weather;
			// 渲染数据
			updata();
			// 让城市盒子消失
			$(".loaction").css({"display":"none"});
		}
	})
}

function show(){
	var city = document.querySelector('.city'),
		cityChild = document.querySelector('.city-option');
		city.onclick=function(){
			cityChild.style.display='block';

		}
}
window.onload=function(){
	updata();
	show();

	$('li').on("click",function(){
		var cityhtml=this.innerHTML;
		console.log(cityhtml);
		AJAX(cityhtml);
	})
	$(".inp").on("focus",function(){
		$(".s-right").html("搜索");
	})


// 操作按钮
var button=document.querySelector(".s-right");
// 点击  取消  loaction消失  搜索  str1=="城市"
button.onclick=function(){
	var text=this.innerText;
	console.log(text);   
	if(text=="取消"){
		$(".city-option").css({"display":"none"});
	}
	else{
		// 获取input中输入的内容
		var str1=document.querySelector("input").value;
		for(var i in city){
			for(var j in city[i]){
				if(str1==j){
					AJAX(str1);
					return;
				}else{
					$(".s-right").html("取消");
				}
			}
		}
		alert("没有该城市");
	}
}


}