// 工具函数
let token = localStorage.getItem('token') || '';

// 请求拦截器
$.ajaxPrefilter(function (options) {
    // 统一设置请求根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 统一设置请求头信息
    options.headers = {
        Authorization: token
    }

    // 请求完成后的回调 封装
    options.complete = function (xhr) {
        if (xhr.responseJSON.status === 1) {
            // 回到登录页
            location.href = '/login.html'
            // 清空本地存储中的令牌
            localStorage.removeItem('token')
        }
    }
})