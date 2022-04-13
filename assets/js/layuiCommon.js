// 公共js配置


let reg = /^\s*$/;
let cookieInfo = JSON.parse(Cookies.get('userInfo'));

$("#setAvatar").attr('src', cookieInfo.avatar);

let str = `<img src="${cookieInfo.avatar}" id="setAvatar" class="layui-nav-img" alt="">
    <span id="uname">${cookieInfo.username}</span>`;
document.getElementById("link").innerHTML = str;

let getItem = localStorage.getItem("logoName");
document.querySelector(".layui-logo").innerHTML = getItem ? getItem : "后台管理系统";

layui.use(["element", "layer", "util", "form"], function () {
  let layer = layui.layer,
    util = layui.util,
    form = layui.form,
    $ = layui.$;

  // 退出登录
  $("#logout").click(function () {
    $.ajax({
      type: "post",
      url: "/logout",
    }).then((res) => {
      location.href = "/login";
    });
  });


  // 左右两侧菜单
  function menuFn() {
    // 头部事件
    util.event("lay-header-event", {
      //左侧菜单事件
      menuLeft: function (othis) {
        layer.msg("展开左侧菜单的操作111", {
          icon: 0,
        });
      },
      menuRight: function () {
        layer.open({
          type: 1,
          content: '<div style="padding: 15px;">处理右侧面板的操作234</div>',
          area: ["260px", "100%"],
          offset: "rt", //右上角
          anim: 5,
          shadeClose: true,
        });
      },
    });
  }
  menuFn();



  // 设置用户个人信息
  function setUserInfoFn() {
    let index;

    // 个人信息弹窗
    $('#userInfo').click(function () {
      let userCookieInfo = JSON.parse(Cookies.get('userInfo'))
      index = layer.open({
        type: 1,
        title: "提示",
        area: ["400px", "500px"],
        content: `
          <div class="login" id="setNewInfo">
              <h1 style="margin:20px 0">个人资料</h1>
              
              <form class="layui-form" active="/amendForm" method="post" id="amendForm">
                  <div id="avatar">
                    <input type="file" name="avatar" id="avatarFile">
                    <img src="" alt="" id="avatarImg">
                  </div>
                  <div class="layui-form-item">
                      <input type="text" name="username" id="showUsername" placeholder="请输入新用户名称" autocomplete="off">
                  </div>

                  <div class="layui-form-item">
                      <button id="amendBtn" class="btn-primary btn-block btn-large layui-btn" lay-filter="amendBtn" lay-submit>修改</button>
                  </div>
              </form> 
          </div>`,
      });

      // 个人资料回显
      $('#showUsername').val(userCookieInfo.username);
      $('#avatarImg').attr('src', userCookieInfo.avatar);
    })


    // 单击头像执行avatarFile点击事件
    $(document).on('click', '#avatar', function () {
      $('#avatarFile')[0].click()
    })


    // 二进制转换
    $(document).on('change', '#avatarFile', function () {
      let file = this.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        $('#avatarImg').attr('src', this.result);
        $("#setAvatar").attr('src', this.result);
      }
    })


    // 监听表单
    form.on("submit(amendBtn)", function (data) {
      let formData = new FormData($('#amendForm')[0]);

      if (reg.test(data.field.username)) {
        layer.msg("请输入新昵称");
        return false;
      } else if (reg.test(data.field.avatar)) {
        layer.msg("请选择头像");
        return false;
      }

      $.ajax({
        type: "put",
        url: "/amendForm",
        data: formData,
        contentType: false,
        processData: false,
      }).then(res => {
        $('#uname').text(res[0].username);
        $('#avatarImg').attr('src', res[0].avatar);
        $("#setAvatar").attr('src', res[0].avatar);
        layer.msg("资料修改成功");
        layer.close(index)
      });
      return false;
    });
  }
  setUserInfoFn();


  // 修改密码
  function editPwdFn() {
    let index;
    $(document).on('click', '#editPassword', function () {
      index = layer.open({
        type: 1,
        title: "提示",
        area: ["400px", "500px"],
        content: `
          <div class="login" id="editUserPwd">
              <h1 style="margin:20px 0">修改密码</h1>
              <form class="layui-form" active="/editPwdForm" method="post" id="editPwdForm">
                  <div class="layui-form-item">
                      <input type="password" name="password1" oncopy="return false" onpaste="return false" oncut="return false" placeholder="请输入原密码" autocomplete="off">
                  </div>
                  <div class="layui-form-item">
                      <input type="password" name="password2" oncopy="return false" onpaste="return false" oncut="return false" placeholder="请输入新密码" autocomplete="off">
                  </div>
                  <div class="layui-form-item">
                      <input type="password" name="password3" oncopy="return false" onpaste="return false" oncut="return false" placeholder="请确认新密码" autocomplete="off">
                  </div>
                  <div class="layui-form-item">
                      <button id="editPwdBtn" class="btn-primary btn-block btn-large layui-btn" lay-filter="editPwdBtn" lay-submit>修改</button>
                  </div>
              </form> 
          </div>`,
      });
    })

    form.on('submit(editPwdBtn)', function (data) {
      if (reg.test(data.field.password1) || reg.test(data.field.password2) || reg.test(data.field.password3)) {
        layer.msg('密码不能为空，请确认后重新输入')
        return false;
      }

      $.ajax({
        type: 'put',
        url: '/editPwdForm',
        data: data.field,
      }).then(res => {
        if (res.password1 !== cookieInfo.password) {
          layer.msg('旧密码输入不正确，请确认后重新输入');
          return false;
        } else if (data.field.password2 !== data.field.password3) {
          layer.msg('新密码输入不匹配，请确认后重新输入')
          return false;
        };


        if (res.code === 0) {
          layer.msg(res.message)
          layer.close(index);
          location.reload();
        }
      })
      return false
    })
  }
  editPwdFn()

});