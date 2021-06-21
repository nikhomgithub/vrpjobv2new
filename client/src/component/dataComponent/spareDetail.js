import React from 'react';

//==========
import SubTable from '../table/SubTable'

//===================
function DetailComponent({
            lb,
            colorHead,
            selectDataIn, 
            detailTableTemplate,
            setDetailTableTemplate
          }) {

//====================
const [filterData,setFilterData]=React.useState(selectDataIn.detail)
const [editData,setEditData]=React.useState(null)
const [showTableSetting,setShowTableSetting]=React.useState(false)

React.useEffect(()=>{
    //Everytime basicData change in context, 
    //data in BasicData also change dynamically
    if(selectDataIn){
        setFilterData(selectDataIn.detail)
    }
},[selectDataIn])

  //======================
return(

    <div className="h-100 w-100">
        
            <div style={{height:"5%",display:"flex",
                         justifyContent:"center",alignItems:"center"
                         }}>                
                  <h5 style={{textAlign:"center",marginRight:"1rem"}}>
                    {lb}
                  </h5>
            </div>
            <div className="w-100" style={{height:`95%`}}>
    
                <SubTable
                    colorHead={colorHead}
                    tableTemplate={detailTableTemplate}
                    setTableTemplate={setDetailTableTemplate}
                    filterData={filterData}
                    setFilterData={setFilterData}
                    editData={editData}
                    setEditData={setEditData}
                
                    showTableSetting={showTableSetting}
                    setShowTableSetting={setShowTableSetting}
                /> 

            </div>  

    </div>

);
}

export default DetailComponent;