/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('bookmarkApp.Directives').directive('icon',function(){
    
    return {
        transclude : true,
        scope : {
          isFolder :'=isfolder'  
        },
        controller : function($scope){
            $scope.imageUrl = $scope.isFolder ? 'images/folder.jpg' : 'images/file.jpg';
        },
        template : '<img src="{{imageUrl}}" alt="files" class="image">'
    }
    
})

