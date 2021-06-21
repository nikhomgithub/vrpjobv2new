const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({

/*1*/    shopName: {type: String,required:true,unique:true},//input  ชื่อร้าน 
         //shopName: {type: String,required: true,unique:true}
/*2*/    password:{type:String,required:true},//input  รหัส 
/*3*/    active:{type:Boolean},//autogen by mongo
/*4*/    code:{type:String},//autogen by node
         //uuid.v4()   
/*5*/    dateIn:{type:Date},
         //new Date().toISOString()
         //2020-12-30T12:40:20.964Z

/*6*/    ownerName:{type:String,required:true,unique:true},//input ชื่อเจ้าของ 
         //ownerName:{type:String,required:true,unique:true}
/*7*/    ownerPassword:{type:String,required:true},//input รหัส
/*8*/    ownerActive:{type:Boolean},//autogen by mongo
/*9*/    ownerCode:{type:String},//autogen by node 
    
/*10*/   ownerEmail:{type:String,required:true,unique:true}, //อีเมลเจ้าของ
});

ShopSchema.index({shopName:1,ownerName:1})

module.exports = Shop = mongoose.model('Shop', ShopSchema);