const transactionCard={

    id:{
        lb:'ไอดี', 
        templateType:"string" , 
        cName:"flex-cetner-center xc2 sc12 p-1",  
        subCName:["xc4","xc8"], 
        inputType:"number", 

    },
    date:{
        lb:'วันที่', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"thaiDate", 
    },
    
    groupId:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"xc2 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"number", 
    },
    
    groupName:{
        lb:'ชื่อเอกสาร', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
    },
    partnerId:{
        lb:'ไอดีคู่ค้า', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"number", 

    },
    title:{
        lb:'คำนำหน้า', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"select", 
    },
    name:{
        lb:'ชื่อ', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 

    },
    phone:{
        lb:'โทรศัพท์', 
        templateType:"array" , 
        cName:"xc3 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    address:{
        lb:'ที่อยู่',    
        templateType:"arrayObject", 
        //cName:["xc12 p-1 bd-lightGray","form-row flex-justify-start flex-align-stretch"], 
        cName:"xc12 sc12 p-1 ",  
        subCName:["xc12 div-center","xc12 div-start"], 

        placeholder:'',
        subFormTemplate:{
            number:{
                lb:'เลขที่', 
                templateType:"string" , 
                cName:"xc4 p-1 ",  
                subCName:["xc4 div-center","xc8 div-start"], 
                inputType:"text", 
                placeholder:'', 
            },
            tambon:{
                lb:'ตำบล', 
                templateType:"string" , 
                cName:"xc4 p-1 ",  
                subCName:["xc4 div-center","xc8 div-start"], 
                inputType:"text", 
                placeholder:'', 
            },
            district:{
                lb:'อำเภอ', 
                templateType:"string" , 
                cName:"xc4 p-1 ",  
                subCName:["xc4 div-center","xc8 div-start"], 
                inputType:"text", 
                placeholder:'', 
            },
            province:{
                lb:'จังหวัด', 
                templateType:"string" , 
                cName:"xc4 p-1 ",  
                subCName:["xc4 div-center","xc8 div-start"], 
                inputType:"text", 
                placeholder:'', 
            },
            postcode:{
                lb:'รหัสไปรษณีย์', 
                templateType:"string" , 
                cName:"xc4 p-1 ",  
                subCName:["xc6 div-center","xc6 div-start"], 
                inputType:"text", 
                placeholder:'', 
            },
        }
      
    }, 
    remark:{
        lb:'หมายเหตุ', 
        templateType:"string" , 
        cName:"xc12 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"textarea", 

    },
    total:{
        lb:'รวม', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"number", 

    },
    reduction:{
        lb:'ส่วนลด', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"number", 

    },
    grandTotal:{
        lb:'สุทธิ', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 ",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"number", 

    },
    //=================

}

const CardTemplate={transactionCard}

export default CardTemplate