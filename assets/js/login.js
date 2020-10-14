$(function () {
    // 点击去注册跳往注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show()
    });
    // 点击去登录跳往登录页面
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide()
    });
    // 自定义密码验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // 注意选择器中间加个空格
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    });
    // 注册触发post事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = { username: $('.reg-box [name=username]').val(), password: $('.reg-box [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            $('#link_login').click();
        })
    });
    //登录触发post事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                localStorage.setItem('token', res.token);
                location.href = './index.html'
                // console.log(res.token);
            }
        })
    })
})