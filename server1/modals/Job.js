const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    id:{type:Number},
    date:{type:Date}, // วันที่
    timestamp:{type:Date},

    title:{type:String}, // บาร์โค้ด
    body:{type:String}, // ชื่อ
    category: {type:String}, // ชื่อกลุ่ม
    photoUrl1:{type:[String]}, // 
    videoLink:{type:String},
    active:{type:Boolean},

    timeupdate:{type:Date},
    username:{type:String},

    comment:{type:String},
    timeupdateComment:{type:Date},
    usernameComment:{type:String},
    
    shopId:{type:String,required:true}, // 

});

JobSchema.index({date:1})

module.exports = Job = mongoose.model('Job', JobSchema);