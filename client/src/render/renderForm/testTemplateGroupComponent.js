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

const groupState={
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    groupName:{stType:"string", validate:valBasic,  pattern:patternString},
    children:{stType:"array",  validate:valArray,  pattern:patternNumber},
    parentId:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    allDeleteId:{stType:"array",  validate:valArray,  pattern:patternNumber}
}

const groupData=[
    {id:1,groupName:"main",children:[2,3],parentId:null},
    {id:2,groupName:"tv",children:[4],parentId:1},
    {id:3,groupName:"mobile",children:[5],parentId:1},
    {id:4,groupName:"pana",children:[],parentId:2},
    {id:5,groupName:"lg",children:[],parentId:3},
  ]

const groupForm={
    id:{
        lb:'ไอดีกลุ่ม', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"number", 
        placeholder:'', 
        //disabled:"disabled"
    },
    groupName:{
        lb:'ชื่อกลุ่ม', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 div-center","xc8 p-2 div-start"], 
        inputType:"text", 
        placeholder:'', 
        //disabled:"disabled"
    },
    parentId:{
        lb:'ไอดีกลุ่มแม่', 
        templateType:"string" , 
        cName:"xc6 sc12 p-1 bd-lightGray",  
        subCName:["xc4 p-2 div-center","xc8 p-2 div-start"], 
        inputType:"number", 
        placeholder:'', 
        //disabled:"disabled"
    },
}
  
const testTemplateGroupComponent={groupState,groupData,groupForm}

export default testTemplateGroupComponent
