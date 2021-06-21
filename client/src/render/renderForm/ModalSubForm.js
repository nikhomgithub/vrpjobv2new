import React from 'react';
import StateUtil from '../../model/StateUtil'
import renderForm from './renderForm'
import renderModalError from '../renderModalError'

import axiosUtil from '../../util/axiosUtil'


function ModalSubForm({param}) {

    const {genBlankState,genRefAndValue,combineLoadDataBlankState}=StateUtil  
    const {submitFunc,addAndUpdateSubField}=axiosUtil  
  
    const { isAddForm,lb,
            formTemplate,stateTemplate,
            selectData,
            iconAction,
            loadData,
            mainData,subField,

            show,setShow,
            url,

            iconActionData,
            actionAfterSuccess,
          } = param
    
    const isFirstRun=React.useRef(true)
    
    const [showModalError,setShowModalError]=React.useState(false)
    
    const [hidePassword,setHidePassword]=React.useState(true)

    const refSubmitForm=React.createRef() //ตกลง
    const refCancelForm=React.createRef() //ยกเลิก     
    const refClearForm=React.createRef() //ล้างข้อมูล     

    const blankData=genBlankState({template:stateTemplate}).state
    
    
    const refAndValueBlankData = genRefAndValue({template:formTemplate,FData:blankData})
        
    const genFormInputState =() =>{
        
        //console.log(loadData)
        if(isAddForm){
            return blankData
        }
        else{
            //we create combineLoadDataBlankState function
            //to make sure that every filed is valid at least ""
            //because in mongoDB if model type = number, it we send "" 
            //it will be save as null
            //when we receive data back it will be just like customerId=null
            //so this function will make customerId="" again
            const temp=combineLoadDataBlankState({template:stateTemplate,loadData})
            return temp
        }
    }
    
    let [formInputState,setFormInputState]=React.useState(genFormInputState())
    
    let [refAndValue,setRefAndValue]=React.useState(
        genRefAndValue({template:formTemplate,FData:formInputState})
    )

    React.useEffect(()=>{
       
        const temp=genRefAndValue({
            template:formTemplate,
            FData:formInputState
            })
        setRefAndValue({...temp})
        
        //console.log('formInputState')
        //console.log(formInputState)
        
    },[formInputState])


    React.useEffect(()=>{
        //console.log('iconActionData')
        //console.log(iconActionData)
        if(iconActionData){
            setFormInputState({...formInputState,...iconActionData})
        }
    },[iconActionData])
//==============================  
const clearForm=()=>{
    setFormInputState(blankData)
}
//==============================
const submitFunctionOption=()=>{

    //console.log('Add or Update SubForm')
    const temp = addAndUpdateSubField(mainData,subField,formInputState)

    submitFunc({
        url,
        stateTemplate,
        inputState:{...mainData,[subField]:temp},
        setShowModalError,
        actionAfterSuccess,
        useGenFD:false
    })

}

//====================
//console.log('ModalSubForm')
//====================
const renderFooter=()=>{
    return(
    <div style={{display:"flex",position:"fixed",
           bottom:"4rem",right:"2rem",zIndex:"100"}}>
        <div >
            <button
                ref={refSubmitForm}
                onKeyDown={e=>{
                    if(e.key=="ArrowRight"){
                        refClearForm.current.focus()
                    }
                }}
                onClick={e=>{
                    submitFunctionOption()
                }}
            >ตกลงxx</button>
        </div>

        <div>
            <button
                ref={refClearForm}
                onKeyDown={e=>{
                    if(e.key=="ArrowRight"){
                        refCancelForm.current.focus()
                    }
                    if(e.key=="ArrowLeft"){
                        refSubmitForm.current.focus()
                    }
                }}
                onClick={e=>{
                    clearForm();
                }}
            >
                ล้างข้อมูล
            </button>
        </div>
        
        <div>
            <button
                ref={refCancelForm}
                onKeyDown={e=>{
                    if(e.key=="ArrowLeft"){
                        refClearForm.current.focus()
                    }
                }}
                onClick={e=>{
                    clearForm()
                    setShow(false)
                }}
            >ยกเลิก</button>
        </div>

    </div>
    )
}

return (
    <div className="Modal-background">
        <div className="Modal-box">
            <div className="Modal-header">
                <div>
                    <h1>{lb}</h1>
                </div>
                {
                    renderFooter()
                }
            </div>
            <div className="Modal-body" >
                <div>
                {
                 renderForm({
                    cName:"form-row flex-justify-start flex-align-stretch bd-green",
                    template:formTemplate,
                    ref1:refSubmitForm,
                    iconAction,
                    refAndValue, //origin dont have ModalRefAndValue
                    setRefAndValue, //Origin dont have ModalRefAndValue
                    loadData:formInputState,
                    setLoadData:setFormInputState,
                    selectData,
                    blankData,
                    refAndValueBlankData,
                    hidePassword,setHidePassword
                  })
                  
                }
                </div>
            </div>
          
            {
                renderModalError({show:showModalError,setShow:setShowModalError})
            }            
        </div>
    </div>
  );
}
export default ModalSubForm;
