var http = require("http");
var querystring = require("querystring");
var jsdom = require("jsdom");
var window = jsdom.jsdom().defaultView;
var $ = require('jquery')(window);

var postData = querystring.stringify({
    "keyword" : "上海市长宁区天山第二小学", // 可以读取一个清单文件，遍历查询
    "type" : "",
    "geo_code" : ""
}); // post请求数据

var options = {
    hostname: "www.sydjsh.cn",
    port: 80,
    path: "/search.do",
    method: "post",
    headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Content-length" : postData.length // 定义请求的长度
    }
};

var request = http.request(options, function(response){

    var body = [];

    response.on("data", function(chunk){
        body.push(chunk);
    });

    response.on("end", function(){
        body = Buffer.concat(body);
        var html = body.toString();
        var count = $(html).find('.term_02 span').html();
        console.log(count);
    })
});

request.write(postData); // 发送请求
request.end();
