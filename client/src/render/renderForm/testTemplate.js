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
//======================================
const testState={
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    date:{stType:"number",  validate:valBasic,  pattern:patternDate},
    title:{stType:"string", validate:valBasic,  pattern:patternString},
  
    name:{stType:"string", validate:valBasic,  pattern:patternString},
    password:     {stType:"string", validate:valBasic,  pattern:patternString},
  
    groupId:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    groupName:{stType:"string", validate:valBasic,  pattern:patternString},
  
    remark:{stType:"string",  validate:valBasic,     pattern:patternString},
    isRawMat:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:true},
    phone:{stType:"array",  validate:valArray,  pattern:patternNumber},
    

    total:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    reduction:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    grandTotal:{stType:"number",  validate:valBasic,  pattern:patternNumber},

    address:{stType:"arrayObject",stChildren:{
      number:{stType:"string", validate:valBasic,  pattern:patternString},
      tambon:{stType:"string", validate:valBasic,  pattern:patternString},
  
    }},
  
    mainaddress:{stType:"object",stChildren:{
      number:{stType:"string", validate:valBasic,  pattern:patternString},
      tambon:{stType:"string", validate:valBasic,  pattern:patternString},
  
    }},
    
    file1:{stType:"file",validate:valNone,pattern:null},
    photoUrl1:{stType:"array",  validate:valArray,    patternFileName},
    
    file2:{stType:"file",validate:valNone,pattern:null},
    photoUrl2:{stType:"array",  validate:valArray,    patternFileName},

    detail:{stType:"arrayObject",stChildren:{
      id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
      barcode:{stType:"string", validate:valBasic, pattern:patternString},
      name:{stType:"string", validate:valBasic, pattern:patternString},
      groupId:{stType:"number",  validate:valBasic,  pattern:patternNumber},
      groupName:{stType:"string", validate:valBasic, pattern:patternString},
      unit:{stType:"string", validate:valBasic, pattern:patternString},
      price:{stType:"number",  validate:valBasic,  pattern:patternNumber},
      quantity:{stType:"number",  validate:valBasic,  pattern:patternNumber},
      result:{stType:"number",  validate:valBasic,  pattern:patternNumber},
      remark:{stType:"string",  validate:valBasic,  pattern:patternString},
      isRawMat:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:true},
    }},
  }

