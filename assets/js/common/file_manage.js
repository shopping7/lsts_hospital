$(function () {

    //获取所有属性
    $.get("http://localhost:9000/attrs",{},function (result) {
        showData(result.data);
    });
    //展示数据
    function showData(data) {
        var str = "";//定义用于拼接的字符串
        for (var i = 0; i < data.length; i++) {
            str = "<tr><td>" + (i+1) + "</td><td class='txt-oflo'>" + data[i].attr + "</td><td class='txt-oflo'>"+data[i].info+"</td><td class=\"txt-oflo\"><i class=\"zmdi zmdi-edit\"></i>&nbsp;&nbsp;&nbsp;<i class=\"zmdi zmdi-delete\"></i></td></tr>";
            //追加到table中
            $("#tab").append(str);
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
        for(var user in data){
            var json = eval('('+user+')');
            str = '<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">\n' +
                '                <div class="card">\n' +
                '                    <div class="body">\n' +
                '                        <div class="member-card verified">                            \n' +
                '                            <div class="thumb-xl member-thumb">\n' +
                '                                <img src="assets/images/random-avatar4.jpg" class="img-thumbnail rounded-circle" alt="profile-image">                               \n' +
                '                            </div>\n' +
                '\n' +
                '                            <div class="">\n' +
                '                                <h4 class="m-b-5 m-t-20">'+json.username+'</h4>\n' +
                '                                <p class="text-muted">Dentist<span> <a href="#" class="text-pink">'+json.email+'</a> </span></p>\n' +
                '                            </div>\n' +
                '\n' +
                '                            <p class="text-muted">'+data[user]+'</p>                           \n' +
                '                            <a href="profile.html"  class="btn btn-raised btn-sm">查看详情</a>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>';
            //追加到table中
            $("#show_users").append(str);
        }
    };

    //添加用户属性
    $("#addUserButton").click(function () {
        var data1 = JSON.stringify($("#addUserForm").serializeJSON())
        console.log(data1);
        $.post({
            url : "http://localhost:9000/addUser",
            data : JSON.stringify($("#addUserForm").serializeJSON()),
            headers: {
                'Content-Type': 'application/json'
            },
            success : function(data) {
                alert("添加属性成功!")
            },
            error : function() {
                alert("添加属性失败!")
            }
        })
    });



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
            '                            <p class="text-muted">'+"属性"+'</p>                           \n' +
            '                            <a href="profile.html"  class="btn btn-raised btn-sm">查看详情</a>\n' +
            '                            <button type="button" id="isAddBlack" class="btn btn-raised g-bg-cyan">加入黑名单</button>\n'+
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>' +
            '</div>';
        $("#showBlack").append(str);
    }

    $("#isAddBlack").click(function () {
        // var data =
        // console.log(data);
        $.ajax({
            url : "http://localhost:9000/addBlack",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            contentType : 'application/json',
            dataType : 'json',
            data :JSON.stringify({"username" : "zhangsan"}),
            success : function(result) {
                alert("成功加入黑名单")
            },
            error : function() {
                alert("失败!")
            }
        });
    });
});