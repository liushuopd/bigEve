$(function () {
    // 登录注册切换功能:
    // 切换注册
    $('#link-login').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    // 切换注册
    $('#link-reg').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 自定义验证规则
    layui.form.verify({
        // 密码验证
        password: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码验证
        repassword: function (value, item) { //value：表单的值、item：表单的DOM对象
            if ($('#repass').val() !== value) {
                return '两次输入密码不一致'
            }
        }
    });

    // 发送ajax请求 注册请求
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username: $('#id_0username').val(),
            password: $('#repass').val()
        }, function (data) {
            console.log(data)
            // 处理响应数据
            if (data.status === 0) {
                $('#link-reg').click();
            }
            layui.layer.msg(data.message);
        })
    });

    // 发送登录请求
    $('#btn_login').on('submit', function (e) {
        e.preventDefault();
        // 1.获取表单序列化的值
        let formdata = $(this).serialize();
        // 2.发送请求
        $.post('/api/login', formdata, function (data) {
            console.log(data)
            // 3.业务处理
            if (data.status === 0) {
                // 4.跳转页面
                location.href = './index.html'

                // 5.将令牌保存到本地存储中、
                data.token.length != 0 && localStorage.setItem('token', data.token)

            }
            layui.layer.msg(data.message);
        })
    })
});