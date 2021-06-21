import React from 'react';

const genRef=()=>{
    return [1,2,3].map(i=>React.createRef())
}

const cName="xc12 mb-1"

const subCNameMinMax = ["xc1 h-100",
                        "xc3 h-100",
                        "xc8 h-100"]
  
const subCNameInput= subCNameMinMax




const jobFilter=[
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
    //==============
    //title
    { 
      templateType:"string",
      lb:"หัวข้อ",
      cName,  
      subCName:subCNameInput,    
      keyName:"title",
      refInput:genRef(),
      inputType:"text",
      filterCommand:["title"]
    },
    //body
    { 
      templateType:"string",
      lb:"รายละเอียด",
      cName,  
      subCName:subCNameInput,    
      keyName:"body",
      refInput:genRef(),
      inputType:"text",
      filterCommand:["body"]
    },
    //category
    { 
      templateType:"select",
      lb:"ประเภท",
      cName,  
      subCName:subCNameInput,    
      keyName:"category",
      refInput:genRef(),
      inputType:"select",
      selectDataKey:"basicData",
      selectObj:'category',
      filterCommand:["category"]
    },
    //active
    { 
      templateType:"boolean",
      lb:"แอคทีฟ",
      cName,  
      subCName:subCNameInput,    
      keyName:"active",
      refInput:genRef(),
      inputType:"checkbox",
      filterCommand:["active"]
    },
    //comment
    { 
      templateType:"string",
      lb:"คอมเมนท์",
      cName,  
      subCName:subCNameInput,    
      keyName:"comment",
      refInput:genRef(),
      inputType:"text",
      filterCommand:["comment"]
    },
]
//const { id,date,timestamp,title,body,category,
//  photoUrl1,videoLink,active,timeupdate,
//  username,comment,timeupdateComment,
//  usernameComment} = i
const jobInputState={
  id:{toCheck:false,min:0,max:0},
  
  date:{toCheck:false,
        min:new Date().toISOString().substring(0, 10),
        max:new Date().toISOString().substring(0, 10)
      },

  title:{toCheck:false,value:""},
  body:{toCheck:false,value:""},
  category:{toCheck:false,value:""},
  active:   {toCheck:false,value:true},
  comment:{toCheck:false,value:""},

}
const StateTemplate={
  jobFilter,jobInputState
}
  
export default StateTemplate
  