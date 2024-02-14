
const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the dist directory
//app.use(express.static(path.join(__dirname, 'dist', 'eshop')));
//app.use(express.static('./dist/eshop'));
app.use(express.static(path.join(__dirname, 'eshop')));

app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });
  
  app.get('*.css', (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css');
    next();
  });


//Option 1
/**/ app.use(express.static(path.join(__dirname, 'dist', 'eshop')
, {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        } 
        else if(path.endsWith('.html')) {
            res.set('Content-Type', 'text/html');
        }
        else if(path.endsWith('.css')) {
            res.set('Content-Type', 'text/css');
        }        
        else if(path.endsWith('.json')) {
            res.set('Content-Type', 'application/json');
        }
        else if(path.endsWith('.png')) {
            res.set('Content-Type', 'image/png');
        }
        else if(path.endsWith('.jpg')||path.endsWith('.jpeg')) {
            res.set('Content-Type', 'image/jpeg');
        }
        else if(path.endsWith('.wav')) {
            res.set('Content-Type', 'audio/wav');
        }
    }
  }
    )); 

//Option 2
    /* app.get('*.js', function(req, res, next) {
      res.set('Content-Type', 'application/javascript');
      next();
    }); */


/* app.use(express.static(path.join(__dirname, 'dist', 'eshop')
, {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        }
    }}
    )); */
/* 
// Set MIME types for different file extensions
app.use((req, res, next) => {
    const ext = path.extname(req.url);
    switch (ext) {
      case '.js':
        res.setHeader('Content-Type', 'text/javascript');
        break;
      case '.css':
        res.setHeader('Content-Type', 'text/css');
        break;
      case '.json':
        res.setHeader('Content-Type', 'application/json');
        break;
      case '.png':
        res.setHeader('Content-Type', 'image/png');
        break;
      case '.jpg':
      case '.jpeg':
        res.setHeader('Content-Type', 'image/jpeg');
        break;
      case '.wav':
        res.setHeader('Content-Type', 'audio/wav');
        break;
      default:
        break;
    }
    next();
  }); */





// Serve index.html for all other routes
app.get('*', (req, res) => {
 // res.sendFile(path.join(__dirname, 'dist', 'eshop', 'index.html'));
 //res.sendFile(path.join('/dist', 'Shop', 'index.html'));
 //res.sendFile('index.html', { root: __dirname + '/dist/eshop' });

 res.setHeader('Content-Type', 'text/html');
 //res.sendFile(path.join(__dirname, 'eshop', 'index.html'));
 res.sendFile(path.join(__dirname, 'eshop/index.html'));
});

// Start the server on port 8081
const port = process.env.PORT || 4200;
app.listen(port, () => {
    console.log('finding index.html at:'+path.join('dist', 'eshop', 'index.html'))
  console.log(`Server started on port ${port} and __dirname:${__dirname}`);
});
/* const express = require('express');
const app = express();
const path = require('path');
// Add MIME type configuration for JavaScript files
app.use(express.static('dist/Shop', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        }
    }
}));

// Serve index.html file
// app.get('*', (req, res) => {
//    res.sendFile('Shop/index.html', { root: '.' });
//}); 
app.get('/*', function(req,res) {
   res.sendFile(path.join(__dirname+'dist/Shop/index.html'));
 });

// Start the server
const port = process.env.PORT || 4200;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}); */
/* const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4200;

app.use(express.static(__dirname + '/myShop'));

app.get('/*', function(req,res) {
   res.sendFile(path.join(__dirname+'/dist/Shop/index.html'));
 });
app.listen(port, () => console.log(`Server started on port ${port}`)); */