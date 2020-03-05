/*
    封装 cookie 的操作
    封装一个setcookie的方法来设置
    封装一个getcookie的方法来获取
    */

    //封装setcookie()
    function setcookie(key,value,expires){
        if(expires){
            var time = new Date()
            time.setTime(time.getTime()-1000*60*60*8+1000*expires)
            document.cookie = key + '=' + value + ';expires=' + time
        }else{
            document.cookie = key+'='+value
        }
    }
    // setcookie('a','100')
    // setcookie('b','200')
    // setcookie('b','600')
    // setcookie('c','300','15')

    //封装一个getcookie
    function getcookie(key){
        //1.准备一个字符串
        var str = '';
        //2.去document.cookie里面找到对应的key值，赋值给str
        // console.log(document.cookie);
        //2-1先把字符串切割了
        var tmp = document.cookie.split('; ')
        // console.log(tmp);
        tmp.forEach(function(item){
            var t = item.split('=')
            // console.log(t);
            //如果t[0]和我们传进来的key一样
            //就将t[1]赋值给str
            if(t[0] === key){
                str = t[1]
            }
        })
        //3.把赋值好的str返回出去
        return str
    }
    // var res = getcookie('a')
    // // var res = getcookie('b')
    // console.log(res);