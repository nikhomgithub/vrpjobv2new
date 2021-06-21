import axios from 'axios';
//==========================    

const updateTableTemplate=({tableName,template})=>{
  axios.post("/tabletemplate/updatecustom",
    {tableName,template},
    {headers: {'Content-Type': 'application/json',
        'Shopauthorization':localStorage.getItem('shopauthorization'),
        'Userauthorization':localStorage.getItem('userauthorization')
    }}
  )
}
//===========================
const genArrayForFilterAxios=({filterTemplate,inputState})=>{
  let arrayCommand=[]
    filterTemplate.map(i=>{

        if(inputState[i.keyName].toCheck){
          if(i.templateType=="number"){
            const temp ={[i.filterCommand[0]]:
              {$gte:inputState[i.keyName].min,$lte:inputState[i.keyName].max}
            }
            arrayCommand=[...arrayCommand,temp]  
          }
          else if(i.templateType=="arrayNumber"){
            const temp ={[i.filterCommand[0]]:{ $elemMatch:
              {$gte:inputState[i.keyName].min,$lte:inputState[i.keyName].max}
            }}
            arrayCommand=[...arrayCommand,temp]  
          }
          else if(i.templateType=="objectNumber"){
            const temp ={[i.filterCommand[0]]:
              {$gte:inputState[i.keyName].min,$lte:inputState[i.keyName].max}
            }
            arrayCommand=[...arrayCommand,temp]  
          }
          else if(i.templateType=="arrayObjectNumber"){
            
            const temp ={[i.filterCommand[0]]:{$elemMatch:
              {[i.filterCommand[1]]:
                {$gte:inputState[i.keyName].min, 
                  $lte:inputState[i.keyName].max}
              }  
            }}

            arrayCommand=[...arrayCommand,temp] 
          }
          else if(i.templateType=="arrayObjectArrayNumber"){
            const temp ={[i.filterCommand[0]]:{$elemMatch:
              {[i.filterCommand[1]]:{$elemMatch:
                {$gte:inputState[i.keyName].min, 
                  $lte:inputState[i.keyName].max}
              }}  
            }}
            arrayCommand=[...arrayCommand,temp] 
          }
          else if(i.templateType==="boolean"){
            //console.log('foundString')
            const temp ={[i.filterCommand[0]]:inputState[i.keyName].value}
            
            arrayCommand=[...arrayCommand,temp]  
          }
          else if( (i.templateType==="string")||(i.templateType==="select") ){
            //console.log('foundString')
            const temp ={[i.filterCommand[0]]:
               {$regex:inputState[i.keyName].value.trim().replace(/\s/,"|"),
                $options:'gi' }
            }
            arrayCommand=[...arrayCommand,temp]  
          }
          else if(i.templateType=="arrayString"){
            const temp ={[i.filterCommand[0]]:{$elemMatch:
              {$regex:inputState[i.keyName].value.trim().replace(/\s/,"|"),
               $options:'gi' }
            }}
            arrayCommand=[...arrayCommand,temp]  
          }
          else if(i.templateType=="objectString"){
            const temp ={[i.filterCommand[0]]:
              {$regex:inputState[i.keyName].value.trim().replace(/\s/,"|"),
               $options:'gi' }
            }
            arrayCommand=[...arrayCommand,temp]  
          }
          else if(i.templateType=="arrayObjectString"){
            const temp ={[i.filterCommand[0]]:{$elemMatch:
              {[i.filterCommand[1]]:
                {$regex:inputState[i.keyName].value.trim().replace(/\s/,"|"),
                 $options:'gi' }
              }  
            }}
            arrayCommand=[...arrayCommand,temp] 
          }
          else if(i.templateType=="arrayObjectArrayString"){
            const temp ={[i.filterCommand[0]]:{$elemMatch:
              {[i.filterCommand[1]]:{$elemMatch:
                {$regex:inputState[i.keyName].value.trim().replace(/\s/,"|"),
                 $options:'gi' }
              }}  
            }}
            arrayCommand=[...arrayCommand,temp] 
          }
        }
    })
    return arrayCommand
}

