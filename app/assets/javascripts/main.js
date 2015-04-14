var todo_list = angular.module('todo_list', []);

todo_list.config([
    "$httpProvider", function($httpProvider) {
      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }]);

todo_list.controller('MainCtrl', ["$scope", "$http", function ($scope, $http) {
  //TODO 错误处理
  $scope.projects = [];
  $scope.project_items = [];
  $scope.current_pr = {};
  $scope.add_project = function() {
    //TODO 空字符验证
    $http.post("/api/projects", {title: $scope.project_name}).
      success(function(data) {
        $scope.projects = data;
      }).error(function() {})
  }

  $scope.add_item = function() {
    $http.post("/api/projects/" + $scope.current_pr.id + "/items",
      {content: $scope.content}).
      success(function(data) {
        $scope.project_items = data
      })
  }
  
  $scope.change_project = function(id) {
    load_items(id);
    var pr = $scope.projects.filter(function(x) {return x.id == id})[0]
    $scope.current_pr = pr;
  }

  $scope.toggle_status = function(id) {
    $http.post("/api/items/" + id + "/toggle").success(function() {
    })
  }

  function load_items(id) {
    $http.get("/api/projects/" + id + "/items").success(function(data) {
      $scope.project_items = data;
    });
  }
  function load_data() {
    $http.get('/api/projects').
  success(function(data) {
    $scope.projects = data;
    if (data.length > 0) {
      $scope.change_project(data[0].id);
    }
  })}

  load_data();
}]);

