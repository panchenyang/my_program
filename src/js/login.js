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