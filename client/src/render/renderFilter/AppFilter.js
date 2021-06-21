import React from 'react';

//===============================
import ModalFilterInput from './ModalFilterInput'
import testTemplate from './testTemplate'

const {partnerFilter,partnerInputState}=testTemplate

function AppFilter() {

console.log('AppFilter')

const [showModalFilter,setShowModalFilter]=React.useState(false)
const [inputState,setInputState]=React.useState(partnerInputState)
const [limitRow,setLimitRow]=React.useState(10)

const [pageNumber,setPageNumber]=React.useState(2)
const [filterOption,setFilterOption]=React.useState(0)
const [reload,setReload]=React.useState(false)
let [sort,setSort]=React.useState({id:1})

React.useEffect(()=>{
  console.log('inputState')
  console.log(inputState)
},[inputState])

React.useEffect(()=>{
  console.log(`reload:${reload},pageNumber:${pageNumber},filterOption:${filterOption}`)
},[reload,pageNumber,filterOption])

return(
<div className="bgc-lightGray" style={{height:"100%"}}>
  <button 
    onClick={e=>setShowModalFilter(true)}>
    Filter
  </button>
  <ModalFilterInput
    title={"aaaa"}
    show={showModalFilter} setShow={setShowModalFilter}
    filterTemplate={partnerFilter}
    inputState={inputState} setInputState={setInputState}
    limitRow={limitRow} setLimitRow={setLimitRow}
    sort={sort} setSort={setSort}
    setPageNumber={setPageNumber} 
    setFilterOption={setFilterOption}
    setReload={setReload}
  />
    
</div>
)
}
export default AppFilter;