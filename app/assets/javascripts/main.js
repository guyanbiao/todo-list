var todo_list = angular.module('todo_list', []);

todo_list.config([
    "$httpProvider", function($httpProvider) {
      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }]);

todo_list.controller('MainCtrl', ["$scope", "$http", function ($scope, $http) {
  //TODO 错误处理
  $scope.phones = [];
  $scope.project_items = [];
  $scope.current_pr_id = "";
  $scope.add_new_item = function() {
    //TODO 空字符验证
    $http.post("/api/projects", {title: $scope.project_name}).
      success(function(data) {
        $scope.phones = data;
      }).error(function() {})
  }
  
  $scope.change_project = function(id) {
    load_items(id);
    $scope.current_pr_id = id;
  }

  function load_items(id) {
    $http.get("/api/projects/" + id + "/items").success(function(data) {
      $scope.project_items = data;
    });
  }
  function load_data() {
    $http.get('/api/projects').
  success(function(data) {
    $scope.phones = data;
    if (data.length > 0) {
      $scope.change_project(data[0].id);
    }
  })}

  
  load_data();
}]);

