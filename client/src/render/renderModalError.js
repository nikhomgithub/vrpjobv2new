import React from 'react';
import stateUtil from '../util/stateUtil'
import './Modal.css'

const renderModalError=({show,setShow,message,setMessage})=>{
return(
    <div className="Modal-background">
        <div className="Modal-box">
            <div className="Modal-header">
                <div>
                    <h2>เกิดข้อผิดพลาด!</h2>
                </div>
            </div>
            <div className="Modal-body">
                <div className ="flex-center-center">
                    {/*<p>Unsuccessfull Request</p>*/}
                    {
                    message?<p>{message}</p>:null
                    }
                </div>
            </div>
            <div className="Modal-footer">
                <div>
                    <button
                        onClick={e=>{
                            setShow(false)
                            if(setMessage){setMessage(null)}
                        }}
                    >กลับ</button>
                </div>
            </div>

        </div>
    </div>
    
)}

export default renderModalError
               