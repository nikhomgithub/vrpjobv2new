const tableTemplate=require('./tableTemplate')
const uuid = require("uuid");

//==============================
const shopInit={
    shopName:"shopa",
    password:"shopa",
    active:true,
    code:uuid.v4(),
    dateIn: new Date().toISOString().substring(0,10),
    
    ownerName:"ownera",
    ownerPassword:"ownera",
    ownerActive:true,
    ownerCode:uuid.v4(),
    
    ownerEmail:'a@mail.com'
}
//-----------------------------
const userInit={
    id:1,
    username:"usera",
    password:"usera",
    active:true,
    code:uuid.v4(),
    userLevel:"admin",
    dateIn: new Date().toISOString().substring(0,10),
    name:"usera",
    surname:"usera"
}

//--------------------------------------
const basicDataInit={
    id:1,
    category:["ซ่อม","ผลิต","ใหม่"],
    userLevel:["admin","staff","visitor"],

    routeAuth:[
     
     {id:1,routeAddress:'/user/adduser', routeName:"N/A", userLevel:["admin"]},
     {id:2,routeAddress:'/user/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:3,routeAddress:'/user/deletecustom', routeName:"N/A", userLevel:["admin"]},
     
     {id:5,routeAddress:'/basicdata/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:6,routeAddress:'/basicdata/deletecustom', routeName:"N/A", userLevel:["admin"]},
     {id:7,routeAddress:'/basicdata/addcustom', routeName:"N/A", userLevel:["admin"]},
     {id:8,routeAddress:'/basicdata/updatecustom', routeName:"N/A", userLevel:["admin"]},
     
     {id:10,routeAddress:'/job/getlimit', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:11,routeAddress:'/job/deletecustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:12,routeAddress:'/job/addcustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:13,routeAddress:'/job/updatecustom', routeName:"N/A", userLevel:["admin","staff"]},
    ]
}

//==============================
const jobInit={
    id:1,
    date: new Date().toISOString().substring(0,10),
    timestamp: new Date().toISOString(),

    title:"first job",
    category:"first group",
    body:"saf fdsafs fdsaf fdsafsafsda fdsfsadfs afdsafsadf asfd asfdsa fdsa fdsa",

    photoUrl1:[""],
    videoLink:"",
    active:true,
    
    timeupdate: new Date().toISOString(),
    username:"jane",

    comment:"first ment ........",
    usernameComment:"Jack",
    timesupdateComment: new Date().toISOString(),


}

const initData= {
                    shopInit,userInit,
                    basicDataInit,
                    jobInit
                }



module.exports = initData;