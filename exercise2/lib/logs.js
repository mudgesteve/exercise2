/*
 * Library for storing and rotating logs
 *
 */

// Dependencies
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var util = require('util');
var debug = util.debuglog('logs');

// Container for module (to be exported)
var lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname,'/../.logs/');

// Append a string to a file. Create the file if it does not exist
lib.append = function(file,str,callback){

  //console.log(`Sunday -- [[00][51][48]] -- METHOD: lib.append ---------- PARAMS: $<{(file,str,callback)}> ---------- PURPOSE: Update/Create ---------- RETURNS: $<{(err, data)}> -->, err fileDescriptor`);

  // Open the file for appending
  fs.open(lib.baseDir+file+'.log', 'a', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Append to file and close it
      fs.appendFile(fileDescriptor, str+'\n',function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing file that was being appended');
            }
          });
        } else {
          callback('Error appending to file');
        }
      });
    } else {
      callback('Could open file for appending');
    }
  });
};
// End lib.append



// List all the logs, and optionally include the compressed logs
lib.list = function(includeCompressedLogs,callback){

//console.log(`Sunday - [[00][56][12]] -- METHOD: $<{METHOD}> -- PARAMS: $<{(includeCompressedLogs,callback)}> - PURPOSE: List Logs with zip option - RETURNS: $<{(err, data)}> -->, data trimmedFileNames: trimmedFileNames error: err includeCompressedLogs: ${includeCompressedLogs}`);

  fs.readdir(lib.baseDir, function(err,data){
    if(!err && data && data.length > 0){
      var trimmedFileNames = [];
      data.forEach(function(fileName){

        // Add the .log files
        if(fileName.indexOf('.log') > -1){
          trimmedFileNames.push(fileName.replace('.log',''));
        }

        // Add the .gz files
        if(fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs){
          trimmedFileNames.push(fileName.replace('.gz.b64',''));
        }

      });
      callback(false,trimmedFileNames);
    } else {
      callback(err,data);
    }
  });
};
// End lib.list



// Compress the contents of one .log file into a .gz.b64 file within the same directory
lib.compress = function(logId,newFileId,callback){

  //console.log(`Sunday -- [[01][02][32]] -- METHOD: lib.compress --- PARAMS: $<{(logId,newFileId,callback)> --- PURPOSE: Compress .log to .gzb64 same dir ---> RETURNS: $<{(err, data)}> -->, err inputString fileDescriptor`);

  var sourceFile = logId+'.log';
  var destFile = newFileId+'.gz.b64';

  // Read the source file
  fs.readFile(lib.baseDir+sourceFile, 'utf8', function(err,inputString){
    if(!err && inputString){
      // Compress the data using gzip
      zlib.gzip(inputString,function(err,buffer){
        if(!err && buffer){
          // Send the data to the destination file
          fs.open(lib.baseDir+destFile, 'wx', function(err, fileDescriptor){
            if(!err && fileDescriptor){
              // Write to the destination file
              fs.writeFile(fileDescriptor, buffer.toString('base64'),function(err){
                if(!err){
                  // Close the destination file
                  fs.close(fileDescriptor,function(err){
                    if(!err){
                      callback(false);
                    } else {
                      callback(err);
                    }
                  });
                } else {
                  callback(err);
                }
              });
            } else {
              callback(err);
            }
          });
        } else {
          callback(err);
        }
      });

    } else {
      callback(err);
    }
  });
};
// End lib.compress



// Decompress the contents of a .gz file into a string variable
lib.decompress = function(fileId,callback){

  //console.log(`Sunday -- [[01][07][42]] -- METHOD: lib.decompress ---------- PARAMS: $<{(fileId,callback)}> ---------- PURPOSE: Decompress to Str ---------- RETURNS: $<{(err, data)}> -->, err: ${err}`);

  var fileName = fileId+'.gz.b64';
  fs.readFile(lib.baseDir+fileName, 'utf8', function(err,str){
    if(!err && str){
      // Inflate the data
      var inputBuffer = Buffer.from(str, 'base64');
      zlib.unzip(inputBuffer,function(err,outputBuffer){
        if(!err && outputBuffer){
          // Callback
          var str = outputBuffer.toString();
          callback(false,str);
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};
// End lib.decompress



// Truncate a log file
lib.truncate = function(logId,callback){

  //console.log(`Sunday -- [[01][10][26]] -- METHOD: lib.truncate ---------- PARAMS: $<{(data,callback)}> ---------- PURPOSE: $<{PURPOSE}> ---------- RETURNS: $<{(err)}> -->, err`);

  fs.truncate(lib.baseDir+logId+'.log', 0, function(err){
    if(!err){
      callback(false);
    } else {
      callback(err);
    }
  });
};
// End lib.truncate



// Export the module
module.exports = lib;
