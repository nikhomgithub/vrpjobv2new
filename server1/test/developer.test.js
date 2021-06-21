const mongoose = require('mongoose');
require('dotenv').config();

const developer =require('../controllers/developer')
const params=require('../routes/params')

const User = require('../modals/User')
const db=process.env.MONGO_URI


let res={
    mStatus:null,
    status:(a)=>{
            res.mStatus=a
            return res
           },
    mJson:null,
    json:(b)=>{
            res.mJson=b
            return res
        }
}

let next={}


const findShopId=async(shopName)=>{
    const Shop=require('../modals/Shop')
    const result = await Shop.findOne({shopName})
    //console.log(result._id)
    return result._id
}

describe('developer.js ', () => {

    beforeAll(async () => {
        await mongoose.connect(db, 
            { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }, 
            (err) => {
            if (err) {
                process.exit(1);
            }
        });
    });

    test("shop init",async ()=>{
        let req=params.shop
        const result =await developer.init(req,res,next)
        expect(result.mStatus).toBe(200)
    })   

    test("user init",async ()=>{
        let req=params.user
        const shopId=await findShopId("shopa")
        req={...req,shopId}
        const result =await developer.init(req,res,next)
        expect(result.mStatus).toBe(200)
    })   

    test("tableTemplate init",async ()=>{
        let req=params.tableTemplate
        const shopId=await findShopId("shopa")
        req={...req,shopId,user:{id:1},
                routeAddress:"/tabletemplate/init"
            }
        const result =await developer.init(req,res,next)
        expect(result.mStatus).toBe(200)
    })   





})