//===========================
const axiGet=async ({
    qCondition,RtAndCt,
    
    filterTemplate,inputState,
    
    setFilterData,
    pageNumber,setCount,sort,limitRow,
    setReload
  })=>{
    
    let arrayCommand=[]
    filterTemplate.map(i=>{

        if(inputState[i.keyName].toCheck){
          if(i.templateType=="number"){
            const temp ={[i.filterCommand[0]]:
              {$gte:inputState[i.keyName].min,$lte:inputState[i.keyName].max}
            }
            arrayCommand=[...arrayCommand,temp]  
          }
          else if(i.templateType=="arrayNumber"){
            const temp ={[i.filterCommand[0]]:{ $elemMatch:
              {$gte:inputState[i.keyName].min,$lte:inputState[i.keyName].max}
            }}
            arrayCommand=[...arrayCommand,temp]  
          }
          else if(i.templateType=="objectNumber"){
            const temp ={[i.filterCommand[0]]:
              {$gte:inputState[i.keyName].min,$lte:inputState[i.keyName].max}
            }
            arrayCommand=[...arrayCommand,temp]  
          }
          else if(i.templateType=="arrayObjectNumber"){
            
            const temp ={[i.filterCommand[0]]:{$elemMatch:
              {[i.filterCommand[1]]:
                {$gte:inputState[i.keyName].min, 
                  $lte:inputState[i.keyName].max}
              }  
            }}

            arrayCommand=[...arrayCommand,temp] 
          }
          else if(i.templateType=="arrayObjectArrayNumber"){
            const temp ={[i.filterCommand[0]]:{$elemMatch:
              {[i.filterCommand[1]]:{$elemMatch:
                {$gte:inputState[i.keyName].min, 
                  $lte:inputState[i.keyName].max}
              }}  
            }}
            arrayCommand=[...arrayCommand,temp] 
          }
          else if(i.templateType==="string"){
            //console.log('foundString')
            const temp ={[i.filterCommand[0]]:
               {$regex:inputState[i.keyName].value.trim().replace(/\s/,"|"),
                $options:'gi' }
            }
            arrayCommand=[...arrayCommand,temp]  
          }
          else if(i.templateType=="arrayString"){
            const temp ={[i.filterCommand[0]]:{$elemMatch:
              {$regex:inputState[i.keyName].value.trim().replace(/\s/,"|"),
               $options:'gi' }
            }}
            arrayCommand=[...arrayCommand,temp]  
          }
          else if(i.templateType=="objectString"){
            const temp ={[i.filterCommand[0]]:
              {$regex:inputState[i.keyName].value.trim().replace(/\s/,"|"),
               $options:'gi' }
            }
            arrayCommand=[...arrayCommand,temp]  
          }
          else if(i.templateType=="arrayObjectString"){
            const temp ={[i.filterCommand[0]]:{$elemMatch:
              {[i.filterCommand[1]]:
                {$regex:inputState[i.keyName].value.trim().replace(/\s/,"|"),
                 $options:'gi' }
              }  
            }}
            arrayCommand=[...arrayCommand,temp] 
          }
          else if(i.templateType=="arrayObjectArrayString"){
            const temp ={[i.filterCommand[0]]:{$elemMatch:
              {[i.filterCommand[1]]:{$elemMatch:
                {$regex:inputState[i.keyName].value.trim().replace(/\s/,"|"),
                 $options:'gi' }
              }}  
            }}
            arrayCommand=[...arrayCommand,temp] 
          }
        }
    })

    try {
        let result 

        if (qCondition=="$and"){
          result = await axios.post(RtAndCt,
                {pageNumber,sort,limitRow,$and:arrayCommand},
                //{query:{$and:arrayCommand}},
                {headers: {'Content-Type': 'application/json',
                'Shopauthorization':localStorage.getItem('shopauthorization'),
                'Userauthorization':localStorage.getItem('userauthorization')
                }}
          )
        }
        else{
            result = await axios.post(RtAndCt,
                {pageNumber,sort,limitRow,$or:arrayCommand},
                //{query:{$or:arrayCommand}},
                {headers: {'Content-Type': 'application/json',
                'Shopauthorization':localStorage.getItem('shopauthorization'),
                'Userauthorization':localStorage.getItem('userauthorization')
                }}
            )
        }

        setFilterData([...result.data.data])
        //setFilterData(result.data.data)
        setCount(result.data.count)
        setReload(false)
    }
    catch (err){
        setFilterData([])
        setReload(false)
    }
}
//======================================
const addFileNameInPhotoUrl=(formInputState)=>{
  let temp1=[]
  if(formInputState.file1){
    for (let i=0;i<formInputState.file1.length;i++){
      temp1=[...temp1,formInputState.file1[i].name]
    }

  }
  if(formInputState.photoUrl1){
    formInputState.photoUrl1=[...formInputState.photoUrl1,...temp1]
  }

  let temp2=[]
  if(formInputState.file2){
    for (let i=0;i<formInputState.file2.length;i++){
      temp2=[...temp2,formInputState.file2[i].name]
    }

  }
  if(formInputState.photoUrl2){
    formInputState.photoUrl2=[...formInputState.photoUrl2,...temp2]
  }
  return formInputState
}

