import React from 'react';

const genRef=()=>{
    return [1,2,3].map(i=>React.createRef())
}

const cName="xc12 mb-1"

const subCNameMinMax = ["xc1 h-100",
                        "xc3 h-100",
                        "xc8 h-100"]
  
const subCNameInput= subCNameMinMax

let partnerFilter=[
    { 
      templateType:"number",
      lb:"id",
      cName,  
      subCName:subCNameMinMax,
      keyName:"id",
      refInput:genRef(),
      inputType:"number",
      filterCommand:["id"]
    },
    //==============
    //date
    { 
        templateType:"number",
        lb:"วันที่",
        cName,  
        subCName:subCNameMinMax,
        keyName:"date",
        refInput:genRef(),
        inputType:"date",
        filterCommand:["date"]
    },
    //=========================
    //title
    { 
        templateType:"string",
        lb:"คำนำหน้า",
        cName,  
        subCName:subCNameInput,    
        keyName:"title",
        refInput:genRef(),
        inputType:"text",
        filterCommand:["title"]
      },
    //name
    { 
      templateType:"string",
      lb:"ชื่อ",
      cName,  
      subCName:subCNameInput,    
      keyName:"name",
      refInput:genRef(),
      inputType:"text",
      filterCommand:["name"]
    },
    //phone
    { 
      templateType:"arrayString",
      lb:"โทรศัพท์",
      cName,  
      subCName:subCNameInput,      
      keyName:"phone",
      refInput:genRef(),
      inputType:"text",
      filterCommand:["phone"]
    },
    //partnerType
    { 
      templateType:"string",
      lb:"ประเภทคู่ค้า",
      cName,  
      subCName:subCNameInput,    
      keyName:"partnerType",
      refInput:genRef(),
      inputType:"text",
      filterCommand:["partnerType"]
    },
    //remark
    { 
      templateType:"string",
      lb:"หมายเหตุ",
      cName,  
      subCName:subCNameInput,    
      keyName:"remark",
      refInput:genRef(),
      inputType:"text",
      filterCommand:["remark"]
    },
    //address:{number,tambon,district:province,postcode:},
    //address.number
    {       
      templateType:"arrayObjectString",
      lb:"ที่อยู่|เลขที่",
      cName,  
      subCName:subCNameInput,
      keyName:"address_number",
      refInput:genRef(),
      inputType:"text",
      filterCommand:["address","number"]
    },
    { 
      templateType:"arrayObjectString",
      lb:"ที่อยู่|ตำบล",
      cName,  
      subCName:subCNameInput,
      keyName:"address_tambon",
      refInput:genRef(),
      inputType:"text",
      filterCommand:["address","tambon"]
    },
    { 
      templateType:"arrayObjectString",
      lb:"ที่อยู่|อำเภอ",
      cName,  
      subCName:subCNameInput,
      keyName:"address_district",
      refInput:genRef(),
      inputType:"text",
      filterCommand:["address","district"]
    },
    { 
      templateType:"arrayObjectString",
      lb:"ที่อยู่|จังหวัด",
      cName,  
      subCName:subCNameInput,
      keyName:"address_province",
      refInput:genRef(),
      inputType:"text",
      filterCommand:["address","province"]
    },
    { 
      templateType:"arrayObjectString",
      lb:"ที่อยู่|รหัสไปรษณีย์",
      cName,  
      subCName:subCNameInput,
      keyName:"address_postcode",
      refInput:genRef(),
      inputType:"text",
      filterCommand:["address","postcode"]
    },   
]
//==============================
const partnerInputState={
    id:{toCheck:false,min:0,max:0},
    date:{toCheck:false,min:"2018-01-01",max:new Date().toISOString().substring(0, 10)},

    title:{toCheck:false,value:""},
    name:{toCheck:false,value:""},
    phone:{toCheck:false,value:""},
    partnerType:{toCheck:false,value:""},
    remark:{toCheck:false,value:""},
    address_number:{toCheck:false,value:""},
    address_tambon:{toCheck:false,value:""},
    address_district:{toCheck:false,value:""},
    address_province:{toCheck:false,value:""},
    address_postcode:{toCheck:false,value:""},
  }
//================================



const testTemplate={
    partnerFilter,partnerInputState
}
  
export default testTemplate
  