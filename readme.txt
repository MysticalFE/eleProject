
前后端分离开发 ---》 	窃取环境

依赖的最核心的技术 ==》 nginx

nginx 起本地服务器用的
node  起本地服务器


nginx 对于前端来说，非常的重要，因为它能帮助提高非常非常高的工作效率。

其中在前端领域，最重要的运用 nginx的反向代理功能。


项目计划， 期望用angular.js框架完成，

星期一： 实现主页搜索，环境部署成功。
星期二： 实现登录页，实现首页api交互
星期三： 实现餐馆排序
星期四： 餐馆详情页
星期五： 继续实现餐馆详情页，打通所有环节
部署环境的核心代码
server {
    listen       800;
    server_name  gyf.ele.com;

    charset utf-8;
    access_log off;
    #access_log  logs/host.access.log  ;

    location /{
         proxy_pass http://127.0.0.1:8080;
         #实现前端分离开发的目的
    }
    location /restapi {
        proxy_pass https://m.ele.me;
    }
    error_page  404              /nofind.html;
    #location = /404.html {
    #    root   html;
    #}
}