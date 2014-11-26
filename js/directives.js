
angular.module('starter.directives', [])

    .directive('refreshCode',function($ionicGesture){
        return function(scope,elem,attr){
            //刷新验证码
            /*
             angular.element(document.querySelector('#authcode')).click(function(){
             console.log(angular.element(document.querySelector('#authcode')).src);
             });*/
            $ionicGesture.on('tap',function(e){
                e.target.src = "res/authcode.php?" + Math.random();
                console.log(e.target.src)
            },elem);

        }
    });