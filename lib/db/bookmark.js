var db = require('../schema/index');
var Constants = require('../../constants/constants');

module.exports = {
    getAllBookmark : function(callback){
      db.Bookmark.find({$or:[{parent : {$exists:false}},{parent:null}]},function(err,data){
         if(err) console.log(err);
         if(data){
             data = data.map(function(item){
                 item = item.toObject();
                 item.id = item._id;
                 return item;
             });
         }
         callback(data || []);
      });  
    },
    createBookmark : function(data,callback){
        var newBookmark = new db.Bookmark(data);
        newBookmark.save(function(err,bookmark){
           if(err){
               callback({error:true,message:Constants.Error.Bookmark.CREATE_FAILED})
           }else{
               bookmark = bookmark.toObject();
               bookmark.id = bookmark._id;
               callback(bookmark);
           } 
        });
    },
    addToFolder:function(data,callback){
      db.Bookmark.findOneAndUpdate({_id:data.id},{$set:{parent : data.folderId}},{new:true},function(err,bookmark){
          if(err){
              callback({error:true,message:Constants.Error.Bookmark.ADD_TO_FOLDER_FAILED});
          }else{
              bookmark = bookmark.toObject();
              bookmark.id = bookmark._id;
              callback(bookmark);
          }
      });  
      
    },
    deleteBookmark : function(id,callback){
        db.Bookmark.remove({_id:id},function(err,data){
           if(err){
               callback({error:true,message:Constants.Error.Bookmark.DELETE_FAILED})
           }else{
               callback(Constants.Success.Bookmark.DELETED);
           } 
        });
    }
}