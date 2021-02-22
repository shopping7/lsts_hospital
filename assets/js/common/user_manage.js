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

});