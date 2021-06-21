const casual = require('casual');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const uuid = require("uuid");
const { array } = require('../middleware/upload');
const { createTableTemplate } = require('./ctUtil');
//const tableTemplate=require('./tableTemplate')
const fs = require('fs');

const mytest= async (req,res,next)=>{
    const Data=require(req.modal);    
    const result=await Data.findOne({})
    return result
}
//----------------------------------
//for all including shop
const init= async (req,res,next)=>{

    console.log('init')
    const Data=require(req.modal);

    let newData=new Data ({...req.initData,shopId:req.shopId});
    //let result = null

    try{
        if(req.initData.password){
            const hash_password=await bcrypt.hash(req.initData.password,10)
            newData.password=hash_password;
        }
        if(req.initData.ownerPassword){
            const owner_hash_password=await bcrypt.hash(req.initData.ownerPassword,10)
            newData.ownerPassword=owner_hash_password;
        }

        if(req.routeAddress=="/shop/init"){
            const Shop=require('../modals/Shop'); 
            const temp = await Shop.findOne({shopName:req.initData.shopName})
            if(temp){
               return res.status(400).json('shopName already exist')
            }
        }
        else {
            if(!req.shopId){
                return res.status(400).json('need shop login')
            }

            const temp=await Data.deleteMany({shopId:req.shopId})   
            console.log(temp)
        }
        const result=await newData.save()

        return res.status(200).json(result)
    }
    catch(error){
        return res.status(400).send(error);
    }
}
//--------------------------------------

//get=>localhost:3001/*/restore
const restore=async(req,res,next)=>{
    
    const {shopName,password,filePath}=req.body

    const Shop=require('../modals/Shop'); 
    const Data=require(req.modal);
    try{


        if(!shopName){throw {message:"Enter shopName"}}
        if(!password){throw {message:"Enter password"}}
        if(!filePath){throw {message:"Enter filePath"}}
        
        console.log('1')

        const resultFind=await Shop.findOne({shopName}).lean()
        
        if(!resultFind) {throw {message:'Invalid shop name'}}
        console.log('2')

        const {_id,code,active}= resultFind
        if(!active){throw {message:'Inactive shop'}}
        
        const isMatch=await bcrypt.compare(password,resultFind.password)
        if(!isMatch) {throw {message:'Invalid password'}}
        console.log('3')

        const restoreData = require(`../data/${filePath}`)

        if(!restoreData){throw {message:"Invalid file"} }
        if(!restoreData.table){throw {message:"File in Wrong Format"} }
        console.log('4')

        //console.log(restoreData.table)
        if(Array.isArray(restoreData.table)){
            //console.log("1")
            if(req.routeAddress=="/shop/restore"){
                await Shop.deleteMany({shopName})           
                await Shop.create(restoreData.table)
                return res.status(200).json({message:"restore succesfully"})
            }
            else{
                const shopId=_id
                await Data.deleteMany({shopId})     
                await Data.create(restoreData.table)
                return res.status(200).json({message:"restore succesfully"})
            }    
        }
        else {
            throw { message:"restoreData is not array" }
        } 
    }
    catch(error){
        return res.status(400).send({message:"restore fail"})
    }
}
//------------------------------------
//get=>localhost:3001/*/backup
//all backup to file
const backup=async(req,res,next)=>{
    const {shopName,password}=req.body

    const Data=require(req.modal);

    let temp=req.routeAddress.split("/")
    const today=new Date().toISOString()
    const year=today.substring(0,4)
    const month=today.substring(5,7)
    const date=today.substring(8,10)
    const fileName=`${date}_${month}_${year}_${temp[1]}.json`
    const fullPath=`${req.backupData}${fileName}`

    try{
        const Shop=require('../modals/Shop'); 
        if(!shopName){throw {message:"Enter shopName"}}
        if(!password){throw {message:"Enter password"}}

        const resultFind=await Shop.findOne({shopName}).lean()
        
        if(!resultFind) {throw {message:'Invalid shop name'}}
        
        const {_id,code,active}= resultFind
        if(!active){throw {message:'Inactive shop'}}
        
        const isMatch=await bcrypt.compare(password,resultFind.password)
        if(!isMatch) {throw {message:'Invalid password'}}

        if(req.routeAddress=="/shop/backup"){
            const result=[resultFind]
            const obj={table:result}
            const json = JSON.stringify(obj);
            
            fs.writeFile(fullPath, json, 'utf8', 
                ()=>res.status(200).json({message:'backup succesfully'})
            );
        }
        else{
            const shopId=_id
            const result= await Data.find({shopId}).lean()
            if(!result){throw {message:`Invalid ${temp[1]}`}}

            const obj={table:result}
            const json = JSON.stringify(obj);
            
            fs.writeFile(fullPath, json, 'utf8', 
                ()=>res.status(200).json({message:'backup succesfully'})
            );
        }
    }
    catch(error){
        return res.status(400).send(error);
    }

    /*
    const result= await Data.find({shopId}).lean()
    const obj={table:result}
    const json = JSON.stringify(obj);
    fs.writeFile(req.backupData, json, 'utf8', 
        ()=>res.status(200).json({message:'backup succesfully'})
    );
    */
    //
}
//================================
//================================
//================================

