import React from 'react';

import {MainContext} from '../../context/MainContext'

import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'

import ModalForm from '../../render/renderForm/ModalForm'
import renderModalError from '../../render/renderModalError'

function UserWelcome() {
  
  const {basicData,setBasicData,haveUserToken,userName,
        setReloadCheckToken}=React.useContext(MainContext)

  const {addUserForm,logInForm,changePasswordForm}=FormTemplate      
  const {addUserState,logInState,changePasswordState}=StateTemplate

  //====================================
  const [showModalError,setShowModalError]=React.useState({status:false,msg:""})

  //=====================================
  //addUser
  const [showAddUser,setShowAddUser]=React.useState(false)

  let param1={
    isAddForm:true,
    lb:'เพิ่มพนักงาน',
    formTemplate:addUserForm,
    stateTemplate:addUserState,
    setShowModalError,
    
    selectData:{basicData},
    loadData:null,
    show:showAddUser,
    setShow:setShowAddUser,
    url:'/user/adduser',

    keyName:null,//["photoUrl"]
    iconAction:null,//[()=>{}],
    actionAfterSuccess:null,//()=>{}
    useGenFD:false
  }  
  
  //==========================
  const actionAfterSuccessLogin=(resultAxios)=>{
    localStorage.setItem('userauthorization',
              `b ${resultAxios.data.userToken}`)
    localStorage.setItem("username",
              resultAxios.data.username)
    setReloadCheckToken(true)
  }

  const [showLogIn,setShowLogIn]=React.useState(false)
 
  let param2={
    isAddForm:true,
    lb:'ล็อกอินพนักงาน',
    formTemplate:logInForm,
    stateTemplate:logInState,
    setShowModalError,
    
    selectData:{basicData},
    loadData:null,
    show:showLogIn,
    setShow:setShowLogIn,
    url:'/user/login',

    keyName:null,//["photoUrl"]
    iconAction:null,//[()=>{}],
    actionAfterSuccess:actionAfterSuccessLogin,//null
    useGenFD:false
  }  

  //=======================
  const [showChangePassword,setShowChangePassword]=React.useState(false)
   
  let param3={
    isAddForm:true,
    lb:'เปลี่ยนรหัสพนักงาน',
    formTemplate:changePasswordForm,
    stateTemplate:changePasswordState,
    setShowModalError,
    
    selectData:{basicData},
    loadData:null,
    show:showChangePassword,
    setShow:setShowChangePassword,
    url:'/user/changepassword',

    keyName:null,//["photoUrl"]
    iconAction:null,//[()=>{}],
    actionAfterSuccess:null,//()=>{}
    useGenFD:false
  }  
  
  //=======================
  return (
    <div className="page-center">
        
        <div className="w-50 h-40 ">
            
            <div className="flex-center-center h-60" 
                style={{background:"rgba(225,225,225,0.8)",
                boxShadow:"5px 5px 20px black",
                borderRadius:"10px"}}  
            >   
                {!haveUserToken
                ?<h1 style={{fontSize:"2rem",textAlign:"center"}}>
                  ล็อกอิน พนักงานก่อนใช้</h1>
                :<h1 style={{fontSize:"2rem",textAlign:"center"}}>
                  {`ยินดีต้อนรับ : ${userName}`}</h1>
                }
            </div>
            
            <div className="flex-center-center h-30">

                <div className="xc4 sc12 p-1" 
                     style={{display:!haveUserToken?"none":"block"}}>
                    <button className="xc12" 
                        style={{fontSize:"1.2rem"}}
                        onClick={e=>{setShowAddUser(true)}}
                    >
                      เพิ่มพนักงาน
                    </button>
                    {showAddUser?<ModalForm param={param1}/>:null}
                </div>

                <div className="xc4 sc12 p-1" 
                     style={{display:haveUserToken?"none":"block"}}>
                    <button className="xc12" 
                        style={{fontSize:"1.2rem"}}
                        onClick={e=>{
                            setShowLogIn(true)
                        }}
                    >
                      ล็อคอินพนักงาน
                    </button> 
                    {showLogIn?<ModalForm param={param2}/>:null}
                </div>

                <div className="xc4 sc12 p-1" 
                     style={{display:haveUserToken?"none":"block"}}>
                    <button className="xc12" 
                        style={{fontSize:"1.2rem"}}
                        onClick={e=>{
                            setShowChangePassword(true)
                        }}
                    >
                      เปลี่ยนรหัสพนักงาน
                    </button>
                    {showChangePassword?<ModalForm param={param3}/>:null}
                </div>

                {renderModalError({show:showModalError,setShow:setShowModalError})}
            </div>

        </div>
    </div>
  );
}

export default UserWelcome;
