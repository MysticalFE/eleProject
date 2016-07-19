app.directive("resList", function($http, $routeParams){
	//此组件现在拥有产生内容以及执行的能力

	var linkFunction = function(scope, element, attr){
		    //此方法是组件本身所关联的行为
			scope.$watch(attr.url, function(newvalue, oldvalue){
				var searchParam = {
					type:'geohash',
					geohash:$routeParams.hashid,
					offset:0,
					limit:20,
					'extras[]':['food_activity', 'restaurant_activity']
				}
				$http.get(newvalue.url, {
					params: $.extend(searchParam, newvalue.param)
				}).then(function(res){
					console.log('home',res.data);
					scope.nearbylist = res.data;
				});
				
			}, true);
			console.log($routeParams);
	}
	var contentstr =    '<dl ng-repeat="item in nearbylist">' +
						'	<dt>' +
						'		<img class="logo" src="http://fuss10.elemecdn.com/e/fa/f254bef6894407107457e7fe8535djpeg.jpeg?imageMogr/quality/75/format/webp/thumbnail/!96x96r/gravity/Center/crop/96x96/">' +
						'		<!-- <img class="premium" src=""> -->	' +
						'	</dt>' +
						'	<dd>gyf{{item.name}}{{item.distance}}米---->{{item.recent_order_num}}单</dd>' +
						'</dl>'
	return {
		restrict: "E", //暴露的一个元素，若是‘A’则是属性
		link: linkFunction,
		template: contentstr
	}
})