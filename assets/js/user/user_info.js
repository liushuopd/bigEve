$(function () {
    // 一 表单验证规则
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        },
    })


    // 二 获取用户登录信息
    function getUser() {
        $.get("/my/userinfo",
            function (data) {
                // console.log(data);
                if (data.status === 0) {
                    // 请求成功
                    layui.form.val('formInfo', data.data);
                }
            }
        );
    }
    getUser()

    // 三 重置信息
    $('#btn-reset').on('click', function (e) {
        e.preventDefault()
        getUser()
    })


    // 四 修改数据 
    // ! 传递参数问题
    $('#formupdate').on('submit', function (e) {
        e.preventDefault();
        // id=10295&username=trgsdfgfsdgsf&nickname=lsplm&email=wuiqyeui%40qq.com
        $.post("/my/userinfo", $(this).serialize(),
            function (data) {
                if (data.status === 0) {

                    layui.layer.msg(data.message);
                    // 需要调用父页面的查询
                    window.parent.getUserInfo()
                }
            }
        );
    })

})