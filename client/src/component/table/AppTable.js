import React from 'react';

//===============================
import testTemplate from './testTemplate'
import Table from './Table'

const {testTable,testData}=testTemplate

function AppTable() {

console.log('AppTable')

const [tableTemplate,setTableTemplate] = React.useState(testTable)

const [filterData,setFilterData]=React.useState(testData)

const [editData,setEditData]=React.useState(null)

const saveTableTemplateFunc=(tableTemplate)=>{
  console.log(tableTemplate)
}
return(
<div className="bgc-lightGray" style={{height:"100%"}}>
  
  <Table
    colorHead={["#6B5B95","#34568B"]}
    tableTemplate={tableTemplate}
    setTableTemplate={setTableTemplate}
    filterData={filterData}
    setFilterData={setFilterData}
    editData={editData}
    setEditData={setEditData}
    saveTableTemplateFunc={saveTableTemplateFunc}
    isSubTable={false}
  />
    
</div>
)
}
export default AppTable;