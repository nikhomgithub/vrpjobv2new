import React from 'react';
import axiosUtil from '../util/axiosUtil'
import renderModalError from './renderModalError'

const {submitFunc}=axiosUtil  

function ModalConfirm({
    setShow,
    submitFunction
    }){


    const refModalConfirm1 = React.createRef()
    const refModalConfirm2 = React.createRef() 

    const [showModalError,setShowModalError]=React.useState(false)
    //const {id,parentId,allDeleteId,routeAuth,detail}=editData
//===============================
//===============================
    return(

    <div className="Modal-background">
        <div className="Modal-box">
            <div className="Modal-header">
                <div>
                       <h3>ยืนยันที่จะดำเนินการต่อ?</h3>
                </div>
            </div>
          
            <div className="Modal-footer">
                <div>
                    <button
                        ref={refModalConfirm1}
                        onClick={e=>{
                            submitFunction()
                        }}
                        onKeyDown={e=>{
                            if(e.key=="ArrowRight"){
                                refModalConfirm2.current.focus()
                            }
                        }}
                    >Confirm</button>
                </div>
                <div>
                    <button
                        ref={refModalConfirm2}
                        onKeyDown={e=>{
                            if(e.key=="ArrowLeft"){
                                refModalConfirm1.current.focus()
                            }
                        }}
                        onClick={e=>{
                            if(setShow){setShow(false)}
                        }}
                    >Cancel</button>
                </div>

            </div>
            {
              showModalError
              ?renderModalError({show:showModalError,setShow:setShowModalError})
              :null
            }
        </div>
    </div>
    )
}

ModalConfirm.defaultProps={
    setShow:()=>{},
    submitFunction:()=>{}
}


export default ModalConfirm
