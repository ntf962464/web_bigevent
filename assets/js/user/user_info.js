$(function () {
    var form = layui.form;
    var layer = layui.layer;
    //验证昵称格式
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称字符必须在1-6个字符之间！'
            }
        }
    });
    initUserInfo();
    //初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                form.val('formUserInfo', res.data);
            }
        })
    };
    //重置用户信息
    $('.btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    });
    //监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                window.parent.getUserInfo();
            }
        })
    });
    //调用父页面函数，更新头像和用户信息
})