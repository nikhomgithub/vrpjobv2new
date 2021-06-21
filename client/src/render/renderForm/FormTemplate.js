import React from 'react';
import MainContext from '../../context/MainContext'

function test() {
    //const {basicData,setBasicData}=React.useContext(MainContext)

}


const shopSignUpForm={
    shopName:
        {  lb:'ชื่อร้าน', 
            templateType:"string" , 
            cName:"xc6 sc12 p-2 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"text", 
            placeholder:'', 
            autoFocus:"autoFocus"
        },
    password:
        {   lb:'รหัสร้าน', 
            templateType:"string" , 
            cName:"xc6 sc12 p-2 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"password", 
            placeholder:'',   
        },
    ownerName:
        {   lb:'ชื่อผู้ใช้', 
            templateType:"string" , 
            cName:"xc6 sc12 p-2 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"text", 
            placeholder:'', 
        },
    ownerPassword:
        {   lb:'รหัสผู้ใช้', 
            templateType:"string" , 
            cName:"xc6 sc12 p-2 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"password", 
            placeholder:'',   
        },
    ownerEmail: {  
            lb:'อีเมลผู้ใช้', 
            templateType:"string" , 
            cName:"xc6 sc12 p-2 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"text", 
            placeholder:'',   
        },     
}

//====================

const shopLogInForm={
    shopName:
        {  lb:'ชื่อร้าน', 
            templateType:"string" , 
            cName:"xc6 sc12 p-1 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"text", 
            placeholder:'', 
            autoFocus:"autoFocus"
        },
    password:
        {   lb:'รหัสร้าน', 
            templateType:"string" , 
            cName:"xc6 sc12 p-1 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"password", 
            placeholder:'',   
        },

}

//=======================
const shopChangePasswordForm={
    shopName:
        {   lb:'ชื่อร้าน', 
            templateType:"string" , 
            cName:"xc6 sc12 p-1 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"text", 
            placeholder:'', 
            autoFocus:"autoFocus"
        },
    password:
        {   lb:'รหัสร้าน', 
            templateType:"string" , 
            cName:"xc6 sc12 p-1 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"password", 
            placeholder:'',   
        },
    newPassword1:
        {   lb:'รหัสร้านใหม่', 
            templateType:"string" , 
            cName:"xc6 sc12 p-1 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"password", 
            placeholder:'',   
        },
    newPassword2:
        {   lb:'ยืนยันรหัสร้านใหม่', 
            templateType:"string" , 
            cName:"xc6 sc12 p-1 bd-lightGray",  
            subCName:["xc4 div-center","xc8 p-2 div-start"], 
            inputType:"password", 
            placeholder:'',   
        },
}

const addUserForm={
    id:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"number", 
        placeholder:'', 
        autoFocus:"autoFocus"
    },
    username:{
        lb:'ยูสเซอร์เนม', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:''
    },
    password:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"password", 
        placeholder:'',   
    },
    userLevel:{
        lb:'ระดับผู้ใช้', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"select", 
        placeholder:'', 
        //selectObj:["นาย","นาง"]
        selectDataKey:"basicData",
        selectObj:'userLevel'
    },
    name:{
        lb:'ชื่อจริง', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    surname:{
        lb:'นามสกุล', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
    }
}

const logInForm={
    username:{
        lb:'ยูสเซอร์เนม', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'',
        autoFocus:"autoFocus"
    },
    password:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"password", 
        placeholder:'',   
    }    
}

const changePasswordForm={
    username:{
        lb:'ยูสเซอร์เนม', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
        autoFocus:"autoFocus"
    },
    password:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"password", 
        placeholder:'',   
    },
    newPassword1:{   
        lb:'รหัสใหม่', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"password", 
        placeholder:'',   
    },
    newPassword2:{   
        lb:'ยืนยันรหัสใหม่', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"password", 
        placeholder:'',   
    },
}

const jobForm={
    id:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 bd-lightGray",  
        subCName:["xc4","xc8 div-start"], 
        inputType:"number", 
        placeholder:'', 
        autoFocus:"autoFocus"
    },
    date:{
        lb:'วันที่', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1  bd-lightGray",  
        subCName:["xc4","xc8 div-start"], 
        inputType:"date", 
        placeholder:'', 
    },
    category:{
        lb:'ประเภท', 
        templateType:"string" , 
        cName:"xc4 sc12 p-1 bd-lightGray",  
        subCName:["xc4","xc8 p-2 div-start"], 
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'category'
    },

    title:{
        lb:'หัวข้อ', 
        templateType:"string" , 
        cName:"xc9 sc12 p1 bd-lightGray",  
        subCName:["xc2","xc10 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    active:{
        lb:'แอคทีฟ', 
        templateType:"string" , 
        cName:"xc3 sc12 p-1  bd-lightGray",  
        subCName:["xc4 ","xc8 p-2 div-start"], 
        inputType:"checkbox", 
        placeholder:'', 
    },
    body:{
        lb:'รายละเอียด', 
        templateType:"string" , 
        cName:"xc12 sc12 p-1 bd-lightGray",  
        subCName:["xc2 alignSelfStart","xc10 div-start"], 
        inputType:"textarea", 
        placeholder:'', 
        textRow:10
    },
    comment:{
        lb:'คอมเมนท์', 
        templateType:"string" , 
        cName:"xc12 sc12 p-1 bd-lightGray",  
        subCName:["xc2 alignSelfStart","xc10 div-start"], 
        inputType:"textarea", 
        placeholder:'', 
        textRow:5
    },
}


const basicDataForm={
    category:{
        lb:'ประเภทงาน', 
        templateType:"array" , 
        cName:"xc12 sc12 p-1",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    }, 
    userLevel:{
        lb:'สิทธิ์ผู้ใช้', 
        templateType:"array" , 
        cName:"xc12 sc12 p-1",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    }, 
   
}

const routeAuthForm={
    id:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"number", 
        placeholder:'', 
        autoFocus:"autoFocus"
    },
    routeAddress:{
        lb:'url', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    routeName:{
        lb:'ชื่อสิทธิ์', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        inputType:"text", 
        placeholder:'', 
    },
    userLevel:{
        lb:'ระดับผู้ใช้', 
        templateType:"array" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 div-start"], 
        //inputType:"text",
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'userLevel'
    }
}



const FormTemplate={
    shopSignUpForm,shopLogInForm,shopChangePasswordForm,
    addUserForm,logInForm,changePasswordForm,
    basicDataForm,routeAuthForm,
    jobForm
}

export default FormTemplate
//disabled:"disabled",
