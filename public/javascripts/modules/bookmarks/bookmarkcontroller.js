/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('bookmarkApp.Controllers').controller('bookmarkCtrl', ['$scope', 'BookmarkService', '$uibModal', 'ngToast', function ($scope, BookmarkService, $uibModal, ngToast) {

        function getAllContent() {
            BookmarkService.Bookmark.query(function (data) {
                $scope.allBookmarks = data;
                console.log('fetched data', data);
            });
        }
        ;
        getAllContent();

        $scope.breadCum = [{id: 'parent', name: 'Bookmarks'}];

        $scope.createBookmark = createBookmark;
        $scope.deleteBookmark = deleteBookmark;
        $scope.addToFolder = addToFolder;

        $scope.createFolder = createFolder;
        $scope.deleteFolder = deleteFolder;
        $scope.getFolderContent = getFolderContent;

        function createBookmark() {

            var modalInstance = $uibModal.open({
                templateUrl: 'javascripts/modules/bookmarks/modal/createBookmark.html',
                controller: 'dialogController',
                scope: $scope
            });

            modalInstance.result.then(function (bookmark) {
                var len = $scope.breadCum.length;
                if (len > 1) {
                    var parent = $scope.breadCum[$scope.breadCum.length - 1].id;
                    bookmark.parent = parent;
                }
                BookmarkService.Bookmark.save(bookmark, function (data) {
                    //show toast
                    if (len > 1) {
                        $scope.getFolderContent({id: parent})
                    } else {
                        $scope.allBookmarks.push(data);
                    }

                }, function (errResponse) {
                    //show toast
                });
            }, function () {
                //cancel the dialog
            });

        }
        ;

        function deleteBookmark(id) {
            BookmarkService.Bookmark.delete({id: id}, function (data) {
                $scope.allBookmarks = _.reject($scope.allBookmarks, {id: id});
                //show toast
            }, function (err) {
                //show toast
            });
        }
        ;

        function addToFolder(bookmarkId) {

            var modalInstance = $uibModal.open({
                templateUrl: 'javascripts/modules/bookmarks/modal/addToFolder.html',
                controller: 'dialogController',
                scope: $scope
            });

            modalInstance.result.then(function (folder) {
                BookmarkService.Bookmark.update({id: bookmarkId}, {folderId: folder.id}, function (data) {
                    var index = _.findIndex($scope.allBookmarks, {id: bookmarkId});
                    $scope.allBookmarks.splice(index, 1);
                }, function (err) {

                })
            }, function () {
                //cancel the dialog
            });


        }
        ;

        function createFolder() {

            var modalInstance = $uibModal.open({
                templateUrl: 'javascripts/modules/bookmarks/modal/createFolder.html',
                controller: 'dialogController',
                scope: $scope
            });

            modalInstance.result.then(function (folderName) {
                var newFolder = {name: folderName},
                len = $scope.breadCum.length;
                if (len > 1) {
                    var parent = $scope.breadCum[$scope.breadCum.length - 1].id;
                    newFolder.parent = parent;
                }
                BookmarkService.Folder.save(newFolder, function (data) {
                    if (len > 1) {
                        $scope.getFolderContent({id: parent})
                    } else {
                        $scope.allBookmarks.push(data);
                    }
                    //show toast
                }, function (err) {
                    //show toast
                });
            }, function () {
                //cancel the dialog
            });
        }
        ;

        function deleteFolder(id) {
            BookmarkService.Folder.delete({id: id}, function (data) {
                //show toast
                $scope.allBookmarks = _.reject($scope.allBookmarks, {id: id});
            }, function (err) {
                //show Toast
            });
        }
        ;

        function getFolderContent(folder) {
            var index;
            if (folder.id === 'parent') {
                getAllContent();

            } else {
                BookmarkService.Folder.query({id: folder.id}, function (data) {
                    $scope.allBookmarks = data;
                    //show toast
                }, function (err) {
                    //show toast
                })
            }
            index = _.findIndex($scope.breadCum, {id: folder.id})
            if (index != -1) {
                $scope.breadCum.splice(index + 1, ($scope.breadCum.length - index + 1));
            } else {
                $scope.breadCum.push({id: folder.id, name: folder.name});
            }
        }
    }]);

angular.module('bookmarkApp.Controllers').controller('dialogController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

        $scope.folders = _.where($scope.allBookmarks, {isFolder: true});

        $scope.createFolder = function (folderName) {
            $uibModalInstance.close(folderName);
        }

        $scope.addToFolder = function (folder) {
            $uibModalInstance.close(folder);
        }

        $scope.createBookmark = function (bookmark) {
            $uibModalInstance.close(bookmark);
        }

        $scope.close = function () {
            $uibModalInstance.dismiss();
        }

    }])

