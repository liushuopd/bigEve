$(function () {
    // 初始化富文本编辑器
    initEditor()

    let state = '已发布'
    $('#caogao').on('click', function (e) {
        e.preventDefault();
        state = '草稿'
    })
    /**
     * 获取分类 (下拉框)
     */
    $.get("/my/article/cates",
        function (data) {
            if (data.status === 0) {
                $('[name=cate_id]').html(template('cate', data))
                layui.form.render()
            }
        }
    );

    /**
     * 选择封面按钮 
     */
    $('#chooseImage').on('click', function () {
        $('#file').click()
    })
    /**
     * 图片预览
     */
    $('#file').change(function (e) {
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview',
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    /**
     * 表单提交 发送请求
     */
    $('#formPub').on('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(this)
        fd.append('state', state);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                // fd.forEach(function (v, k) {
                //     console.log(v, k);
                // })

                $.ajax({
                    type: "POST",
                    url: "/my/article/add",
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.status !== 0) {
                            return layui.layer.msg(data.message)
                        }
                        layui.layer.msg(state + '成功')
                        setTimeout(function () {
                            location.href = '/article/art_list.html'
                        }, 1000)

                    }
                });
            })
    })


})