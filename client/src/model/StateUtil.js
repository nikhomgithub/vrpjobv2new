//===============
import React from 'react';
//===============================
const dateNow=()=>{
  let temp=new Date()
  temp=temp.toISOString()
  temp=temp.substring(0,10)
  //temp=`${temp}T00:00:00.000Z`
  return temp
}  
//===============================
const genBlankState=({template})=>{
  //console.log('genBlankState')
  let tempBlankObj={}
  let tempRefObj={}

  const genFunction=({tPt,stObj,refObj})=>{

        const arrayTemplate=Object.keys(tPt)
        arrayTemplate.map((tpKey,tpIdx)=>{  
              const {stType,valPattern,
                      stChildren,stDefault}=tPt[tpKey]
              if(stType=="object"){
                stObj[tpKey]={}
                refObj[tpKey]={}
                genFunction({
                  tPt:stChildren,
                  stObj:stObj[tpKey],
                  refObj:refObj[tpKey]
                })
              }
              
              else if(stType=="arrayObject"){
                stObj[tpKey]=[{}]
                refObj[tpKey]=[{}]
                genFunction({
                  tPt:stChildren,
                  stObj:stObj[tpKey][0],
                  refObj:refObj[tpKey][0]
                })
              }

              else if(stType=="file"){
                refObj[tpKey]=React.createRef()
                if(stDefault){
                  stObj[tpKey]=stDefault 
                }
                else{
                  stObj[tpKey]=null
                }
              }
              
              else if(stType=="array"){//"arrayString"
                  refObj[tpKey]=[React.createRef()]
                  if(stDefault){
                    stObj[tpKey]=stDefault 
                  }
                  else{
                    stObj[tpKey]=[""]
                  }
              }
              else if(stType=="number"){
                if(stDefault){
                  stObj[tpKey]=stDefault 
                }
                else{
                  stObj[tpKey]=0
                }
                refObj[tpKey]=React.createRef()     
              }
              else { //"date","number","string"
                if(stDefault){
                  stObj[tpKey]=stDefault 
                }
                else{
                  stObj[tpKey]=""
                }  
                refObj[tpKey]=React.createRef()          
                //}
              }  
        })
  }

  try{
    genFunction({
      tPt:template,
      stObj:tempBlankObj,
      refObj:tempRefObj
    })
    return {
      state:tempBlankObj,
      ref:tempRefObj
    }  
  }
  catch (error){
    //console.log(error)
    return null
  }
}
//====================================
//====================================

//this function is used to make sure that 
//editData to send to edit form have every filed
//at lease =""
//we care for those type in mongoDb = number
//but when we send "" => it will be null such as customerId=null
const combineLoadDataBlankState=({template,loadData})=>{
  const blankState=genBlankState({template})

  let tempCombineObj={}
  //let tempRefObj={}

  const genFunction=({tPt,stObj,lDt,bDt})=>{

        const arrayTemplate=Object.keys(tPt)
        arrayTemplate.map((tpKey,tpIdx)=>{  

                const {stType,valPattern,
                       stChildren,stDefault}=tPt[tpKey]
                if(stType=="object"){
                  stObj[tpKey]={}
                  genFunction({
                    tPt:stChildren,
                    stObj:stObj[tpKey],
                    lDt:lDt[tpKey],
                    bDt:bDt[tpKey]
                  })
                }
                
                else if(stType=="arrayObject"){
                  let temp=[]

                  if(!lDt[tpKey]){
                    stObj[tpKey]=bDt[tpKey]
                  }
                  else if(lDt[tpKey].length==0){
                    stObj[tpKey]=bDt[tpKey]
                  }
                  else {
                                  
                      lDt[tpKey].map(i=>{
                        temp=[...temp,{}]
                      })
                      stObj[tpKey]=temp

                      lDt[tpKey].map((i,idx)=>{
                        genFunction({
                          tPt:stChildren,
                          stObj:stObj[tpKey][idx],
                          lDt:lDt[tpKey][idx],
                          bDt:bDt[tpKey][0]
                        })
                      })

                  }
                }

                else if(stType=="file"){
                  if(!lDt[tpKey]){
                      if(stDefault){ stObj[tpKey]=stDefault }
                      else{ stObj[tpKey]=null }
                  }
                  else{
                      stObj[tpKey]=lDt[tpKey]
                  }
                }
                
                else if(stType=="array"){//"arrayString"
                  if(!lDt[tpKey]){
                      if(stDefault){ stObj[tpKey]=stDefault }
                      else{ stObj[tpKey]=[""] }
                  }
                  else if(lDt[tpKey].length==0){
                      if(stDefault){ stObj[tpKey]=stDefault }
                      else{ stObj[tpKey]=[""] }
                  }
                  else{
                      stObj[tpKey]=lDt[tpKey]
                  }
                }
                else if(stType=="boolean"){
                  if(!lDt[tpKey]){
                      if(lDt[tpKey]==false){
                        stObj[tpKey]=false
                      }
                      else{
                        if(stDefault){
                          stObj[tpKey]=stDefault
                        }
                        else{
                          stObj[tpKey]=false
                        }
                      }
                  }
                  else{
                    stObj[tpKey]=lDt[tpKey]
                  }

                }
                else if(stType=="number"){
                  const temp= lDt[tpKey]
                  if(!temp){
                    if(stDefault){ 
                      stObj[tpKey]=stDefault 
                    }
                    else{ 
                      stObj[tpKey]=0
                    }
                  }
                  else {
                    stObj[tpKey]=lDt[tpKey]
                  }
                }
                else { //if(stType=="string","date","number")
                  if(!lDt[tpKey]){
                      if(stDefault){ 
                        stObj[tpKey]=stDefault 
                      }
                      else{ 
                        stObj[tpKey]="" 
                      }
                  }
                  else {
                      stObj[tpKey]=lDt[tpKey]
                  }

                }  
        })
  }

  try{
    genFunction({
      tPt:template,
      stObj:tempCombineObj,
      lDt:loadData,
      bDt:blankState.state
    })
    return tempCombineObj
      
  }
  catch (error){
    //console.log(error)
    return null
  }
}
//====================================
//====================================

