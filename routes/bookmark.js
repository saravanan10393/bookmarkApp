
var db = require('../lib/db/index');
var Constants = require('../constants/constants');
module.exports = function(router){
    
    router.get('/bookmark',function(req,res){
        db.Bookmark.getAllBookmark(function(bookmarks){
            res.json(bookmarks);
        });
    });
    
    router.post('/bookmark',function(req,res){
        if(!req.body.name || !req.body.url){
            res.send({error:true,message:Constants.Error.INPUT_MISSING});
        }
        
        db.Bookmark.createBookmark(req.body,function(data){
            res.json(data);
        });
        
    });
    
    router.put('/bookmark/:id',function(req,res){
       if(!req.body.folderId){
           res.send({error:true,message:Constants.Error.INPUT_MISSING});
       }
       db.Bookmark.addToFolder({id:req.params.id,folderId:req.body.folderId},function(data){
           res.send(data);
       });
    });
    
    router.delete('/bookmark/:id',function(req,res){
       db.Bookmark.deleteBookmark(req.params.id,function(message){
           res.send(message);
       }); 
    });
    
}
