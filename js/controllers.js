angular.module('starter.controllers', [])

    .controller('MainCtrl',function($scope,$rootScope,$ionicLoading,$state,$http,User){
        $scope.user = {};

        $scope.$on('login',function(e,d){
            $rootScope.logined = User.logined = true;
            sessionStorage.setItem('logined',true);

            $state.go('tab.dash');
            $scope.$broadcast('logined');
            console.log('已经登录')
        });
        $scope.$on('logout',function(e,d){
            $state.go('tab.login');
            $rootScope.logined = false;
            console.log('已经退出');
        });

        $scope.login = function(){//console.log($scope.user);
            $http({
                method: 'POST',
                data: { action: 'login' , name: $scope.user.name , pwd: $scope.user.pwd},
                url: '/fsCordova/www/res/get.php'
            }).success(function(data){

                if(data.num > 0){
                    $scope.$broadcast('login');
                } else {
                    $scope.loginerr = true;
                }
            }).error(function(data,status){
                console.log(status);
            });
        }
    })
    .controller('DashCtrl', function($scope,$rootScope,$http,$ionicLoading,Items,User) {

        if(sessionStorage.getItem('logined')){
            $scope.loadingIndication = $ionicLoading.show({
                template: '<i class="icon ion-loading-a iLoading"></i>',
                animation: 'fade-in',
                showBackdrop: true
            });

            if(!localStorage.getItem('items')){
                Items.all().then(function(data){
                    $scope.items = data;
                    $ionicLoading.hide();
                    //localStorage.setItem('items',JSON.stringify(data));
                },(function(err){
                    console.log(err);
                }));
            } else {
                $scope.items = JSON.parse(localStorage.getItem('items'));console.log($scope.items)
            }
        }

        $scope.logout = function(){
            $scope.$emit('logout');
        }

    })
    .controller('DashDetailCtrl',function(
        $scope, $stateParams,$timeout,Items
        ){
        $scope.item = Items.get($stateParams.dashId);


    })

    .controller('FriendsCtrl', function($scope, Friends) {
      $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
      $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function($scope) {
    });
