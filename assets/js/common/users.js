$(function () {
    // $('.js-sweetalert').on('click', function () {
    //
    // });
    $(document).on("click", ".js-sweetalert button", function (e) {
        var username = $(this).data('type');
        showPromptMessage(username);
    });
    function showPromptMessage(username) {
        swal({
            title: "修改用户属性!",
            text: "用户："+username,
                // +"属性描述 <input type='text' name='attrinfo'>",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "描述该属性"
        }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("不能为空!"); return false
            }
            console.log(attr);
            console.log(inputValue)
            // $.ajax({
            //     url : "http://localhost:9000/editUser",
            //     xhrFields: {
            //         withCredentials: true
            //     },
            //     async : false,
            //     type : "POST",
            //     contentType : 'application/json',
            //     dataType : 'json',
            //     data :JSON.stringify({
            //         "username" : username,
            //         "attr" : inputValue}),
            //     success : function(result) {
            //         swal("成功修改属性描述");
            //         window.location.reload();
            //     },
            //     error : function() {
            //         alert("修改属性描述失败!")
            //     }
            // });

        });
    }

    $(document).on("click", ".js-deletealert button", function (e) {
        var username = $(this).data('type');
        console.log(username);
        showConfirmMessage(username);
    });
    function showConfirmMessage(username) {
        console.log(1)
        swal({
            title: "确定删除该用户?",
            text: "确定删除【"+username+"】用户!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "是的，删除!",
            closeOnConfirm: false,
            html: true,
        }, function () {
            $.ajax({
                url : "http://localhost:9000/deleteUser",
                xhrFields: {
                    withCredentials: true
                },
                async : false,
                type : "POST",
                contentType : 'application/json',
                dataType : 'json',
                data :JSON.stringify({"username" : username}),
                success : function(result) {
                    swal("成功删除!", "该用户成功删除.", "success");
                    window.location.reload();
                },
                error : function() {
                    alert("删除用户失败!")
                }
            });

        });
    }
})