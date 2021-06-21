const casual = require('casual');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
var uuid = require("uuid");

const { createTableTemplate } = require('./ctUtil');
//const tableTemplate=require('./tableTemplate')

//post=>localhost:3001/shop/shopsignup

/*
{
"shopName":"shopa",
"password":"shopa",
"ownerName":"shopa",
"ownerPassword":"shopa",
"ownerEmail":"a@mail.com"
}
*/

const shopsignup= async (req,res,next)=>{
    //console.log(req.body)
    const Data=require(req.modal);

    const { shopName,password,
            ownerName,ownerPassword,
            ownerEmail,
          ...remainigkeys}=req.body;
    
    let newShop=new Data (req.body);

    try{
        if(!shopName){throw {message:"Enter shopName"}}
        if(!password){throw {message:"Enter password"}}
        if(!ownerName){throw {message:"Enter ownerName"}}
        if(!ownerPassword){throw {message:"Enter ownerPassword"}}
        if(!ownerEmail){throw {message:"Enter ownerEmail"}}

        const resultShopname = await Data.findOne({shopName}).lean()
        if(resultShopname){throw {message:"shop name already exist"}}
        
        const resultOwnername = await Data.findOne({ownerName}).lean()
        if(resultOwnername){throw {message:"owner name already exist"}}

        const hash_password=await bcrypt.hash(password,10)
        newShop.password=hash_password;
        
        const hash_owner_password=await bcrypt.hash(ownerPassword,10)  
        newShop.ownerPassword=hash_owner_password;
       
        newShop.active=true
        newShop.code=uuid.v4()
        newShop.dateIn=new Date().toISOString().substring(0,10)
        
        newShop.ownerActive=true
        newShop.ownerCode=uuid.v4()

        const resultSave=await newShop.save();
        return res.status(200).send({message:"shop added successfully"})
    }
    catch(error){
        return res.status(400).send(error);
    }
}