//======================================
//concept : make sure genFD dont leave out any filed

const genFD=({inputState,template})=>{
  const fd=new FormData()

    const genFunction=({iSt,tPt,preFix})=>{
      const arrayTemplate=Object.keys(tPt)
      
      arrayTemplate.map((tpKey,tpIdx)=>{    
        //if(iSt[tpKey]){   do not leave this filed
                const {stType}=tPt[tpKey]

                if(stType=="object"){
                  if(preFix==''){
                    genFunction({ iSt:iSt[tpKey],
                                  tPt:tPt[tpKey].stChildren,
                                  preFix:tpKey})
                  }
                  else{
                    genFunction({ iSt:iSt[tpKey],
                                  tPt:tPt[tpKey].stChildren,
                                  preFix:`${preFix}[${tpKey}]`})
                  }
                }
                else if(stType=="arrayObject"){
                  iSt[tpKey].map((i,ix)=>{
                    if(preFix==''){
                      genFunction({ iSt:i,
                                    tPt:tPt[tpKey].stChildren,
                                    preFix:`${tpKey}[${ix}]`}) 
                    }
                    else{
                      genFunction({ iSt:i,
                                    tPt:tPt[tpKey].stChildren,
                                    preFix:`${preFix}[${tpKey}][${ix}]`})
                    }
                  })
                }else if(stType=="array"){
                  iSt[tpKey].map((st,idx)=>{
                    if(preFix==''){
                      //if(iSt[tpKey][idx]){   do not leave this filed
                        fd.append(`${preFix}${tpKey}[${idx}]`,iSt[tpKey][idx])
                      //}
                    }
                    else{
                      //if(iSt[tpKey][idx]){  do not leave out this field
                        fd.append(`${preFix}[${tpKey}][${idx}]`,iSt[tpKey][idx])
                      //}
                    }
                  })
                }else if(stType=="file"){
                  if(iSt[tpKey]){
                    for(let i=0;i<iSt[tpKey].length;i++){
                      const fileName=`${iSt[tpKey][i].name}`
                      fd.append(`imageUrl`,iSt[tpKey][i],fileName);  
                      //fd.append(adToSt,`${upFolder}${fileName}`)
                    }
                  }
                }
                else{
                  if(preFix==''){
                    //if(iSt[tpKey]){   do not leave this filed
                      fd.append(`${preFix}${tpKey}`,iSt[tpKey])
                    //}
                  }else{
                    //if(iSt[tpKey]){   do not leave this filed
                      fd.append(`${preFix}[${tpKey}]`,iSt[tpKey])
                    //}
                  }
                }
        //}
      })
    }

  //try {
    genFunction({iSt:inputState,tPt:template,preFix:''})
    return fd

}

