const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
/*1*/     id:{type:Number,required:true}, // ไอดี
/*2*/     username:{type:String,required:true}, // ชื่อผู้ใช้ 
/*3*/     password:{type:String,required:true}, // รหัส 
/*4*/     active:{type:Boolean,required:true}, // 
/*5*/     code:{type:String,required:true}, //
          //uuid.v4()   
/*6*/     userLevel:{type:String,required:true}, // ระดับผู้ใช้

/*7*/     shopId:{type:String,required:true}, // 
/*8*/     dateIn:{type:Date,required:true}, //
          //new Date().toISOString()
          //2020-12-30T12:40:20.964Z
/*9*/     name:{type:String}, // ชื่อ
/*10*/    surname:{type:String}, // สกุล

});

UserSchema.index({id:1,username:1,shopId:1})

module.exports = User = mongoose.model('User', UserSchema);