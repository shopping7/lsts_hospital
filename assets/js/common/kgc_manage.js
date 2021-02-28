$(function () {

    //获取所有属性
    $.get("http://localhost:9000/attrs",{},function (result) {
        showData(result.data);
        showSelectData(result.data);
    });
    //展示数据
    function showData(data) {
        var str = "";//定义用于拼接的字符串
        for (var i = 0; i < data.length; i++) {
            str = "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td class='txt-oflo'>" + data[i].attr + "</td>" +
                "<td class='txt-oflo'>"+data[i].info+"</td>" +
                "<td class=\"txt-oflo\">" +
                "            <span class=\"js-sweetalert\">\n" +
                "                <button class=\"btn btn-raised btn-default btn-circle waves-effect waves-circle waves-float\" data-type="+ data[i].attr +"><i class=\"zmdi zmdi-edit\"></i></button>\n" +
                "            </span>" +
                "            <span class=\"js-deletealert\">\n" +
                "                <button class=\"btn btn-raised btn-default btn-circle waves-effect waves-circle waves-float\" data-type="+ data[i].attr +"><i class=\"zmdi zmdi-delete\"></i></button>\n" +
                "            </span>" +
                "</tr>";
            //追加到table中
            $("#tab").append(str);
        }
    }

    function showSelectData(data) {
        var str = "";//定义用于拼接的字符串
        for (var i = 0; i < data.length; i++) {
            str = '<tr>\n' +
                '      <td>\n' +
                '          <div>\n' +
                '               <span>'+data[i].attr+'</span>\n' +
                '          </div>\n' +
                '       </td>\n' +
                '      <td>\n' +
                '         <div class="switch">\n' +
                '             <label>\n' +
                '                <input type="checkbox" name="newSelectAttr" value='+data[i].attr+'>\n' +
                '                <span class="lever"></span>\n' +
                '             </label>\n' +
                '         </div>\n' +
                '      </td>\n' +
                ' </tr>'
            //追加到table中
            $("#select_attr").append(str);
        }
    }

    //添加属性
    $("#addAttrButton").click(function () {
        $.post({
            url : "http://localhost:9000/addAttr",
            data : JSON.stringify($("#addAttrForm").serializeJSON()),
            headers: {
                'Content-Type': 'application/json'
            },
            success : function(data) {
                alert("添加属性成功!")
                window.location.reload();
            },
            error : function() {
                alert("添加属性失败!")
            }
        })
    });

    //获取所有对象
    $.get("http://localhost:9000/users",{},function (result) {
        showUsers(result.data);
    });
    function showUsers(data) {
        var str = "";//定义用于拼接的字符串
        for(var i=0; i < data.length;i++){
            str = '<div class="col-lg-4 col-md-6 col-sm-12">\n' +
                '                <div class="card all-patients">\n' +
                '                    <div class="body">\n' +
                '                        <div class="row">\n' +
                '                            <div class="col-md-4 col-sm-4 text-center m-b-0">\n' +
                '                                <a href="#" class="p-profile-pix"><img src="assets/images/patients/random-avatar3.jpg" alt="user" class="img-thumbnail img-fluid"></a>\n' +
                '                            </div>\n' +
                '                            <div class="col-md-8 col-sm-8 m-b-0">\n' +
                '                                <h5 class="m-b-0">'+data[i].username+
                '                                    <a href="#" class="edit">\n' +
                '                                        <i class="zmdi zmdi-delete"></i>\n' +
                '                                    </a>\n' +
                '                                    <a href="#" class="edit">\n' +
                '                                        <i class="zmdi zmdi-edit">&nbsp;&nbsp;</i>\n' +
                '                                    </a></h5> <small>邮箱：'+data[i].email+'</small>\n' +
                '                                <address class="m-b-0">\n' +
                '                                    属性：'+data[i].attr+'<br>\n' +
                '                                    <abbr title="Phone">电话:</abbr> '+data[i].phone+'\n' +
                '                                </address>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>'
            $("#show_users").append(str);
        }
    };

    //添加新用户
    $("#addUserButton").click(function () {
        // var data1 = JSON.stringify($("#addUserForm").serializeJSON())
        // console.log(data1);
        var checkbox=document.getElementsByName('newSelectAttr');
        var attr = getSelectAttr(checkbox);
        var username = $("#addUserName").val();
        // console.log(attr)
        // console.log($("#addUserName").val())
        $.post({
            url : "http://localhost:9000/addUser",
            data : JSON.stringify({"username":username,"attr":attr}),
            headers: {
                'Content-Type': 'application/json'
            },
            xhrFields: {
                withCredentials: true
            },
            success : function(data) {
                alert("添加用户成功!");
                window.location.reload();
            },
            error : function() {
                alert("添加用户失败!")
            }
        })
    });

    function getSelectAttr(obj){
        var arr=new Array();
        for(var i=0;i<obj.length;i++){
            if(obj[i].checked==true){
                arr.push(obj[i].value);
            }
        }
        return arr;
    }

    //获取所有黑名单
    $.get("http://localhost:9000/getAllBlacks",{},function (result) {
        showAllBlacks(result.data);
    });

    function showAllBlacks(data){
        var str = '';
        for(var i=0; i<data.length;i++){
            str = '<tr>\n' +
                '                                    <td>'+(i+1)+'</td>\n' +
                '                                    <td>'+data[i].username+'</td>\n' +
                '                                    <td>删除</td>\n' +
                '                                </tr>'
            $("#black_table").append(str)
        }
    }

    $("#trance_btn").click(function () {
        $.post({
            url : "http://localhost:9000/trance",
            data : new FormData($("#trance_form")[0]),
            xhrFields: {
                withCredentials: true
            },
            cache: false,
            dataType: "json",
            processData :  false,//必须是false
            contentType :  false,//必须是false
            success : function(result) {
                // console.log(result.data)
                showBlacks(result.data)
            },
            error : function() {
                alert("失败!")
            }
        })
    });

    function showBlacks(data){
        str = '<div class="card">' +
            '<div class="col-lg-12 col-md-12 col-sm-12">\n' +
            '                <div class="card">\n' +
            '                    <div class="body">\n' +
            '                        <div class="member-card verified">                            \n' +
            '                            <div class="thumb-xl member-thumb">\n' +
            '                                <img src="assets/images/random-avatar4.jpg" class="img-thumbnail rounded-circle" alt="profile-image">                               \n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="">\n' +
            '                                <h4 class="m-b-5 m-t-20">'+data.username+'</h4>\n' +
            '                                <p class="text-muted">Dentist<span> <a href="#" class="text-pink">'+data.email+'</a> </span></p>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <p class="text-muted">'+data.attr+'</p>                           \n' +
            '                            <a href="profile.html"  class="btn btn-raised btn-sm">查看详情</a>\n' +
            '                            <button type="button" value='+data.username+' id="isAddBlack" class="btn btn-raised g-bg-cyan">加入黑名单</button>\n'+
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>' +
            '</div>';
        $("#showBlack").append(str);
    }

    $(document).on("click", "#isAddBlack", function (e) {
        var username = this.value;
        $.ajax({
            url : "http://localhost:9000/addBlack",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            contentType : 'application/json',
            dataType : 'json',
            data :JSON.stringify({"username" : username}),
            success : function(result) {
                alert("成功加入黑名单")
            },
            error : function() {
                alert("失败!")
            }
        });
    })


});