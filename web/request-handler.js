var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var httpHelpers = require ('./http-helpers');

exports.handleRequest = function (req, res) {
  console.log('handleRequest ......')
  if (req.method === 'GET') {

    fs.readFile(archive.paths.siteAssets + '/index.html', function (err, data) {
      if ( err ) {
        throw err;
      } else {
        res.writeHead(200, httpHelpers.headers);
        res.end(data);
      }
    });

  }

  //res.end(archive.paths.list);
};
