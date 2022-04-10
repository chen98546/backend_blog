layui.use(['element', 'layer', 'util'], function () {
  var element = layui.element,
    layer = layui.layer,
    util = layui.util,
    $ = layui.$;

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