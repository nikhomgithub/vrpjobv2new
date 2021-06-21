/*
const patternNumber=/^\d{1,30}$/gi
const patternString=/^[ก-๙\w\+\-\*\/\\.=]{1,200}$/gi
const patternEmail=/^[\w@\.\-]{1,30}$/gi
const patternDate=/^\d{4}-\d{2}-\d{2}$/gi
//2020-12-30
const patternISODate=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/gi
//2020-12-30T12:40:20.964Z
const patternFileName=/^[\w\-\*\/\.\\=]{1,200}$/gi
const patternBoolean=/^(true)|(false)$/gi
const patternWildCard=/.{0,200}/gi
//const patternNumber=/^(\d{1,30})|(\d{1,15}\.\d{1,15})|(\d{1,29}.)$/gi
*/

const any10={
    pattern:/^[^~<>{}%$&|!]{0,10}$/gi,
    message:"Invalid char or over limit of 10 chars"
}
const any20={
    pattern:/^[^~<>{}%$&|!]{0,20}$/gi,
    message:"Invalid char or over limit of 20 chars"
}
const any50={
    pattern:/^[^~<>{}%$&|!]{0,50}$/gi,
    message:"Invalid char or over limit of 50 chars"
}
const any100={
    pattern:/^[^~<>{}%$&|!]{0,100}$/gi,
    message:"Invalid char or over limit of 100 chars"
}
const any150={
    pattern:/^[^~<>{}%$&|!]{0,150}$/gi,
    message:"Invalid char or over limit of 150 chars"
}
const any200={
    pattern:/^[^~<>{}%$&|!]{0,150}$/gi,
    message:"Invalid char or over limit of 200 chars"
}
const any300={
    pattern:/^[^~<>{}%$&|!]{0,300}$/gi,
    message:"Invalid char or over limit of 300 chars"
}
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

const shop={
    shopName:       {type:"string", validate:valBasic,  regex:any100},
    password:       {type:"string", validate:valBasic,  regex:any100},  
    ownerName:      {type:"string", validate:valBasic,  regex:any100},
    ownerPassword:  {type:"string", validate:valBasic,  regex:any100},
    ownerEmail:     {type:"string", validate:valBasic,  regex:any100},

}

const user={
    id:             {type:"number", validate:valBasic,  regex:any100},
    username:       {type:"string", validate:valBasic,  regex:any100},
    password:       {type:"string", validate:valBasic,  regex:any100},
    userLevel:      {type:"string", validate:valBasic,  regex:any100},
    name:           {type:"string", validate:valBasic,  regex:any200},
    surname:        {type:"string", validate:valBasic,  regex:any200},
}

const job={
    
}

const basicData={
    id:          {type:"number", validate:valBasic,  regex:any100},
    category:       {type:"string", validate:valArray,  regex:any100},
    routeAuth:   {type:"arrayObject",children:{
                id:{type:"number", validate:valBasic,  regex:any100},
                routeAddress:{type:"string", validate:valBasic,  regex:any300},
                routeName:{type:"string", validate:valBasic,  regex:any200},
                userLevel:{type:"string", validate:valArray,  regex:any100},
                 }}
}

const validationTemplate={
    shop,user,basicData,
    job
}

module.exports = validationTemplate

