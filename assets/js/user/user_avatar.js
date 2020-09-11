$(function () {
    // 改变点击事件
    $('#btn-upload').on('click', function () {
        $('#file').click()
    })

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 图片预览功能
    $('#file').on('change', function (e) {
        // console.log(e);
        // console.log(e.target);
        // console.log(e.target.files);
        // console.log(e.target.files[0]);
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
})