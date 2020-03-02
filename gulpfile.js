//在这里写pcyshop 这个项目得打包配置的

/*
    gulp里面提供得方法
        1.src()
            =>用来找到你要打包得文件得
            =>src(’你要打包得文件)
            =>返回值就是一个二进制流，可以继续调用别的方法
        2.pipe()
            =>用来帮你做事情的
            =>pipe(你要做的事情)
            =>返回值也是一个二进制流，可以继续使用方法
        3.dest()
            =>用来写入文件
            =>把已经压缩好的代码放在哪一个文件夹里面
            =>如果你指定的文件夹没有，那么会自动创建一个这个文件夹放进去
        4.paprllel()
            =>用来并行执行多个任务的
            =>gulp.parallel(你定义好的任务1，你定义好的任务2)
            =>返回值：是一个任务流
            =>只要这个返回值一执行，就把你准备好的几个任务同时开始执行
        5.series()
            =>用来逐个执行多个任务的
            =>gulp.series(任务1，任务2)
            =>返回值：是一个任务流
            =>只要这个返回值一致性，就是把你准备好的几个任务逐一完成
        6.watch()
            =>用来监控文件变化的
            =>gulp.watch()
*/

//1.导入 gulp 这个第三方模块
//      当你导入模块得时候，会优先区内置模块里面查找
//      内置模块里面没有，会自动去node_mdules 里面擦护照
//      这个gulp导入以后，就可以是由gulp.xxx()得各种方法了
const gulp = require('gulp')

//2.导入gulp-cssmin这个第三方模块               自动压缩css文件
//      这个模块导入以后，cssmin变量得到的就是一个函数
//      直接执行就能把css文件压缩了
const cssmin = require('gulp-cssmin')

//2-1 导入 gulp-autoprefixex 这个第三方模块        传递参数，自动添加前缀
//      直接执行传递一个参数，技能把css文件自动添加前缀
const autoprefixer = require('gulp-autoprefixer')

//3 导入 gulp-uglify 这个第三方模块                 自动压缩js文件
const uglify = require('gulp-uglify')

//3-1 导入gulp-babel 这个第三方模块                 传递一个参数，es6->es5
const babel = require('gulp-babel')

//4 导入 gulp-htmlmin 这个第三方模块                传递一个参数，压缩html文件
const htmlmin = require('gulp-htmlmin')

//7 导入 del 第三方模块                             删除dist文件包用的
const del = require('del')

//8导入gulp-webserver第三方模块                     用来开启服务器的
const webserver = require('gulp-webserver')

//9.导入gulp-sass 第三方依赖
const sass = require('gulp-sass')

//2.先写一个打包 css 的方法
const cssHandler = () =>{ //Handker->处理
    return gulp.src('./src/css/*.css')//找到src目录下css目录下 所有后缀为.css得文件
                .pipe(autoprefixer())//把css代码自动添加前缀
                .pipe(cssmin())//压缩css代码
                .pipe(gulp.dest('./dist/css'))//吧压缩完毕的css代码放在 dist目录下的css文件夹里面
}

//3.写一个打包js的方法
const jsHandler = () =>{
    return gulp.src('./src/js/*js')//找到文件
                .pipe(babel({
                    presets:['@babel/env']
                }))//转码es6->es5
                .pipe(uglify())//压缩
                .pipe(gulp.dest('./dist/js'))//压缩完的放入一个文件夹
}

//4.书写一个打包 html 的语法
const htmlHandler = () =>{
    return gulp.src('./src/html/*.html')//找到文件
                .pipe(htmlmin({
                    removeAttributeQuotes:true,//移除属性上的双引号
                    removeComments:true,//移除注释
                    collapseBooleanAttributes:true,//把值为布尔值的属性简写
                    collapseWhitespace:true,//移除所有空格
                    minifyCSS:true,//把页面里面的style标签里面的css样式也空格
                    minifyJS:true,//把页面里面script里面的就是代码去空格，不能做es6转码
                }))//压缩
                .pipe(gulp.dest('./dist/html'))//压缩完了放到指定文件夹
}

