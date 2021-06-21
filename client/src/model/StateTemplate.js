
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

const shopSignUpState={
  shopName:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อร้าน"},
  password:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้าน"},
  ownerName:    {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อเจ้าของ"},
  ownerPassword:{stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสเ้จ้าของ"},
  ownerEmail:   {stType:"string", validate:valBasic,  pattern:patternEmail, lb:"อีเมล"},
}

const shopLogInState={
  shopName:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อร้าน"},
  password:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้าน"},
}

const shopChangePasswordState={
  shopName:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อร้าน"},
  password:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้าน"},
  newPassword1: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้านใหม่"},
  newPassword2: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้านใหม่อีกรั้ง"},
}

const addUserState={
  id:       {stType:"string", validate:valBasic,  pattern:patternNumber, lb:"ไอดี"},
  username: {stType:"string", validate:valBasic,  pattern:patternString, lb:"ยูสเซอร์เนม"},
  password: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัส"},
  userLevel:{stType:"string", validate:valBasic,  pattern:patternString, lb:"กลุ่มผู้มีสิทธิ์"},
  name:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อ"},
  surname:  {stType:"string", validate:valBasic,  pattern:patternString, lb:"สกุล"},
}

const logInState={
  username: {stType:"string", validate:valBasic,  pattern:patternString, lb:"ยูสเซอร์เนม"},
  password: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัส"},
}

const changePasswordState={
  username: {stType:"string", validate:valBasic,  pattern:patternString, lb:"ยูสเซอร์เนม"},
  password: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัส"},
  newPassword1: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสใหม่"},
  newPassword2: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสใหม่อีกครั้ง"},
}

//const { id,date,timestamp,title,body,category,
//  photoUrl1,videoLink,active,timeupdate,
//  username,comment,timeupdateComment,
//  usernameComment} = i
//============================

const jobState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"ID"},
  date:{stType:"date",  validate:valBasic,  pattern:patternDate, lb:""},
  title:{stType:"string", validate:valBasic,  pattern:patternString, lb:"หัวข้อ"},
  category:{stType:"string",  validate:valArray,  pattern:patternNumber, lb:"ประเภท"},
  body:{stType:"string", validate:valBasic,  pattern:patternString, lb:"รายละเอียด"},
  active:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:true, lb:"แอคทีฟ"},

  file1:{stType:"file",validate:valNone,pattern:null, lb:"ไฟล์1"},
  photoUrl1:{stType:"array",  validate:valArray,    patternFileName, lb:"รูป1"},

  comment:{stType:"string", validate:valBasic,  pattern:patternString, lb:"คอมเมนท์"},
}

const basicDataState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัส"},
  category:{stType:"array", validate:valArray, pattern:patternString, lb:"ประเภทงาน"},
  userLevel:{stType:"array", validate:valArray, pattern:patternString, lb:"สิทธิ์ผู้ใช้"},

  routeAuth:{stType:"arrayObject",stChildren:{
      id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัส"},
      routeAddress:{stType:"string", validate:valBasic, pattern:patternString, lb:"url"},
      routeName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ชื่อสิทธิ์"},
      userLevel:{stType:"array", validate:valArray, pattern:patternString, lb:"กลุ่มผู้มีสิทธิ์"},
  }}

}

const routeAuthState={
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัส"},
    routeAddress:{stType:"string", validate:valBasic, pattern:patternString, lb:"url"},
    routeName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ชื่อสิทธิ์"},
    userLevel:{stType:"array", validate:valArray, pattern:patternString, lb:"กลุ่มผู้มีสิทธิ์"},
}


const StateTemplate={
  shopSignUpState,shopLogInState,shopChangePasswordState,
  addUserState,logInState,changePasswordState,
  basicDataState,routeAuthState,
  jobState
}

export default StateTemplate
