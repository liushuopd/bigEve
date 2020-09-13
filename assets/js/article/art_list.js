$(function () {
    var q = {
        // pagenum 是 int 页码值
        pagenum: 1,
        // pagesize 是 int 每页显示多少条数据
        pagesize: 2,
        // cate_id 否 string 文章分类的 Id
        cate_id: '',
        // state 否 string 文章的状态， 可选值有： 已发布、 草稿
        state: '',
    }
    /**
     * ! 获取文章的列表数据 * data为空
     */
    function initList() {
        $.get("/my/article/list", q,
            function (data) {
                if (data.status === 0) {
                    console.log(data);
                    $('tbody').html(template('list', data))
                }
            }
        );
    }

    initList();

    // 过滤器处理时间日期
    template.defaults.imports.formatDate = function (value) {
        return moment(value).format('MMMM Do YYYY, h:mm:ss a');
    }
})