//post=>localhost:3001/*/getcustom
//for user,group,tabletemplate,basicdata
const getcustom=async(req,res,next)=>{

    const Data=require(req.modal);
    //shopId from shopToken
    const shopId=req.shopId
    
    let {sort,...remaining}=req.body
    if(!sort){ sort={id:1} }
    
    let qryObject

    if(req.routeAddress=="/tabletemplate/getcustom"){
        //userId from userToken
        const userId=req.user.id
        qryObject={id:userId,...remaining,shopId}
    }
    else{
        qryObject={...remaining,shopId}
    }
    try{
        //console.time('getcustom')
        const count = Data.find(qryObject).lean().countDocuments()
        const lastRecord = Data.findOne({shopId}).sort({id:-1})
        const result= Data.find(qryObject).lean()
                        .select("-password")
                        .select("-code")
                        .select("-ownerPassword")
                        .select("-ownerCode")
                        .select("-shopId")
                        .sort(sort)
        
        //console.timeEnd('getcustom2')
        let temp
        Promise.all([result, count,lastRecord]).then((results)=>{
            //console.log(results)
            temp={data:results[0],count:results[1],lastRecordId:results[2].id}
            res.status(200).json(temp)
        });        
    }
    catch(error){
        return res.status(400).send({message:"getcustom fail"})
    }
}
//=====================================

//post=>localhost:3001/*/getlimit
//for user,job,bill,transaction,transactionlog,product,customer,partner
const getlimit=async (req,res,next)=>{
    
    const Data=require(req.modal);
    const shopId=req.shopId
    
    let {pageNumber,sort,limitRow,...remaining}=req.body
    if(!limitRow){limitRow=10}
    if(limitRow<1){limitRow=1}
    if(limitRow>50){limitRow=50}

    if(!pageNumber){ pageNumber=1 }
    else if(pageNumber<1){ pageNumber=1 }

    if(!sort){ sort={id:1} }

    try{
        //console.time('getlimit')
        const count = Data.find({...remaining,shopId}).lean().countDocuments()
        //count of renderBage
        const lastRecord = Data.findOne({shopId}).sort({id:-1})
        //for add form
        
        //const result= Data.find({}).lean()

        const result= Data.find({...remaining,shopId}).lean()
                        .skip((pageNumber-1)*limitRow).limit(limitRow)
                        .select("-password")
                        .select("-code")
                        .select("-ownerPassword")
                        .select("-ownerCode")
                        .select("-shopId")
                        .sort(sort)
        //console.timeEnd('getlimit')
        //res.status(200).json({data:result})
        let temp
        Promise.all([result, count,lastRecord]).then((results)=>{
            //console.log(results)
            temp={data:results[0],count:results[1],lastRecordId:results[2].id}
            //temp={data:results[0],count:results[1],lastRecordId:null}
            res.status(200).json(temp)
        });
    }
    catch (error){
        return res.status(400).send({message:"getlimit fail"})
    }
    
}
//==============================
//==============================

