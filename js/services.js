angular.module('starter.services', [])
    //用户数据
    .factory('User',['$http','$q',function($http,$q){

        return {};
    }])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function($http) {
      // Might use a resource here that returns a JSON array

      // Some fake testing data
      var friends = [
        { id: 0, name: 'Scruff McGruff' },
        { id: 1, name: 'G.I. Joe' },
        { id: 2, name: 'Miss Frizzle' },
        { id: 3, name: 'Ash Ketchum' }
      ];

      return {
        all: function() {
          return friends;
        },
        get: function(friendId) {
          // Simple index lookup
          return friends[friendId];
        }
      }
    })
    .factory('Items',function($http,$q){
        var deferred = $q.defer();

        return {

            all: function(){

                $http({
                    method: 'GET',
                    url: '/fsCordova/www/res/get.php',
                    params: {action: 'get', uId: '1', password: '111'}/*,
                    data: {username: 'john', password: '111'}*/
                })
                    .success(function(data){

                        if(typeof data == 'object'){
                            console.log(data);
                            deferred.resolve(data);
                        } else if(typeof data == 'string'){
                            var str = data.split(':::')[data.split(':::').length-1].split(']')[0].split('"')[0];

                            //document.body.innerHTML = eval("'" + str + "'");
                        }

                    }).error(function(data,status){

                        deferred.reject(status);
                    });

                return deferred.promise;
            },
            get: function(dashId){
                return items[dashId];
            }
        }
    });
