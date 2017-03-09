angular.module('todoController', [])
    .controller('mainController', function($scope, $http) {
        $scope.formData = {};

        $http.get('/api/todos')
                .success(function(data) {
                        $scope.todos = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });

        $scope.createTodo = function() {
                $http.post('/api/todos', $scope.formData)
                        .success(function(data) {
                                $scope.formData = {};
                                $scope.todos = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
        $scope.deleteTodo = function(id) {
                $http.delete('/api/todos/' + id)
                        .success(function(data) {
                                $scope.todos = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
    
        $scope.changeTodo = function (id) {
            var taskIndex = this.$index;
            $scope.popup = true;
            $scope.editCurrentTask = $scope.todos[taskIndex].text;
            $scope.saveEdit = function () {
                $scope.popup = false;
                $http.put('/api/todos/' + $scope.editCurrentTask +'/'+  $scope.todos[taskIndex].text)
                        .success(function(data) {
                                $scope.todos = data;
                    
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
            };
            $scope.cancel = function () {
                $scope.popup = false;
            };
    };
    
    
    $scope.dragStart = function (e, ui) {
        ui.item.data('start', ui.item.index());
    };

    $scope.dragEnd = function (e, ui) {
        var start = ui.item.data('start'),
            end = ui.item.index();
        console.log(start, end);

//        $scope.taskItem.splice(end, 0, $scope.taskItem.splice(start, 1)[0]);
//        $scope.save();
    };

    $scope.sortableOptions = {
        start: $scope.dragStart,
        stop: $scope.dragEnd
    };

    });