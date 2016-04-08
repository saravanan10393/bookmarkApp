/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');

var bookMarkSchema = new mongoose.Schema({
    name : {type:String},
    url : {type : String},
    parent :{type : String},
    isFolder: {type: Boolean,default:false}
})

module.exports = bookMarkSchema;