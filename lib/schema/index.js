/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');

var models = {};

mongoose.connection.open("localhost",'bookmarks',27017);

models.Bookmark =  mongoose.model('Bookmark',require('./bookmark'));
//models.Folder =  mongoose.model('Folder',require('./folder'));

module.exports = models;
