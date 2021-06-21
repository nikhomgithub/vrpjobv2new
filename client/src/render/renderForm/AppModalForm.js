import React from 'react';
import axios from 'axios';

import ModalForm from './ModalForm'
import testTemplate from './testTemplate'
//import testTemplateGroupComponent from './testTemplateGroupComponent'


//===============================
import renderModalError from '../renderModalError'

import { TrendingUpRounded } from '@material-ui/icons';

//const {groupForm,groupState,groupData}=testTemplateGroupComponent

function AppModalForm() {

console.log('AppModalForm')

const [showAdd,setShowAdd]=React.useState(false)
const [showEdit,setShowEdit]=React.useState(false)
const [showModalError,setShowModalError]=React.useState(false)

React.useEffect(()=>{
  console.log(`showAdd = ${showAdd}`)
},[showAdd])

const basicData={
  title:["mr","ms"],
  unit:["pcs","dozen"]
}

let [iconActionData,setIconActionData]=React.useState(null)
let [iconActionDataDetail,setIconActionDataDetail]=React.useState(null)

const iconAction1=(param)=>{
  if(param){
    console.log('iconAction')
    const temp ={groupId:1,groupName:"Drink"}
    setIconActionData(temp)
  }
}

const iconAction2=(param)=>{
  if(param){
    console.log('iconAction2')

    const temp= {
      id:1,
      barcode:1,
      name:"poy",
      groupId:11,
      groupName:"G11",
      unit:"pcs",
      price:100,
      quantity:1,
      result:100,
      remark:"k asd fgh",
      isRawMat:true,
    }
    setIconActionDataDetail(temp)
  }
}

const [editData,setEditData]=React.useState({
  id:1,
  date:"2021-04-30",
  title:"mr",
  name:"Anna",
  password:"anna",
  groupId:1,
  groupName:"main",
  remark:"abcd",
  isRawMat:true,
  phone:["1234"],
  address:[{number:1,tambon:"a"},{number:2,tambon:"b"}],
  mainaddress:{number:1,tambon:"c"},

  total:300,
  reduction:50,
  grandTotal:250,

  detail:[
    {id:1,barcode:1,name:"abc",groupId:1,groupName:"test",
     unit:"pcs",price:100,quantity:1,result:100,remark:"",isRawMat:false},
    {id:2,barcode:2,name:"def",groupId:1,groupName:"test",
     unit:"pcs",price:100,quantity:2,result:200,remark:"",isRawMat:false},
  ]
})

const submitFunction=(formInputState)=>{
    console.log(`submitFuctionOption ModalForm `)
    console.log(formInputState)
    setShowEdit(false)

    setShowModalError(true)
    
    const submitFunc=()=>{}

    submitFunc({
        url:'',
        stateTemplate:testTemplate.testState,
        inputState:formInputState,
        setShow:setShowEdit,
        setShowModalError,
        clearForm:null,
        actionAfterSuccess:null, //we add actionAfterSuccess to such as update localStorage or reload 
        useGenFD:TrendingUpRounded //we use if(useGenFD) instad of if(stateTemplate) to decide to use genFD or not in SubmitFunc
    })
  
  }

const calculation=(formInputState)=>{
  let tempDetail=[]
  let tempTotal=0
  formInputState.detail.map(i=>{
    const tempResult= i.quantity*i.price
    const temp={...i,["result"]:tempResult}
    tempDetail=[...tempDetail,temp]
    tempTotal=tempTotal+tempResult
  })

  let tempGrandTotal = 0
  if(formInputState.reduction>0){
    tempGrandTotal=tempTotal-formInputState.reduction
  }
  else {
    tempGrandTotal=tempTotal
  }
  
  const tempFormInputState={...formInputState,
    ["total"]:tempTotal,
    ["grandTotal"]:tempGrandTotal,
    ["detail"]:tempDetail
  }
  return tempFormInputState
}

return(
<div className="bgc-lightGray" style={{height:"100%"}}>

  <button onClick={e=>setShowAdd(true)}>
    Add Form
  </button>
  <button onClick={e=>setShowEdit(true)}>
    Edit Form
  </button>
  
  {
  showAdd
  ?<ModalForm
    lb={"add form"}
    formTemplate={testTemplate.testForm}
    stateTemplate={testTemplate.testState}
    loadData={null}
    selectData={{basicData:basicData}}
    setShow={setShowAdd}
    iconAction={[iconAction1,iconAction2]}
    iconActionData={iconActionData}
    iconActionDataDetail={iconActionDataDetail}
    detailTableTemplate={testTemplate.productDetailTableTemplate}
    calculation={calculation}
    useGenFD={true}
    submitFunction={submitFunction}
    keyName={null}
    keyName={["photoUrl1","photoUrl2"]}
  />
  :null
  }
  {
  showEdit
  ?<ModalForm
    lb={"edit form"}
    formTemplate={testTemplate.testForm}
    stateTemplate={testTemplate.testState}
    loadData={editData}
    selectData={{basicData:basicData}}
    setShow={setShowEdit}
    iconAction={[iconAction1,iconAction2]}
    iconActionData={iconActionData}
    iconActionDataDetail={iconActionDataDetail}
    detailTableTemplate={testTemplate.productDetailTableTemplate}
    calculation={calculation}
    useGenFD={true}
    submitFunction={submitFunction}
    keyName={null}
    keyName={["photoUrl1","photoUrl2"]}
  />
  :null
  }
  { showModalError 
    ?renderModalError({show:showModalError,setShow:setShowModalError})
    :null
  }
</div>
)
}
export default AppModalForm;


//keyName={["photoUrl1","photoUrl2"]}
