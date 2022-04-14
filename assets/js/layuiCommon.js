// 公共js配置

let reg = /^\s*$/; // 正则空值判断
let cookieInfo = JSON.parse(Cookies.get('userInfo'));
$("#setAvatar").attr('src', cookieInfo.avatar);


layui.use(["element", "layer", "util", "form"], function () {
  let layer = layui.layer,
    util = layui.util,
    form = layui.form;

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


  // 退出登录
  function logoutFn() {
    $("#logout").click(async function () {
      await $.post("/logout")
      layer.confirm('确认退出', function () {
        location.reload();
      })
    });
  }
  logoutFn()

  // 设置用户个人信息
  function setUserInfoFn() {
    let index;
    let isEditUserInfo = 0;

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

        // 右上角关闭回调函数
        cancel: function () {
          $('#setAvatar').attr('src', userCookieInfo.avatar);
          isEditUserInfo = 0;
        }
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
        isEditUserInfo = 1;
      }
    })




    // 监听表单
    form.on("submit(amendBtn)", function (data) {
      let formData = new FormData($('#amendForm')[0]);
      let formCookieInfo = JSON.parse(Cookies.get('userInfo'));

      formData.set('pic', formCookieInfo.avatar);
      formData.set('isEditUserInfo', isEditUserInfo);

      if (reg.test(data.field.username)) {
        layer.msg("请输入新昵称");
        return false;
      }

      $.get('/getUserData').then(res => {
        let result = res.find(item => {
          let uname = item.username == data.field.username;
          return uname;
        })

        let uname = data.field.username == formCookieInfo.username

        if (result && !uname) {
          layer.msg('该用户名已被占用')
          return false
        } else {
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
        }
      })
      return false;
    });
  }
  setUserInfoFn();


  // 修改密码
  function editPwdFn() {
    let index;
    let timer;
    clearTimeout(timer);

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

          timer = setTimeout(() => {
            layer.alert('身份有效期失效,请返回重新登录', function (alert) {
              layer.close(alert, function () {
                location.reload();
              });
            });
          }, 500);

        }

      })
      return false
    })
  }
  editPwdFn()

});