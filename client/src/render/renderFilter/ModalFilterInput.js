import React from 'react';
import {FaRegArrowAltCircleDown,FaRegArrowAltCircleUp,
    FaPlusSquare,FaMinusSquare
} from 'react-icons/fa';

import {MdSwapHoriz} from 'react-icons/md';
import stateUtil from '../../util/stateUtil'
import axiosUtil from '../../util/axiosUtil'
import '../Modal.css'

const {changeKeyKey} = stateUtil

const {genSortFromSortState,genSortStateFromSort}=axiosUtil

const ModalFilterInput=({
    show,setShow,
    title,

    filterTemplate,
    inputState,setInputState,

    limitRow,setLimitRow,
    sort,setSort,
    filterAxios,
    selectData
})=>{

    //console.log('ModalFilterInput')

const [sortState,setSortState]=React.useState(genSortStateFromSort(sort))

const [swapSelect,setSwapSelect]=React.useState(true)

React.useEffect(()=>{
    //console.log('sortState')
    //console.log(sortState)
    const temp=genSortFromSortState(sortState)
    setSort(temp)
},[sortState])

//========================    
const renderBetweenNumber=(i,templateIdx)=>{
    return(
    <div key={templateIdx} className={i.cName}>
        
        <div  className="flex-center-center flex-no-wrap">

            <div className={i.subCName[0]}>
                <input
                    style={{marginTop:"-0.5rem"}}
                    type="checkbox"
                    checked={inputState[i.keyName].toCheck}
                    ref={i.refInput[0]}
                    onKeyDown={e=>{
                        if(e.key=="Enter"){
                            i.refInput[1].current.focus()
                        }
                    }}
                    onChange={e=>{
                        changeKeyKey({
                            key:i.keyName,
                            subKey:"toCheck",
                            value:e.target.checked,
                            inputState,setInputState
                        })
                        i.refInput[1].current.focus()
                    }}
                />
            </div>

            <div className={i.subCName[1]}>
              <p className="label">{i.lb}</p>
            </div>

            <div className={i.subCName[2]}>
                <div className="xc12 flex-center-baseline ">

                    <div className="xc3">
                        <p>ระหว่าง</p>
                    </div>
                    <div className="xc4">
                        <input
                        style={{width:"100%"}}
                        type={i.inputType}
                        value={inputState[i.keyName].min}
                        ref={i.refInput[1]}
                        onKeyDown={e=>{
                            if(e.key=="Enter"){
                                i.refInput[2].current.focus()
                            }
                        }}
                        onChange={e=>{changeKeyKey({
                            key:i.keyName,
                            subKey:"min",
                            value:(e.target.type=="number")
                            ?e.target.value?parseFloat(e.target.value):0
                            :e.target.value,
                            inputState,setInputState})}}  
                        />
                    </div>

                    <div className="xc1"
                            style={{textAlign:"center"}}
                    >
                        <p>-</p>
                    </div>   
                    <div className="xc4">    
                        <input
                        style={{width:"100%"}}
                        type={i.inputType}
                        value={inputState[i.keyName].max}
                        ref={i.refInput[2]}
                        onKeyDown={e=>{
                         if(e.key=="Enter"){
                          if(filterTemplate.length-1!=templateIdx){
                           filterTemplate[templateIdx+1].refInput[0].current.focus()
                          }
                         } 
                        }} 
                        onChange={e=>{changeKeyKey({
                            key:i.keyName,
                            subKey:"max",
                            value:(e.target.type=="number")
                                ?e.target.value?parseFloat(e.target.value):0
                                :e.target.value,
                            inputState,setInputState})}}
                        />  
                    </div>
                </div>
                    
            </div>
        </div>
     </div>
    )
}
//=================================
//=================================
const renderBoolean=(i,templateIdx)=>{
    return(
        <div key={templateIdx} className={i.cName}>
            
            <div  className="flex-center-center flex-no-wrap">
    
                <div className={i.subCName[0]}>
                    <input
                        style={{marginTop:"-0.5rem"}}
                        type="checkbox"
                        checked={inputState[i.keyName].toCheck}
                        ref={i.refInput[0]}
                        onKeyDown={e=>{
                            if(e.key=="Enter"){
                                i.refInput[1].current.focus()
                            }
                        }}
                        onChange={e=>{
                            changeKeyKey({
                                key:i.keyName,
                                subKey:"toCheck",
                                value:e.target.checked,
                                inputState,setInputState
                            })
                            i.refInput[1].current.focus()
                        }}
                    />
                </div>
    
    
              <div className={i.subCName[1]}>
                  <p className="label">{i.lb}</p>
              </div>
    
              <div className={`${i.subCName[2]}`}
                   style={{marginTop:"-0.9rem"}}
              >
                <input
                 type={i.inputType}
                 checked={inputState[i.keyName].value}
                 ref={i.refInput[1]}
                 onKeyDown={e=>{
                  if(e.key=="Enter"){
                   if(filterTemplate.length-1!=templateIdx){
                    filterTemplate[templateIdx+1].refInput[0].current.focus()
                   }
                  }
                 }}
                 onChange={e=>{changeKeyKey({
                    key:i.keyName,
                    subKey:"value",
                    value:e.target.checked,
                    inputState,setInputState})}}
                />
              </div>
            </div>
        </div>
    )
}
//========================
const renderSelect=(i,templateIdx)=>{

    const renderSelectCondition=()=>{
        //เงื่อนไข 1
        if(selectData[i.selectDataKey]){
          if(!selectData [ i.selectDataKey ]){return null}
          if(Array.isArray(selectData[i.selectDataKey][i.selectObj])) {
            
            return selectData[i.selectDataKey][i.selectObj].map((m,index)=>(
                <option key={index} value={m}>{m}</option>
            ))
          }
        }
      }
      
return(
<div key={templateIdx} className={i.cName}>
            
    <div  className="flex-center-center flex-no-wrap">

        <div className={i.subCName[0]}>
            <input
                style={{marginTop:"-0.5rem"}}
                type="checkbox"
                checked={inputState[i.keyName].toCheck}
                ref={i.refInput[0]}
                onKeyDown={e=>{
                    if(e.key=="Enter"){
                        i.refInput[1].current.focus()
                    }
                }}
                onChange={e=>{
                    changeKeyKey({
                        key:i.keyName,
                        subKey:"toCheck",
                        value:e.target.checked,
                        inputState,setInputState
                    })
                    i.refInput[1].current.focus()
                }}
            />
        </div>


      <div className={i.subCName[1]}>
          <p className="label">{i.lb}</p>
      </div>

      <div className={`${i.subCName[2]}`}
           style={{marginTop:"-0.9rem",
                   display:"flex",justifyContent:"space-between"
           }}
      > 
        <MdSwapHoriz className="sm-icon"
            onClick={e=>setSwapSelect(!swapSelect)}
        />
        {
        swapSelect
        ?<select className="w-100"
                 value={inputState[i.keyName].value}
                 ref={i.refInput[1]}
                 onKeyDown={e=>{
                  if(e.key=="Enter"){
                    if(filterTemplate.length-1!=templateIdx){
                     filterTemplate[templateIdx+1].refInput[0].current.focus()
                    }
                  }
                 }}
                 onChange={e=>{changeKeyKey({
                    key:i.keyName,
                    subKey:"value",
                    value:e.target.value,
                    inputState,setInputState})}}
            >  
                <option value="" hidden>list below...</option>
                {
                  renderSelectCondition()
                }
        </select>
        : <input
                type={i.inputType}
                value={inputState[i.keyName].value}
                ref={i.refInput[1]}
                onKeyDown={e=>{
                if(e.key=="Enter"){
                if(filterTemplate.length-1!=templateIdx){
                    filterTemplate[templateIdx+1].refInput[0].current.focus()
                }
                }
                }}
                onChange={e=>{changeKeyKey({
                key:i.keyName,
                subKey:"value",
                value:e.target.value.replace(/\s{2}$/,' '),
                inputState,setInputState})}}
          />
        }
      </div>
    </div>
</div>
)
}
//========================
const renderString=(i,templateIdx)=>{

    return(
        <div key={templateIdx} className={i.cName}>
            
            <div  className="flex-center-center flex-no-wrap">
    
                <div className={i.subCName[0]}>
                    <input
                        style={{marginTop:"-0.5rem"}}
                        type="checkbox"
                        checked={inputState[i.keyName].toCheck}
                        ref={i.refInput[0]}
                        onKeyDown={e=>{
                            if(e.key=="Enter"){
                                i.refInput[1].current.focus()
                            }
                        }}
                        onChange={e=>{
                            changeKeyKey({
                                key:i.keyName,
                                subKey:"toCheck",
                                value:e.target.checked,
                                inputState,setInputState
                            })
                            i.refInput[1].current.focus()
                        }}
                    />
                </div>
    
    
              <div className={i.subCName[1]}>
                  <p className="label">{i.lb}</p>
              </div>
    
              <div className={`${i.subCName[2]}`}
                   style={{marginTop:"-0.9rem"}}
              >
                <input
                 type={i.inputType}
                 value={inputState[i.keyName].value}
                 ref={i.refInput[1]}
                 onKeyDown={e=>{
                  if(e.key=="Enter"){
                    if(filterTemplate.length-1!=templateIdx){
                     filterTemplate[templateIdx+1].refInput[0].current.focus()
                    }
                  }
                 }}
                 onChange={e=>{changeKeyKey({
                    key:i.keyName,
                    subKey:"value",
                    value:e.target.value.replace(/\s{2}$/,' '),
                    inputState,setInputState})}}
                />
              </div>
            </div>
        </div>
    )
}

//====================================

//<div style={{width:"100%",height:"100%"}}>     
const renderFilterBody=()=>{
return(
    filterTemplate.map((i,templateIdx)=>{
        //we change from switch case to if instead to prevent error
        if( (i.templateType =="number")||
            (i.templateType=="arrayNumber")||
            (i.templateType=="objectNumber")||
            (i.templateType=="arrayObjectNumber")||
            (i.templateType=="arrayObjectArrayNumber") ){
                return renderBetweenNumber(i,templateIdx)
            }
        else if( (i.templateType =="boolean")||
            (i.templateType=="arrayBoolean")||
            (i.templateType=="objectBoolean")||
            (i.templateType=="arrayObjectBoolean")||
            (i.templateType=="arrayObjectArrayBoolean") ){
                return renderBoolean(i,templateIdx)
            }
        else if(i.templateType =="select"){
            return renderSelect(i,templateIdx)
        }
        else{
            return renderString(i,templateIdx)
        }
    })
    )
}

//=====================================

const renderSortBody=()=>{
    const arraySortStateKey=Object.keys(sortState)
    //["order1","order2","order3"]
    //=====================
    let tempFilterTemplate=[]
    
    filterTemplate.map((i)=>{
        //we change from switch case to if instead to prevent error
        if((i.templateType=="string")||
           (i.templateType=="number")||
           (i.templateType=="date")){
            tempFilterTemplate=[...tempFilterTemplate,i]
        }
    })
  
return(
<div className="w-100">
    {
        arraySortStateKey.map((i,index)=>{
            return(
            <div key={index} className={filterTemplate[0].cName} >
                <div  className="flex-center-center">
                    
                    <div className={filterTemplate[0].subCName[0]}>
                        {sortState[i].toAscending==1
                          ?<FaRegArrowAltCircleDown className="md-icon"
                                onClick={e=>{
                                    const tempOrder=sortState[i]
                                    tempOrder.toAscending=-1
                                    setSortState({
                                        ...sortState,
                                        [i]:tempOrder})
                                }}
                            />
                          :<FaRegArrowAltCircleUp className="md-icon"
                                onClick={e=>{
                                    const tempOrder=sortState[i]
                                    tempOrder.toAscending=1
                                    setSortState({
                                        ...sortState,
                                        [i]:tempOrder})
                                }}
                          />
                        }
                    </div>
                
                    <div className={filterTemplate[0].subCName[1]} >
                        <p>{`No ${index+1}`}</p>
                    </div>
                    <div className={filterTemplate[0].subCName[2]} >
                        <select type="select" 
                                className="w-100"
                                value={sortState[i].sortName
                                        ?sortState[i].sortName
                                        :""}
                                onChange={e=>{
                     
                                    const tempOrder=sortState[i]
                                    tempOrder.sortName=e.target.value
                                    setSortState({
                                        ...sortState,
                                        [i]:tempOrder})
                                    
                                }}
                        >  
                         <option value="" hidden>list...</option>
                         {    //we use keyName for filterTemplate, 
                                //but make sure to use only main Field 
                            tempFilterTemplate.map((k,index)=>{
                            return(
                            <option key={index} value={k.keyName}>{k.lb}</option>
                            )
                            })
                         }
                        </select>
                    </div>
                </div>
            </div>
            )
        })
    }
</div>
)    
}
//====================================
const renderLimitRow=()=>{
return(
        <>
            <h3>กำหนดจำนวนรายการต่อหน้า</h3> 
            <div className="flex-center-center flex-no-wrap" >
                <div className="flex-center-center lc6">
                    <p>จำนวนรายการต่อหน้า</p>
                </div>
                <div className="flex-center-center lc6">
                    <div className="flex-center-center flex-no-wrap">
                        <FaMinusSquare className="md-icon mr-2 mb-3"
                            onClick={e=>{
                                if(limitRow>1){
                                    const temp=limitRow-1
                                    setLimitRow(temp)
                                }
                            }}
                        />
                        <p>{`${limitRow}`}</p>
                        <FaPlusSquare className="md-icon ml-2 mb-3"
                            onClick={e=>{
                                if(limitRow<50){
                                    const temp=limitRow+1
                                    setLimitRow(temp)
                                }
                            }}
                        />
                    </div>   
                </div>
            </div>
        </>
)
}
//====================================
return (
    <div className="Modal-background">
        <div className="Modal-box" style={{minWidth:"70%"}}>
          
            <div className="flex-center-center">
                <h1>{title}</h1>
            </div>

            <div className="flex-center-center jc-start">
                <h3>หัวข้อ</h3>
            </div>
          
            { renderFilterBody() }
           

            <div className="flex-center-center mt-2 mb-3">
                <div className="w-30">
                    <button className="w-100"
                        onClick={e=>{
                            filterAxios("and")
                            //setFilterOption(1)
                            //setPageNumber(1)
                            //setReload(true)
                            setShow(false)
                        }}
                    >
                        ทุกเงื่อนไขต้องจริง
                    </button>
                </div>
                <div className="w-30">
                    <button className="w-100"
                        onClick={e=>{
                            filterAxios("or")
                            //setFilterOption(2)
                            //setPageNumber(1)
                            //setReload(true)
                            setShow(false)
                        }}
                    >
                        บางเงื่อนไขจริง
                    </button>
                </div>
                <div className="w-30">
                    <button className="w-100"
                        onClick={e=>{
                            setShow(false)
                        }}
                    >
                        Cancel
                    </button>
                </div>

            </div> 

            <div className="mb-2">
                <h3>เรียงตามหัวข้อ</h3>
            </div>
            { sortState?renderSortBody():null }
            { renderLimitRow()}
        </div>
    </div>
)
}

ModalFilterInput.defaultProps={
    title:"Filter Form",
    show:null, 
    setShow:()=>{},
    filterTemplate:{},
    inputState:null, 
    setInputState:()=>{},
    limitRow:10,
    setLimitRow:()=>{},
    sort:null ,
    setSort:()=>{},
    setPageNumber:()=>{}, 
    setFilterOption:()=>{},
    setReload:()=>{},
    filterAxios:()=>{}
}
export default ModalFilterInput