//---------------------
const shoplogin= async (req,res,next)=>{
    try {
        const Data=require(req.modal);
        const {shopName,password}=req.body

        if(!shopName){throw {message:"Enter shopName"}}
        if(!password){throw {message:"Enter password"}}

        const resultFind=await Data.findOne({shopName}).lean()
        if(!resultFind) {throw {message:'Invalid shop name'}}
        
        const {_id,code,active}= resultFind
        if(!active){throw {message:'Inactive shop'}}
        
        const isMatch=await bcrypt.compare(password,resultFind.password)
        if(!isMatch) {throw {message:'Invalid password'}}
        
        const token =await jwt.sign( {id:_id.toString(),code},
                                    process.env.JWT_SECRET,
                                    {expiresIn:'365d'} ) //36000
        return res.status(200).json({ shopToken:token  })   
    }
    catch(error){
        return res.status(400).send(error);
    }
}
//---------------------
const ownerlogin= async (req,res,next)=>{
    const Data=require(req.modal);
    const {ownerName,ownerPassword}=req.body
    try{
        //console.log('1')
        if(!ownerName){throw {message:"Enter ownerName"}}
        if(!ownerPassword){throw {message:"Enter ownerPassword"}}

        const resultFind=await Data.findOne({ownerName}).lean()
        if(!resultFind) {throw {message:'Invalid owner name'}}
        //console.log('2')
        const {ownerCode,ownerActive}= resultFind
        if(!ownerActive){throw {message:'Inactive owner'}}
        //console.log('3')
        
        const isMatch=await bcrypt.compare(ownerPassword,resultFind.ownerPassword)
        if(!isMatch) {throw {message:'Invalid password'}}
        //console.log('4')
        const token =await jwt.sign( {ownerName,ownerCode},
                                    process.env.JWT_SECRET,
                                    {expiresIn:'365d'} ) 
        return res.status(200).json({ ownerToken:token  })   
    }
    catch(error){
        return res.status(400).send(error);
    }
}
//-----------------------------------
const shopchangepassword=async (req,res,next)=>{
    try{
        const Data=require(req.modal);
        const {shopName,password,newPassword1,newPassword2}=req.body;

        //console.log(req.body)
        //Simple validation
        if(!shopName){throw {message:"Enter shopName"}}
        if(!password){throw {message:"Enter password"}}
        if(!newPassword1){throw {message:"Enter newPassword1"}}
        if(!newPassword2){throw {message:"Enter newPassword2"}}

        //check new password and confirmed new password
        if(newPassword1!=newPassword2)
        { throw {message:'Recheck new password'}}
        
        //let finalresult={}
        const result=await Data.findOne({shopName}).lean()
        if(!result) { throw {message:'Invalid shop name'}};
        if(!result.active){ throw {message:'Inactive shop'}}
    
        const isMatch=await bcrypt.compare(password,result.password)
        if(!isMatch) {throw {message:'Invalid password'}}
        const hash_password = await bcrypt.hash(newPassword1,10)
        
        await Data.updateOne( {shopName},
                              {$set:{ password:hash_password,
                              code:uuid.v4() }
                            } )
        return res.status(200).json({message:"change password successfully"})
    }
    catch(error){
        return res.status(400).send(error);
    }
        
}
//----------------------------------
//post=>localhost:3001/*/ownerchangepassword
const ownerchangepassword=async (req,res,next)=>{
    try{
        const Data=require(req.modal);
        const {ownerName,ownerPassword,newOwnerPassword1,newOwnerPassword2}=req.body;

        if(!ownerName){throw {message:"Enter ownerName"}}
        if(!ownerPassword){throw {message:"Enter ownerPassword"}}
        if(!newOwnerPassword1){throw {message:"Enter newOwnerPassword1"}}
        if(!newOwnerPassword2){throw {message:"Enter newOwnerPassword2"}}

        //console.log(req.body)
        //Simple validation
        //check new password and confirmed new password
        if(newOwnerPassword1!=newOwnerPassword2)
        { throw {message:'Recheck new password'}}
        
        //let finalresult={}
        const result=await Data.findOne({ownerName}).lean()
        if(!result) { throw {message:'Invalid owner name'}};
        if(!result.ownerActive){ throw {message:'Inactive owner'}}
    
        const isMatch=await bcrypt.compare(ownerPassword,result.ownerPassword)
        if(!isMatch) {throw {message:'Invalid password'}}
        const hash_owner_password = await bcrypt.hash(newOwnerPassword1,10)
        
        await Data.updateOne( {ownerName},
                              {$set:{ ownerPassword:hash_owner_password,
                                ownerCode:uuid.v4() }
                            } )
        return res.status(200).json({message:"change owner password successfully"})
    }
    catch(error){
        return res.status(400).send(error);
    }
}
//---------------------------
const getshop=async(req,res,next)=>{
    //no shopId is required
    const Data=require(req.modal);
    let {sort,...remaining}=req.body
    if(!sort){ sort={dateIn:1} }
    const qryObject={...remaining}
    try{
        const count = Data.find(qryObject).lean().countDocuments()
        const lastRecord = Data.findOne({}).sort({dateIn:-1})
        const result= Data.find(qryObject).lean()
                        .select("-password")
                        .select("-code")
                        .select("-ownerPassword")
                        .select("-ownerCode")
                        .select("-shopId")
                        .sort(sort)
        let temp
        Promise.all([result, count,lastRecord]).then((results)=>{
            temp={data:results[0],count:results[1],lastRecordId:results[2]._id}
            res.status(200).json(temp)
        });            
    }
    catch(error){
        return res.status(400).send({message:"getshop fail"})
    }
}
//--------------------------
const getlimitshop=async(req,res,next)=>{
    //no shopId is required
    const Data=require(req.modal);
    let {pageNumber,sort,limitRow,...remaining}=req.body
    
    if(!limitRow){limitRow=10}
    if(limitRow<1){limitRow=1}
    if(limitRow>50){limitRow=50}

    if(!pageNumber){ pageNumber=1 }
    if(pageNumber<1){ pageNumber=1 }

    if(!sort){ sort={dateIn:1} }
    try{
        const count = Data.find({...remaining}).lean().countDocuments()
        const lastRecord = Data.findOne({}).sort({dateIn:-1})
        const result= Data.find({...remaining}).lean()
                        .skip((pageNumber-1)*limitRow).limit(limitRow)
                        .select("-password")
                        .select("-code")
                        .select("-ownerPassword")
                        .select("-ownerCode")
                        .sort(sort)
        let temp
        Promise.all([result, count,lastRecord]).then((results)=>{
            temp={data:results[0],count:results[1],lastRecordId:results[2]._id}
            res.status(200).json(temp)
        });
    }
    catch (error){
        return res.status(400).send({message:"getlimitshop fail"})
    }
}

const deleteshop=async(req,res,next)=>{
    //no shopId is required
    const Data=require(req.modal);
    const {shopName}=req.body

    const qryObject={shopName}

    try{
        const resDelete = await Data.deleteOne(qryObject)
        return res.status(200).json({message:"deleteshop successfully"})
    
    }
    catch (error){
        return res.status(400).send({message:"deleteshop fail"})
    }
}

