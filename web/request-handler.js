var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var httpHelpers = require ('./http-helpers');
var urlParser = require('url')

exports.handleRequest = function (req, res) {
  console.log('handleRequest ......');

  var pathname = urlParser.parse(req.url).pathname;

  console.log(' handler request url: ', req.url);

  if ( req.method === 'GET' ) {

    if ( pathname === '/' ) {
      fs.readFile(archive.paths.siteAssets + '/index.html', function (err, data) {
        if ( err ) {
          throw err;
        } else {
          res.writeHead(200, httpHelpers.headers);
          res.end(data);
        }
      });

    } else {

      fs.readFile(archive.paths.archivedSites + pathname, function (err, data) {
        if ( err ) {
          // throw err;
          res.writeHead(404, httpHelpers.headers);
          res.end('File does not exist');
        } else {
          res.writeHead(200, httpHelpers.headers);
          res.end(data);
        }
      });

    }


  }

  if ( req.method === 'POST' ) {
    console.log('POST request....')
    // ' www.snapchat.com'
    // get the website name
    // read the list of websites in our archive
    //
    // if the name we want to post alread  exists in our archive (sites.txt)
    //   dont add name to the list
    // else
    //  add it to our list
    if ( pathname === '/' ) {
    console.log('head... ', req.headers);




    }

  }

  //res.end(archive.paths.list);
};