//post=>localhost:3001/*/deleteall
//for all in shopId
const deleteall=async(req,res,next)=>{
    
    const Data=require(req.modal);
    const shopId=req.shopId
    //console.log(shopId)
    try{        
        const resDelete = await Data.deleteMany({shopId})
        //console.log(resDelete)
        return res.status(200).json({message:"delete all succesfully"})
    }
    catch(error){
        return res.status(404).send({message:"delete all fail"})
    }
    
}
//---------------------------
//for all in shopId
//if delete user, tableTemplate get delete as well
const deletecustom=async(req,res,next)=>{
    
    const Data=require(req.modal);
    const shopId=req.shopId

    const {id}=req.body

    try{
        await Data.deleteOne({id,shopId})

        if(req.routeAddress=="/user/deletecustom"){
            const TableTemplate=require('../modals/TableTemplate'); 
            await TableTemplate.deleteMany({id,shopId})
        }

        return res.status(200).json({message:"delete custom succesfully"})
    }
    catch (error){
        return res.status(400).send({message:"delete custom fail"})
    }
    
}
//--------------------------------
const deletegroup=async(req,res,next)=>{
    const Data=require(req.modal);
    const shopId=req.shopId

    const {id,parentId,allDeleteId}=req.body

    try{
        await Data.deleteOne({id,shopId})

        if(parentId){
            if(parentId>=0){
                await  Data.updateOne(
                    {id:parentId,shopId},
                    {$pull:{"children":id}}   
                )
            }
        }

        if(Array.isArray(allDeleteId)){
            if(allDeleteId.length>0){
                await Data.deleteMany({id:{$in:allDeleteId}})
            }
        }

        return res.status(200).json({message:"delete group succesfully"})
    }
    catch (error){
        return res.status(400).send({message:"delete group fail"})
    }
}
//--------------------------------
const deletetransaction=async(req,res,next)=>{
    
    const Data=require(req.modal);
    const shopId=req.shopId
    const {id,detail}=req.body

    try{

        const resFindId = await Data.findOne({ id,shopId }).lean()
        if(!resFindId) { throw ""}

        if(resFindId){
            const prevDetail=resFindId.detail
            const {effectOrder,effectStock,effectPlan}=resFindId
            const Product=require('../modals/Product'); 

            let orderChange=0
            let stockChange=0
            let planChange=0

            let orderFactor=0
            let stockFactor=0
            let planFactor=0

            if(effectOrder=="บวก"){orderFactor=1}
            if(effectOrder=="ลบ"){orderFactor=-1}
            if(effectStock=="บวก"){stockFactor=1}
            if(effectStock=="ลบ"){stockFactor=-1}
            if(effectPlan=="บวก"){planFactor=1}
            if(effectPlan=="ลบ"){planFactor=-1}

            for (let j=0;j<prevDetail.length;j++){
                orderChange=(0-prevDetail[j].quantity)*orderFactor
                stockChange=(0-prevDetail[j].quantity)*stockFactor
                planChange=(0-prevDetail[j].quantity)*planFactor

                const resUpdate= await Product.updateOne(
                    {id:prevDetail[j].id,shopId},
                    {$inc:{"stock":stockChange,"order":orderChange,"plan":planChange}}
                )
            }
        }

        await Data.deleteOne({id,shopId})
        return res.status(200).json({message:"delete tabletemplate succesfully"})
    }
    catch (error){
        return res.status(400).send({message:"delete fail"})
    }
    
}
//===============================
//===============================
//===============================
//==============
/* form-data
query[id] :5
query[groupName] : five
query[children] :
query[shopId] : 5f7e8e2ec016e550dbe3c6d2
query[parentId] : 0
*/
//==================
//check filed "photoUrl_"
//check if it is = [""]
//check if it is =["/upload/job/01_21_2021/bb.jpg",...]
//check if it is = ["/upload/job/bb_.jpg"] change to be"/upload/job/01_21_2021/bb.jpg"

