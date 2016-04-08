/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('bookmarkApp.Factories').factory('BookmarkService',function($http,$resource,appConstants){
   
   var bookmarkService = {},
   bookmarkApiUrl = appConstants.apiUrl + 'bookmark/:id',
   folderApiUrl = appConstants.apiUrl + 'folder/:id';
   
   bookmarkService.Bookmark = 
        $resource(bookmarkApiUrl,{id:''},{
          query : {method:"GET",isArray:true},
          save : {method:"POST"},
          delete : {method : "DELETE"},
          update : {method:'PUT'} 
       });
   
   
   bookmarkService.Folder = (function(){
       return $resource(folderApiUrl,{id:''},{
          get : {method : "GET",params:{id:''},isArray:false},
          save : {method:"POST"},
          delete : {method : "DELETE"}
       });
   })();
   
   return bookmarkService;
    
});

