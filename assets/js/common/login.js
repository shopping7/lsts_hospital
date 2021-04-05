$(function () {

    $('#btn_sub').click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            url : "http://localhost:9000/kgc-user/login",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            contentType : 'application/json',
            dataType : 'json',
            data :JSON.stringify({"username" : "Alice","password" : "123456"}),
            success : function(result) {
                location.href = "users.html";
            },
            error : function() {
                alert("登录失败!")
            }
        });
    });




        //
        // //2.发送ajax请求，提交表单数据
        // jQuery.post("http://localhost:9000/user/login",jQuery("#sign_in").serialize(),function (data) {
        //     //data : {flag:false,errorMsg:''}
        //     if(data.flag){
        //         //登录成功
        //         location.href="upload_file.html";
        //     }else{
        //         //登录失败
        //         jQuery("#errorMsg").html(data.errorMsg);
        //     }
        // });

});