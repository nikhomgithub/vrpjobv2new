const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BasicDataSchema = new Schema({
    id:{type: Number,required:true}, // ไอดี
    category:{type:[String]}, //
    userLevel:{type:[String]}, //

    shopId:{type:String,required:true}, //
    routeAuth:{type:[{
        id:{type:Number}, //ไอดี
        routeAddress:{type:String}, // เราท์แอดเดรส
        routeName:{type:String}, // เราท์เนม
        userLevel:{type:[String]} // ระดับผู้ใช้
    }],default:[]}
});

BasicDataSchema.index({id:1})

module.exports = BasicData = mongoose.model('BasicData', BasicDataSchema);