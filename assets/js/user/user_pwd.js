$(function () {
    // 表单校验
    layui.form.verify({
        len: [/^\S{6,12}$/, '长度必须6到12位，不能有空格'],

        // 验证新密码不能和原密码相同
        diff: function (value) {
            // value 表示新密码
            // 获取原密码
            var oldPwd = $('[name="oldPwd"]').val()
            if (value === oldPwd) {
                return '新密码不能和原密码相同'
            }
        },
        // 验证新密码和确认密码是否相同
        same: function (value) {
            // value 表示新密码
            // 获取原密码.
            var newPwd = $('[name="newPwd"]').val()
            if (value !== newPwd) {
                return '第三个和第二个必须一样'
            }
        },
    })


    // 修改密码功能
    $('#changePwd').on('click', function (e) {
        e.preventDefault();
        // 发送请求
        $.post("/my/updatepwd", $('#formInfo').serialize(),
            function (data) {
                if (data.status === 0) {
                    $('#btn-reset').click();
                }
            }
        );
    })

})