//==============================
const submitFunc=async ({
    url,
    stateTemplate,
    inputState,
    setShow,
    setShowModalError,
    clearForm,
    actionAfterSuccess,
    useGenFD
})=>{
 
  console.log('inputState submitFunc Before')
  console.log(inputState) 

  //=================================
  //we update photoUrl_ from file_ at this final state before send to server
  //we take file.name from file_ in inputState 
  //and add to photoUrl_ array
  //we allow only photoUrl1, photoUrl2
  if(useGenFD){
    let temp1=[]
    if(inputState.file1){
      for (let i=0;i<inputState.file1.length;i++){
        temp1=[...temp1,inputState.file1[i].name]
      }

    }
    if(inputState.photoUrl1){
      inputState.photoUrl1=[...inputState.photoUrl1,...temp1]
    }

    let temp2=[]
    if(inputState.file2){
      for (let i=0;i<inputState.file2.length;i++){
        temp2=[...temp2,inputState.file2[i].name]
      }

    }
    if(inputState.photoUrl2){
      inputState.photoUrl2=[...inputState.photoUrl2,...temp2]
    }
  }
  //===================================
  let result = true
  //result=valReqBody({stateTemplate,inputState})
  
  let fd
  //we use useGenFD as condition to use genFD or not
  if(useGenFD){
    fd=genFD({inputState,template:stateTemplate})
  }
  else{
    fd=inputState
  }

  if(result)
  {
    try{
      const resultAxios=await axios.post(url,
          fd,
          {headers: {
            'Content-Type': 'application/json',
            'Shopauthorization':localStorage.getItem('shopauthorization'),
            'Userauthorization':localStorage.getItem('userauthorization')
          }}
      )
   
      if(actionAfterSuccess){actionAfterSuccess(resultAxios)}
      if(clearForm){clearForm()}
      
      if(setShow){setShow(false)}
    //}
      }
    catch (error){
      setShowModalError({status:true,msg:error})

    }
  }
  else{
    setShowModalError({status:true,msg:result})
  }
}

//==================================

const genSortStateFromSort=(sort)=>{
  let tempSortKey={
      order1:{toAscending:1, sortName:null},
      order2:{toAscending:1, sortName:null},
      order3:{toAscending:1, sortName:null},
  }
  const sortKey=Object.keys(sort)
  if(sortKey[0]){
      tempSortKey.order1={toAscending:sort[sortKey[0]],sortName:sortKey[0]}
  }
  if(sortKey[1]){
      tempSortKey.order2={toAscending:sort[sortKey[1]],sortName:sortKey[1]}
  }
  if(sortKey[2]){
      tempSortKey.order2={toAscending:sort[sortKey[2]],sortName:sortKey[2]}
  }
  return tempSortKey
}

//==================================
const genSortFromSortState=(sortState)=>{
     //To make this as sort
     //sort={"id":1,"name":-1,"price":1}
     //===============
     //find a unique array of sortState.sortName
     //["name","price","id"]
     let tempUniqueSortName=[]
     let tempState={}
 
     const arraySortStateKey=Object.keys(sortState)
     arraySortStateKey.map(i=>{
       if(sortState[i].sortName!=null){
         tempUniqueSortName=[...tempUniqueSortName,sortState[i].sortName]
       }
     })
 
     tempUniqueSortName=Array.from(new Set(tempUniqueSortName))
 
     //========================
     //To make sort from sortState
     //sort={"id":1,"name":-1,"price":1}
     if(tempUniqueSortName.length>0){
       tempUniqueSortName.map(i=>{     
         for(let j=0;j<arraySortStateKey.length;j++){
           const tempKeyName=arraySortStateKey[j]
           if(i==sortState[tempKeyName].sortName){
             tempState={...tempState,[i]:sortState[tempKeyName].toAscending}
             break;
           }
         }
       })
     }

     return tempState
   }
//==================================

