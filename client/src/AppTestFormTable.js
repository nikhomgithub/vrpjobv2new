
import React from 'react';

import {Route,Switch,Redirect} from 'react-router-dom';

//===============================
import StateUtil from './model/StateUtil'
import tableUtil from './component/table/tableUtil';
import {FaPlusSquare,FaMinusSquare} from 'react-icons/fa'; 
import {MdSearch,MdClose,MdArrowUpward,MdArrowDownward} from 'react-icons/md';

import {MainContext} from './context/MainContext';

import ModalComponent from './render/ModalComponent'

import './App2.css'



function App() {
  const {username,setUsername,
    reloadCheckToken,setReloadCheckToken,
    haveShopToken,setHaveShopToken,
    haveUserToken,setHaveUserToken,
    userName,setUserName
     }=React.useContext(MainContext)

const {genBlankState,genRefAndValue,revRefAndValue,combineLoadDataBlankState}=StateUtil  
const {tableResize} = tableUtil

const patternNumber={}
const patternString={}
const patternBoolean={}
const valBasic=()=>{}


const selectData={
  basicData:{
    unit:["อัน","แผ่น"]
  }
}

const testData ={
  detail:[
    {id:1,barcode:"1",name:"toyota",unit:"ชิ้น",quantity:1,price:100,result:100,isRawMat:true},
    {id:2,barcode:"2",name:"honda",unit:"คัน",quantity:2,price:200,result:400,isRawMat:true},
    {id:3,barcode:"3",name:"suzuki",unit:"อัน",quantity:3,price:100,result:300,isRawMat:true},
    {id:4,barcode:"4",name:"nissan",unit:"ชิ้น",quantity:2,price:200,result:400,isRawMat:true},
  ]
}

const allTestData ={
  detail:[
    {id:1,barcode:"1",name:"toyota",unit:"ชิ้น",price:100,isRawMat:true},
    {id:2,barcode:"2",name:"honda",unit:"คัน",price:200,isRawMat:true},
    {id:3,barcode:"3",name:"suzuki",unit:"อัน",price:100,isRawMat:true},
    {id:4,barcode:"4",name:"nissan",unit:"ชิ้น",price:200,isRawMat:true},
  ]
}


const stateTemplate={
  detail:{stType:"arrayObject",stChildren:{
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    barcode:{stType:"string", validate:valBasic, pattern:patternString},
    name:{stType:"string", validate:valBasic, pattern:patternString},
    unit:{stType:"string", validate:valBasic, pattern:patternString},
    quantity:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    price:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    result:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    isRawMat:{stType:"string", validate:valBasic,  pattern:patternBoolean,  stDefault:true},
  }},
}

const formTemplate={
  detail:{
    lb: "รายละเอียด",
    templateType:"arrayObject",
    cName:"",
    subFormTemplate:{
      icon:{
        templateType:"icon",
        subCName:[60],
        inputType:"icon"
      },
      id:{
        lb:"ไอดี",
        templateType:"number",
        subCName:[100,""],
        inputType:"number",
        placeholder:"",
        aotuFocus:"autoFocus"
      },
      barcode:{
        lb:"บาร์โค้ด",
        templateType:"string",
        subCName:[100,""],
        inputType:"text",
        placeholder:"", 
        nextEnter:{nextKey1:["detail",0,"quantity"],nextKey2:null}
      },
      name:{
        lb:"ชื่อ",
        templateType:"string",
        subCName:[100,""],
        inputType:"text",
        placeholder:"", 
      },
      unit:{
        lb:"หน่วย",
        templateType:"string",
        subCName:[100,""],
        inputType:"select",
        placeholder:"", 
        //selectObj:["นาย","นาง"]
        selectDataKey:"basicData",
        selectObj:'unit'
      },
      quantity:{
        lb:"จำนวย",
        templateType:"string",
        subCName:[100,""],
        inputType:"number",
        placeholder:"", 
        nextEnter:{nextKey1:["detail",1,"barcode"],nextKey2:null}
      },
      price:{
        lb:"ราคา",
        templateType:"number",
        subCName:[100,""],
        inputType:"number",
        placeholder:"", 
      },
      result:{
        lb:"รวม",
        templateType:"number",
        subCName:[100,""],
        inputType:"number",
        placeholder:"", 
        calculation:{method:"multiply",param:["price","quantity"]},
        //disabled:"disabled"
      },
      isRawMat:{
        lb:"เป็นวัตถุดิบ",
        templateType:"boolean",
        subCName:[100,""],
        inputType:"checkbox",
        placeholder:"", 
      }
    }
  }
}     


//===========================================

const changeInputState=({location,value})=>{

  let temp= refAndValue
  location.map(i=>{ temp=temp[i]})
  temp.value=value
  setRefAndValue({...refAndValue})
  let tempRev=revRefAndValue({template:formTemplate,refAndValue})
  setFormInputState({...formInputState,...tempRev})
}

const goToNextRef=(e,rAv,tpKey,tPtTpKey,idx,length)=>{
  //console.log('goToNextRef')
  //console.log('rAv')
  //console.log(rAv)
  //console.log('tpKey')
  //console.log(tPtTpKey)
  //console.log(idx)
  
  if(e.key=="ArrowRight"){  
      
      if(Array.isArray(rAv.nextRef)){
          let temp= refAndValue
          rAv.nextRef.map(i=>{ temp=temp[i]})
          temp.ref.current.focus()
      }
      else{ //out of form to OK button
        //refButtonOK.current.focus()
      }
      
  }

  if(e.key=="Enter"){
    
    if(tPtTpKey.nextEnter){
      //last filed and last line in table
      if((idx==length-1)&&tPtTpKey.nextEnter.nextKey2){

        if(Array.isArray(tPtTpKey.nextEnter.nextKey2)){ //out of table to next ref in form
          let temp= refAndValue
          tPtTpKey.nextEnter.nextKey2.map(i=>{ temp=temp[i]})
          temp.ref.current.focus()
        }
        else{ //out of form to OK button
          //refButtonOK.current.focus()
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

}


const blankData=genBlankState({template:stateTemplate}).state
  //console.log('blankData')
  //console.log(blankData)

const refAndValueBlankData = genRefAndValue({template:formTemplate,FData:blankData})


const [showModalComponent,setShowModalComponent]=React.useState(false)

const [selectTestData,setSelectTestData]=React.useState(null)


let [formInputState,setFormInputState]=React.useState(testData)
React.useEffect(()=>{
  console.log('formInputState')
  console.log(formInputState)

  setRefAndValue(genRefAndValue({template:formTemplate,FData:formInputState}))
  
},[formInputState])


let [refAndValue,setRefAndValue]=React.useState(
  genRefAndValue({template:formTemplate,FData:formInputState})
)

React.useEffect(()=>{
  //console.log('refAndValue')
  //console.log(refAndValue)
},[refAndValue])

const convertFormTemplateToTableTemplate=(formTemplate)=>{
  const temp={}
  const objKeys = Object.keys(formTemplate)
  
  objKeys.map(i=>{
    const {lb,templateType,subCName,inputType,
      placeholder,selectDataKey,selectObj,calculation,
      disabled,autoFocus,nextEnter
    } = formTemplate[i]
    temp[i]={
      lb,
      type:templateType,
      width:subCName[0],
      showCol:true,
      showColHead:true,
      inputType,
      placeholder,
      selectDataKey,
      selectObj,
      calculation,
      disabled,
      autoFocus,
      nextEnter
    }
  })
  return temp
}

let [showTable,setShowTable]=React.useState({
  width:1200,
  gridCol:""
})

const [tableTemplate,setTableTemplate]=React.useState(
  convertFormTemplateToTableTemplate(formTemplate.detail.subFormTemplate)
)

React.useEffect(()=>{
  //console.log('tableTemplate')
  //console.log(tableTemplate)
  tableResize({tableTemplate,showTable,setShowTable})
},[tableTemplate])

//===================================
//===================================
const renderFunction=({tPt,rAv,bDt,rAvbDt,lDt})=>{

const objKeys = Object.keys(tPt.subFormTemplate)


const renderSingleInput=({rAv,lDt,tpKey,idx,length})=>{

    if(tableTemplate[tpKey].inputType=="icon"){
      return(

        <MdSearch style={{fontSize:"1.5rem",margin:"auto"}}
          onClick={e=>{
            setShowModalComponent(true)
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
          changeInputState({location:rAv[tpKey].location,value:e.target.value})
        }}
        onKeyDown={e=>{
          goToNextRef(e,rAv[tpKey],tpKey,tableTemplate[tpKey],idx,length)
        }}
        disabled={tableTemplate[tpKey].isabled}
        autoFocus={tableTemplate[tpKey].autoFocus}
        />
      )

    }
    if(tableTemplate[tpKey].inputType=="number"){
   
      if(tableTemplate[tpKey].calculation){

        let finalValue = rAv[tpKey].value
        const temp= tableTemplate[tpKey].calculation

        const p1=rAv[temp.param[0]].value
        const p2=rAv[temp.param[1]].value

        if(temp.method=="multiply"){
          finalValue = p1*p2
        }
        return(
          <input
          style={{padding:"0",margin:"0",height:"100%"}}
          type="number"
          ref={rAv[tpKey].ref}
          value={finalValue}
          onChange={e=>{
            changeInputState({location:rAv[tpKey].location,value:e.target.value})
          }}
          onKeyDown={e=>{
            goToNextRef(e,rAv[tpKey],tpKey,tableTemplate[tpKey],idx,length)
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
            changeInputState({location:rAv[tpKey].location,value:e.target.value})
          }}
          onKeyDown={e=>{
            goToNextRef(e,rAv[tpKey],tpKey,tableTemplate[tpKey],idx,length)
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
          changeInputState({location:rAv[tpKey].location,value:e.target.checked})
        }}
        onKeyDown={e=>{
          goToNextRef(e,rAv[tpKey],tpKey,tableTemplate[tpKey],idx,length)
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
              if(Array.isArray(selectObj)){
                //console.log('condition 1')
                return selectObj.map((m,index)=>
                <option key={index} value={m}>{m}</option>)
              }
              //เงื่อนไข 2
              else if(Array.isArray(selectData[selectDataKey])){
                //console.log('condition 2')
                return selectData[selectDataKey].map((m,index)=>
                  <option key={index} value={m[selectObj]}>{m[selectObj]}</option>
              )}
              ////เงื่อนไข 3
              else if(selectData[selectDataKey][selectObj]){
                //console.log('condition 3')
                return selectData[selectDataKey][selectObj].map((m,index)=>
                <option key={index} value={m}>{m}</option>)
              }      
            }
            
            return(
            <select  style={{padding:"0",margin:"0",height:"100%"}}
                type="select"
                ref={rAv[tpKey].ref}
                value={rAv[tpKey].value}
                onChange={e=>{
                  changeInputState({location:rAv[tpKey].location,value:e.target.value})
                }}
                onKeyDown={e=>{
                  goToNextRef(e,rAv[tpKey],tpKey,tableTemplate[tpKey],idx,length)
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
<div style={{width:"100%",height:"100%",overflow:"scroll"}}>

    {/*track*/}
    <div style={{width:"150%",position:"relative",height:"100%"}}>

      {/*table head*/}
      <div style={{display:"grid",
                   gridTemplateColumns:showTable.gridCol,
                   gridAutoRows:"minmax(2.7rem,auto)",
                   position:"sticky",top:"0",
                   backgroundColor:"rgb(107,138,81)"
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
                  justifyContent:"space-around"
                }} 
            >
              {
                tableTemplate[i].showColHead
                ?index==0
                    ?<div style={{border:"1px solid black",display:"flex"}}>
                      <div style={{height:"100%"}}>
                        <FaPlusSquare style={{fontSize:"1.4rem",margin:"auto"}}
                          onClick={()=>{
                            if(selectTestData){
                              lDt.splice(selectTestData.index+1,0,bDt[0])
                              upDateLoadData()

                            }else{
                              lDt.splice(0,0,bDt[0])
                              upDateLoadData()
                            }
                          }}
                        />
                      </div>
                      {selectTestData
                      ?<div style={{height:"100%"}}>
                        <FaMinusSquare style={{fontSize:"1.4rem",margin:"auto"}}
                          onClick={()=>{
                            lDt.splice(selectTestData.index,1)
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
                            //handleChange(i,e.target.value)
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
                 backgroundColor: selectTestData?index1==selectTestData.index?"red":null :null
               }}
               onClick={e=>{
                 setSelectTestData({...i,index:index1})
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
                {renderSingleInput({rAv:rAv[index1],lDt:lDt[index1],tpKey:j,idx:index1,length:rAv.length})}


              </div>
            )
          }

          </div>
        )
       }       
    </div>
  </div>
  )
}

//=============================
let globalTemp={...formInputState}  
const upDateLoadData=()=>{
  console.log('globalTemp')
  console.log(globalTemp)
  
  //const temp = genRefAndValue({template:formTemplate,FData:globalTemp})
  //console.log(temp)
   
  setFormInputState({...globalTemp})
}

//=============================
return(
<div className="bgc-lightGray" style={{height:"100%"}}>
  <div className="bd-black" style={{width:"100%",height:"50vh",marginTop:"300px"}}>

  
  {
  renderFunction({
          tPt:formTemplate.detail,
          rAv:refAndValue.detail,
          bDt:blankData.detail,
          rAvbDt:refAndValueBlankData.detail,
          lDt:globalTemp.detail})
  }
  {
    showModalComponent
    ? <ModalComponent 
        funcOK = {()=>{setShowModalComponent(false)}}
        funcCancel ={()=>{setShowModalComponent(false)}}>
          {
            allTestData.detail.map((i,index)=>
            <div key={index} 
              onClick={e=>{
           
              let temp  

              temp = {...selectTestData,...i}
              globalTemp.detail[temp.index]=temp
                
              upDateLoadData()
              
            }}>
              {`${i.name} and ${i.price}`}
            </div>
            )
          }
      </ModalComponent>
    :null
  }
</div>
</div>   
)
}

export default App;



