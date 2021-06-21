import React from 'react';

import {FaPlusSquare,FaMinusSquare} from 'react-icons/fa'; 
import {MdSearch,MdClose} from 'react-icons/md';

const renderFormTable=({tPt,rAv,bDt,lDt,
                       tableTemplate,setTableTemplate,
                       showTable,
                       selectData,
                       changeInputState,changeInputStateForNumber,
                       goToNextRefInTable,
                       selectRow,setSelectRow,
                       upDateLoadData,
                       iconAction,
                       sumAmount
                      })=>{

    //console.log('renderFormTable')

    const numberWithCommas=(x)=>{

      //const temp=x.toString().split(".")
      //console.log(temp)
      if(x){
        const temp=x.toString().split(".")
        const beforeDot=temp[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  
        if(temp.length>1){
          return `${beforeDot}.${temp[1]}`
        }
        else{
          return beforeDot
        }
      }
      else if(x===0){
        return 0
      }
    }

    const objKeys = Object.keys(tPt.subFormTemplate)
    
    const renderSingleInput=({rAv,lDt,tpKey,idx,length})=>{
    
        if(tableTemplate[tpKey].inputType=="icon"){

          return(
    
            <MdSearch style={{fontSize:"1.5rem",margin:"auto"}}
              onClick={e=>{
                iconAction[tableTemplate[tpKey].iconActionIdx](true)
              }}
            />
    
          )
        }
        if(tableTemplate[tpKey].inputType=="text"){
          return(
            <input
            style={{padding:"0",margin:"0",height:"100%"}}
            type="text"
            ref={rAv[tpKey].ref}
            value={rAv[tpKey].value}
            onChange={e=>{
              if(!tableTemplate[tpKey].unchangeable){
                changeInputState({location:rAv[tpKey].location,value:e.target.value})
              }
            }}
            onKeyDown={e=>{
              goToNextRefInTable(e,rAv[tpKey],tpKey,tableTemplate[tpKey],idx,length)
            }}
            disabled={tableTemplate[tpKey].disabled}
            autoFocus={tableTemplate[tpKey].autoFocus}
            />
          )
    
        }
        if(tableTemplate[tpKey].inputType=="number"){
       
          if(tableTemplate[tpKey].calculation){
    
            let calValue = rAv[tpKey].value
            const temp= tableTemplate[tpKey].calculation
    
            const p1=rAv[temp.param[0]].value
            const p2=rAv[temp.param[1]].value
    
            if(temp.method=="multiply"){
              calValue = p1*p2
            }
            return(
              <input
              style={{padding:"0",margin:"0",height:"100%"}}
              type="number"
              ref={rAv[tpKey].ref}
              value={calValue}
              onChange={e=>{
                if(!tableTemplate[tpKey].unchangeable){
                  changeInputStateForNumber({location:rAv[tpKey].location,value:e.target.value})
                }
              }}
              onKeyDown={e=>{
                goToNextRefInTable(e,rAv[tpKey],tpKey,tableTemplate[tpKey],idx,length)
              }}
              disabled={tableTemplate[tpKey].disabled}
              autoFocus={tableTemplate[tpKey].autoFocus}
            />)
          }
          else {
            return(
              <input
              style={{padding:"0",margin:"0",height:"100%"}}
              type="number"
              ref={rAv[tpKey].ref}
              value={rAv[tpKey].value}
              onChange={e=>{
                if(!tableTemplate[tpKey].unchangeable){
                  changeInputStateForNumber({location:rAv[tpKey].location,value:e.target.value})
                }
              }}
              onKeyDown={e=>{
                goToNextRefInTable(e,rAv[tpKey],tpKey,tableTemplate[tpKey],idx,length)
              }}
              disabled={tableTemplate[tpKey].disabled}
              autoFocus={tableTemplate[tpKey].autoFocus}
            />
            )
          }
        }
        if(tableTemplate[tpKey].inputType=="checkbox"){
          return(
            <input
            style={{padding:"0",margin:"0",height:"50%",margin:"auto"}}
            type="checkbox"
            ref={rAv[tpKey].ref}
            checked={rAv[tpKey].value}
            onChange={e=>{
              if(!tableTemplate[tpKey].unchangeable){
                changeInputState({location:rAv[tpKey].location,value:e.target.checked})
              }
            }}
            onKeyDown={e=>{
              goToNextRefInTable(e,rAv[tpKey],tpKey,tableTemplate[tpKey],idx,length)
            }}
            disabled={tableTemplate[tpKey].disabled}
            autoFocus={tableTemplate[tpKey].autoFocus}
           />
          )
        }
        if(tableTemplate[tpKey].inputType=="select"){
          const {selectDataKey,selectObj}=tableTemplate[tpKey]
    
              //--------------------
          // customerData เป็น Array  
          // selectData={basicData,customerData}
          // selectData[selectDataKey] 

          // เงื่อนไข Array.isArray(selectObj)
          //1. selectObj=["a","b","c"]
          //   basicData เป็น object

          // เงื่อนไข Array.isArray(selectData[selectDataKey])
          //2. selectData[customerData]  ==> เป็น  []            
          
          // เงือนไข Object.keys(selectData[selectDataKey].length>0) 
          //3. selectData[basicData]     ==> เป็น  {}

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
          <select  style={{padding:"0",margin:"0",height:"100%"}}
            type="select"
            ref={rAv[tpKey].ref}
            value={rAv[tpKey].value}
            onChange={e=>{
              if(!tableTemplate[tpKey].unchangeable){
                changeInputState({location:rAv[tpKey].location,value:e.target.value})
              }
            }}
            onKeyDown={e=>{
              goToNextRefInTable(e,rAv[tpKey],tpKey,tableTemplate[tpKey],idx,length)
            }}
            disabled={tableTemplate[tpKey].disabled}
            autoFocus={tableTemplate[tpKey].autoFocus}
          >  
              <option value="" hidden>เลือก...</option>
              {renderSelectCondition()}
          </select>
          )
        }  
    }
    
    return(
    <div  className="bd-lightGray"
          style={{width:"95vw",height:"100%",overflow:"scroll",
                 marginTop:"2rem",marginBottom:"2rem"}}>
    
        {/*track*/}
        <div style={{width:"120%",position:"relative",height:"100%"}}>
    
          {/*table head*/}
          <div style={{display:"grid",
                       gridTemplateColumns:showTable.gridCol,
                       gridAutoRows:"minmax(2.7rem,auto)",
                       position:"sticky",top:"0",     
                }}
          >
            {objKeys.map((i,index)=>{

              return(
              tableTemplate[i].showCol
              ?<div key={index}
                    style={{
                      width:`${tableTemplate[i].width}px`,
                      padding:"0.3rem",
                      display:"flex",
                      alginItems:"center",
                      justifyContent:"space-around",
                      backgroundColor:"rgb(107,138,81)"
                    }} 
                >
                  {
                    tableTemplate[i].showColHead
                    ?index==0
                        ?<div style={{display:"flex"}}>
                          <div style={{height:"100%"}}>
                            <FaPlusSquare style={{fontSize:"1.4rem",margin:"auto"}}
                              onClick={()=>{
                                if(selectRow){
                                  lDt.splice(selectRow.index+1,0,bDt[0])
                                  upDateLoadData()
    
                                }else{
                                  lDt.splice(0,0,bDt[0])
                                  upDateLoadData()
                                }
                              }}
                            />
                          </div>
                          {
                          selectRow
                          ?<div style={{height:"100%"}}>
                            <FaMinusSquare style={{fontSize:"1.4rem",margin:"auto"}}
                              onClick={()=>{
                                
                                lDt.splice(selectRow.index,1)
                                upDateLoadData()
                                
                              }}
                            />
                          </div>
                          :null
                            }
                        </div>
                        :<p
                           onClick={e=>{
                            let temp=tableTemplate[i]
                            let tempBool=tableTemplate[i].showColHead
                            temp={...temp,showColHead:!tempBool}
                            setTableTemplate({...tableTemplate,[i]:temp})
                           }}
                         >{tableTemplate[i].lb}</p>
                    :
                    
                    <div className="flex-center-center flex-no-wrap">
                        <MdClose 
                            className="md-icon"
                            onClick={e=>{
                              
                              let temp=tableTemplate[i]
                              let tempBool=tableTemplate[i].showColHead
                              temp={...temp,showColHead:!tempBool}
                              setTableTemplate({...tableTemplate,[i]:temp})
                            
                            }}
                        />
                      
                        <div className="flex-center-center flex-no-wrap"
                            style={{
                                width:"300px",
                                height:"60px",
                                backgroundColor:"#4b6d62",
                                borderRadius:"15px",
                                boxShadow:"5px 5px 10px",
                                position:"fixed",
                                top:`10px`,
                                left:`10px`,
                                zIndex:100,
                            }}    
                        >  
                          
                          <input 
                            className="xc8"
                            type="range" min="10" max="1000" 
                            value={tableTemplate[i].width}
                            onChange={e=>{
                                let temp=tableTemplate[i]
                                temp={...temp,width:e.target.value}
                                setTableTemplate({...tableTemplate,[i]:temp})
                                
                              }} 
                          />
                        
                        </div>
    
                  </div>                   
                    
                    
                  }
                </div>
              :null
            )})} 
          </div>       

          {/*table body*/}

          {
            rAv.map((i,index1)=>
            
            <div key={index1}
                style={{
                  display:"grid",
                  gridTemplateColumns:showTable.gridCol,
                  gridAutoRows:"minmax(2.7rem,auto)",
                  zIndex:"-2",
                  backgroundColor: selectRow?index1==selectRow.index?"red":null :null
                }}
                onClick={e=>{
                  setSelectRow({...i,index:index1})
                }}
            >
               {objKeys.map((j,index2)=>{
                   return(
                    tableTemplate[j].showCol
                    ?<div key={index2}
                          style={{
                            display:"flex",
                            alginItems:"center",
                            justifyContent:"space-around",
                            width:`${tableTemplate[j].width}px`
                          }} 
                    >
                      {renderSingleInput({rAv:rAv[index1],
                            lDt:lDt[index1],tpKey:j,idx:index1,
                            length:rAv.length})
                      }
                    </div>
                    :null
                   )
               })}
            </div>
           
            )
           }
           {/*
            rAv.map((i,index1)=>
            
              <div key={index1}
                   style={{
                     display:"grid",
                     gridTemplateColumns:showTable.gridCol,
                     gridAutoRows:"minmax(2.7rem,auto)",
                     zIndex:"-2",
                     backgroundColor: selectRow?index1==selectRow.index?"red":null :null
                   }}
                   onClick={e=>{
                     setSelectRow({...i,index:index1})
                   }}
              >  
              {
                objKeys.map((j,index2)=>
                  <div key={index2}
                       style={{
                         display:"flex",
                         alignItems:"center",
                         justifyContent:"center",
                         width:`${tableTemplate[j].width}px`,
                        }}
                  >
                  {renderSingleInput({rAv:rAv[index1],
                            lDt:lDt[index1],tpKey:j,idx:index1,
                            length:rAv.length})}
                  </div>
                )
              }
              </div>
            )
           */
           }  

          {/*table footer*/}
          
          {
            sumAmount
            ? <div 
                  className="TableGrid-body" 
                  style={{display:"grid",
                      gridTemplateColumns:showTable.gridCol,
                      gridAutoRows:"minmax(2.7rem,auto)",
                  }}
              >    
                {objKeys.map((k,index3)=>
                    tableTemplate[k].showCol
                    ?<div 
                        key={index3}
                        style={{
                            textAlign:"left",
                            width:`${tableTemplate[k].width}px`,
                            backgroundColor:"#2184A0"
                        }}
                    >
                      <p>{numberWithCommas(sumAmount[k])}</p>
                    </div>
                    :null
                )}
            </div>
            :null
          }            
        </div>
      </div>
      )
}


export default renderFormTable










