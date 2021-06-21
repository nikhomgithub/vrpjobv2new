import React from 'react';

import Badge from './Badge'

function AppBadge() {

console.log('AppBadge')

const [badgeState,setBadgetState]=React.useState({
  swapShow:true,swapFunc:()=>{},
  reloadShow:true,reloadFunc:()=>{},
  filterShow:true,filterFunc:()=>{},
  addShow:true,addFunc:()=>{},
  editShow:true,editFunc:()=>{},
  delShow:true,delFunc:()=>{},
  printerShow:true,printerFunc:()=>{}
})

const [pageNumber,setPageNumber]=React.useState(10)
const [limitRow,setLimitRow]=React.useState(10)
const [count,setCount]=React.useState(100)                    

const [filterOption,setFilterOption]=React.useState(0)
const [swapState,setSwapState]=React.useState(0) //swapIcon
const [reloadData,setReloadData]=React.useState(false) //reloadData
const [showFilter,setShowFilter]=React.useState(false) //filterIcon
const [showAdd,setShowAdd]=React.useState(false) //addIcon
const [showEdit,setShowEdit]=React.useState(false) //editIcon
const [showModalConfirm,setShowModalConfirm]=React.useState(false) //delIcon

React.useEffect(()=>{console.log(`swapState:${swapState}`)},[swapState])
React.useEffect(()=>{console.log(`reloadData:${reloadData}`)},[reloadData])
React.useEffect(()=>{console.log(`showFilter:${showFilter}`)},[showFilter])
React.useEffect(()=>{console.log(`showAdd:${showAdd}`)},[showAdd])
React.useEffect(()=>{console.log(`showEdit:${showEdit}`)},[showEdit])
React.useEffect(()=>{console.log(`showModalConfirm:${showModalConfirm}`)},[showModalConfirm])

return(
<div className="bgc-lightGray" style={{height:"100%"}}>
  <Badge
//delIcon
  badgeState={badgeState}
  pageNumber={pageNumber}
  setPageNumber={setPageNumber}
  limitRow={limitRow}
  count={count}                    
  setFilterOption={setFilterOption}

  totalSwapPage={2}
  swapState={swapState}
  setSwapState={setSwapState}

  setReloadData={setReloadData} //reloadIcon
  setShowFilter={setShowFilter} //filterIcon
  setShowAdd={setShowAdd} //addIcon
  setShowEdit={setShowEdit} //editIcon
  setShowModalConfirm={setShowModalConfirm} 
  />
    
</div>
)
}
export default AppBadge;
/*

*/