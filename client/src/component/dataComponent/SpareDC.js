import React from 'react';
import axios from 'axios';
//================
import Table from  '../table/Table'
import renderTableRangeBar from '../table/renderTableRangeBar'

import renderBadge from '../../render/renderBadge/renderBadge'
//==========
import {MainContext} from '../../context/MainContext'
//==========
import GroupComponent from './GroupComponent'
import DetailComponent from './DetailComponent'
import GraphComponent from './GraphComponent'

import ModalForm from '../../render/renderForm/ModalForm'
import StateUtil from '../../model/StateUtil'
import ctUtil from '../../util/ctUtil'

//====================
import ModalConfirm from '../../render/ModalConfirm'
//==================
//==================
function DataComponent({
                lb,
                inRouteName,
                colorHead,
                totalSwapPage,

                inState,
                inFilter,
                inForm,
                inKeyPhoto,
                inIconAction,

                inLimitRow,             
                inInputState,
                inTableTemplateList,
                inDetailTableTemplate,

                inGroupState,
                inGroupForm,
                inRouteGroupName,
                inKeyArray,

                iconActionData,
                iconActionDataDetail,

                selectDataOut,setSelectDataOut,
                canChangeData,calculation,
}) {

//================================

const { basicData,setReloadTableTemplate }=React.useContext(MainContext)
const {convertFilterDataToGraphData}=StateUtil
const {convertTableTemplateObjToArray}=ctUtil

console.log('DataComponent')
//================================
  const [selectGroup,setSelectGroup]=React.useState(null)

//================================
  
  const [showModalConfirm,setShowModalConfirm]=React.useState(false)

  const [showTableSetting,setShowTableSetting]=React.useState(false)
  const [showFilter,setShowFilter]=React.useState(false)
  const [showAdd,setShowAdd]=React.useState(false)
  const [showEdit,setShowEdit]=React.useState(false)
  const [reloadData,setReloadData]=React.useState(true)

  //====================================
  let [editData,setEditData]=React.useState(null)
  let [pageNumber,setPageNumber]=React.useState(1)
  let [count,setCount]=React.useState(0)
  let [lastRecordId,setLastRecordId]=React.useState(0)
  let [filterOption,setFilterOption]=React.useState(0)
  let [swapState,setSwapState]=React.useState(0)
  let [badgeLayoutOption,setBadgeLayoutOption]=React.useState(0)
  let [qry,setQry]=React.useState(null)
  //===============================
  //===============================
  //Clear =========================
  //For renderTableRangeBar
  const [showRange,setShowRange]=React.useState(true)
  const [widthLeft,setWidthLeft]=React.useState(30)
  //===============================
  let [filterData,setFilterData]=React.useState(null)
  let [editDataForDetail,setEditDataForDetail]=React.useState(null)

  //==============================
  React.useEffect(()=>{
    if(filterData&&editData){
      filterData.map(i=>{
          if(i.id==editData.id){
              setEditData(i)
          }
      })
    }
    
        setGraphData(
          convertFilterDataToGraphData({
            template:inState,
            filterData,
            inputState,
            totalSwapPage
          })
        )
    
  },[filterData])

  //===============================
  React.useEffect(()=>{

    if(editData){
      if(editData.detail){
        setEditDataForDetail(editData)
      }
      setSelectDataOut(editData)
    }

    if(canChangeData){
      if(editData){
        setBadgeState({...badgeState,
            editShow:true,delShow:true})
      }
      else{
        setBadgeState({...badgeState,
            editShow:false,delShow:false})
      }
    }
  
  },[editData]) 
  //==================================
  //==================================
  const updateSetting=(totalTableTemplate)=>{

    const url="/tabletemplate/updatecustom"
    const headers={headers: {'Content-Type': 'application/json',
      'Shopauthorization':localStorage.getItem('shopauthorization'),
      'Userauthorization':localStorage.getItem('userauthorization')
    }}
    
    let tempPromise=[]

    inTableTemplateList.map((i,index)=>{
      const temp=axios.post(url,
        { tableName:i.tableName,
          template:convertTableTemplateObjToArray(totalTableTemplate[index])
        },
          headers)
      tempPromise=[...tempPromise,temp]
    })
    Promise.all(tempPromise)
    .then(setReloadTableTemplate(true))

  }
  
  //==================================
  //Badge
  const [badgeState,setBadgeState] =React.useState({
    swapShow:true,
    reloadShow:true,
    settingShow:true,settingFunc:updateSetting,
    filterShow:true,
    addShow:canChangeData?true:false, //addShow:false
    editShow:false,
    delShow:false,
    printerShow:true,
  })
  //====================================
  
  React.useEffect(()=>{

    if(selectGroup){
      if(selectGroup.id>0){
        setQry({groupId:selectGroup.id})
        setPageNumber(1)
        setFilterOption(3)
        setReloadData(true)
      }
    }

  },[selectGroup])
  
  //======================================
  const [editGroup,setEditGroup]=React.useState(null)


  const updateEditGroup=(editData)=>{
    
    if(!editData){return null}
    
    let temp={}

    inKeyArray.map(i=>{
      if(i=="id"){
        temp={...temp,[i]:editData["groupId"]}
      }else{
        temp={...temp,[i]:editData[i]}
      }
    })
    setEditGroup(temp)
    return temp
  }  
  //===========================
  const genTableTemplate=(x)=>{
    if(!inTableTemplateList){return null}
    if(!Array.isArray(inTableTemplateList)){return null}
    if(x>inTableTemplateList.length){return null}
    return inTableTemplateList[x-1].template
  }

  const [tableTemplate1,setTableTemplate1]=React.useState(genTableTemplate(1))
  const [tableTemplate2,setTableTemplate2]=React.useState(genTableTemplate(2))
  const [tableTemplate3,setTableTemplate3]=React.useState(genTableTemplate(3))
  const [tableTemplate4,setTableTemplate4]=React.useState(genTableTemplate(4))
  
  const [totalTableTemplate,setTotalTableTemplate]=React.useState([
    tableTemplate1,tableTemplate2,tableTemplate3,tableTemplate4
  ])

 

  React.useEffect(()=>{
    setTotalTableTemplate([
      tableTemplate1,tableTemplate2,tableTemplate3,tableTemplate4
    ])
  },[tableTemplate1,tableTemplate2,tableTemplate3,tableTemplate4])

    const [inputState,setInputState]=React.useState(inInputState)
  const [limitRow,setLimitRow]=React.useState(inLimitRow)
  //===========================  
//=============================

let [graphData,setGraphData]=React.useState(null)
//{noDetail,wiDetail,allDetail}

//=======================
const actionAfterSuccess=()=>{
  setReloadData(true)
}
//===================
const genUseGenFD=()=>{
  let temp=false
  if(inKeyPhoto){
    if(inKeyPhoto.length>0){
      temp=true
    }
  }
  return temp
}

//===================
let param1={
  isAddForm:true,
  lb:`เพิ่ม${lb[0]}`,
  formTemplate:inForm,
  stateTemplate:inState,
  
  selectData:{basicData},
  loadData:null,//genLoadData()
  show:showAdd,
  setShow:setShowAdd,
  url:`/${inRouteName}/addcustom`,

  keyName:inKeyPhoto,
  iconAction:inIconAction, 
  iconActionData,
  iconActionDataDetail,
  actionAfterSuccess:actionAfterSuccess,//()=>{}
  useGenFD:genUseGenFD(),
  lastRecordId,
  genAutoId:true,
  calculation,
  detailTableTemplate:inDetailTableTemplate

}

let param2={
  isAddForm:false,
  lb:`แก้ไข${lb[0]}`,
  formTemplate:inForm,
  stateTemplate:inState,
  
  selectData:{basicData},
  loadData:editData,
  show:showEdit,
  setShow:setShowEdit,
  url:`/${inRouteName}/updatecustom`,

  keyName:inKeyPhoto,
  iconAction:inIconAction, 
  iconActionData,
  iconActionDataDetail,
  actionAfterSuccess:actionAfterSuccess,//()=>{}
  useGenFD: genUseGenFD(),
  lastRecordId,
  genAutoId:false,
  calculation,
  detailTableTemplate:inDetailTableTemplate

}

//==================================
const renderTable=()=>{
  return(
    <div className="w-100 h-100">
        <div style={{height:"5%"}}>                
            <h5 style={{textAlign:"center"}}>{lb[0]}</h5>
        </div>
        
        <div className="w-100" style={{height:`95%`}}>
            
            <Table
              colorHead={colorHead}

              filterData={filterData} setFilterData={setFilterData}     

              stateTemplate={inState}
              filterTemplate={inFilter}

              tableTemplate={tableTemplate1} setTableTemplate={setTableTemplate1}

              editData={editData} setEditData={setEditData}

              inputState={inputState} setInputState={setInputState}
              pageNumber={pageNumber} setPageNumber={setPageNumber}
              setCount={setCount} setLastRecordId={setLastRecordId}
              url={`/${inRouteName}/getlimit`} //out
              reloadData={reloadData} setReloadData={setReloadData}
              limitRow={limitRow} setLimitRow={setLimitRow}

              showFilter={showFilter} setShowFilter={setShowFilter}
              filterOption={filterOption} setFilterOption={setFilterOption}

              showTableSetting={showTableSetting} 
              setShowTableSetting={setShowTableSetting}

              titleFilter={`ค้นหา${lb[0]}`}

              qry={qry}

            />       

        </div>
    </div>

  )
}

//------------------------------
const renderGroupAndDataComponent=()=>{
  
  const returnPage0=()=>{
    return (
      <div className="flex-center-stretch w-100 h-100 " 
           style={{overflow:"hidden"}}>
          {renderTableRangeBar({showRange,setShowRange,widthLeft,setWidthLeft})}
  
          <div className="h-100 bd-black" 
              style={{paddingTop:"0.5rem",width:`${widthLeft}%`}}>
                {
                <GroupComponent 
                  editGroup={editGroup} setSelectGroup={setSelectGroup}
                  groupState={inGroupState} groupForm={inGroupForm}
                  lb={lb[1]} routeName={inRouteGroupName}
                  keyArray={inKeyArray}
                  editData={editData}
                  updateTreeFromEditData={()=>{updateEditGroup(editData)}}
                  />
                }
          </div>
  
          <div className="h-100 bd-black" 
              style={{width:`${100-widthLeft}%`}}>                      
                {
                  renderTable()
                }
          </div>
      
      </div>  
      )
  }

  const returnPage1=()=>{
    return(
      <div className="flex-center-stretch w-100 h-100" 
           style={{overflow:"hidden"}}>
        {renderTableRangeBar({showRange,setShowRange,widthLeft,setWidthLeft})}
        <div className="h-100 bd-black" style={{width:`${widthLeft}%`}}>
            {
              renderTable()
            }
        </div>

        <div className="h-100 bd-black" 
            style={{paddingTop:"0.5rem",
                    width:`${100-widthLeft}%`}}>
              
              {
              selectDataOut
              ?<DetailComponent 
                    lb={lb[2]}
                    colorHead={colorHead}
                    selectDataIn={editDataForDetail} 
                    setSelectDataIn={setEditDataForDetail}
                    detailTableTemplate={tableTemplate2}
                    setDetailTableTemplate={setTableTemplate2}
              />
              :null
              }
       
        </div>
  
      </div>  
    )

  }

  const returnPage2=()=>{


    return(
      <div className="flex-center-stretch w-100 h-100" style={{overflow:"hidden"}}>
        {renderTableRangeBar({showRange,setShowRange,widthLeft,setWidthLeft})}
        <div className="h-100 bd-black" style={{width:`${widthLeft}%`}}>
            <GraphComponent
              lb={lb[3]}
              colorHead={["#BAA6B1","#B26697"]}
              selectDataIn={graphData.noDetail} 
              setSelectDataIn={()=>{}}
              graphTableTemplate={tableTemplate3}
              setGraphTableTemplate={setTableTemplate3}
              showRange={showRange}
              barColor={"#FAA765"}

            />
        </div>

        <div className="h-100 bd-black" 
            style={{paddingTop:"0.5rem",
                    width:`${100-widthLeft}%`}}>
              
              <GraphComponent
                lb={lb[4]}
                colorHead={["#B26697","#BAA6B1"]}
                selectDataIn={graphData.wiDetail} 
                setSelectDataIn={()=>{}}
                graphTableTemplate={tableTemplate4}
                setGraphTableTemplate={setTableTemplate4}
                showRange={showRange}
                barColor={"rgba(75,192,192,1)"}

              />
        </div>
      </div>  
    )
  }  
    if(swapState==0){ return returnPage0() }  
    if(swapState==1){ return returnPage1() }
    if(swapState==2){ return returnPage2() }
}
//==================================
return (
  <div className="page-badge">

    <div className="w-100 h-100">

    {
     renderGroupAndDataComponent()
    }
 
    {
    showModalConfirm
      ?< ModalConfirm
        show={showModalConfirm}
        setShow={setShowModalConfirm}
        url={`/${inRouteName}/deletecustom`}
        editData={editData}
        //setShowModalError,
        setReload={setReloadData}
        submitOption={0}
        actionAfterSuccess={actionAfterSuccess}
      />
      :null
    }
    
    {
      renderBadge({
        badgeState,
        pageNumber,setPageNumber,
        limitRow,
        count,setCount,                    
        setFilterOption,
        badgeLayoutOption,
        barWidth:widthLeft,
        
        totalSwapPage,
        swapState,setSwapState,
        reloadData:reloadData, setReloadData:setReloadData,
        showTableSetting,setShowTableSetting,
        showFilter,setShowFilter,
        showAdd,setShowAdd,
        showEdit,setShowEdit,
        setShowModalConfirm,
        totalTableTemplate
      })
     } 

    </div>

    {showAdd?<ModalForm param={param1}/>:null}
    {showEdit?<ModalForm param={param2}/>:null}
    
    <div className="hide-on-screen">
      {
         //renderTable()
      }
    </div>

  </div>
  );
}

export default DataComponent;