//=========================================
//=========================================
const testForm={
    id:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"number", 
        placeholder:'', 
        autoFocus:"autoFocus"
    },
    date:{
        lb:'วันที่', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"thaiDate", 
        placeholder:'', 
    },
    title:{
        lb:'คำนำหน้า', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'title'
    },
    name:{
        lb:'ชื่อ', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    password:
    {   lb:'รหัสร้าน', 
        templateType:"string" , 
        cName:"xc6 sc12 p-2 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"password", 
        placeholder:'',   
    },
    icon:{
        lb:"กลุ่มคู่ค้า",
        templateType:"icon",
        cName:"xc4 sc12 p-1",  
        subCName:["xc6 div-center","xc6 div-start"], 
        inputType:"searchIcon",
        iconActionIdx:0,
    },
    groupId:{
        lb:'รหัสกลุ่ม', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"number", 
        placeholder:'', 
    },
    groupName:{
        lb:'ประเภทกลุ่ม', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
        unchangeable:true
    },
    isRawMat:{
        lb:'เป็นวัตถุดิบ', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"checkbox", 
        placeholder:'', 
    },
    remark:{
        lb:'หมายเหตุ', 
        templateType:"string" , 
        cName:"xc12 sc12 p-1 bd-lightGray",  
        subCName:["xc2 alignSelfStart","xc10 div-start"], 
        inputType:"textarea", 
        placeholder:'', 
        textRow:3
    },
    phone:{
        lb:'โทรศัพท์', 
        templateType:"array" , 
        cName:"xc3 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },

    total:{
      lb:'รวม', 
      templateType:"string" , 
      cName:"xc4 sc12 p-1 bd-lightGray",  
      subCName:["xc4 div-center","xc8 p-2 div-start"], 
      inputType:"number", 
      placeholder:'', 
      unchangeable:true,
      //calculation:{method:"total",param:["detail","price","quantity"]},
      //autoFocus:"autoFocus"
  },
  reduction:{
      lb:'ส่วนลด', 
      templateType:"string" , 
      cName:"xc4 sc12 p-1 bd-lightGray",  
      subCName:["xc4 div-center","xc8 p-2 div-start"], 
      inputType:"number", 
      placeholder:'', 
      //autoFocus:"autoFocus"
  },
  grandTotal:{
      lb:'สุทธิ', 
      templateType:"string" , 
      cName:"xc4 sc12 p-1 bd-lightGray",  
      subCName:["xc4 div-center","xc8 p-2 div-start"], 
      inputType:"number", 
      placeholder:'', 
      unchangeable:true
      //calculation:{method:"grandTotal",param:["detail","price","quantity","reduction"]},
      //autoFocus:"autoFocus"
  },

    address:{
        lb:'ที่อยู่รอง',    
        templateType:"arrayObject", 
        //cName:["xc12 p-1 bd-lightGray","form-row flex-justify-start flex-align-stretch"], 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc12 div-center","xc12 p-2 div-start"], 

        placeholder:'',
        subFormTemplate:{
            number:{
                lb:'เลขที่', 
                templateType:"string" , 
                cName:"xc12 sc12 p-1 bd-lightGray",  
                subCName:["xc4 div-center","xc8 p-2 div-start"], 
                inputType:"text", 
                placeholder:'', 
            },
            tambon:{
                lb:'ตำบล', 
                templateType:"string" , 
                cName:"xc12 sc12 p-1 bd-lightGray",  
                subCName:["xc4 div-center","xc8 p-2 div-start"], 
                inputType:"text", 
                placeholder:'', 
            }
          
        }
      
    }, 
    mainaddress:{
        lb:'ที่อยู่หลัก',    
        templateType:"object", 
        //cName:["xc12 p-1 bd-lightGray","form-row flex-justify-start flex-align-stretch"], 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc12 div-center","xc12 p-2 div-start"], 

        placeholder:'',
        subFormTemplate:{
            number:{
                lb:'เลขที่', 
                templateType:"string" , 
                cName:"xc12 sc12 p-1 bd-lightGray",  
                subCName:["xc4 div-center","xc8 p-2 div-start"], 
                inputType:"text", 
                placeholder:'', 
            },
            tambon:{
                lb:'ตำบล', 
                templateType:"string" , 
                cName:"xc12 sc12 p-1 bd-lightGray",  
                subCName:["xc4 div-center","xc8 p-2 div-start"], 
                inputType:"text", 
                placeholder:'', 
            }
        }
      
    }, 
    detail:{
        lb: "รายละเอียด",
        templateType:"arrayObjectInTable",
        cName:"",
        subFormTemplate:{
          
          icon:{
            templateType:"icon",
            subCName:[60],
            inputType:"icon",
            iconActionIdx:1,
          },
          
          id:{
            lb:"ไอดี",
            templateType:"number",
            subCName:[60,""],
            inputType:"number",
            placeholder:"",
            aotuFocus:"autoFocus"
          },
          barcode:{
            lb:"บาร์โค้ด",
            templateType:"string",
            subCName:[100,""],
            inputType:"text",
            placeholder:"", 
            nextEnter:{nextKey1:["detail",0,"quantity"],lastKey:null}
          },
          name:{
            lb:"ชื่อ",
            templateType:"string",
            subCName:[240,""],
            inputType:"text",
            placeholder:"", 
          },

          groupId:{
            lb:"ไอดีกลุ่ม",
            templateType:"number",
            subCName:[60,""],
            inputType:"number",
            placeholder:"",
            aotuFocus:"autoFocus"
          },
          groupName:{
            lb:"ชื่อกลุ่ม",
            templateType:"string",
            subCName:[90,""],
            inputType:"text",
            placeholder:"", 
          },
          quantity:{
            lb:"จำนวน",
            templateType:"string",
            subCName:[60,""],
            inputType:"number",
            placeholder:"", 
            nextEnter:{nextKey1:["detail",1,"barcode"],lastKey:"endForm"}
          },

          unit:{
            lb:"หน่วย",
            templateType:"string",
            subCName:[80,""],
            inputType:"select",
            placeholder:"", 
            //selectObj:["นาย","นาง"]
            selectDataKey:"basicData",
            selectObj:'unit'
          },
          price:{
            lb:"ราคา",
            templateType:"string",
            subCName:[100,""],
            inputType:"number",
            placeholder:"", 
          },
          result:{
            lb:"รวม",
            templateType:"string",
            subCName:[100,""],
            inputType:"number",
            placeholder:"", 
          },
          remark:{
            lb:"หมายเหตุ",
            templateType:"string",
            subCName:[200,""],
            inputType:"text",
            placeholder:"", 
          },
          isRawMat:{
            lb:"เป็นวัตถุดิบ",
            templateType:"boolean",
            subCName:[40,""],
            inputType:"checkbox",
            placeholder:"", 
          }
        }
      }
}
//======================================
//======================================
  
const productDetailTableTemplate={
    icon: {lb: "",type: "icon", width: 60, showCol: true, showColHead: true},
    id: {lb: "ไอดี",type: "number", width: 60, showCol: true, showColHead: true},
    barcode: { lb: "บาร์โค้ด",type: "string", width: 100, showCol: true, showColHead: true},
    name: {lb: "ชื่อ",type: "string", width: 240, showCol: true, showColHead: true},
    groupId: {lb: "ไอดีกลุ่ม",type: "number", width: 60, showCol: true, showColHead: true },
    groupName: {lb: "ชื่อกลุ่ม",type: "string", width: 90, showCol: true, showColHead: true},
    quantity: {lb: "จำนวน",type: "number", width: 60, showCol: true, showColHead: true,showSum:true},
    unit: {lb: "หน่วย",type: "string", width: 80, showCol: true, showColHead: true},
    price: {lb: "ราคา",type: "number", width: 100, showCol: true, showColHead: true},
    result: {lb: "รวม",type: "number", width: 100, showCol: true, showColHead: true,showSum:true},
    isRawMat: { lb: "เป็นวัตถุดิบ",type: "boolean", width: 40, showCol: true, showColHead: true},
    remark: {lb: "หมายเหตุ",type: "string", width: 200, showCol: true, showColHead: true},
  }
//===================================

const testTemplate = {testForm,testState,productDetailTableTemplate}

export default testTemplate
