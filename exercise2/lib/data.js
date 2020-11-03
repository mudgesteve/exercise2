/*
 * Library for storing and editing data
 *
 */

// Dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');
var util = require('util');
var debug = util.debuglog('data');

// Container for module (to be exported)
var lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname,'/../.data/');

// Write data to a file
lib.create = function(dir,file,data,callback){

  //console.log(`Sunday -- [[00][23][48]] -- METHOD: lib.create ---------- PARAMS: $<{(dir,file,data,callback)}> ---------- PURPOSE: Write to file ---------- RETURNS: $<{(error message)}> stringData: ${stringData}, fileDescriptor:`, fileDescriptor);
  
  // Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData,function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file, it may already exist');
    }
  });

};
// End of lib.create



// Read data from a file
lib.read = function(dir,file,callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', function(err,data){
    if(!err && data){
      var parsedData = helpers.parseJsonToObject(data);
      callback(false,parsedData);
    } else {
      callback(err,data);
    }
  });
};
// End of lib.read



// Update data in a file
lib.update = function(dir,file,data,callback){

  //console.log(`Sunday -- [[00][35][16]] -- METHOD: lib.update ---------- PARAMS: $<{(dir,file,data,callback)}> ---------- PURPOSE: To write to file Update ---------- RETURNS:  $<{(err, stringData)}> -->, ${data}`);

  // Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Truncate the file
      fs.ftruncate(fileDescriptor,function(err){
        if(!err){
          // Write to file and close it
          fs.writeFile(fileDescriptor, stringData,function(err){
            if(!err){
              fs.close(fileDescriptor,function(err){
                if(!err){
                  callback(false);
                } else {
                  callback('Error closing existing file');
                }
              });
            } else {
              callback('Error writing to existing file');
            }
          });
        } else {
          callback('Error truncating file');
        }
      });
    } else {
      callback('Could not open file for updating, it may not exist yet');
    }
  });

};
// End lib.update



// Delete a file
lib.delete = function(dir,file,callback){

  //console.log(`Sunday -- [[00][38][03]] -- METHOD: lib.delete ---------- PARAMS: $<{(dir,file,callback)}> ---------- PURPOSE: Delete a file ---------- RETURNS: $<{(err)}> -->, ${err}: err file: ${file}`);

  // Unlink the file from the filesystem
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err){
    callback(err);
  });

};
// End lib.delete



// List all the items in a directory
lib.list = function(dir,callback){

  //console.log(`Sunday -- [[00][41][30]] -- METHOD: lib.list ---------- PARAMS: $<{(dir,callback)}> ---------- PURPOSE: Build List of files ---------- RETURNS: $<{(err, data)}> -->, err: trimmedFileNames err file: data`);

  fs.readdir(lib.baseDir+dir+'/', function(err,data){
    if(!err && data && data.length > 0){
      var trimmedFileNames = [];
      data.forEach(function(fileName){
        trimmedFileNames.push(fileName.replace('.json',''));
      });
      callback(false,trimmedFileNames);
    } else {
      callback(err,data);
    }
  });
};
// End lib.list



// Export the module
module.exports = lib;
