import React from 'react';
import {MdVisibility,MdVisibilityOff} from 'react-icons/md';
import {FaPlusSquare,FaMinusSquare} from 'react-icons/fa'; 
import {MdSearch} from 'react-icons/md';
import renderFormTable from './renderFormTable'


import StateUtil from '../../model/StateUtil'

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import th from "date-fns/locale/th";


registerLocale("th", th);

const {revRefAndValue}=StateUtil  

const renderForm=({
    cName,
    template,
    refAndValue,ref1,iconAction,
    setRefAndValue,
    
    //basicData,
    selectData,
    blankData,
    refAndValueBlankData,
    loadData,setLoadData,
    hidePassword,setHidePassword,

    tableTemplate,setTableTemplate,
    showTable,setShowTable,
    selectRow,setSelectRow,
    setCalculate,
    sumAmount
    })=>{
    //================================
    const changeInputStateForNumber=({location,value})=>{
     
      const  pattern = "^\-?[0-9]+(?:\.[0-9]{1,2})?$"
      const regex = new RegExp(pattern);
      const result=regex.test(value.toString())
      
      if(result||value==""){
        let temp= refAndValue
        location.map(i=>{ temp=temp[i]})
        temp.value=value
        setRefAndValue({...refAndValue})
        let tempRev=revRefAndValue({template,refAndValue})
        setLoadData({...loadData,...tempRev})
        setCalculate(true)
      }
    } 
    //================================
    const changeInputState=({location,value})=>{
        let temp= refAndValue
        location.map(i=>{ temp=temp[i]})
        temp.value=value
        setRefAndValue({...refAndValue})
        let tempRev=revRefAndValue({template,refAndValue})
        setLoadData({...loadData,...tempRev})
        setCalculate(true)
    }
    //================================
    const goToNextRef=(e,nextRef)=>{
        if((e.key=="Enter")||(e.key=="ArrowRight")){
            if(Array.isArray(nextRef)){
                let temp= refAndValue
                nextRef.map(i=>{ temp=temp[i]})
                temp.ref.current.focus()
            }
            else{
              ref1.current.focus()
            }
        }
    }
    //========================
    
    const goToNextRefInTable=(e,rAv,tpKey,tPtTpKey,idx,length)=>{
      
      //console.log('e.key')
      //console.log(e.key)

      if((e.key=="Enter")||(e.key=="ArrowRight")){  
          
          if(Array.isArray(rAv.nextRef)){
              let temp= refAndValue
              rAv.nextRef.map(i=>{ temp=temp[i]})
              temp.ref.current.focus()
          }
          else{ //out of form to OK button
            //refButtonOK.current.focus()
            ref1.current.focus()
          }
          
      }

      /*
      if(e.key=="Enter"){
        
        if(tPtTpKey.nextEnter){
          //last filed and last line in table
          if((idx==length-1)&&tPtTpKey.nextEnter.lastKey){

            if(Array.isArray(tPtTpKey.nextEnter.lastKey)){ //out of table to next ref in form
              
              let temp= refAndValue
              tPtTpKey.nextEnter.lastKey.map(i=>{ temp=temp[i]})
              temp.ref.current.focus()
            
            }
            else{ //out of form to OK button
              //refButtonOK.current.focus()
              ref1.current.focus()

            }

          }
          else{ //compare 
            let temp=refAndValue
            
            tPtTpKey.nextEnter.nextKey1.map(i=>{
              if(i===0){ temp=temp[idx] } //not last in row
              else  if (i===1){ temp=temp[idx+1] } //last in row go to next line
              else{ temp=temp[i] } //not last in row
            })
            temp.ref.current.focus()
          }  

        }
      }
      */
    }
    //========================
    const renderEachInputType=({
        lb,cName,subCName,templateType,
        inputType,subFormTemplate,
        placeholder,disabled,autoFocus,unchangeable,
        selectObj,selectDataKey,textRow,

        location,nextRef,ref,value,
    })=>{

        if(inputType=="select"){
            
            //--------------------
            // customerData เป็น Array  
            // selectData={basicData,customerData}
            // selectData[basicData][title]] 

            const renderSelectCondition=()=>{
              //เงื่อนไข 1
              if(selectData[selectDataKey]){
                if(!selectData [ selectDataKey ]){return null}
                if(Array.isArray(selectData[selectDataKey][selectObj])) {
                  
                  return selectData[selectDataKey][selectObj].map((m,index)=>(
                      <option key={index} value={m}>{m}</option>
                  ))
                }
              }
            }
            
            return(
            <select className="w-100"
                type={inputType}
                value={value}
                ref={ref}
                onChange={e=>{
                    if(!unchangeable){
                      changeInputState({location,value:e.target.value})
                    }
                }}
                onKeyDown={e=>{goToNextRef(e,nextRef)}}
                disabled={disabled}
                autoFocus={autoFocus}
            >  
                <option value="" hidden>list below...</option>
                {renderSelectCondition()}
            </select>
            )
        }
        else if(inputType=="checkbox"){
            return(
            <input
                type={inputType}
                checked={value}
                ref={ref}
                onChange={e=>{
                  if(!unchangeable){
                    changeInputState({location,value:e.target.checked})
                  }
                }}
                onKeyDown={e=>{goToNextRef(e,nextRef)}}
                disabled={disabled}
                autoFocus={autoFocus}
            />
            )
        }
        else if(inputType=="password"){
            return(
            <div style={{position:"relative",width:"100%"}} >
                <input
                    type={hidePassword?inputType:"text"}
                    value={value}
                    ref={ref}
                    onChange={e=>{
                      if(!unchangeable){
                        changeInputState({location,value:e.target.value})
                      }
                    }}
                    onKeyDown={e=>{goToNextRef(e,nextRef)}}
                    disabled={disabled}
                    autoFocus={autoFocus}
                />
                {
                hidePassword
                ?<MdVisibilityOff 
                    className="sm-icon" 
                    style={{position:'absolute',top:"0.2rem",right:'0.3rem'}}
                    onClick={e=>{
                    setHidePassword(!hidePassword)
                    }}
                />
                :<MdVisibility 
                    className="sm-icon" 
                    style={{position:'absolute',top:"0.2rem",right:'0.3rem'}}
                    onClick={e=>{
                    setHidePassword(!hidePassword)
                    }}
                />
                }
            </div>
            )
        }
        else if(inputType=="date"){
          //type={'datetime-local'}
          //type={'date'}
          return (
            <input
                type={'date'}
                value={value.substring(0,10)}
                ref={ref}
                onChange={e=>{
                    //console.log(`Date:${e.target.value}`)
                  if(!unchangeable){
                    changeInputState({location,value:e.target.value})
                  }
                }}
                onKeyDown={e=>{goToNextRef(e,nextRef)}}
               
                disabled={disabled}
                autoFocus={autoFocus}
            />
            )
        }
        //=======================
        else if(inputType=="thaiDate"){
          //type={'datetime-local'}
          //type={'date'}
          return (
            <div style={{position:"relative"}}>
                 
                  <button className="hideButton" style={{position:"absolute"}}
                  ref = {ref}
                  onKeyDown={e=>{goToNextRef(e,nextRef)}}
                  />
                     
              <DatePicker
                style={{}}
                locale="th"
                dateFormat="dd/MM/yyyy"
                selected={value?new Date(value):null}
                onChange={e=>{
                  //console.log(`thaiDate:${e.toISOString()}`)
                  if(!unchangeable){
                    changeInputState({
                      location,
                      value:e.toISOString().substring(0,10)})
                  }
                }}
                
                onKeyDown={e=>{goToNextRef(e,nextRef)}}
                disabled={disabled}
                autoFocus={autoFocus}

              />
              </div>
          
            )
        }
        else if (inputType=="textarea"){
          return (
            <textarea
              style={{width:"100%"}}
              value={value}
              rows={textRow}
              ref={ref}
              onChange={e=>{
                if(!unchangeable){
                  changeInputState({location,value:e.target.value})
                }
              }}
              onKeyDown={e=>{}}
              disabled={disabled}
              autoFocus={autoFocus}
            />
          )
        }
        //=======================
        else if(inputType=="number"){
 
          return (
            <input
                type={inputType}
                value={value}
                rows={textRow}
                ref={ref}
                onChange={e=>{
                  if(!unchangeable){
                    changeInputStateForNumber({location,value:e.target.value})
                  }
                }}
                onKeyDown={e=>{goToNextRef(e,nextRef)}}
                disabled={disabled}
                autoFocus={autoFocus}
            />
            )
        }
        //=======================
        else{
            return (
            <input
                type={inputType}
                value={value}
                rows={textRow}
                ref={ref}
                onChange={e=>{
                  if(!unchangeable){
                    changeInputState({location,value:e.target.value})
                  }
                }}
                onKeyDown={e=>{goToNextRef(e,nextRef)}}
                disabled={disabled}
                autoFocus={autoFocus}
            />
            )
        }
    }  
    //==================================

    const renderIcon=({tPt,rAv,bDt,rAvbDt,lDt,tpKey,tpIdx})=>{
      const { lb,cName,subCName,templateType,
        inputType,subFormTemplate,
        placeholder,disabled,autoFocus,unchangeable,
        selectObj,selectDataKey,iconActionIdx}=tPt[tpKey]

      return(
        <div key={tpIdx} className={cName}>
          <div  className="flex-center-baseline">
            <div className={subCName[0]}>
                <p className="">{lb}</p>
            </div>
            <div className={subCName[1]}>
              <MdSearch className="lg-icon"
                onClick={e=>{
                  //console.log('showCustomer')
                  iconAction[iconActionIdx](true)
                }}
              />
            </div>
            </div>
        </div>
        )
    }
    //======================================
    const renderSingleInput=({tPt,rAv,bDt,rAvbDt,lDt,tpKey,tpIdx})=>{
        const { lb,cName,subCName,templateType,
                inputType,subFormTemplate,
                placeholder,disabled,autoFocus,unchangeable,
                selectObj,selectDataKey,textRow,
                //calculation
              }=tPt[tpKey]
        const {location,nextRef,ref,value}=rAv[tpKey]
        
        return(
        <div key={tpIdx} className={cName}>
          <div  className="flex-center-center">
            <div className={subCName[0]}>
                <p className="">{lb}</p>
            </div>
            <div className={subCName[1]} 
                 style={{ 
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                   }}>
                { 
                  renderEachInputType({
                    lb,cName,subCName,templateType,
                    inputType,subFormTemplate,
                    placeholder,disabled,autoFocus,unchangeable,
                    selectObj,selectDataKey,textRow,

                    location,nextRef,ref,value
                    //calculation
                  })
                }
            </div>
            </div>
        </div>
        )
    }
    //====================================
    const renderArrayInput=({tPt,rAv,bDt,rAvbDt,lDt,tpKey,tpIdx})=>{
        const { lb,cName,subCName,templateType,
                inputType,subFormTemplate,
                placeholder,disabled,autoFocus,unchangeable,
                
                selectObj,selectDataKey}=tPt[tpKey]        
        return(
          <div key={tpIdx} className={cName}>
            
            <div  className="flex-center-baseline">
                <div className={subCName[0]}>
                    <p className="">{lb}</p>
                </div>
                <div className={subCName[1]}></div>
            </div>
            {
            rAv[tpKey].map((i,idx)=>{
                const {location,nextRef,ref,value}=i
              return(
                <div  key={idx} className="flex-center-baseline">
                  
                  <div className={subCName[0]}>
                    
                    {disabled=="disabled"
                    ?null
                    :<div className="flex-center-baseline">  
                      <div className="px-1">
                        <FaPlusSquare
                          className="sm-icon" 
                          onClick={e=>{
                            //we do not use revRefAndValue anymore
                            //instead we update lDt 
                            //After we lDt update, ReactEffect of [editData] in ModalForm
                            //it will update genRefAndValue automatically
                            lDt[tpKey].splice(idx+1,0,bDt[tpKey][0])
                            upDateLoadData()
                            //below code no use
                            //rAv[tpKey].splice(idx+1,0,rAvbDt[tpKey][0])
                            //let temp=revRefAndValue({template,refAndValue})
                            //setLoadData({...loadData,...temp})
                          }}
                        />   
                      </div>
                      <div className="px-1">
                        <FaMinusSquare
                          className="sm-icon" 
                          style={{visibility:idx>0?"visible":"hidden"}}
                          onClick={e=>{
                            //we do not use revRefAndValue anymore
                            //instead we update lDt 
                            //After we lDt update, ReactEffect of [editData] in ModalForm
                            //it will update genRefAndValue automatically
                            lDt[tpKey].splice(idx,1)
                            upDateLoadData()
                            //below code no use
                            //rAv[tpKey].splice(idx,1)
                            //console.log(refAndValue)
                            //let temp=revRefAndValue({template,refAndValue})
                            //setLoadData({...loadData,...temp})
                            //setRefAndValue({...refAndValue})
                          }}
                        />   
                      </div>
                    </div>
                    }
                  </div>
                  <div className={subCName[1]} style={{position:"relative"}}>
                   {renderEachInputType({
                       lb,cName,subCName,templateType,
                       inputType,subFormTemplate,
                       placeholder,disabled,autoFocus,unchangeable,
                       //calculation
                       selectObj,selectDataKey,

                       location,nextRef,ref,value
                   })}
                  </div>  
                </div>
              )
            })
            }
          </div>
        )
    }
    //====================================

    const renderFunction=({tPt,rAv,bDt,rAvbDt,lDt})=>{

        const arrayTemplate=Object.keys(tPt) 
        //console.log('renderFunction: arrayTemplate')
        //console.log(arrayTemplate)
        return ( arrayTemplate.map((tpKey,tpIdx)=>{  
          const {templateType}=tPt[tpKey]

          const { lb,cName,subCName,subFormTemplate,iconActionIdx}=tPt[tpKey]
          
          if(templateType=="object"){
            return(
              <div key={tpIdx} className={cName}>
                  <div className={subCName[0]}>
                    <p className="">{lb}</p>
                  </div>
                  <div className={subCName[1]}>
                    {
                      renderFunction({
                        tPt:subFormTemplate,
                        rAv:rAv[tpKey],
                        bDt:bDt[tpKey],
                        rAvbDt:rAvbDt[tpKey],
                        lDt:lDt[tpKey],
                      })
                    }
                  </div>
              </div>
            )
          }
          else if(templateType=="arrayObject"){
       
            return rAv[tpKey].map((i,idx)=>{
                const {location}=i
              return(
                <div key={`${tpKey}-${idx}`} className={cName}>
                    <div className={subCName[0]}>
                      <p className="">{lb}</p>
                    </div>                
                    
                    <div className={subCName[1]}> 

                      <div className="flex-center-center jc-start">  
                        <div className="px-1">
                            <FaPlusSquare
                            className="sm-icon" 
                            onClick={e=>{
                                //we do not use revRefAndValue anymore
                                //instead we update lDt 
                                //After we lDt update, ReactEffect of [editData] in ModalForm
                                //it will update genRefAndValue automatically
                                lDt[tpKey].splice(idx+1,0,bDt[tpKey][0])
                                upDateLoadData()
                                //below code no use
                                //rAv[tpKey].splice(idx+1,0,rAvbDt[tpKey][0])
                                //console.log('FaPlus RefAndValue arrayObject')
                                //console.log(refAndValue)

                                //let temp=revRefAndValue({template,refAndValue})
                                //setLoadData({...loadData,...temp})
                            }}

                            />   
                        </div>
                        <div className="px-1">
                            <FaMinusSquare
                            className="sm-icon" 
                            style={{visibility:idx>0?"visible":"hidden"}}
                            onClick={e=>{
                                //we do not use revRefAndValue anymore
                                //instead we update lDt 
                                //After we lDt update, ReactEffect of [editData] in ModalForm
                                //it will update genRefAndValue automatically
                                lDt[tpKey].splice(idx,1)
                                upDateLoadData()
                                //below code no use
                                //rAv[tpKey].splice(idx,1)
                                //let temp=revRefAndValue({template,refAndValue})
                                //setLoadData({...loadData,...temp})
                                //setRefAndValue({...refAndValue})
                            }}
                            />   
                        </div>
                      </div>
                      <div className="flex-center-start jc-start">      
                        { 
                        renderFunction({
                          tPt:subFormTemplate,
                          rAv:i,
                          bDt:bDt[tpKey][0],
                          rAvbDt:rAvbDt[tpKey][0],
                          lDt:lDt[tpKey][idx]
                        })
                        }
                      </div>
                  </div>
                </div>
              )
            })
          }  
          else if(templateType=="arrayObjectInTable"){
            if(!tableTemplate){
              return null
            }
            else{
              return(
                <div style={{width:"100%",height:"100%",overflow:"hidden"}}>
                  {
                  renderFormTable({
                    tPt:template[tpKey],
                    rAv:refAndValue[tpKey],
                    bDt:blankData[tpKey],
                    rAvbDt:refAndValueBlankData[tpKey],
                    lDt:loadData[tpKey],
                    showTable,setShowTable,
                    tableTemplate,setTableTemplate,
                    selectData,
                    changeInputState,changeInputStateForNumber,
                    goToNextRefInTable,
                    selectRow,setSelectRow,
                    upDateLoadData,
                    iconAction,
                    sumAmount
                  })
                  
                }
                </div>
              )
            }
          }
          else if(templateType=="array"){      
            return(
              renderArrayInput({tPt,rAv,bDt,rAvbDt,lDt,tpKey,tpIdx})
            )
          }
          else if(templateType=="icon"){

            if(iconAction){
              return (
              renderIcon({tPt,rAv,bDt,rAvbDt,lDt,tpKey,tpIdx})
              )
            }

          }
          else{
            return(
              renderSingleInput({tPt,rAv,bDt,rAvbDt,lDt,tpKey,tpIdx})
            )
          }
        }))
    }
    //=========================================
    let globalTemp={...loadData}  
    const upDateLoadData=()=>{
      //console.log('upDateLoadData')
      setLoadData({...globalTemp})
    }
    //========================================
    return (
        <div className="flex-center-start jc-start">
        {  
          renderFunction({
             tPt:template,
             rAv:refAndValue,
             bDt:blankData,
             rAvbDt:refAndValueBlankData,
             lDt:globalTemp,
          }) 
        }
        </div>
    )
}

export default renderForm