const reloadAndSearch=({
  url,blankData,inputState,
  pageNumber,sort,filterOption,qry,
  setFilterData,setCount,setLastRecordId,
  setEditData,filterTemplate,
  reload,setReload,limitRow,
  //tableName,setTableTemplate
})=>{
  //=========================================
  //=========================================
  //initial reload, click refresh, reload after update,add 
  const filterOption0=()=>{

    axios.post(url,
      {pageNumber,sort,limitRow},
      {headers: {'Content-Type': 'application/json',
          'Shopauthorization':localStorage.getItem('shopauthorization'),
          'Userauthorization':localStorage.getItem('userauthorization')
      }}
    )
    .then(result=>{
      console.log(`filterOption0: ${url}`)
      setReload(false)
      setFilterData(result.data.data)
      setCount(result.data.count)
      setLastRecordId(result.data.lastRecordId)
    })
    .catch(err=>{
      setReload(false)
    })
  }
  //==================================
  //for searh พบทุกเงื่อนไข
  const filterOption1=()=>{

    axiGet({qCondition:"$and",
      RtAndCt:url,
      filterTemplate,
      inputState,
      setFilterData,
      pageNumber,setCount,sort,limitRow,
      setReload
    })
  } 
  //===============================
  //for sear พบบางเงื่อนไข
  const filterOption2=()=>{

    axiGet({qCondition:"$or",
      RtAndCt:url,
      filterTemplate,
      inputState,
      setFilterData,
      pageNumber,setCount,sort,limitRow,
      setReload
    })
  }
  //=============================
  //for display product by group
  const filterOption3=()=>{
    axios.post(url,
      {...qry,pageNumber,sort,limitRow},
      {headers: {'Content-Type': 'application/json',
          'Shopauthorization':localStorage.getItem('shopauthorization'),
          'Userauthorization':localStorage.getItem('userauthorization')
      }}
    )
    .then(result=>{
      console.log(`filterOption3: ${url}`)
      setReload(false)
      setFilterData(result.data.data)
      setCount(result.data.count)
      setEditData(blankData)
    })
    .catch(err=>{
      setReload(false)
    })
  }
  //=============================
  if(pageNumber==1&& filterOption==0 && reload){
    //initial reload / click refresh
    //when click change pageNumber back to 1
    filterOption0()
  }
  else if(filterOption==0){
    //when click change pageNumber
    //console.log('option 0 & change pageNumber')
    filterOption0()
  }
  else if(filterOption==1){
    //filter in "and" condition
    //when click change pageNumber
    //console.log('option 1 & change pageNumber')
    filterOption1()
  }
  else if(filterOption==2){
    //filter in "or" condition
    //When click change pageNumber
    //console.log('option 1 & change pageNumber')
    filterOption2()
  }
  else if(filterOption==3){
    //when click select Group to see product in Group
    //console.log('option 3 & change pageNumber')
    filterOption3()
  }
}
//==================================

const addAndUpdateSubField=(mainField,subField,formInputState)=>{
  let temp=[]
  if(mainField){
      
      if(mainField[subField].length==0){
        console.log('subFile.length==0')
        temp=[formInputState]
      }
      else {
        for (let i=0;i<mainField[subField].length;i++){
    
            if(mainField[subField][i].id==formInputState.id){
                //for edit data by replace with formInputState
                temp=[...temp,formInputState]
            }
            else{
                temp=[...temp,mainField[subField][i]]
                
                //for add formInputState to the last routeAuth Array
                if(i==mainField[subField].length-1){
                    temp=[...temp,formInputState]
                }
            }
        }
      }
  }
  return temp
}
//==================================
const deleteSubField=(mainField,subField,formInputState)=>{
  
  let temp=[]
  
  if(mainField){
      for (let i=0;i<mainField[subField].length;i++){
   
          if(mainField[subField][i].id!=formInputState.id){
              //for edit data by replace with formInputState
              temp=[...temp,mainField[subField][i] ]            
          }  
      }
  }
  
  return temp
  
}
//=========================================
const catchErrorToMessage=(error,setMessage)=>{
  if(!error){return}
  if(!error.response){return}
  if(!error.response.data){return}
  if(!error.response.data.message){return}
  setMessage(error.response.data.message)
}

//==================================
const axiosUtil={axiGet,genFD,submitFunc,
  addFileNameInPhotoUrl,
  genSortFromSortState,genSortStateFromSort,
  reloadAndSearch,genArrayForFilterAxios,
  addAndUpdateSubField,deleteSubField,
  catchErrorToMessage
}

export default axiosUtil
