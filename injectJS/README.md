# 动态注入js到页面
1. 安装该插件
2. 点击图标填写需要注入的js已经需要注入到的域名，例如：
  ```
  // 域名
  exploringjs.com
  
  // js 隐藏顶部的导航栏和广告栏
  document.querySelectorAll('#top-bar').forEach(function(item){item.style.display="none"});document.querySelector('#adbox').style.display="none";
  ```
3. 保存，然后访问[Exploring ES6](http://exploringjs.com/es6/)
  