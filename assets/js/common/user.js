$(function () {

    //1 获取用户数据
    function getUserInfo(){
        $.post({
            url : "http://localhost:9000/user/info",
            data : "",
            headers: {
                'Content-Type': 'application/json'
            },
            xhrFields: {
                withCredentials: true
            },
            success : function(result) {
                return result.data;
            },
            error : function() {
                alert("获取用户信息失败!")
            }
        });
    }


    let loginUser = JSON.parse(localStorage.getItem('loginUser'));
    if(loginUser){
        showProfile(loginUser);
        showEditProfile(loginUser);
    }
    function showProfile(data) {
        const sex = data.sex ? "男":"女";
        const email = data.email?data.email:"";
        const phone = data.phone?data.phone:"";
        var str = '<strong>姓名</strong>\n' +
            '                        <p>' + data.username + '</p>\n' +
            '                        <strong>性别</strong>\n' +
            '                        <p>' + sex + '</p>\n' +
            '                        <strong>邮箱</strong>\n' +
            '                        <p>' + email + '</p>\n' +
            '                        <strong>联系号码</strong>\n' +
            '                        <p>' + data.phone + '</p>\n' +
            '                        <strong>属性</strong>\n' +
            '                        <address>' + data.attr + '</address>';
        //追加到table中
        $("#personal_info").append(str);
        var name = '<strong>'+data.username+'</strong>';
        $(".showName").append(name);
    }

    function showEditProfile(data){
        console.log(data.sex);
        // let sex = data.sex? "1":"0";
        $("#editUsername").val(data.username)
        // $("#editSex").val(data.sex);
        $("#editSex option[value="+data.sex+"]").prop("selected",true);
        $("#editEmail").val(data.email);
        $("#editPhone").val(data.phone);
    }

    $("#getPKButton").click(function () {
        $.ajax({
            url : "http://localhost:9000/user/getPK",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            contentType : 'application/json',
            dataType : 'json',
            data :'',
            success : function(result) {
                console.log(result.data);
                window.open(result.data);
            },
            error : function() {
                alert("失败!")
            }
        });
    });

    $("#getSKButton").click(function () {
        $.ajax({
            url : "http://localhost:9000/user/getSK",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            contentType : 'application/json',
            dataType : 'json',
            data :'',
            success : function(result) {
                console.log(result.data);
                window.open(result.data);
            },
            error : function() {
                alert("失败!")
            }
        });
    });

    $("#get_File_btn").click(function () {
        $.ajax({
            url : "http://localhost:9000/user/getFile",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            dataType : 'json',
            processData: false,
            contentType: false,
            data :new FormData(document.getElementById('get_File_Form')),
            success : function(result) {
                // console.log(result.data.length);
                if(result.data){
                    for(var i = 0; i < result.data.length;i++){
                        // window.open(result.data[i]);
                        console.log(i);
                        downloadFile(result.data[i]);
                    }
                }


            },
            error : function() {
                alert("失败!")
            }
        });
    });

    function downloadFile(url) {

        var iframe = document.createElement('iframe')

        iframe.style.display = 'none' // 防止影响页面

        iframe.style.height = 0 // 防止影响页面

        iframe.src = url

        document.body.appendChild(iframe) // 这一行必须，iframe挂在到dom树上才会发请求

        console.log(iframe)
        setTimeout(() => {

            iframe.remove()

        }, 5000)

    }


    //下载文件
    // $("#get_File_btn").click(function () {
    //     $.ajax({
    //         url : "http://localhost:9000/user/getFile",
    //         xhrFields: {
    //             withCredentials: true
    //         },
    //         async : false,
    //         type : "POST",
    //         dataType : 'json',
    //         processData: false,
    //         contentType: false,
    //         data :new FormData(document.getElementById('get_File_Form')),
    //         xhrFields: {
    //             withCredentials: true
    //         },
    //         success : function(result) {
    //             console.log("上传成功");
    //         },
    //         error : function() {
    //             alert("失败!")
    //         }
    //     });
    // });

    //修改用户信息
    $("#editProfileBtn").click(function () {
        // console.log(attr)
        console.log(JSON.stringify($("#EditProfileForm").serializeJSON()));
        $.post({
            url : "http://localhost:9000/user/editProfile",
            data : JSON.stringify($("#EditProfileForm").serializeJSON()),
            headers: {
                'Content-Type': 'application/json'
            },
            xhrFields: {
                withCredentials: true
            },
            success : function(result) {
                alert("修改用户信息成功!");
                localStorage.removeItem("loginUser");
                localStorage.setItem("loginUser",result.data);
                // window.location.reload();
            },
            error : function() {
                alert("修改用户信息失败!")
            }
        })
    });


});