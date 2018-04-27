const gulp = require('gulp')
const browserSync 	= require('browser-sync').create()

/** =======================================================

 Serve the template

======================================================= **/

/**
 * Browsersync middleware function
 * Compiles .pug files with browsersync
*/
function compilePug (req, res, next) {
    var parsed = require("url").parse(req.url);

    console.log("Serving: ", parsed.pathname);

    if (parsed.pathname.match(/\.html$/) || parsed.pathname == '/') {
        var file = 'index';
        if(parsed.pathname != '/'){
            file = parsed.pathname.substring(1, (parsed.pathname.length - 5));
        }
        //
        // var html = pug.renderFile(__dirname+'/../../pages/'+file+'.pug', {ZION_ENV:'DEBUG', pretty:true});
        // fs.writeFileSync('./bin/'+file+'.html', html);
    }

    next();
}

/**
 *
 * Serve the template at http://localhost:3000
 * Compiles .pug files on the fly
 *
*/

gulp.task("default", function(){
    browserSync.init({
        server: {
            baseDir: "./"
        },
        // proxy: '127.0.0.1:8010',
        port: 3000,
        open: true,
        notify: false,
        middleware: compilePug
    });
});
