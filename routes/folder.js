/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var db = require('../lib/db/index');
var Constants = require('../constants/constants');

module.exports = function(router){
    
    router.get('/folder/:id',function(req,res){
       
       db.Folder.getFolder(req.params.id,function(data){
           res.send(data);
       });
        
    });
    
    router.post('/folder',function(req,res){
       if(!req.body.name){
           res.send({error:true,message:Constants.Error.INPUT_MISSING});
       }
      
       db.Folder.addNewFolder(req.body,function(folder){
          res.send(folder); 
       });
    });
    
    router.delete('/folder/:id',function(req,res){
     db.Folder.deleteFolder(req.params.id,function(message){
         res.send(message);
     });   
    });
    
}

