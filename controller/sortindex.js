app.controller("sortConterller",function($scope, $routeParams, $filter,$http, dataCenter){
	$scope.pageName = $routeParams.target_name;
	$scope.sortConfig = {
		url: dataCenter.urlHash.search,
		param: {}
	};
	var filterObj = {};
	if($routeParams.filter_key) {
		filterObj = JSON.parse($routeParams.filter_key);
	}
	if(filterObj.restaurant_category_id) {
		filterObj.restaurant_category_id = filterObj.restaurant_category_id.id;
	}
	//利用angularjs路由器对象，实现多个变化参数的请求
	
	/*$http.get('/restapi/v4/restaurants', {
		params: {
			type:'geohash',
			geohash:$routeParams.hashid,
			offset:0,
			limit:20,
			'extras[]':['food_activity', 'restaurant_activity']
		}
	}).then(function(res){
		$scope.nearbylist = res.data;
	});*/
	/*
	dataCenter.initsort(filterObj, function(res){
		$scope.nearbylist = res.data;
	});*/
	$scope.number_click = function(){
		$scope.sortConfig.param = {
			restaurant_category_id: filterObj.restaurant_category_id,
			sortby:'recent_order_num'
		}
	}
	$scope.distance_click = function(){
		$scope.sortConfig.param = {
			restaurant_category_id: filterObj.restaurant_category_id,
			sortby: 'distance'
		}
		/*$http.get('/restapi/v4/restaurants', {
			params: {
				type:'geohash',
				geohash:$routeParams.hashid,
				offset:0,
				limit:20,
				'extras[]':['food_activity', 'restaurant_activity'],
				restaurant_category_id:207,
				sortby:'distance'
			}
		}).then(function(res){
			$scope.nearbylist = res.data;
		});*/
		/*filterObj.sortby = "distance"
		dataCenter.sendsort(filterObj, function(res){
			$scope.nearbylist = res.data;
		});*/
			
	}
})