const addDateFolderToUrl=(reqBody,reqFolder)=>{
    
    let tempPhotoObj={}
    //ต้องการตามหา key ที่ขึ้นต้นด้วย photoUrl
    const arrayOfKeyName=Object.keys(reqBody)
    
    for (j=0;j<arrayOfKeyName.length;j++){
        //i = field name such as 'id','photoUrl','tempPhotoUrl'
        const i = arrayOfKeyName[j]
        
        //to find photoUrl_ filed
        if(i.substring(0, 8)=="photoUrl"){
            //console.log('subString(0,8)')
            //============================
            //in case no photoUrl, just break out
            if(reqBody[i].length==1){
                if(reqBody[i][0]==""){
                    break;
                }
            }           
            
            //=============================
            let newUrlArray=[] 
            //req.body['photoUrl1'].length > 0
            if(reqBody[i].length>0){ 
                //at least should have photoUrl=[""]
                reqBody[i].map(j=>{
                    let temp=j.split("/")
                    //"https://picsum.photos/200"
                    // ไม่ต้องเปลี่ยนไร
                    if(temp[0]=="https"||temp[0]=="http"){
                        newUrlArray=[...newUrlArray,j]
                    }
                    //upload/job/01_21_2021/room-1.jpg
                    //temp=["","upload","job","01_21_2021","room-1.jpg"]
                    //ถ้า คือ 5 ไม่ต้องเปลี่ยนไร 
                    if(temp.length==5){
                        newUrlArray=[...newUrlArray,j]
                    }
                    if(temp.length==1){
                        //temp[0]=["room-1.jpg"] we just add a file on client
                        //we need to put "/upload/job/01_21_2021"
                        if(temp[0]!=""){
                            newUrlArray=[...newUrlArray,`/${reqFolder}/${j}`] 
                        }
                    }
                })
                //check
                //console.log('newUrlArray')
                //console.log(newUrlArray)
            }
            if(newUrlArray.length>0){   
                //tempPhotoObj={...tempPhotoObj,
                //    ['photoUrl1'],["/upload/customer/01_21_2021/lcd.jpg"]}
                tempPhotoObj={...tempPhotoObj,[i]:newUrlArray}
            }
            
        }    
    }
    return tempPhotoObj
    
}
//---------------------------
//get=>localhost:3001/*/addcustom
//all except user,shop,tableTemplate,transaction
const addcustom= async(req, res, next) => {
    const Data=require(req.modal); 
    const shopId=req.shopId
    const userId=req.user.id
    const {id}=req.body
    const {shopName,ownerName,username,password,ownerPassword,
           ...remaining}=req.body

    try{
        //check id
        if(!id){ throw {message:'Id is invalid'} }
        if(id<1){ throw {message:'Id is invalid'} }
        if(!shopId){ throw {message:'shopId is invalid'}  }   
        console.log('1')
        //check user shop
        if(shopName||ownerName||password||ownerPassword){ 
            throw {message:"No username or password add allowed"}
        }
        console.log('1.5')

        const resFindId = await Data.findOne({ id,shopId }).lean()
        if(resFindId){ throw {message:"ID already exists"} }
        console.log('2')
        let dataTosave={...remaining,shopId,userId}
        console.log('3')
        //add photo
        const tempPhotoObj=addDateFolderToUrl(req.body,req.folder)
        console.log('4')

        if(Object.keys(tempPhotoObj).length>0){
            dataTosave={...dataTosave,...tempPhotoObj}
        }
        console.log('5')

        const newData=new Data (dataTosave);
        await newData.save();
        return res.status(200).send({message:"add custom successfully"})

    }
    catch (error){
        return res.status(400).send({message:"add custom fail"})
    }
}
//------------------------------
const addgroup= async(req, res, next) => {
    const Data=require(req.modal); 

    const shopId=req.shopId
    const userId=req.user.id
    const {id,parentId}=req.body
    const {children,...remaining}=req.body
    let dataTosave={...remaining,["children"]:[]}

    try{
        //check id
        if(!id){ throw {message:'Id is invalid'} }
        if(id<1){ throw {message:'Id is invalid'} }
        if(!shopId){ throw {message:'shopId is invalid'}  }   

        const resFindId = await Data.findOne({ id,shopId }).lean()
        if(resFindId){ throw {message:"ID already exists"} }
        
        dataTosave={...dataTosave,shopId,userId}
        
        //make sure we have children array
        /*
        if(!children){
            dataTosave={...dataTosave,["children"]:[]}
        }else{
            if(!Array.isArray(children)){
                dataTosave={...dataTosave,["children"]:[]}
            }
        }
        */

        //group
        if(parentId>=0){
            await  Data.updateOne(
                {id:parentId,shopId},
                {$push:{"children":id}}   
            )
        }

        const newData=new Data (dataTosave);
        await newData.save();
        return res.status(200).send({message:"add group successfully"})

    }
    catch (error){
        return res.status(400).send({message:"add group fail"})
    }
}

//------------------------------
const addtransaction= async(req, res, next) => {
    
    const Data=require(req.modal); 

    const shopId=req.shopId
    const userId=req.user.id
    const {shopName,ownerName,username,password,ownerPassword,
           ...remaining}=req.body
    const {id,effectStock,effectOrder,effectPlan,detail,groupId}=req.body

    try {
        //check id
        if(!id){ throw {message:'Id is invalid'} }
        if(id<1){ throw {message:'Id is invalid'} }
        if(!shopId){ throw {message:'shopId is invalid'}  }   

        //check user shop
        if(shopName||ownerName||username||password||ownerPassword){ 
            throw {message:"No username or password add allowed"}
        }

        if(!effectPlan){throw {message:"no effectPlan"}}
        if(!effectStock){throw {message:"no effectStock"}}
        if(!effectOrder){throw {message:"no effectOrder"}}

        if(!detail){throw {message:"no detail"}}
        if(!groupId){throw {message:"no groupId"}}

        const resFindId = await Data.findOne({ id,shopId }).lean()
        if(resFindId){ throw {message:"ID already exists"} }
        
        let dataTosave={...remaining,shopId,userId}    

         //add photo
        const tempPhotoObj=addDateFolderToUrl(req.body,req.folder)
            
        if(Object.keys(tempPhotoObj).length>0){
            dataTosave={...dataTosave,...tempPhotoObj}
        }

        const newData=new Data(dataTosave) 
        const resSave = await newData.save() 

        //updat Product (stock,order,plan)
        const Product=require('../modals/Product'); 
        
        let orderChange=0
        let stockChange=0
        let planChange=0

        let orderFactor=0
        let stockFactor=0
        let planFactor=0

        if(effectStock=="บวก"){stockFactor=1}
        if(effectStock=="ลบ"){stockFactor=-1}
        if(effectOrder=="บวก"){orderFactor=1}
        if(effectOrder=="ลบ"){orderFactor=-1}
        if(effectPlan=="บวก"){planFactor=1}
        if(effectPlan=="ลบ"){planFactor=-1}

        for (let j=0;j<detail.length;j++){
            orderChange=parseFloat(detail[j].quantity)*orderFactor
            stockChange=parseFloat(detail[j].quantity)*stockFactor
            planChange=parseFloat(detail[j].quantity)*planFactor

            await Product.updateOne(
                {id:detail[j].id,shopId},
                {$inc:{"stock":stockChange,
                    "order":orderChange,
                    "plan":planChange}}
            )
        }

        return res.status(200).json({message:"add transaction succesfully"})
    }
    catch (error){
        return res.status(400).send(error)
    }
    
}

