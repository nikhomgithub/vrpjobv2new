const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const dataRt = require('./dataRt.js')
const params=require('./params.js')

const checkNone=()=>{return (req,res,next)=>{next()}}
const checkShopToken=require('../middleware/checkShopToken');

const param=params.shop

const routeTemplate=[
    
    {route:"shopsignup",type:"post",useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone}, 
    
    {route:"shoplogin",type:"post",useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    {route:"ownerlogin",type:"post",useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    {route:"shopchangepassword",type:"post",useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    {route:"ownerchangepassword",type:"post",useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    
    {route:"init",type:"get", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    
    {route:"restore",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    {route:"backup",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    

    {route:"getshop",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    {route:"getlimitshop",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    {route:"deleteshop",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    {route:"updateshop",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
]  

dataRt({router,param,routeTemplate})

module.exports = router;