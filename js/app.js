window.app = angular.module("myEle",['ngRoute']);
//路由配置
app.config(function($routeProvider){
	var routeconfig = {
		templateUrl : "view/homeSearch.html",
		controller : "homeConterller"
	} 
	var index_config = {
		templateUrl : "view/homeIndex.html",
		controller : "indexConterller"
	} 
	var login_config = {
		templateUrl : "view/homeLogin.html",
		controller : "loginConterller"
	} 
	var sort_config = {
		templateUrl : "view/sortindex.html",
		controller : "sortConterller"
	}
	$routeProvider.when("/",routeconfig).
	when("/homeIndex/:hashid",index_config).
	when("/homeLogin",login_config).
	when("/sortindex/:hashid",sort_config).
	otherwise({redirectTo:"/home"});
});
app.factory('dataCenter', function($http, $routeParams){
	//数据中心，减少重复性代码的使用
	/*var searchParam = {
		type:'geohash',
		geohash:$routeParams.hashid,
		offset:0,
		limit:20,
		'extras[]':['food_activity', 'restaurant_activity']
	}*/
	
	//整个页面需要api路径，整体配置，整体统一修改。
	var urlConfig = {
		'search': '/restapi/v4/restaurants'
	}
	//让两个对象进行合并
	//var sortParam = $.extend(filterObj, searchParam);
	/*function sendsort(obj, callback){
		//距离的搜索
		//传输的参数
		var sortParam = $.extend(obj, searchParam);
	 	$http.get(urlConfig.search, {
	 		params: sortParam//把合并之后的对象发送给后端
	 	}).then(callback);
    }
    function initsort(obj, callback){
    	var sortParam = $.extend(obj, searchParam);
    	//传输的参数

    	$http.get(urlConfig.search, {
    		params: sortParam
    	}).then(callback);
    }*/
    return {
    	urlHash: urlConfig
    }
})