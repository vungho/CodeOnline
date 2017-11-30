
var DBConfig = require("./DBConfig");
var userServices = require("./UserServices")

var  idType = "null";
userServices.getUserDetails("binh",idType,function (error, data) {
    console.log(JSON.stringify(data));
});



