// 工具函数
let token = localStorage.getItem('token') || '';

// 请求拦截器
$.ajaxPrefilter(function (options) {
    // 统一设置请求根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    options.headers = {
        Authorization: token
    }
})