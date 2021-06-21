import React from 'react';
import tableUtil from './tableUtil'
import renderTable from  './renderTable'

import renderTableSetting from './renderTableSetting'
//==========
const {tableResize}=tableUtil
//=================================
function SubTable({
    colorHead,
    tableTemplate,setTableTemplate,
    filterData,setFilterData,
    editData,setEditData,
    showTableSetting,setShowTableSetting,
}) {
    console.log('SubTable')
//================================
let [sumAmount,setSumAmount]=React.useState(null)
//================================
React.useEffect(()=>{
    //console.log('filterData SubTable')
    //console.log(filterData)

    if(filterData){
        const objKeys = Object.keys(tableTemplate);
        
        let newSum={}

        let showSum=false

        objKeys.map(h=>{
            if(tableTemplate[h].showSum){
                newSum={...newSum,[h]:0}
                showSum=true
            }
        })
       
        filterData.map(i=>{
            
            objKeys.map(j=>{  
                if(tableTemplate[j].showSum){
                    newSum={...newSum, [j]:(newSum[j]+(i[j]))}
                }
            })
            
        })
        if(showSum){
            setSumAmount(newSum)
        }
    }

},[filterData])
//=================================
let [showTable,setShowTable]=React.useState({
    width:1200,
    gridCol:""
})

React.useEffect(()=>{
    tableResize({tableTemplate,showTable,setShowTable})
},[tableTemplate])
//==========================
return(
    <div className="w-100 h-100"> 
        {filterData
        ?renderTable({
          colorHead,
          tableTemplate,setTableTemplate,
          filterData,setFilterData,
          editData,setEditData,
          showTable,setShowTable,
          isSubTable:true,
          sumAmount,
          setShow:setShowTableSetting
          })
        :null
        }

        {
        renderTableSetting({
            show:showTableSetting,
            setShow:setShowTableSetting,
            tableSetting:tableTemplate,
            setTableSetting:setTableTemplate,
        })
        }

    </div>

)
}
export default SubTable;