//++准备一个编译sass文件的函数
const sassHandler = () =>{
    return gulp
        .src('./src/sass/*.scss')//道道要编译的sass
        .pipe(sass())//把sass代码转换成css代码
        .pipe(autoprefixer())//自动添加前缀
        .pipe(cssmin())//把已经转换好的css代码压缩
        .pipe(gulp.dest('./dist/sass'))//放到指定目录
}

//5.书写一个移动 image 文件的方法
//  图片尽量不压缩，因为图片是设计师给好的，他们会进行图片体积最小的处理
const imgHandler = () =>{
    return gulp.src('./src/image/**')//表示image下的所有文件
                .pipe(gulp.dest('./dist/image'))//放到指定目录
}

//6.书写一个移动 lib 文件的方法
//  lib里面放的都是项目中使用到的第三方
//  jquery/swiper/bootstrop
//  不需要压缩，都是别人写好的，直接转移就行
const libHandler = () =>{
    return gulp.src('./src/lib/**')
                .pipe(gulp.dest('./dist/lib'))
}

//再打包的时候，只是把你最新的src里面的所有内容给你压缩打包转移
//不会吧之前的dist里面的文件删除
//最好就是在每次整体打包之前，把dis目录删除
//7.书写一个任务，自动删除dist目录
const delHandler = () => {
    return del(['./dist'])
}

//8.书写一个配置服务器的任务
//      在开发过程中直接把我写的东西在服务器上打开
//      因为我要一边写一边修改，一遍测试
//      因为gulp是基于node运行的
//      这里就是使用node给我们开启一个服务器
const sververHandler = () =>{
    return gulp.src('./dist')
                .pipe(webserver({//需要一些参数
                    host:'localhost',//域名，这个域名可以自定义
                    port:8080,//端口
                    open:'./html/index.html',//默认打开的页面
                    livereload:true,//自动刷新浏览器 热重启
                    //所有的代理配置都在proxiers里面
                    proxies:[
                     //每一个代理配置就是一个对象
                     {
                        source:'/login1',//源，你的代理标识符
                        target:'http://localhost:80/codecodecode/login1.php'//目标，你要代理的地址
                     },{
                        source:'/login',
                        target:'http://localhost:80/codecodecode/login.php'
                     }
                    ]
                }))//开启服务器
}
// /*
//     webserver 这个第三方模块可以顺带配置代理
//         + 直接在使用webserver 的时候添加一个配置项
//         +proxies:[
//             //每一个代理配置就是一个对象
//             {
//             source:'/gx',
//             target:'你要代理的地址'
//             }
//         ]
// */

//9.自动监控文件
//      监控src下面的文件，只要已修改，就执行对应的任
//      比如src 下面的css文件夹，我就执行cssHandler这个任务
const watchHandler = () => {
    gulp.watch('./src/css/*.css',cssHandler)
    gulp.watch('./src/js/*.js',jsHandler)
    gulp.watch('./src/html/*.html',htmlHandler)
    gulp.watch('./src/image/**.html',imgHandler)
    gulp.watch('./src/lib/**.html',libHandler)
    gulp.watch('./src/sass/*.scss',sassHandler)
}


//最后在文件里面导出我们准好的这个方法
/* 
    css:cssHandler
    js:jsHandler
*/
//导出以后，就可以在命令行执行gulp css的指令了
// module.exports.css = cssHandler
// module.exports.js = jsHandler
// module.exports.html = htmlHandler
// module.exports.image = imgHandler
// module.exports.lib = libHandler

//这个方式不好，我们最好是准备一个任务，
//这个任务做的事情，就是把我准备好的五个任务都给我执行好
//导出一个默认任务
// module.exports.default = gulp.parallel(cssHandler,jsHandler,htmlHandler,imgHandler,libHandler)


//就应该在压缩css/js/html 之前先把dist目录删了
//  要在撒谎才能胡完毕dist以后，在执行css/js/html...之u类的压缩转移任务
module.exports.default = gulp.series(
    delHandler,//先执行删除
    gulp.parallel(cssHandler,jsHandler,htmlHandler,imgHandler,libHandler,sassHandler),//在执行打包
    sververHandler,//开启服务器
    watchHandler//自动监控文件
)

