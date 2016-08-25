var gulp = require('gulp');
//创建任务
var webServer = require("gulp-webserver");
/*var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var minifyCss = require("gulp-minify-css");
var webpack = require("gulp-webpack");
var named = require("vinyl-named");
var loder = require("imports-loader");
var ver = require("gulp-rev");
var vercollector = require("gulp-rev-collector");
var url = require("url");
var fs = require("fs");

var cssDistFiles = ["./app/prd/styles/app.css"];
var jsDistFiles = ["./app/prd/scripts/app.js"];*/

gulp.task('copy',function(){
	gulp.src(["./index.html","./data.json","demo.php","guanyuwomen.html","joinus.html","json.php","packge.json","page.html","shehuizhaopin.html","submit.json","wodechanpin.html","wodechanpin2.html","xiaoyuanzhaopin.html","xinwenzixun.html"])
		.pipe(gulp.dest("./app"));
	gulp.src('./js/**/*.js')
		.pipe(gulp.dest("./app/js"));
	gulp.src("./css/**/*.css")
		.pipe(gulp.dest("./app/css"));
	gulp.src("./lib/**/*.js")
		.pipe(gulp.dest("./app/lib"));
	gulp.src("./img/**/*")
		.pipe(gulp.dest(".app/img"));
}) 
gulp.task('watch',function(){
	gulp.watch("./index.html",["copy"]);
	gulp.watch("./css/**/*.css",["copy"]);
	gulp.watch('./lib/**/*.js',["copy"]);
})

gulp.task("webServer",["watch"],function(){
	gulp.src('./')
		.pipe(webServer({
			port:80,
			host:'localhost',
			livereload:true,
			directoryListing:{
				enable:true,
				path:"./"
			}/*,
			middleware:function(req,res,next){
				var urlObj = url.parse(req.url,true);
				switch (urlObj.pathname){
					case "./api/gelivelist.php":
						res.setHeader("Conten-type","application/json");
						fs.readFile("./mock/livelist.json","UTF-8",function(err,data){
							res.end(data);
						})

					return;
				}
				next();
			}*/
		
		}))
});

gulp.task("default",["copy","watch","webServer"])
