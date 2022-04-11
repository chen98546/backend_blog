layui.use(['element', 'layer', 'util'], function () {
  var element = layui.element,
    layer = layui.layer,
    util = layui.util,
    $ = layui.$;

  // 退出登录
  $('#logout').click(function () {
    $.ajax({
      type: 'post',
      url: '/logout',
    }).then(res => {
      location.href = '/login'
    })
  })

  //头部事件
  util.event('lay-header-event', {
    //左侧菜单事件
    menuLeft: function (othis) {
      layer.msg('展开左侧菜单的操作111', {
        icon: 0
      });
    },
    menuRight: function () {
      layer.open({
        type: 1,
        content: '<div style="padding: 15px;">处理右侧面板的操作234</div>',
        area: ['260px', '100%'],
        offset: 'rt', //右上角
        anim: 5,
        shadeClose: true
      });
    }
  });

});

let getItem = localStorage.getItem('logoName');
document.querySelector('.layui-logo').innerHTML = getItem ? getItem : '后台管理系统';






layui.use(['form'], () => {
  let form = layui.form;
  let layer = layui.layer;

  // $('#userInfo').click(function () {
  let index = layer.open({
    type: 1,
    title: '提示',
    area: ['400px', '500px'],
    content: `
          <div class="login">
              <h1>个人资料</h1>
              <form class="layui-form" active="/amendForm" method="post" id="amendForm">
                  <div class="layui-form-item">
                      <input type="text" name="username" placeholder="请输入新用户名称" autocomplete="off">
                  </div>

                  <div class="layui-form-item">
                      <button id="amendBtn" class="btn-primary btn-block btn-large layui-btn" lay-filter="amend" lay-submit>修改</button>
                  </div>
              </form>
          </div>`,
  });
  // })

  let reg = /^\s*$/;

  $('#amendBtn').click(function () {
    let data = JSON.parse($('#amendForm').serialize())
    console.log(data);

    // layer.close(index)
    if (reg.test(data.username)) {
      layer.msg('账号不能为空')
      return false
    }


    $.ajax({
      type: 'put',
      url: '/amendForm',
      data,
    })
    return false
  })

})