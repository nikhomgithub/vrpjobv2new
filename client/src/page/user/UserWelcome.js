import React from 'react';
import axios from 'axios'
import {MainContext} from '../../context/MainContext'

import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import axiosUtil from '../../util/axiosUtil'
import ModalForm from '../../render/renderForm/ModalForm'
import renderModalError from '../../render/renderModalError'
//import myheader from '../../myheader'

function UserWelcome() {
  
  const {basicData,haveUserToken,userName,
        setReloadCheckToken,myheader}=React.useContext(MainContext)

  const {addUserForm,logInForm,changePasswordForm}=FormTemplate      
  const {addUserState,logInState,changePasswordState}=StateTemplate
  const {catchErrorToMessage}=axiosUtil
  //====================================

  const [showAddUser,setShowAddUser]=React.useState(false)
  const [showChangePassword,setShowChangePassword]=React.useState(false)
  const [showLogIn,setShowLogIn]=React.useState(false)
  const [showModalError,setShowModalError]=React.useState(false)

  const [message,setMessage]=React.useState(null)
  
  const submitAddUser=(formInputState)=>{
    axios.post(`/user/adduser`,formInputState,myheader)
    .then(result=>{
        setShowAddUser(false)
    })
    .catch(error=>{
        catchErrorToMessage(error,setMessage)
        setShowModalError(true)
    })
  }

  const submitChangePassword=(formInputState)=>{
    axios.post(`/user/changepassword`,formInputState,myheader)
    .then(result=>{
      setShowChangePassword(false)
    })
    .catch(error=>{
        catchErrorToMessage(error,setMessage)
        setShowModalError(true)
    })
  }

  const submitLogIn=(formInputState)=>{
    axios.post(`/user/login`,formInputState,myheader)
    .then(result=>{
      localStorage.setItem('userauthorization',
        `b ${result.data.userToken}`)
      localStorage.setItem("username",
        result.data.username)
        setReloadCheckToken(true)
        setShowLogIn(false)
    })
    .catch(error=>{
        catchErrorToMessage(error,setMessage)
        setShowModalError(true)
    })
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
                  ล็อกอินผู้ใช้ก่อนใช้</h1>
                :<h1 style={{fontSize:"2rem",textAlign:"center"}}>
                  {`Welcome : ${userName}`}</h1>
                }
            </div>
            
            <div className="flex-center-center h-30">

                <div className="xc4 sc12 p-1" 
                     style={{display:!haveUserToken?"none":"block"}}>
                    <button className="xc12" 
                        style={{fontSize:"1.2rem"}}
                        onClick={e=>{setShowAddUser(true)}}
                    >
                      เพิ่มผู้ใช้
                    </button>
                </div>

                <div className="xc4 sc12 p-1" 
                     style={{display:haveUserToken?"none":"block"}}>
                    <button className="xc12" 
                        style={{fontSize:"1.2rem"}}
                        onClick={e=>{
                            setShowLogIn(true)
                        }}
                    >
                      ล็อกอิน
                    </button> 
                </div>

                <div className="xc4 sc12 p-1" 
                     style={{display:haveUserToken?"none":"block"}}>
                    <button className="xc12" 
                        style={{fontSize:"1.2rem"}}
                        onClick={e=>{
                            setShowChangePassword(true)
                        }}
                    >
                      เปลี่ยนรหัสผ่าน
                    </button>
                </div>

                {
                showAddUser
                ?<ModalForm
                    lb={'เพิ่มผู้ใช้'}
                    formTemplate={addUserForm}
                    stateTemplate={addUserState}
                    setShow={setShowAddUser}
                    submitFunction={submitAddUser}
                    selectData={{basicData:basicData}}
                />
                :null
                }
                {
                showLogIn
                ?<ModalForm
                    lb={'ล็อกอิน'}
                    formTemplate={logInForm}
                    stateTemplate={logInState}
                    setShow={setShowLogIn}
                    submitFunction={ submitLogIn}
                />
                :null
                }
                {
                showChangePassword
                ?<ModalForm
                    lb={'เปลี่ยนรหัสผ่าน'}
                    formTemplate={changePasswordForm}
                    stateTemplate={changePasswordState}
                    setShow={setShowChangePassword}
                    submitFunction={submitChangePassword}
                />
                :null
                }
                {
                showModalError
                ?renderModalError({
                  show:showModalError,
                  setShow:setShowModalError,
                  message,setMessage
                })
                :null
                }
            </div>

        </div>
    </div>
  );
}

export default UserWelcome;
