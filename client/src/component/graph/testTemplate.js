
const patternNumber=/^\d{1,30}$/gi
const patternString=/^[ก-๙\w\+\-\*\/\\.=]{1,200}$/gi
const patternEmail=/^[\w@\.\-]{1,30}$/gi
const patternDate=/^\d{4}-\d{2}-\d{2}$/gi
const patternFileName=/^[\w\-\*\/\.\\=]{1,200}$/gi
const patternBoolean=/^(true)|(false)$/gi
const patternWildCard=/.{0,200}/gi
//const patternNumber=/^(\d{1,30})|(\d{1,15}\.\d{1,15})|(\d{1,29}.)$/gi

const valBasic= (pttn,str)=>{
    return new RegExp(pttn).test(str)
}

const valArray= (pttn,array)=>{
    let tempResult=true

    for (let i=0; i<array.length;i++){
        tempResult= new RegExp(pttn).test(array[i])
        if(!tempResult){
            break
        }
    }
    return tempResult
}
const valNone=()=>{
  return true
}

const stateTemplate={
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสเอกสาร"},
    date:{stType:"date",  validate:valBasic,  pattern:patternDate, lb:"วันที่"},
    name:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อ"},
    price:{stType:"number", validate:valBasic, pattern:patternNumber, lb:"ราคา"},

    detail:{stType:"arrayObject",stChildren:{
        id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสสินค้า"},
        name:{stType:"string", validate:valBasic, pattern:patternString, lb:"ชื่อสินค้า"},
        quantity:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"จำนวน"},
        isRawMat:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  
        stDefault:true, lb:"เป็นวัตถุดิบ"},
      }},
}

const filterData=[
    {id:1,date:"2021-05-01T02:43:16.069Z",name:"coke",price:5,
   
    detail:[
        {id:1,name:"ars",quantity:1,isRawMat:true},
        {id:2,name:"asl",quantity:2,isRawMat:true},
        {id:3,name:"liv",quantity:3,isRawMat:true},
     ]
   
    },
    {id:2,date:"2021-05-02T02:43:16.069Z",name:"pepci",price:6,
     detail:[
        {id:1,name:"ars",quantity:4,isRawMat:true},
        {id:2,name:"asl",quantity:12,isRawMat:true},
        {id:3,name:"liv",quantity:11,isRawMat:true},
     ]
    },   
    {id:3,date:"2021-05-03T02:43:16.069Z",name:"sprite",price:7,
     detail:[
        {id:1,name:"ars",quantity:21,isRawMat:true},
        {id:2,name:"asl",quantity:5,isRawMat:true},
        {id:3,name:"liv",quantity:12,isRawMat:true},
     ]
    },
    {id:4,date:"2021-05-04T02:43:16.069Z",name:"fanta",price:8,
     detail:[
        {id:1,name:"ars",quantity:19,isRawMat:true},
        {id:2,name:"asl",quantity:11,isRawMat:true},
     ]
    },
]

const testTemplate = {
    filterData,stateTemplate
}

export default testTemplate