//===========================
//===========================

//all exclud shop,user,tabletemplate
const updatecustom=async (req,res,next)=>{
    const Data=require(req.modal);
    const shopId=req.shopId
    const userId=req.user.id
    const {id,username,password,shopName,
              ownerName,ownerPassword,
              ...remaining}=req.body
    
    const qryObject={id,shopId}
    console.log('req.body.............')
    console.log(req.body)
    try{
        //check user shop
        if(shopName||ownerName||username||password||ownerPassword){ 
            throw {message:"No username or password update allowed"}
        }

        let dataTosave={...remaining,shopId,userId,id}
        //let dataTosave={...remaining,shopId}

        const tempPhotoObj=addDateFolderToUrl(req.body,req.folder)

        if(Object.keys(tempPhotoObj).length>0){
            dataTosave={...dataTosave,...tempPhotoObj}
        }
	console.log('...dateTosave')
	console.log(dataTosave)

        const resUpdate=await Data.updateOne(
            qryObject,
            {$set:{...dataTosave}}
        )
        console.log('resUpdte')
	console.log(resUpdate)
        return res.status(200).json({message:"update custom succesfully"})
    }
    catch (error){
        return res.status(400).send({message:"update custom fail"})
    }
}
//----------------------------------------
const updategroup=async (req,res,next)=>{
    const Data=require(req.modal);
    const shopId=req.shopId
    const userId=req.user.id

    const {parentId}=req.body

    const {id,children,//we shall not update children in case of group
              ...remaining}=req.body
    const qryObject={id,shopId}
    try{
        let dataTosave={...remaining,shopId,userId}
        //let dataTosave={...remaining,shopId}

        /*
        //make sure children array is exist
        if(!children){
            dataTosave={...dataTosave,["children"]:[]}
        }else{
            if(!Array.isArray(children)){
                dataTosave={...dataTosave,["children"]:[]}
            }
        }
        */

        //group if we want to change parentId 
        //first find the existing record to find parentId
        //if parentId change need to update children of parent as well 
        if(parentId){
            const existingRecord = await Data.findOne(qryObject).lean()
            if(parentId!=existingRecord.parentId){
                //at parent , delete id from children
                await  Data.updateOne(
                    {id:existingRecord.parentId,shopId},
                    {$pull:{"children":id}}   
                )
                //at new parent , add id into children
                await  Data.updateOne(
                    {id:parentId,shopId},
                    {$push:{"children":id}}   
                )
            }
        }
        

        const resUpdate=await Data.updateOne(
            qryObject,
            {$set:{...dataTosave}}
        )

        return res.status(200).json({message:"update group succesfully"})
    }
    catch (error){
        return res.status(400).send({message:"update group fail"})
    }
}
//----------------------------------------

const updatetabletemplate=async (req,res,next)=>{
    
    const Data=require(req.modal);
    const shopId=req.shopId
    const userId=req.user.id

    const {tableName,template}=req.body
    const qryObject = {tableName,shopId,id:userId}

    try{    
        if(!tableName){ throw {message:"tableName do not exist"} }
        if(!template){ throw {message:"template do not exist"} }

        const dataTosave={template}
        
        await Data.updateOne(
            qryObject,
            {$set:{...dataTosave}}
        )
        return res.status(200).json({message:"update tabletemplate succesfully"})
    }
    catch (error){
        //console.log(error)
        return res.status(400).send({message:"update tabletemplate fail"})
    }
    
}
//-------------------------------

