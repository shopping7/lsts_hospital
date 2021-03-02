$(function () {
    function getParameter(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = location.search.substr(1).match(reg);
        if (r!=null) return (r[2]); return null;
    }

    //获取用户名
    var username = decodeURI(getParameter("username"));
    //1 获取用户数据
    $.post({
        url : "http://localhost:9000/user_detail",
        data : JSON.stringify({
            "username" : username}),
        headers: {
            'Content-Type': 'application/json'
        },
        xhrFields: {
            withCredentials: true
        },
        success : function(result) {
            showProfile(result.data);
            showUserAttr(result.data.attr);
        },
        error : function() {
            alert("获取用户信息失败!")
        }
    });

    function showProfile(data) {
        var str = '<strong>姓名</strong>\n' +
                '                        <p>' + data.username + '</p>\n' +
                '                        <strong>性别</strong>\n' +
                '                        <p>' + data.sex + '</p>\n' +
                '                        <strong>邮箱</strong>\n' +
                '                        <p>' + data.email + '</p>\n' +
                '                        <strong>联系号码</strong>\n' +
                '                        <p>' + data.phone + '</p>\n' +
                '                        <strong>属性</strong>\n' +
                '                        <address>' + data.attr + '</address>';
            //追加到table中
            $("#personal_info").append(str);
            var name = '<strong>'+data.username+'</strong>';
            $(".showName").append(name);
    }


    function showUserAttr(attr) {
        var checkbox=document.getElementsByName('UserSelectAttr');
        for (let i = 0; i < attr.length; i++) {
            console.log(attr[i]);
            for (let j = 0; j < checkbox.length; j++) {
                console.log(checkbox[j].value)
                if(attr[i] == checkbox[j].value){
                    checkbox[j].checked = true;
                    break;
                }
            }
        }
    }

    $("#updateUserAttr").click(function () {
        var checkbox=document.getElementsByName('UserSelectAttr');
        var attr = getSelectAttr(checkbox);
        console.log(attr);
        $.ajax({
            url : "http://localhost:9000/userAttrEdit",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            contentType : 'application/json',
            dataType : 'json',
            data :JSON.stringify({"username":username,"attr":attr}),
            success : function(result) {
                alert("修改用户属性成功")
                window.location.reload();
            },
            error : function() {
                alert("修改用户属性失败")
            }
        });
    })
    function getSelectAttr(obj){
        var arr=new Array();
        for(var i=0;i<obj.length;i++){
            if(obj[i].checked==true){
                arr.push(obj[i].value);
            }
        }
        return arr;
    }
});