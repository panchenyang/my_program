 //0.获取元素
 let username = document.querySelector('.username')   
 let userpwd = document.querySelector('.userpwd')
 let err = document.querySelector('span')
 let zhuce = document.querySelector('.zhuce')  
 let denglu = document.querySelector('.denglu')  
 //1.绑定一个事件用来获取用户输入的内容
 let form = document.querySelector('form')
 denglu.onclick = function(e){
     //阻止默认提交行为，因为我要用ajax的方式提交
     e = e || window.event
     e.preventDefault()
     //console.log('我要提交表单了');
      //2.获取用户输入的内容
      let usernames = username.value
      let userpwds = userpwd.value
      // console.log(usernames,userpwds);   
      //3.表单验证
      //非空验证
      if(!usernames || !userpwds){
          alert('请完整填写表单')
          return
      }
      //格式验证 -> 正则
      //4.发送请求  当点击登录的时候，在network里面查看
      //4-1创建ajax对象
      let xhr = new XMLHttpRequest()
      //4-2配置本次请求
      xhr.open('POST','/login',true)
      //4-3接受响应 监听事件 
      xhr.onload = function(){
          let res = JSON.parse(xhr.responseText)
          if(res.code === 1){
                setcookie('login',1,3600)
                window.location.href = 'http://localhost:8080/html/index.html'
          }else{
                err.style.display = 'block'
          }
      }
      //4-4设置响应头
      xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
      //4-5发送请求
      xhr.send(`username=${usernames}&password=${userpwds}`);
 }
 

 zhuce.onclick = function(){
     let usernames = username.value
     let userpwds = userpwd.value
    //  // console.log(usernames,userpwds);   
    //  //3.表单验证
    //  //非空验证
     if(!usernames || !userpwds){
         alert('请完整填写表单')
         return
     }
    //4-1创建ajax对象
    let xhr = new XMLHttpRequest()
    //4-2配置本次请求
    xhr.open('POST','/login1',true)
    //4-3接受响应 监听事件 
    xhr.onload = function(){
        let res = JSON.parse(xhr.responseText)
    }
    //4-4设置响应头
    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
    //4-5发送请求
    xhr.send(`username=${usernames}&password=${userpwds}`);
 }



 function setcookie(key,value,expires){
    if(expires){
        var time = new Date()
        time.setTime(time.getTime()-1000*60*60*8+1000*expires)
        document.cookie = key + '=' + value + ';expires=' + time
    }else{
        document.cookie = key+'='+value
    }
}

function getcookie(key){
    //1.准备一个字符串
    var str = '';
    //2.去document.cookie里面找到对应的key值，赋值给str
    console.log(document.cookie);
    //2-1先把字符串切割了
    var tmp = document.cookie.split('; ')
    console.log(tmp);
    tmp.forEach(function(item){
        var t = item.split('=')
        console.log(t);
        //如果t[0]和我们传进来的key一样
        //就将t[1]赋值给str
        if(t[0] === key){
            str = t[1]
        }
    })
    //3.把赋值好的str返回出去
    return str
}