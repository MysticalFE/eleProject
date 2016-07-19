app.controller("indexConterller",function($scope, $routeParams, $filter,$http, dataCenter){
	$scope.pageName = "登录";
	$scope.search_home = "饿了么首页显示";
	$scope.geohash = $routeParams.hashid;
	$scope.homeConfig = {
		url: dataCenter.urlHash.search,
		param: {}
	};
	$http.get('/restapi/v2/index_entry?geohash='+$routeParams.hashid+'&group_type=1&flags[]=F').then(function(res){
		for(var i = 0; i< res.data.length; i++) {
			var str = res.data[i].link;
			res.data[i].link = res.data[i].link.substring(str.indexOf('?'));
		}
		$scope.typelist = res.data;
	})

	$scope.offset = 0;

	/*$http.get('/restapi/v4/restaurants?type=geohash&geohash='+$routeParams.hashid+'&offset=0&limit=20&extras[]=food_activity&extras[]=restaurant_activity').then(function(res){
		$scope.nearbylist = res.data;
	})*/

	$scope.loadMore = function(){
		if ($scope.busy) {
			return false;
		} 
		$scope.busy = true;
		$http.get('/restapi/v4/restaurants?type=geohash&geohash='+$routeParams.hashid+'&offset='+($scope.offset+=20)+'&limit=20&extras[]=food_activity&extras[]=restaurant_activity').then(function(res){
			$scope.busy = false;
			for(var i in res.data){
				$scope.nearbylist.push(res.data[i]);
			}		
		})
	}
})

app.directive('whenScrolled',function($window){
	return function(scope,element,attr){
		angular.element($window).bind("scroll",function(){
			scope.visible = false;
			var el = element[0];
			var bodyheight = $("body").height();
			if (el.offsetTop+el.offsetHeight >= bodyheight) {
				scope.$apply(attr.whenScrolled);
			} 
		})
	}
})
 /// "http://fuss10.elemecdn.com/"+{{item.image_url}}+"?imageMogr/quality/75/format/webp/" //图片地址
