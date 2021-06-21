import React from 'react';
import axios from 'axios';

import testTemplate from './testTemplate'
//===============================
//import renderModalError from './render/renderModalError'
import ModalConfirm from '../ModalConfirm'
import Tree from './Tree'

const {groupState,testData}=testTemplate

function AppTree() {

console.log('AppTree')

const [loadData,setLoadData]=React.useState(testData)

const [showAdd,setShowAdd]=React.useState(false)
const [showEdit,setShowEdit]=React.useState(false)
const [showModalConfirm,setShowModalConfirm]=React.useState(false)
const [editData,setEditData]=React.useState(null)
const [editGroup,setEditGroup]=React.useState(null)
const [allDeleteId,setAllDeleteId]=React.useState(null)

React.useEffect(()=>{
  console.log('editGroup')
  console.log(editGroup)
},[editGroup])
React.useEffect(()=>{
  console.log('allDeleteId')
  console.log(allDeleteId)
},[allDeleteId])

const submitFunction=()=>{
  setShowModalConfirm(false)
}

return(
<div className="bgc-lightGray" style={{height:"100%"}}>
  {
    <Tree
      loadData={loadData}
      editData={editData}
      setEditGroup={setEditGroup}
      setAllDeleteId={setAllDeleteId}
      groupState={groupState}
      
      setShowAdd={setShowAdd}
      setShowEdit={setShowEdit}
      setShowModalConfirm={setShowModalConfirm}
    />
  }
  {
    showModalConfirm
    ?<ModalConfirm
      setShow={setShowModalConfirm}
      submitFunction={submitFunction}
     />
    :null
  }
  <div style={{position:"fixed",top:"0",right:"0"}}>
    <button
      onClick={e=>{setShowModalConfirm(true)}}
    > Delete Data
    </button>

    <button
      onClick={e=>setEditData({groupId:4,groupName:'pana'})}
    > Change selectGroupObject</button>
  </div>
</div>
)
}
export default AppTree;