const genRefAndValue=({template,FData})=>{
  let tempObj={}
  let preLocation=[]
  const genFunction=({tPt,fDt,location,obj})=>{

    let arrayTemplate=Object.keys(tPt)

    arrayTemplate.map((tpKey,tpIdx)=>{  
      
      const {templateType,subFormTemplate,
             ref,nextRef,first,last,outSideRef}=tPt[tpKey]
      
      if(templateType=="object") {
        
        obj[tpKey]={}
        genFunction(
          { tPt:subFormTemplate,
            fDt:fDt[tpKey],
            location:[...location,tpKey], 
            obj:obj[tpKey]
          })
      
      }
      else if(templateType=="array"){
        
        let newArray=[]
        fDt[tpKey].map((i,idx)=>{
          const thisLocation=[...location,tpKey,idx] 
          const newObj={value:i, 
            ref:React.createRef(),
            location:thisLocation
           }
           newArray=[...newArray,newObj]
           if(idx==0){
            let temp=tempObj
            preLocation.map(i=>{ temp=temp[i] })
            temp.nextRef=thisLocation
           }
           else{
             newArray[idx-1].nextRef=thisLocation
           }
           preLocation=thisLocation
          
        })
        obj[tpKey]=newArray 
        
      } 
      else if((templateType=="arrayObject")||(templateType=="arrayObjectInTable")){
        
        obj[tpKey]=[]
       
        for (let i=0;i<fDt[tpKey].length;i++){
          obj[tpKey]=[...obj[tpKey],{}]
        }

        fDt[tpKey].map((i,idx)=>{            
            genFunction(
            { tPt:subFormTemplate,
              fDt:i,
              location:[...location,tpKey,idx],
              obj:obj[tpKey][idx] 
            })  
        })
        
      } 
      else if(templateType=="icon"){

      } 
      else { //"date","number","string"
        const thisLocation=[...location,tpKey]  
        const newObj={value:fDt[tpKey], 
                      ref:React.createRef(),
                      location: thisLocation
                     }
        
        obj[tpKey]=newObj 
        let temp=tempObj
        preLocation.map(i=>{
          temp=temp[i]
        })
        temp.nextRef=thisLocation
        preLocation=thisLocation      
      }
    
    })    
  }
    genFunction({
      tPt:template,
      fDt:FData,
      location:[],
      obj:tempObj
    })
    
    let temp=tempObj
    preLocation.map(i=>{
      temp=temp[i]
    })
    temp.nextRef=null

    return tempObj 
}
//======================
const revRefAndValue=({template,refAndValue})=>{
  let tempObj={}
  
  const genFunction=({tPt,rAv,obj})=>{
    let arrayTemplate=Object.keys(tPt)

    arrayTemplate.map((tpKey,tpIdx)=>{ 
      const {templateType,subFormTemplate,ref,
             nextRef,first,last,outSideRef}=tPt[tpKey]

      if(templateType=="object"){
        
        obj[tpKey]={}
        genFunction({
          tPt:subFormTemplate,
          rAv:rAv[tpKey],
          obj:obj[tpKey]
        })
        
      }
      else if(templateType=="array"){
        
        let temp=[]
        rAv[tpKey].map(i=>{
          temp=[...temp,i.value]
        })
        obj[tpKey]=temp
        
      }
      else if((templateType=="arrayObject")||(templateType=="arrayObjectInTable")){
        
        obj[tpKey]=[]
       
        for (let i=0;i<rAv[tpKey].length;i++){
          obj[tpKey]=[...obj[tpKey],{}]
        }


        rAv[tpKey].map((i,idx)=>{            
            genFunction(
            { tPt:subFormTemplate,
              rAv:rAv[tpKey][idx],
              obj:obj[tpKey][idx] 
            })  
        })
        
      }
      else if(templateType=="icon"){
        
      }
      else{ //"date","string","number"
        obj[tpKey]=rAv[tpKey].value
      }
    })  
  }

  genFunction({
    tPt:template,
    rAv:refAndValue,
    obj:tempObj
  })
  return tempObj
}
//======================
const findEmptyArrayInData=(tPt,lDt,bDt,setEditData)=>{

  let dataIsChange=false

  Object.keys(tPt).map(i=>{

      if(tPt[i].stType=="array"){
          if(Array.isArray(lDt[i])){
              if(lDt[i].length==0){
                  //console.log(i)
                  lDt[i]=bDt[i]

                  dataIsChange=true
              }
          }
      }
      if(tPt[i].stType=="arrayObject"){
          if(Array.isArray(lDt[i])){
              if(lDt[i].length==0){
                  //console.log(i)
                  lDt[i]=bDt[i]
                  dataIsChange=true
              }
              else{
                  if(tPt[i].stChildren){
                      findEmptyArrayInData(tPt[i].stChildren,lDt[i],bDt[i])
                  }
              }
          }
      }

  })
  if(dataIsChange){
    setEditData(lDt)
  }
}
//======================
const convertFilterDataToGraphData=({template,
      filterData,inputState,totalSwapPage})=>{
  
  //console.log('convertFitlerDataToGraphData')
  if(totalSwapPage<3){return null}
  if(!filterData){return null}
  
  const arrayTemplate=Object.keys(template)
  
  let arrayTemplateDetail
  let arrayTemplateDetailNewName
  let arrayToShowDetailInputState=[]

  if(template["detail"]){
    arrayTemplateDetail=Object.keys(template["detail"].stChildren)
    arrayTemplateDetailNewName=arrayTemplateDetail.map(k=>`detail_${k}`)

    arrayTemplateDetailNewName.map((tpKey,idx)=>{
      if(inputState[tpKey].toCheck){
          //console.log(`toCheck = true ${tpKey}`)
          arrayToShowDetailInputState=[...arrayToShowDetailInputState,tpKey]
      }
    })
  }

  //========================
  const valBasic= ({pttn,str})=>{
    return new RegExp(pttn).test(str)
  }
  //=========================
  const genCommonObject=(i)=>{
          let commonObject={}

          arrayTemplate.map((tpKey,idx)=>{
              if(template[tpKey].stType=="string"||template[tpKey].stType=="date") {
                  if(i[tpKey]){
                    commonObject[tpKey]=i[tpKey]
                  }
                  else{
                    commonObject[tpKey]=""
                  }
              }
              if(template[tpKey].stType=="number") {
                  if(i[tpKey]){
                    commonObject[tpKey]=i[tpKey]
                  }
                  else{
                    commonObject[tpKey]=0
                  }
              }
          })
      return commonObject    
  }
  //==========================

  let tempAllDetail=[]
  let tempNoDetail=[]

  filterData.map(i=>{
    
    if(template["detail"]){

          let commonObject=genCommonObject(i)
          tempNoDetail=[...tempNoDetail,commonObject]
          
          let detailObject = {...commonObject}
          
          i["detail"].map(k=>{
                  
                  arrayTemplateDetail.map((tpKey2,idx2)=>{
                      const newTpKey2=arrayTemplateDetailNewName[idx2]

                      if(template["detail"].stChildren[tpKey2].stType=="string"||
                        template["detail"].stChildren[tpKey2].stType=="date"){

                            if(k[tpKey2]){
                              detailObject={...detailObject,[newTpKey2]:k[tpKey2]}
                            }
                            else{
                              detailObject={...detailObject,[newTpKey2]:""}
                            }
                      }
                      if(template["detail"].stChildren[tpKey2].stType=="number"){

                            if(k[tpKey2]){
                              detailObject={...detailObject,[newTpKey2]:k[tpKey2]}
                            }
                            else{
                              detailObject={...detailObject,[newTpKey2]:0}
                            }
                      }

                  })

              tempAllDetail=[...tempAllDetail,detailObject]

          })
    

      }
  })
  //===========================
  
  let tempWiDetail=[]
  tempAllDetail.map(i=>{
    let isPassRegEx=false

    arrayToShowDetailInputState.map((tpKey,idx)=>{
      
        const dataToCheck=i[tpKey]
        const min=inputState[tpKey].min
        const max=inputState[tpKey].max
        const value=inputState[tpKey].value

        if(min&&max){
          if((dataToCheck>min)&&(dataToCheck<max)){
            if(!isPassRegEx){
              isPassRegEx=true
            }
          }
        }
        else if(min){
          if(dataToCheck>min){
            isPassRegEx=true
          }
        }
        else if(max){
          if(dataToCheck<max){
            isPassRegEx=true
          }
        } 
        if(value){
          if(valBasic({pttn:value,str:dataToCheck})){
            isPassRegEx=true
          }
        }

    })

    if(isPassRegEx){
      tempWiDetail=[...tempWiDetail,i]
    }
  })
  

  return {noDetail:tempNoDetail,wiDetail:tempWiDetail,allDetail:tempAllDetail}
}
//======================
const StateUtil={dateNow,combineLoadDataBlankState,
    genBlankState,genRefAndValue,
    revRefAndValue,findEmptyArrayInData,
    convertFilterDataToGraphData
  }

export default StateUtil
