import React from 'react';

import tableUtil from './tableUtil'
import renderTable from  './renderTable'
import renderTableSetting from './renderTableSetting'

//=====================
const {tableResize}=tableUtil

//=================================
function Table({
    colorHead,
    tableTemplate,setTableTemplate,
    filterData,setFilterData,
    editData,setEditData,
    saveTableTemplateFunc,
    isSubTable
}) {

if(isSubTable){
    //console.log('subTable')
} 
else {
    //console.log('table')
}

const objKeys = Object.keys(tableTemplate);
let [sumAmount,setSumAmount]=React.useState(null)

const [showTableSetting,setShowTableSetting]=React.useState(false)

//=================================
//=============================
React.useEffect(()=>{

    if(filterData&&tableTemplate){
        const objKeys = Object.keys(tableTemplate);
        
        let newSum={}

        let showSum=false

        objKeys.map(h=>{
            if(tableTemplate[h].showSum){
                newSum={...newSum,[h]:0}
                showSum=true
            }
        })
       
        filterData.map((i,idx)=>{
            
            objKeys.map(j=>{  
                if(tableTemplate[j].showSum){
                    const updateSum=newSum[j]+parseInt(i[j]*10000)

                    if(idx==filterData.length-1){
                        newSum={...newSum, [j]:updateSum/10000 }
                    }
                    else{
                        newSum={...newSum, [j]:updateSum }
                    }
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
    gridCol:"",
})
//=================================
React.useEffect(()=>{
    tableResize({tableTemplate,showTable,setShowTable})
},[tableTemplate])
//==========================
return(
    <div className="w-100 h-100" style={{position:"relative"}}> 
        {renderTable({
          colorHead,
          tableTemplate,setTableTemplate,
          filterData,setFilterData,
          editData,setEditData,
          showTable,setShowTable,
          sumAmount,
          setShowTableSetting,
          saveTableTemplateFunc,
          isSubTable,
          })
        }
        {
        tableTemplate
        ?showTableSetting
            ?renderTableSetting({
                setShowTableSetting,
                tableTemplate,
                setTableTemplate,
            })
            :null
        :null
        }
    </div>

)
}

Table.defaultProps={
    colorHead:"#92A8D1",
    tableTemplate:{},
    setTableTemplate:()=>{},
    filterData:[],
    setFilterData:()=>{},
    editData:null,
    setEditData:()=>{},
    saveTableTemplateFunc:()=>{},
    isSubTable:false

}

export default Table;
