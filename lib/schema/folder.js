/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');

var folderSchema = new mongoose.Schema({
    name : {type:String},
    parent : {type:String}
})

module.exports = folderSchema;

