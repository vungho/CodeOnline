//
// var DBConfig = require("../modules/dynamoDB/DBConfig");
// var userServices = require("../modules/dynamoDB/UserServices")
// var expect = require("chai").expect;
//
// describe('Get User By User Name and OpenId Type - Test 1',function () {
//     var  idType = "null";
//     userServices.getUserDetails("binh",idType,function (error, data) {
//        // console.log(JSON.stringify(data));
//         var userName = data.Item.UserName;
//         expect(userName).to.equal("binh");
//     });
// });

var userServices = require("../modules/dynamoDB/UserServices")

    var  idType = "null";
    userServices.getUserDetails("binh",idType,function (error, data) {
        console.log(JSON.stringify(data));
    });

    userServices.getAllUser(function (error,data) {
       console.log(JSON.stringify(data));
    });





