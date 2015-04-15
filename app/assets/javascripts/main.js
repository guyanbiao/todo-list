
$.fn.rotate = function(degrees, step, current) {
  var self = $(this);
  current = current || 0;
  step = step || 5;
  current += step;
  self.css({
    '-webkit-transform' : 'rotate(' + current + 'deg)',
    '-moz-transform' : 'rotate(' + current + 'deg)',
    '-ms-transform' : 'rotate(' + current + 'deg)',
    'transform' : 'rotate(' + current + 'deg)'
  });
  if (current != degrees) {
    setTimeout(function() {
      self.rotate(degrees, step, current);
    }, 5);
  }
};

function is_mobile() {
 return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return undefined;
}

angular.module('myFilters', []).filter('unfinished', function() {
  return function(input, take_effect) {
    if (take_effect)
      return input.filter(function(x) {return !x.finished});
    else
      return input
  };
});

var todo_list = angular.module('todo_list', ['myFilters']);
todo_list.config([
    "$httpProvider", function($httpProvider) {
      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }]);

todo_list.controller('MainCtrl', ["$scope", "$http", function ($scope, $http) {
  //TODO 错误处理
  $scope.projects = [];
  $scope.project_items = [];
  $scope.current_pr = {};
  $scope.f_open = false;
  $scope.rm_pr = function() {
    if (!$scope.current_pr.id) return alert("请先创建项目")
    var r = confirm("确定删除项目");
    if (r) {
      $http.delete("/api/projects/" + $scope.current_pr.id).
        success(function(data) {
          $scope.projects = data;
          if (data[0]) {
            $scope.change_project(data[0].id);
          } else {
            createCookie("selected_pr_id", "");
            $scope.current_pr = {};
            $scope.project_items = [];
          }
        })
    }
  }
  $scope.add_project = function() {
    //TODO 空字符验证
    $http.post("/api/projects", {title: $scope.project_name}).
      success(function(data) {
        $scope.projects = data;
        $scope.project_name = ""
        $scope.change_project(data[data.length - 1].id)
      }).error(function() {})
  }

  $scope.show_finished = function() {
    $scope.f_open = !$scope.f_open;
  }

  $scope.unf_count = function(p) {
    return p.filter(function(x) {return !x.finished}).length;
  }


  $scope.current_angle = 0
  $scope.toggle_pr = function(duration) {
    duration = duration || 300
    $(".projects_main").slideToggle(duration);
    if ($scope.current_angle == 0) {
      $(".menu_down").rotate(90);
      $scope.current_angle = 90;
    } else {
      $(".menu_down").rotate(0, -5, 90);
      $scope.current_angle = 0;
    }
    createCookie("angle", $scope.current_angle);
  }

  $scope.add_item = function() {
    if (!$scope.current_pr.id) return alert("请先创建项目")
    $http.post("/api/projects/" + $scope.current_pr.id + "/items",
      {content: $scope.content}).
      success(function(data) {
        $scope.project_items = data
        $scope.content = ""
      })
  }
  
  $scope.change_project = function(id, hide) {
    load_items(id);
    var pr = $scope.projects.filter(function(x) {return x.id == id})[0]
    $scope.current_pr = pr;
    createCookie("selected_pr_id", id);
    //$(".add_item_group input").focus();
    if(is_mobile() && hide)
      $scope.toggle_pr();
  }

  $scope.toggle_status = function(id) {
    $http.post("/api/items/" + id + "/toggle").success(function() {
      var item = $scope.project_items.filter(function(x) {return x.id == id})[0];
      item.finished = !item.finished;
    })
  }

  function load_items(id) {
    $http.get("/api/projects/" + id + "/items").success(function(data) {
      $scope.project_items = data;
    });
  }
  function init() {
    var angle = getCookie("angle");
    if (angle == "90") {
      $scope.toggle_pr(1);
    }
    $http.get('/api/projects').
      success(function(data) {
        $scope.projects = data;
        if (data.length > 0) {
          var pr_id = getCookie("selected_pr_id")
          if (pr_id && pr_id.length > 0) 
            $scope.change_project(pr_id);
          else
            $scope.change_project(data[0].id);
        }
      })}

  init();
}]);

