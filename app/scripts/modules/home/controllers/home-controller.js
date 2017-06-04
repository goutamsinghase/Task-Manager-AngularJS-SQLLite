'use strict';

module.exports = ['$scope',
  '$SQLite',
  function($scope, $SQLite) {
    console.log('home');
    $scope.formData ={};
    $scope.Tasks = [];
    
	
	function onResult(rst){
	  	console.log('successfull entry', rst);
	  	$scope.getAllTask();
	}

	function onError(err){
  		console.log('Error entry', err);
    }
    
    function onFinish(rst){
    	console.log('after delete task',rst);
    	$scope.getAllTask();
    }

    /**
    * Create task 
    **/
    $scope.createTask = function() {
      var newTaskData = {
	      name: $scope.formData.text
	  };
      $SQLite.ready(function() {
        this.insert('task', newTaskData) // this.replace
          .then(onResult, onError)
      });
    }

    /**
    * Get All task 
    **/
    $scope.getAllTask = function() {
      $SQLite.ready(function() { // The DB is created and prepared async.
        this
          .selectFirst('SELECT * FROM task')
          .then(
            function() { 
            	console.log('Empty Result!'); 
            	 $scope.Tasks = [];
        	},
            function() { console.log('Error!'); },
            function(data) {
              // Result!
              // data.item
              // data.count
              // data.result
              var res = [];
			  for (var x in data.result.rows){
			     data.result.rows.hasOwnProperty(x) && res.push(data.result.rows[x])
			  }
			  $scope.Tasks = res;
            }
          );
      });
    }

    /**
    * Edit task 
    **/
    $scope.updateTask = function($index) {
      $SQLite.ready(function() {
      	var sqlQuery = 'UPDATE task SET name = "'+$scope.Tasks[$index].name+'" WHERE id = ?';
        this.execute(sqlQuery, [$scope.Tasks[$index].id])
          .then(onFinish, onError)
      });
    }

    /**
    * Delete task 
    **/
    $scope.deleteTask = function($index){
      $SQLite.ready(function() {
        this.execute('delete from task WHERE id = ?',[$scope.Tasks[$index].id])
          .then(onFinish, onError)
      });	
    }
  }
]
