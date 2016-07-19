app.controller("homeConterller",function($scope, $routeParams, $filter,$http){
	$scope.pageName = "首页地理位置搜索";
	$scope.exact_place = "美都广场";
	
	$scope.select_key = "ele";
	$scope.search_loading = false;

	window.jsonp_mt = function(data){
		console.log(data.pois);
		$scope.$apply(function(){
			$scope.placeList = data.pois;
		});		
	} 
	var searchHash = {
		"ele" : {
			sendAjax:function(){
				$http.get("/restapi/v1/pois?city_id=2&keyword="+$scope.exact_place+"&type=search").then(function(res){
					$scope.search_loading = false;
					$scope.content_home = true;
					$scope.placeList = res.data;
				})
			}
		},
		"mtuan" : {
			sendAjax:function(){
				$scope.content_home = true;
				$scope.search_loading = false;
				var str = "http://restapi.amap.com/v3/place/text?s=rsv3&key=3f3868abdb36336114bde5ab6eecdb68&types=%E5%95%86%E5%8A%A1%E4%BD%8F%E5%AE%85%7C%E5%AD%A6%E6%A0%A1%E4%BF%A1%E6%81%AF%7C%E7%94%9F%E6%B4%BB%E6%9C%8D%E5%8A%A1%7C%E5%85%AC%E5%8F%B8%E4%BC%81%E4%B8%9A%7C%E9%A4%90%E9%A5%AE%E6%9C%8D%E5%8A%A1%7C%E8%B4%AD%E7%89%A9%E6%9C%8D%E5%8A%A1%7C%E4%BD%8F%E5%AE%BF%E6%9C%8D%E5%8A%A1%7C%E4%BA%A4%E9%80%9A%E8%AE%BE%E6%96%BD%E6%9C%8D%E5%8A%A1%7C%E5%A8%B1%E4%B9%90%E5%9C%BA%E6%89%80%7C%E5%8C%BB%E9%99%A2%E7%B1%BB%E5%9E%8B%7C%E9%93%B6%E8%A1%8C%E7%B1%BB%E5%9E%8B%7C%E9%A3%8E%E6%99%AF%E5%90%8D%E8%83%9C%7C%E7%A7%91%E6%95%99%E6%96%87%E5%8C%96%E6%9C%8D%E5%8A%A1%7C%E6%B1%BD%E8%BD%A6%E6%9C%8D%E5%8A%A1&offset=10&city=%E6%9D%AD%E5%B7%9E&page=1&language=zh_cn&callback=jsonp_mt&platform=JS&logversion=2.0&sdkversion=1.3&appname=http%3A%2F%2Fi.waimai.meituan.com%2Fhangzhou&csid=29D97840-78BC-4CA1-B8BF-A43E5440A098&keywords="+$scope.exact_place;
				$http.jsonp(str,function(res){
					
				})
			}
		},
		"bdu" : {
			sendAjax:function(){
				$http.get("/waimai?qt=poisearch&ie=utf-8&sug=0&tn=B_NORMAL_MAP&oue=1&res=1",{
					params:{
						wd: $scope.exact_place,
	                    _t: +new Date,
	                    lat: "",
	                    lng: ""
	                }
				}).then(function(res){
					$scope.search_loading = false;
					$scope.content_home = true;
					$scope.placeList = res.data.result.content;
				})
			}
		}
	}


	$scope.$watch("select_key",function(newvalue){
		console.log($scope.select_key);
	})

	$scope.search_click = function(){
		$scope.search_loading = true;
		$scope.content_home = false;
		searchHash[$scope.select_key].sendAjax();
	}

	/*$scope.ele_click = function(){
		$.ajax({
			url : "/restapi/v1/pois?city_id=2&keyword="+$scope.exact_place+"&type=search",
			type : "get",
			success : function(res){
				$scope.$apply(function(){
					$scope.placeList = res;
				});
			}
		})
	}
	
	//美团外卖
	$scope.mt_click = function(){
		var str = "http://restapi.amap.com/v3/place/text?s=rsv3&key=3f3868abdb36336114bde5ab6eecdb68&types=%E5%95%86%E5%8A%A1%E4%BD%8F%E5%AE%85%7C%E5%AD%A6%E6%A0%A1%E4%BF%A1%E6%81%AF%7C%E7%94%9F%E6%B4%BB%E6%9C%8D%E5%8A%A1%7C%E5%85%AC%E5%8F%B8%E4%BC%81%E4%B8%9A%7C%E9%A4%90%E9%A5%AE%E6%9C%8D%E5%8A%A1%7C%E8%B4%AD%E7%89%A9%E6%9C%8D%E5%8A%A1%7C%E4%BD%8F%E5%AE%BF%E6%9C%8D%E5%8A%A1%7C%E4%BA%A4%E9%80%9A%E8%AE%BE%E6%96%BD%E6%9C%8D%E5%8A%A1%7C%E5%A8%B1%E4%B9%90%E5%9C%BA%E6%89%80%7C%E5%8C%BB%E9%99%A2%E7%B1%BB%E5%9E%8B%7C%E9%93%B6%E8%A1%8C%E7%B1%BB%E5%9E%8B%7C%E9%A3%8E%E6%99%AF%E5%90%8D%E8%83%9C%7C%E7%A7%91%E6%95%99%E6%96%87%E5%8C%96%E6%9C%8D%E5%8A%A1%7C%E6%B1%BD%E8%BD%A6%E6%9C%8D%E5%8A%A1&offset=10&city=%E6%9D%AD%E5%B7%9E&page=1&language=zh_cn&callback=jsonp_mt&platform=JS&logversion=2.0&sdkversion=1.3&appname=http%3A%2F%2Fi.waimai.meituan.com%2Fhangzhou&csid=29D97840-78BC-4CA1-B8BF-A43E5440A098&keywords="+$scope.exact_place;
		var script = document.createElement("script");
		script.src = str;
		$("body").append(script);
	}
	//百度外卖
	$scope.bd_click = function(){
		$.ajax({
            url: "/waimai?qt=poisearch&ie=utf-8&sug=0&tn=B_NORMAL_MAP&oue=1&res=1",
            data: {
          		wd: $scope.exact_place,
                _t: +new Date,
                lat: "",
                lng: ""
          	},
            dataType: "json",
            success: function(res) {
            	$scope.$apply(function(){
					$scope.placeList = res.result.content;
				});        	
            },
            error: function(res) {
               console.log(res);
            }
	    })
	}*/


})