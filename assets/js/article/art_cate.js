$(function () {
    initTable()
    var add_id;
    var edit_id;

    function initTable() {
        $.get("/my/article/cates",
            function (data) {
                if (data.status === 0) {
                    // console.log(data);
                    $('tbody').html(template('list', data))
                }
            }
        );
    }

    // 添加分类
    $('#addBtn').on('click', function (e) {
        e.preventDefault();
        // 弹出层
        add_id = layer.open({
            type: 1,
            // skin: 'layui-layer-rim', //加上边框
            title: '添加文章类别',
            area: ['500px', '250px'], //宽高
            content: $('#add').html() // 内容，可以使用字符串，也可以使用DOM
        });
    })

    $('body').on('submit', '#addForm', function (e) {
        e.preventDefault();
        var formdata = $(this).serialize();
        $.post("/my/article/addcates", formdata,
            function (data) {
                if (data.status === 0) {
                    // console.log(data)
                    // 关闭弹出层
                    layui.layer.close(add_id)
                    // 更新视图
                    initTable()
                }
            }
        );
    })

    // 根据按钮找到数据 传递给对应表单 编辑
    $('body').on('click', '.edit', function (e) {
        e.preventDefault();
        edit_id = layer.open({
            type: 1,
            title: '编辑文章分类',
            area: ['500px', '250px'],
            content: $('#edit').html()
        });

        // 获取button属性值 data -id
        var Id = $(this).attr('data-id')

        $.get("/my/article/cates/" + Id,
            function (data) {
                if (data.status === 0) {
                    // console.log(data);   
                    layui.form.val('editForm', data.data)
                }
            }
        );
    });

    // 代理修改-编辑分类-确定修改
    $('body').on('submit', '#editForm', function (e) {
        e.preventDefault();
        var formdata = $(this).serialize();

        // console.log(formdata);
        $.post("/my/article/updatecate", formdata,
            function (data) {
                if (data.status === 0) {
                    // console.log(data);
                    // layui.layer.close(edit_id)
                    initTable()
                }
            }
        );
    })

    // 删除功能
    $('body').on('click', '.btn_delete', function (e) {
        e.preventDefault();
        var id = $(this).attr('data-id')
        // 弹层
        layui.layer.confirm('is not?', {
            icon: 3,
            title: '确定删除吗'
        }, function (index) {
            $.get("/my/article/deletecate/" + id,
                function (data) {
                    // console.log(data)
                    if (data.status === 0) {
                        initTable()
                        layer.close(index);
                    }
                }
            );
        });
    })

})