const updateshop=async(req,res,next)=>{
    const Data=require(req.modal);

    const {_id,shopName,password,
               ownerName,ownerPassword,
           ...remaining}=req.body

    try{
        //check user shop
        if(password||ownerPassword){ 
            throw {message:"No password update allowed"}
        }
    

        const qryObject={shopName}
        let dataTosave={...remaining}
    
        const resUpdate=await Data.updateOne(
            qryObject,
            {$set:{...dataTosave}}
        )

        return res.status(200).json({message:"update succesfully"})
    }
    catch (error){
        //console.log(error)
        return res.status(400).send(error)
    }
}

//==================================
//===================================
//post=>localhost:3001/*/login
const login= async (req,res,next)=>{
    const Data=require(req.modal);
    console.log(req.headers)
    console.log(req.body)
    //console.log(req.user)
    const shopId=req.shopId

    console.log(shopId)
    const {username,password}=req.body;
    try{
        if(!username){ throw {message:"Enter username"} }
        if(!password){ throw {message:"Enter password"} }

        const resultFind=await Data.findOne({username,shopId}).lean()
        console.log(resultFind)
        if(!resultFind) {throw {message:'Invalid username'} }
    
        const {id,code,userLevel,active}= resultFind
        if(!active){throw {message:'Inactive user'} }
        
        const isMatch=await bcrypt.compare(password,resultFind.password)
        if(!isMatch) {throw {message:'Invalid password'}}
        
        const token =await jwt.sign( {id:id.toString(),code},
                                      process.env.JWT_SECRET,
                                     {expiresIn:'365d'} ) //36000
        return res.status(200).json({ username,
                                      [req.tokenName]:token  })    
    }
    catch(error){
        return res.status(400).send(error);
    }
}
//----------------
//post=>localhost:3001/*/changepassword
const changepassword=async (req,res,next)=>{
    //console.log('change password')
    //console.log(req.body)
    try{
        const Data=require(req.modal);
        const shopId=req.shopId
        const {username,password,newPassword1,newPassword2}=req.body;
        //console.log(req.body)
        //Simple validation
        if(!username){throw {message:"Enter username"}}
        if(!password){throw {message:"Enter password"}}
        if(!newPassword1){throw {message:"Enter newPassword1"}}
        if(!newPassword2){throw {message:"Enter newPassword2"}}

        //check new password and confirmed new password
        if(newPassword1!=newPassword2){ throw {message:'Recheck new password'}}
        
        //let finalresult={}
        const result=await Data.findOne({username,shopId}).lean()
        if(!result) { throw {message:'Invalid username'} };
        if(!result.active){ throw {message:'Inactive user'}}
    
        const isMatch=await bcrypt.compare(password,result.password)
        if(!isMatch) {throw {message:'Invalid password'}}
        const hash_password = await bcrypt.hash(newPassword1,10)
        
        await Data.updateOne( {username,shopId},
                              {$set:{ password:hash_password,
                               code:uuid.v4() }
                            } )
        return res.status(200).json({message:"change password successfully"})
    }
    catch(err){
        return res.status(400).send(error);
    }       
}
//---------------------------------
const adduser= async (req,res,next)=>{
    //console.log('adduser')
    const Data=require(req.modal);
    
    const shopId=req.shopId
    const { id,username,password,
            userLevel }=req.body;

    //console.log(req.headers)           
    let newUser=new Data ({...req.body,shopId});

    try{
        if(!username){throw {message:"Enter userame"} }
        if(!password){throw {message:"Enter password"} }
        if(!id){throw {message:"Enter id"} }
        if(!userLevel){throw {message:"Enter userLevel"} }
        
        //const resultShop=await Data.findOne({shopId}).lean()
        //if(!resultShop) { throw 'shopId does not exist'};
        //console.log('1')

        const resultUsername = await Data.findOne({username,shopId}).lean()
        if(resultUsername){throw {message:"Invalid username'"} }
        
        //console.log('2')

        const hash_password=await bcrypt.hash(password,10)
        newUser.password=hash_password;
       
        newUser.active=true
        newUser.code=uuid.v4()
        newUser.dateIn=new Date().toISOString().substring(0,10)

        const resultSave=await newUser.save();
        //console.log('3')
        if(resultSave){
            //console.log('4')
            const TableTemplate=require('../modals/TableTemplate');
            const tableTemplate=require('../data/initData/tableTemplate')

            const temp=createTableTemplate({tableTemplate,userId:id,shopId})
            //console.log('5')
            //console.log(temp)
            await TableTemplate.create(temp)
        }

        return res.status(200).json({message:"user is added successfully"})
    }
    catch(error){
        return res.status(400).send(error);
    }
}

//==========================
const shopAndUser={
    shopsignup,shoplogin,ownerlogin,
    shopchangepassword,ownerchangepassword,
    getshop,getlimitshop,deleteshop,updateshop,
    adduser,login,changepassword
}

module.exports = shopAndUser;