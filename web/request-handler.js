var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var httpHelpers = require ('./http-helpers');
var urlParser = require('url')

exports.handleRequest = function (req, res) {
  console.log('handleRequest ......');

  var parts = urlParser.parse(req.url);
  var pathname = urlParser.parse(req.url).pathname;

  //console.log('handleRequest PARTS:', parts)
  //console.log('handler request url: ', req.url);

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

    } else {//localhost:3000/archive/sites/google.com

      fs.readFile(archive.paths.archivedSites + pathname, function (err, data) {
        // if pathname exists
        //  ...

        // if path name doesnt exist
        // sned 404

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
    //console.log('head... ', req.headers);
      var data = [];
      req.on('data', function(chunk) {
        data.push(chunk);
         // console.log("Body chunk: ", JSON.parse(chunk.toString()) );
      });

      req.on('end', () => {
        data = Buffer.concat(data).toString().split('=')[1];
        //data = JSON.stringify({url: data});
        console.log('HERE IS THE DATA', data);
        archive.addUrlToList(data, () => {
          res.writeHead(302, httpHelpers.headers);
          res.end(data);
        })

      });



    }

  }

  //res.end(archive.paths.list);
};
