var db = require('../schema/index');
var Constants = require('../../constants/constants');
var _ = require('underscore')._;

module.exports = {
    getFolder: function (id, callback) {
        db.Bookmark.find({parent: id}, function (err, data) {
            if (err) {
                callback({err: true, message: Constants.Error.Folder.GET_FAILED});
            } else {
                if (data) {
                    data = data.map(function (item) {
                         item = item.toObject();
                        item.id = item._id;
                        return item;
                    });
                }
                callback(data);
            }
        });
    },
    addNewFolder: function (data, callback) {
        console.log('folder data ', data);
        data.isFolder = true;

        var newFolder = new db.Bookmark(data);

        newFolder.save(function (err, folder) {
            if (err) {
                callback({error: true, message: Constants.Error.Folder.CREATE_FAILD});
            } else {
                 folder = folder.toObject();
                folder.id = folder._id;
                callback(folder);
            }
        });
    },
    deleteFolder: function deleteFolder(id, callback) {
        callback = callback || function () {};
        db.Bookmark.find({parent: id}, function (err, data) {
            if (err) {
                callback({error: true, message: Constants.Error.Bookmark.DELETE_FAILED});
            } else if (data.length > 0) {
                var childFolders = _.where(data, {isFolder: true});
                var childBookmarks = _.where(data, {isFolder: false});

                _.each(childBookmarks, function (bookmark) {
                    removeBookmark(bookmark._id);
                });

                _.each(childFolders, function (childFolder) {
                    deleteFolder(childFolder._id);
                    removeBookmark(childFolder._id);
                });
                removeBookmark(id);
                callback(Constants.Success.Bookmark.DELETED);
            } else {
                db.Bookmark.remove({_id: id}, function (err, data) {
                    if (err) {
                        callback({error: true, message: Constants.Error.Bookmark.DELETE_FAILED});
                    } else {
                        callback(Constants.Success.Bookmark.DELETED);
                    }
                });
            }
        });

        function removeBookmark(id) {
            db.Bookmark.remove({_id: id}, function (err, data) {
                console.log(err);
            });
        }
    }
}

