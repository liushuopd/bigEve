$(function () {

    /**
     * ! 功能一 : 登录成功后获取用户信息
     * url : /my/userinfo
     * type : GET
     */
    // 获取用户信息
    function getUserInfo() {
        // var h = ''
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            // data: "data",
            // dataType: "dataType",
            success: function (data) {
                // console.log(data)
                // h = data
                // if (data.status === 1) {
                //     return false;
                // }
                if (data.status === 1) return
                // 1.获取用户名 || 昵称
                var res = data.data.nickname || data.data.username;
                // 2.侧边栏欢迎语设置
                $('#welcome').html(res)
                // console.log(data);
                // 3.判断头像是否存在 
                if (data.data.user_pic) {
                    // 3.1 头像存在
                    $('.text-avatar').hide()
                    $('.layui-nav-img').show().attr('src', data.data.user_pic)
                } else {
                    // 3.2 头像不存在
                    $('.layui-nav-img').hide()
                    $('.text-avatar').show().html(res[0].toUpperCase())
                }
            },

        });
    }
    getUserInfo()

    window.getUserInfo = getUserInfo

    /**
     * ! 右上角用户退出功能
     *      1. 页面跳转
     *      2. 清空本地存储的信息
     *      3. 弹出层确认
     */

    $('#btn-logout').on('click', function () {
        // 弹出确认
        layui.layer.confirm('是否退出', function (index) {
            // 清空本地存储信息
            localStorage.removeItem('token')
            // 页面跳转
            location.href = './login.html'
            layui.layer.close(index);
        });
    })
})