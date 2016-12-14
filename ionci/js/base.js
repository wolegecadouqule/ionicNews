var app = angular.module('ionicApp', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('index', {
			url: '/index',
			templateUrl: 'template/index.html',
			controller: 'indexCtrl'
		}).state('index.domestic', {
			url: '/domestic',
			templateUrl: 'template/domestic.html',
			controller: 'domesticCtrl'
		}).state('index.game', {
			url: '/game',
			templateUrl: 'template/game.html',
			controller: 'gameCtrl'
		}).state('index.international', {
			url: '/international',
			templateUrl: 'template/international.html',
			controller: 'internationalCtrl'
		}).state('details', {
			url: '/details/:number/:id/:name',
			templateUrl: 'template/details.html',
			controller: 'detailsCtrl'
		})

		$urlRouterProvider.when('', '/index/domestic')
	})
	//主控制器
app.controller('indexCtrl', ['$scope', '$ionicSideMenuDelegate', '$http', '$rootScope', function($scope, $ionicSideMenuDelegate, $http, $rootScope) {

	$http.jsonp('channel.php', {
		params: {
			callback: 'JSON_CALLBACK'
		}
	}).success(function(data) {
		console.log(data)
		$scope.channel = data.showapi_res_body.channelList
	})
	$scope.tabs = [{
		name: '国内焦点',
		url: '#/index/domestic',
		bool:true
	}, {
		name: '游戏焦点',
		url: '#/index/game',
		bool:false
	}, {
		name: '国际焦点',
		url: '#/index/international',
		bool:false
	}, {
		name: '国际焦点',
		url: '#/index/game',
		bool:false
	}, {
		name: '国际焦点',
		url: '#/index/game',
		bool:false
	}, {
		name: '国际焦点',
		url: '#/index/game',
		bool:false
	}, {
		name: '国际焦点',
		url: '#/index/game',
		bool:false
	}, {
		name: '国际焦点',
		url: '#/index/game',
		bool:false
	}, {
		name: '国际焦点',
		url: '#/index/game',
		bool:false
	}, ]
	$scope.toggle = function(e,index) {
		
		window.location.href = e;
		
		for(var i = 0 ;i<$scope.tabs.length;i++){
			$scope.tabs[i].bool = false;
		}
		
		$scope.tabs[index].bool = !$scope.tabs[index].bool;
		
		
	};
	$scope.toggleLeftSideMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
		
	};

}]);
//详情页控制器
app.controller('detailsCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
		console.log($state)

		$http.jsonp('news.php', {
			params: {
				channelName: $state.params.name,
				channelId: $state.params.id,
				callback: 'JSON_CALLBACK',
				page: 1
			}
		}).success(function(data) {
			$scope.htmlNews = data.showapi_res_body.pagebean.contentlist[$state.params.number];
			console.log($scope.htmlNews)
		});

		$scope.tabs = function() {
			window.history.back()
		}

	}])
	//domestic国内新闻控制器
app.controller('domesticCtrl', ['$scope', '$ionicSideMenuDelegate', '$http', function($scope, $ionicSideMenuDelegate, $http) {
	$scope.searchConten = ""
	$scope.page = 1;
	$http.jsonp('news.php', {
		params: {
			page: $scope.page,
			channelId: '5572a109b3cdc86cf39001db',
			channelName: '国内最新',
			callback: 'JSON_CALLBACK'
		}
	}).success(function(data) {
		console.log(data);
		$scope.page++;
		$scope.news = data.showapi_res_body.pagebean.contentlist;
	});

	$scope.doRefresh = function() {
		$http.jsonp('news.php', {
			params: {
				page: $scope.page,
				channelId: '5572a109b3cdc86cf39001db',
				channelName: '国内最新',
				callback: 'JSON_CALLBACK'
			}
		}).success(function(data) {
			console.log(data);
			$scope.page++;
			$scope.news = $scope.news.concat(data.showapi_res_body.pagebean.contentlist)
		}).finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	}
}]);
//游戏焦点控制器
app.controller('gameCtrl', ['$scope', '$ionicSideMenuDelegate', '$http', function($scope, $ionicSideMenuDelegate, $http) {
	$scope.toggleLeftSideMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();

	};

	$scope.page = 1;
	$http.jsonp('news.php', {
		params: {
			page: $scope.page,
			channelId: '5572a108b3cdc86cf39001d6',
			channelName: '游戏焦点',
			callback: 'JSON_CALLBACK'
		}
	}).success(function(data) {
		console.log(data);
		$scope.page++;
		$scope.news = data.showapi_res_body.pagebean.contentlist;
	});

	$scope.doRefresh = function() {
		$http.jsonp('news.php', {
			params: {
				page: $scope.page,
				channelId: '5572a108b3cdc86cf39001d6',
				channelName: '游戏焦点',
				callback: 'JSON_CALLBACK'
			}
		}).success(function(data) {
			console.log(data);
			$scope.page++;
			$scope.news = $scope.news.concat(data.showapi_res_body.pagebean.contentlist)
		}).finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	}
}]);
//international 国际焦点控制器
app.controller('internationalCtrl', ['$scope', '$ionicSideMenuDelegate', '$http', function($scope, $ionicSideMenuDelegate, $http) {
	$scope.toggleLeftSideMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();

	};

	$scope.page = 1;
	$http.jsonp('news.php', {
		params: {
			page: $scope.page,
			channelId: '5572a108b3cdc86cf39001ce',
			channelName: '国际焦点',
			callback: 'JSON_CALLBACK'
		}
	}).success(function(data) {
		console.log(data);
		$scope.page++;
		$scope.news = data.showapi_res_body.pagebean.contentlist;
	});

	$scope.doRefresh = function() {
		$http.jsonp('news.php', {
			params: {
				page: $scope.page,
				channelId: '5572a108b3cdc86cf39001ce',
				channelName: '国际焦点',
				callback: 'JSON_CALLBACK'
			}
		}).success(function(data) {
			console.log(data);
			$scope.page++;
			$scope.news = $scope.news.concat(data.showapi_res_body.pagebean.contentlist)
		}).finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	}
}]);
//轮播图的组件
app.directive('ngSwiper', function() {
	return {
		templateUrl: 'directive/swiper.html',
		link: function(scope, ele, attr) {
			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				autoplay: 3000,
				speed: 1000,
				autoplayDisableOnInteraction: false
			});
		}
	}
})