const updatetransaction=async (req,res,next)=>{
    //console.log('updatetransaction')
    const Data=require(req.modal);
    const shopId=req.shopId
    const userId=req.user.id

    const {id,username,password,shopName,
             ownerName,ownerPassword,
             ...remaining}=req.body


    const {effectStock,effectOrder,effectPlan,detail,groupId}=req.body
    
    try {
    
        if(!effectPlan){throw {message:"no effectPlan"}}
        if(!effectStock){throw {message:"no effectStock"}}
        if(!effectOrder){throw {message:"no effectOrder"}}

        if(!detail){throw {message:"no detail"}}
        if(!groupId){throw {message:"no groupId"}}

        if(shopName||ownerName||username||password||ownerPassword){ 
            throw {message:"No username or password add allowed"}
        }
    //ถ้าเงื่อนไขต่างไปจากนี้ ควรใช้ bill แทน transaction
    //ถ้า groupId เหมือนเดิม
    //นำ detail อันใหม่ เทียบกับ detail อันเก่า
    //แก้ไข product (stock, order, plan) 
    //อาศัยค่า ของ effectStock,effectOrder,effectPlan
    //ถ้า groupId เปลี่ยน
    //แก้ไข product (stock, order, plan) 
    //บันทึก TransactionLog ด้วย 
    
    //Find transaction before update
    
        //check user shop
        const resFindId = await Data.findOne({ id,shopId }).lean()
        //ค้นหา ID  ที่ต้องการอัพเดท
        if(!resFindId){throw {message:"no transaction found"}}
        //console.log('1')
        //ถ้าเจอ
        if(resFindId){
                const Product=require('../modals/Product'); 
                //เตรียมทำการอัพเดต Product

                let orderChange=0
                let stockChange=0
                let planChange=0

                let orderFactor=0
                let stockFactor=0
                let planFactor=0 

                if(effectStock=="บวก"){stockFactor=1}
                if(effectStock=="ลบ"){stockFactor=-1}
                if(effectOrder=="บวก"){orderFactor=1}
                if(effectOrder=="ลบ"){orderFactor=-1}
                if(effectPlan=="บวก"){planFactor=1}
                if(effectPlan=="ลบ"){planFactor=-1}

                //อันนี้ถ้า groupId ไม่เปลี่ยน เอา detail อันเก่า เทียบกับอันใหม่
                if(resFindId.groupId==parseInt(groupId)){
                    //==============================
                    //console.log('2')
                    //อันเก่า
                    const prevDetail=resFindId.detail
                    
                    let same_id=[]
                    
                    let tempDetail=[...detail] 

                    //compare detail with prevDetail
                    //if ID match update product
                    //find for same detail["id"] and put in same_id=[]
                    for (let j=0;j<prevDetail.length;j++){
                        
                        for (let k=0;k<tempDetail.length;k++){
                            
                            if(prevDetail[j].id==parseInt(tempDetail[k].id)){  

                                same_id=[...same_id,prevDetail[j].id]
                                    
                                //orderChange=orderChange*orderFactor
                                orderChange=( parseFloat(tempDetail[k].quantity)-prevDetail[j].quantity )*orderFactor
                                stockChange=( parseFloat(tempDetail[k].quantity)-prevDetail[j].quantity )*stockFactor
                                planChange= ( parseFloat(tempDetail[k].quantity)-prevDetail[j].quantity )*planFactor
                                
                                //console.log('3')
                                const resUpdate= await Product.updateOne(
                                    {id:tempDetail[k].id,shopId},
                                    {$inc:{"stock":stockChange,"order":orderChange,"plan":planChange}}
                                )
                                //console.log('4')
                                //reduce tempDetail as soon as it is match
                                //break out of tempDetail loop 
                                tempDetail.splice(k,1)
                                break
                            }

                        }

                    }
                    //console.log('same_id')
                    //console.log(same_id)
                    //compare prevDetail with same_id
                    //find detail["id"] which exist in prevDetail
                    //but not exist in same_id
                    //we call it exclude 
                    let temp_same_id=[...same_id]
                    let tempPrev=[]
                    prevDetail.map(prev=>{
                        
                        let isExclude=true 
                        for (let a=0;a<temp_same_id.length;a++){
                            if(parseInt(prev.id)==temp_same_id[a]){
                                isExclude=false
                                //if found match id
                                //reduce temp_same_id and exit loop
                                temp_same_id.splice(a,1)
                                break
                            }
                        }
                        if(isExclude){
                            tempPrev=[...tempPrev,prev]
                        }

                    })
                    //console.log('tempPrev')
                    //console.log(tempPrev)
                    //หัก same id ออกจาก อันเก่า resFindId
                    //==========================
                    //find detail["id"] which exist in detail
                    //but net exist in same_id
                    //we also call isExclude
                    temp_same_id=[...same_id]
                    let tempCur=[]
                    detail.map(cur=>{
                        
                        let isExclude=true 
                        for (let a=0;a<temp_same_id.length;a++){
                            if(parseInt(cur.id)==temp_same_id[a]){
                                isExclude=false
                                //if found match id
                                //reduce temp_same_id and exit loop
                                temp_same_id.splice(a,1)
                                break
                            }
                        }
                        if(isExclude){
                            tempCur=[...tempCur,cur]
                        }

                    })

                    //console.log('tempCur')
                    //console.log(tempCur)
                    //prevDetail have, Detail do not have
                    //หัก same id ออกจาก อันเก่า req.body
                    //================================
                    //ทำการ update Product จาก tempPrev
                    for (let l=0;l<tempPrev.length;l++){
                        
                        if(parseInt(tempPrev[l].id)){
                            orderChange=tempPrev[l].quantity*orderFactor*-1
                            stockChange=tempPrev[l].quantity*stockFactor*-1
                            planChange=tempPrev[l].quantity*planFactor*-1
                        }
                        if(parseInt(tempPrev[l].id)>0){
                            const resUpdate= await Product.updateOne(
                                {id:tempPrev[l].id,shopId},
                                {$inc:{"stock":stockChange,"order":orderChange,"plan":planChange}}
                            )
                        }
                    }    
                    //=================================
                    //ทำการ update Product จาก tempCur
                    //prevDetail do not have, Detail have
                    for (let m=0;m<tempCur.length;m++){

                        if(parseFloat(tempCur[m].quantity)){
                            orderChange=parseFloat(tempCur[m].quantity)*orderFactor
                            stockChange=parseFloat(tempCur[m].quantity)*stockFactor
                            planChange=parseFloat(tempCur[m].quantity)*planFactor
                        }
                        if(parseInt(tempCur[m].id)>0){
                            const resUpdate= await Product.updateOne(
                                {id:tempCur[m].id,shopId},
                                {$inc:{"stock":stockChange,"order":orderChange,"plan":planChange}}
                            )
                        }

                    }    
                    //===========================
                }
                //end of same document type (define by grouopID)  
                //ในกรณี ที่ประเภทของเอกสารเปลี่ยนไป เช่น จากใบสั่งซื้อ เป็น ใบรับของ
                //ในกรณีนี้ order จะลบ stock จะลบ order ของ product ด้วย
                //
                //different groupId such as from Quotation => Receipt 
                else{

                        for (let j=0;j<detail.length;j++){
                            orderChange=parseFloat(detail[j].quantity)*orderFactor
                            stockChange=parseFloat(detail[j].quantity)*stockFactor
                            planChange =parseFloat(detail[j].quantity)*planFactor

                            const resUpdate= await Product.updateOne(
                                {id:detail[j].id,shopId},
                                {$inc:{"stock":stockChange,"order":orderChange,"plan":planChange}}
                            )
                        }

                        //======================
                        //keep log of transaction before change groupId
                                    //to keep log of delete transaction
                            const TransactionLog=require('../modals/TransactionLog'); 
                            if(TransactionLog){
                                const {_id,__v,...remaining}=resFindId
                                //console.log('remaining')
                                //console.log(remaining)
                                const newData=new TransactionLog({...remaining,status:"close"}) 
                                await newData.save() 
                            }
                        //=======================

                }
            }//if(resFindId){

        //console.log('10')
        const qryObject={id,shopId}
        let dataTosave={...remaining,shopId,userId}
        
         //add photo
         const tempPhotoObj=addDateFolderToUrl(req.body,req.folder)
            
         if(Object.keys(tempPhotoObj).length>0){
             dataTosave={...dataTosave,...tempPhotoObj}
         }

        //console.log('dataTosave')
        //console.log(dataTosave)
        const resUpdate=await Data.updateOne(
            qryObject,
            {$set:{...dataTosave}}
        )

        return res.status(200).json({message:"update transaction succesfully"})
    }
    catch (error){
        return res.status(400).send({message:"update transaction fail"})
    }  
}
//======================
//======================

