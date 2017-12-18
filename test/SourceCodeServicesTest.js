var SourceCodeService = require("../modules/dynamoDB/SourceCodeServices");
// SourceCodeService.createNewSourceFile("nga","fileName_3","System.out.println(\"AhihiVungCho\"","java",function (error,data) {
//    console.log(JSON.stringify(data));
// });
// var key = {
//     UserName : "nga",
//     FileName : "fileName",
// }
// var key2 = null;
// SourceCodeService.getUserSourceCodesPageList(10,key,"nga", function (error,data) {
//    if(error!=null){
//        console.log(JSON.stringify(error));
//    }else {
//        console.log(JSON.stringify(data))
//    }
//
// });
SourceCodeService.getSourceFile("nga","fileName_3", function (error,data) {
    console.log(data)
})

// SourceCodeService.updateSourceFile("nga","fileName_3","Ahihi Updated",function (error,data) {
//     console.log(JSON.stringify(data))
// });