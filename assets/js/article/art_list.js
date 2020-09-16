$(function () {
    // 过滤器处理时间日期
    template.defaults.imports.formatDate = function (value) {
        return moment(value).format('MMMM Do YYYY, h:mm:ss a');
    }

    /**
     * 定义获取文章列表请求参数
     */
    var q = {
        // pagenum 是 int 页码值
        pagenum: 1,
        // pagesize 是 int 每页显示多少条数据
        pagesize: 2,
        // cate_id 否 string 文章分类的 Id
        cate_id: $('[name=cate_id]').val(),
        // state 否 string 文章的状态， 可选值有： 已发布、 草稿
        state: $('[name=state]').val(),
    }

    /**
     *  获取文章的列表数据
     */
    function initList() {
        $.get("/my/article/list", q,
            function (data) {
                if (data.status === 0) {
                    // console.log(data);
                    $('tbody').html(template('list', data))
                    renderPage(data.total)
                }
            }
        );
    }

    initList();

    /**
     * 获取下拉框
     */
    function initCate() {
        $.get("/my/article/cates",
            function (data) {
                if (data.status == 0) {
                    $('#sel_01').html(template('tpl-cate', data))
                    layui.form.render()
                }
            }
        );
    }
    initCate()

    /**
     * 筛选按钮
     */
    $('#btn_screen').on('click', function (e) {
        e.preventDefault();
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initList();
    })

    /**
     * 渲染分页
     */
    function renderPage(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
                count: total, //数据总数，从服务端得到
                curr: q.pagenum, // 当前页码
                limit: q.pagesize, //  每页条数

                limits: [2, 3, 5, 10], // 切换每页条数pagesize
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],

                // 情况1：默认第一次时调用！！！！！！！
                // 情况2：切换页码时，调用jump函数
                jump: function (obj, first) {
                    //首次不执行
                    if (!first) {
                        // 按照最新页码获取文章列表数据
                        q.pagenum = obj.curr
                        q.pagesize = obj.limit
                        //do something
                        initList()
                    }
                }

            });
        });
    }
    renderPage()

    /**
     * 删除功能 
     */
    $('tbody').on('click', '.delete', function (e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        // 解决删除分页末页数据 视图层数据跳转为空时的状态
        var len = $('.delete').length
        layer.confirm('is not?', function (index) {
            $.get(`/my/article/delete/${id}`,
                function (data) {
                    if (data.status === 0) {
                        if (len === 1) {
                            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                        }
                        console.log(data)
                        initList();
                        layer.close(index);
                    }
                }
            );

        });

    })

})