//===================
//post=>localhost:3001/*/pop
/*
const pop=async (req,res,next)=>{
    const Data=require(req.modal);
    const shopId=req.shopId

    const {items,template}=req.body;

    const eachLoop=10000;
    let start=0;
    let stop=0;
    //จำนวนเต็มรอบ
    let loopNumber=Math.floor(items/eachLoop)
    //เศษที่เหลือ เป็นรอบสุดท้าย
    const remainingNumber=items%eachLoop
    //=================
    
    //1) sample
    //2) sampleArray
    //3) createKey
    //4) createObject 
    //5) createArrayObject
    //6) loopPopDataPromiseAll // no use
    //7) saveToMonToMongoByEachLoop
        
    //=================
    //1) เลือกมาหนึ่งจาก array ที่ให้มา
    const sample=(array)=>{
        const tempIndex=Math.floor(Math.random() * array.length)
        return array[tempIndex]
    }
    //=================
    //2) สร้าง array ตามขนาดที่กำหนด โดยเลือกค่ามาจาก array ที่ให้มา 
    const sampleArray=(array,arraySize)=>{
        let tempArray=[]
        for(let i=1;i<=arraySize;i++){
            const tempIndex=Math.floor(Math.random() * array.length)
            tempArray=[...tempArray,array[tempIndex]]
        }
        return tempArray
    }
    //=================
    //3) createKey
    //template.i={key,type,array,arraySize,casual}
    //template.map(i=>{})
    const createKey=(newObj,i)=>{
        //สร้างเป็นตัวเลข ชื่อคือ key ด้วย 2 แบบ 
        //สุ่มค่าจาก array 
        //หรือใช้ casual ค่าระหว่าง 1-100
        if(i.type=="number"){
            if(i.array.length>0){
                newObj[i.key]=sample(i.array)  
                return newObj     
            }
            else{
                newObj[i.key]=casual.integer(0,i.casual)
                return newObj
            }
        }
        //สร้างเป็น boolean ค่าสุ่มระหว่าง true,false
        else if(i.type=="boolean"){
            newObj[i.key]=sample([true,false])
            return newObj
        }
        //สร้างเป็น date ค่าสุ่มจาก casual 
        else if(i.type=="date"){
            newObj[i.key]=new Date(casual.date('YYYY-MM-DD')).toISOString()
            return newObj
        }
        //สร้าง เป็น array ขนาด i.arraySize จากการสุ่มภายใน i.array 
        else if(i.type=="array"){
            if(i.array.length>0){
                newObj[i.key]=sampleArray(i.array,i.arraySize)       
                return newObj
            } 
        }     
        //สร้าง เป็น array ตัวเลข โดยกำหนด arraysize และ
        //จากการใช้ casual ระหว่าง 1-100
        else if(i.type=="arrayNumber"){
            newObj[i.key]=casual.array_of_integers(i.arraySize)
            return newObj 
        }
        //การสร้าง object ลูกขึ้นมา โดยมี subTemplate 
        //ไว้สร้าง ลูกอีกที โดยใช้คำสั่ง create Key ซ้ำ
        else if(i.type=="arrayObject"){
           newObj[i.key]={}
            i.subTemplate.map(k=>{
            newObj[i.key]={...newObj[i.key],...createKey(newObj[i.key],k) }
           })
           return newObj
           //console.log(newObj)
        }    
        //สร้าง key อื่นๆ จาก 1.ค่าใน array หรือ 2. จาก casual 
        else{
            if(i.array.length>0){
                newObj[i.key]=sample(i.array)       
                return newObj
            }
            else{
                newObj[i.key]=casual[i.casual]
                //console.log(casual[i.casual])
                return newObj
            }   
        }
    }
    //=================
    //4) createObject สร้าง 1 object จาก template 
    //โดยใช้ createKey สร้างแต่ละ ฟิลบ์ 
    //สามารถสร้าง subTemplate ได้ด้วย
    const createObject=(template)=>{
        let tempObj={}
        for(let j =0;j<template.length;j++){
            tempObj={...tempObj,...createKey(tempObj,template[j]) }
        }       
        //console.log(tempObj)
        return tempObj
    }
    //=================
    //5) createArrayObject
    //คำสั่งในการ สุ่ม สร้าง array ของ object โดยมี id เริ่มจาก start จนถึง stop 
    //ด้วยคำสั่ง createObj โดยมีลักษณะ ข้อมูลตาม template
    //เราใช้ noe Promise เพื่อให้เป็น Async เพื่อใช้ promise all 
    //หรือกลับมาเป็น sync ด้วย await 
    const createArrayObject=(start,stop)=>{
        return new Promise((resolve,reject)=>{
            //console.log(`start=${start},stop=${stop}`)
            let temp=[]
            
            for(let i=start;i<=stop;i++){
                temp=[...temp,{id:i,...createObject(template)}]
            }
 
            resolve(temp)
        })    
    }        
    //=================
    //=================
    //7 loopPopDataFor
    //for + await => จะดำเนินการแบบทีละ ลูป (แต่ละลูป แค่า 10,000 แรมจำกัด ) แล้วทำต่อไป
    //คำสั่ง ในการ เรียกใช้ popData แล้วบันทึก ใน mongo ในทีละรอบ
    const saveToMongoByEachLoop= async()=>{

        //เริ่มจับเวลา
        console.time('saveToMongoByEachLoop')
        
        try{        
            for (let i=0;i<loopNumber;i++){
                start=i*eachLoop+1
                stop =i*eachLoop+eachLoop
                
                const temp=await createArrayObject(start,stop)
                const result=await Data.create(temp)
                if(result)
                {
                  //console.log(`start:${start},stop:${stop},length:${result.length}`)
                }
            }

            if(remainingNumber>0){
                start=stop+1
                stop=stop+remainingNumber
                
                const temp=await createArrayObject(start,stop)
                const result=await Data.create(temp)
                if(result)
                {
                  //console.log(`start:${start},stop:${stop},length:${result.length}`)
                }
            }
            //สิ้นสุดเวลา
            console.timeEnd('saveToMongoByEachLoop')
            return true
        }
        catch (error){
            return false
        }
    }
    //==================
    //console.log(createObject(template))
    //if(true){
    if(saveToMongoByEachLoop()){
        return (
            res.status(200).json({message:"ok"})
        )
    }
    else {
        return(
            res.status(400).send({message:"fail"})
        )
    }
}
*/
//===================

const developer={
    mytest,
    init,restore,backup,
    getcustom,getlimit,
    deleteall,deletecustom,deletetransaction,deletegroup,
    addcustom,addtransaction,addgroup,
    updatecustom,updatetabletemplate,updatetransaction,updategroup
}

module.exports = developer;
