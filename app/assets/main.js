var todo_list = angular.module('todo_list', []);

todo_list.controller('MainCtrl', function ($scope) {
    $scope.phones = [
      {'name': 'Nexus S',
             'snippet': 'Fast just got faster with Nexus S.'},
      {'name': 'Motorola XOOM™ with Wi-Fi',
             'snippet': 'The Next, Next Generation tablet.'},
      {'name': 'MOTOROLA XOOM™',
             'snippet': 'The Next, Next Generation tablet.'}
  ];
});

