const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const dataRt = require('./dataRt.js')
const params=require('./params.js')

const checkNone=()=>{return (req,res,next)=>{next()}}
const checkShopToken=require('../middleware/checkShopToken')
const checkUserLevel=require('../middleware/checkUserLevel')

const param=params.basicData

const routeTemplate=[
    
    {route:"init",type:"get", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkNone},
    
    {route:"restore",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    {route:"backup",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    
    {route:"getcustom",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
    {route:"updatecustom",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
]  

dataRt({router,param,routeTemplate})

module.exports = router;