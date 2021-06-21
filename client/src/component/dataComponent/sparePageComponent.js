import React from 'react'
import axios from 'axios'
//import TableComponent from './TableComponent'
//import myheader from '../../myheader'
import ctUtil from '../../util/ctUtil'
import axiosUtil from '../../util/axiosUtil'
import Table from '../table/Table'
import renderModalError from '../../render/renderModalError';
import ModalConfirm from '../../render/ModalConfirm'
import Badge from '../../render/renderBadge/Badge'
import GroupComponent from './GroupComponent'

import ModalFilterInput from '../../render/renderFilter/ModalFilterInput'
import ModalForm from '../../render/renderForm/ModalForm'
import Graph from '../graph/Graph'
import renderTableRangeBar from '../table/renderTableRangeBar'
import Card from '../../component/card/Card'


const {createTableTemplateForPage,convertTableTemplateObjToArray}=ctUtil
const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl}=axiosUtil

const PageComponent = (props) => {
console.log('PageComponent')

const { basicData,dataUrl,groupDataUrl,canDataChange,
        groupTitle,tableTitle,detailTableTitle,graphTitle,
        tableHeadColor,detailTableHeadColor,graphColor,
        graphDetailKey,
        dataForm,dataGroupForm,
        dataState,dataGroupState,
        dataFilter,dataInputState,
        addFormTitle,editFormTitle,
        dataTableTemplateName,detailTableTemplateName,
        totalSwapPage,
        calculation,
        iconAction,
        setSelectData,setSelectGroup,
        iconActionData,iconActionDataDetail,
        renderOnlyGroup,
        widthLeft,setWidthLeft,
        cardTemplate,
        cardTitle,
        intervalTime,
        myheader
}=props

const [isSecond,setIsSecond]=React.useState(false)
React.useEffect(()=>{
    if(!isSecond){
        setIsSecond(true)
    }
},[isSecond])    
//=====================================
const reloadAxiosAll=()=>{
    const promise1=axios.post(`/${dataUrl}/getlimit`,{pageNumber,limitRow,sort,...qry},myheader)
    const promise2=axios.post(`/tabletemplate/getcustom`,{},myheader)
    Promise.all([promise1,promise2])
        .then(result=>{
            setFilterData(result[0].data.data)
            setCount(result[0].data.count)
            setLastRecordId(result[0].data.lastRecordId)
            const temp=createTableTemplateForPage(result[1].data.data)
            setTableTemplate(temp[dataTableTemplateName])
            setDetailTableTemplate(temp[detailTableTemplateName])
            setReloadData(false)
        })
        .catch(error=>{
            //setMessage(error.response.data.message)
            //console.log(error.response)
        })
}

const saveTableTemplateAxios=()=>{
    let tempTableTemplate={}
    const object=Object.keys(tableTemplate)
    object.map(i=>{
        let tempObj=tableTemplate[i]
        tempTableTemplate={...tempTableTemplate,[i]:{...tempObj,["showColHead"]:true}}
    })

    const temp={
        tableName:dataTableTemplateName,
        template: convertTableTemplateObjToArray(tempTableTemplate)
    }
    axios.post(`/tabletemplate/updatecustom`,temp,myheader)
}

const saveDetailTableTemplateAxios=()=>{
    let tempTableTemplate={}
    const object=Object.keys(detailTableTemplate)
    object.map(i=>{
        let tempObj=detailTableTemplate[i]
        tempTableTemplate={...tempTableTemplate,[i]:{...tempObj,["showColHead"]:true}}
    })

    const temp={
        tableName:detailTableTemplateName,
        template: convertTableTemplateObjToArray(tempTableTemplate)
    }
    axios.post(`/tabletemplate/updatecustom`,temp,myheader)
}
const deleteAxios=()=>{
    return new Promise((resolve,reject)=>{
        axios.post(`/${dataUrl}/deletecustom`,
        {id:editData.id},myheader)
        .then(result=>{
            setReloadData(true)
            resolve(true)
        })
        .catch(error=>{
            setMessage(error.response.data.message)
            setReloadData(false)
            resolve(false)
        })
    })
}
//========================
const submitDeleteFunction=async()=>{
    let isSuccess = await deleteAxios()
    if(isSuccess){ setShowModalConfirm(false)}
    else{
        setShowModalError(true)
    }
}

//------------------------
const deleteAxiosGroup=()=>{
    return new Promise((resolve,reject)=>{
        axios.post(`/${groupDataUrl}/deletecustom`,
            {...editGroup,allDeleteId:allDeleteIdGroup},
            myheader)
        .then(result=>{
            setReloadGroup(true)
            resolve(true)
        })
        .catch(error=>{
            setMessage(error.response.data.message)
            setShowModalError(true)
            setReloadGroup(false)
            reject(false)
        })
    })
}
const addAxiosGroup=(formInputState)=>{
    return new Promise((resolve,reject)=>{
        axios.post(`/${groupDataUrl}/addcustom`,formInputState,myheader)
        .then(result=>{
            setReloadGroup(true)
            resolve(true)
        })
        .catch(error=>{
            setMessage(error.response.data.message)
            setShowModalError(true)
            setReloadGroup(false)
            reject(false)
        })
    })
}
const editAxiosGroup=(formInputState)=>{
    return new Promise((resolve,reject)=>{
        axios.post(`/${groupDataUrl}/updatecustom`,formInputState,myheader)
        .then(result=>{
            setReloadGroup(true)
            resolve(true)
        })
        .catch(error=>{
            setMessage(error.response.data.message)
            setShowModalError(true)
            setReloadGroup(false)
            reject(false)
        })
    })
}
const reloadAxiosGroup=()=>{
    axios.post(`/${groupDataUrl}/getcustom`,{},myheader)
    .then(result=>{
        setLoadDataGroup(result.data.data)
        setLastRecordGroup({id:result.data.lastRecordId})
        setReloadGroup(false)
    })
    .catch(error=>{
        setMessage(error.response.data.message)
        setShowModalError(true)
        setReloadGroup(false)
    })
}

const filterDataByGroup=(id)=>{
    setQry({groupId:id})
    setReloadData(true)
}

const refreshPage=()=>{
    setEditData(null)
    setInputState(dataInputState)
    setQry(null)
    setReloadData(true)
}

const filterAxios=(option)=>{
    const arrayCommand=genArrayForFilterAxios({
        filterTemplate:dataFilter,inputState
    })

    let qry = null
    
    if(option=="and"){ qry={$and:arrayCommand} }
    if(option=="or"){ qry={$or:arrayCommand} }

    setPageNumber(1)
    setQry(qry)

    axios.post(`/${dataUrl}/getlimit`,{pageNumber:1,limitRow,sort,...qry},myheader)
    .then(result=>{
        setFilterData(result.data.data)
        setCount(result.data.count)
        setLastRecordId(result.data.lastRecordId)
        //setFilterData(result.data)
    })
    .catch(error=>{
        setMessage(error.response.data.message)
        setShowModalError(true)
    })
}


const submitFunctionAdd=(formInputState)=>{
    const tempFormInputState=addFileNameInPhotoUrl(formInputState)
    const fd=genFD({inputState:formInputState,template:dataState})
    axios.post(`/${dataUrl}/addcustom`,fd,myheader)
        .then(result=>{
            setShowAdd(false)
            setReloadData(true)
        })
        .catch(error=>{
            setMessage(error.response.data.message)
            setShowModalError(true)
        })
}
const submitFunctionEdit=(formInputState)=>{
    const tempFormInputState=addFileNameInPhotoUrl(formInputState)
    const fd=genFD({inputState:formInputState,template:dataState})
    axios.post(`/${dataUrl}/updatecustom`,fd,myheader)
        .then(result=>{
            setShowEdit(false)
            setReloadData(true)
        })
        .catch(error=>{
            setMessage(error.response.data.message)
            setShowModalError(true)
        })
}

//=====================================
const [tableTemplate,setTableTemplate] = React.useState(null)
const [detailTableTemplate,setDetailTableTemplate] = React.useState(null)

const [filterData,setFilterData]=React.useState(null)
const [editData,setEditData]=React.useState(null)
const [editDetailData,setEditDetailData]=React.useState(null)

const [badgeState,setBadgetState]=React.useState({
    swapShow:true,swapFunc:()=>{},
    reloadShow:true,reloadFunc:refreshPage,
    filterShow:true,filterFunc:()=>{},
    addShow:canDataChange,addFunc:()=>{},
    editShow:false,editFunc:()=>{},
    delShow:false,delFunc:()=>{},
    printerShow:true,printerFunc:()=>{}
  })
  
  const [pageNumber,setPageNumber]=React.useState(1)
  const [limitRow,setLimitRow]=React.useState(10)
  const [count,setCount]=React.useState(0)               
  const [lastRecordId,setLastRecordId]=React.useState(null)     
  
  const [swapState,setSwapState]=React.useState(0) //swapIcon
  const [reloadData,setReloadData]=React.useState(true) //reloadData
  const [showFilter,setShowFilter]=React.useState(false) //filterIcon

  const [showAdd,setShowAdd]=React.useState(false) //addIcon
  const [showEdit,setShowEdit]=React.useState(false) //editIcon
  const [showModalConfirm,setShowModalConfirm]=React.useState(false) //delIcon
  const [showModalError,setShowModalError]=React.useState(false)

  const [loadDataGroup,setLoadDataGroup]=React.useState(null) //data from server   
  const [lastRecordGroup,setLastRecordGroup]=React.useState({id:0}) //data from server 
  const [editGroup,setEditGroup]=React.useState(null) //data to table / form
  const [allDeleteIdGroup,setAllDeleteIdGroup]=React.useState(null) //data to delete to server
  const [reloadGroup,setReloadGroup]=React.useState(true)

  const [showModalFilter,setShowModalFilter]=React.useState(false)
  const [inputState,setInputState]=React.useState(dataInputState)

  const [filterOption,setFilterOption]=React.useState(0)
  let [sort,setSort]=React.useState({id:1})
  let [qry,setQry]=React.useState(null)

  const [showRange,setShowRange]=React.useState(false)

  const [message,setMessage]=React.useState(null)
//========================

//========================
React.useEffect(()=>{
    if(reloadData){
        reloadAxiosAll()
    }
},[reloadData])

React.useEffect(()=>{
    if(reloadGroup){
        reloadAxiosGroup()       
    }
},[reloadGroup])

React.useEffect(()=>{
    if(isSecond){
        setSelectGroup(editGroup)
        //console.log('editGroup')
        //console.log(editGroup)
    }
},[editGroup])

React.useEffect(()=>{
    if(isSecond){
        if(editData&&canDataChange){
            if(editData.id){
                setBadgetState({
                    ...badgeState,
                    delShow:true,
                    editShow:true,
                })
            }
            else{
                setBadgetState({
                    ...badgeState,
                    delShow:false,
                    editShow:false,
                })
            }
        }
        setSelectData(editData)
    }
},[editData])

React.useEffect(()=>{
    if(isSecond){
        console.log('allDeleteIdGroup')
        console.log(allDeleteIdGroup)
   }
},[allDeleteIdGroup])

//========================
const renderTable=()=>{
    if(!tableTemplate||!filterData){return null}
    return(
    <div className="w-100 h-100">
        <div className="h-5 flex-center-center">
            <h3>{tableTitle}</h3>
        </div>
        <div className="h-95">    
        <Table
            colorHead={tableHeadColor}
            tableTemplate={tableTemplate}
            setTableTemplate={setTableTemplate}
            filterData={filterData}
            setFilterData={setFilterData}
            editData={editData}
            setEditData={setEditData}
            saveTableTemplateFunc={saveTableTemplateAxios}
            isSubTable={false}
        />
        </div>
    </div>
    )
}
//========================
const renderGroup=()=>{
    if(!loadDataGroup){return null}
    return(
    <div className="w-100 h-100">
        <div className="h-5 flex-center-center">
            <h3>{groupTitle}</h3>
        </div>
        <div className="h-95">
            <GroupComponent
                groupState={dataGroupState}
                groupForm={dataGroupForm}
                loadData={loadDataGroup}
                lastRecord={lastRecordGroup}
                editData={editData}
                setEditData={setEditData}
                editGroup={editGroup}
                setEditGroup={setEditGroup}
                setAllDeleteId={setAllDeleteIdGroup}
                deleteFunctionForGroup={deleteAxiosGroup}
                editFunctionForGroup={editAxiosGroup}
                addFunctionForGroup={addAxiosGroup}
                reloadFunctionForGroup={reloadAxiosGroup}
                filterDataByGroup={filterDataByGroup}
                renderOnlyGroup={renderOnlyGroup}
                selectData={{basicData:basicData}}
            />
        </div>
    </div>
    )
}
//========================
const renderGraph=()=>{
    if(!filterData){return null}
    return(
    <div className="w-100 h-100">
        <div className="h-5 flex-center-center">
            <h3>{graphTitle}</h3>
        </div>
        <div className="h-95">        
            <Graph
                lb={graphTitle}
                filterData={filterData}
                barColor={graphColor}
                stateTemplate={dataState}
                detailKey={graphDetailKey}
            />
        </div>
    </div>
    )
}
//========================
const renderDetailTable=()=>{

    if(!editData){return null}
    if(!editData.detail){return null}
    if(!detailTableTemplate){return null}
    return(
    <div className="w-100 h-100">
        <div className="h-5 flex-center-center">
            <h3>{detailTableTitle}</h3>
        </div>
        <div className="h-95">
            <Table
                colorHead={detailTableHeadColor}
                tableTemplate={detailTableTemplate}
                setTableTemplate={setDetailTableTemplate}
                filterData={editData.detail}
                editData={editDetailData}
                setEditData={setEditDetailData}
                saveTableTemplateFunc={saveDetailTableTemplateAxios}
                isSubTable={true}
            />
        </div>
    </div>
    )
}
//========================
const renderLeft=()=>{
    if(swapState==0){
        return renderGroup()
    }
    else if(swapState==1){
        return renderTable()
    }
    else if(swapState==2){
        return renderTable()
    }
}
//========================
const renderRight=()=>{
    if(swapState==0){
        return renderTable()
    }
    else if(swapState==1){
        return renderGraph()
    }
    else if(swapState==2){
        return renderDetailTable()
    }
}
//========================
const renderBody=()=>{
    return(
      swapState==0||swapState==1||swapState==2
        ?<div className="flex-center-center"
             style={{height:"95%"}}
        >
            
            <div className="bd-darkGray" 
                style={{height:"100%",width:`${widthLeft}%`}}>

            {
                renderLeft()
            }
            </div>
            <div className="bd-darkGray" 
                style={{height:"100%",width:`${100-widthLeft}%`}}>
            {
                renderRight()
            }
            </div>
        </div>
        :<div className="flex-center-center"
              style={{height:"95%"}}
         >
            <Card
                filterData={filterData}
                title={cardTitle}
                cardTemplate={cardTemplate}
                intervalTime={intervalTime}
            />
        </div>
    )
}


//========================
return (
    !renderOnlyGroup
    ?<div style={{height:"100%",width:"100%",position:'relative'}}>
        {renderTableRangeBar({showRange,setShowRange,widthLeft,setWidthLeft})}
       
        {renderBody()}

        {
        <div className="flex-center-center w-100 h-5">
            <Badge
            //delIcon
                badgeState={badgeState}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                limitRow={limitRow}
                count={count}                    
            
                totalSwapPage={totalSwapPage}
                swapState={swapState}
                setSwapState={setSwapState}
                
                setReloadData={setReloadData} //reloadIcon
                setShowFilter={setShowModalFilter} //filterIcon
                setShowAdd={setShowAdd} //addIcon
                setShowEdit={setShowEdit} //editIcon
                setShowModalConfirm={setShowModalConfirm} 
            />
        </div>
        }

        {   
        showModalFilter
        ?<ModalFilterInput
            title={`ค้นหาสำหรับ ${tableTitle}`}
            show={showModalFilter} setShow={setShowModalFilter}
            filterTemplate={dataFilter}
            inputState={inputState} setInputState={setInputState}
            limitRow={limitRow} setLimitRow={setLimitRow}
            sort={sort} setSort={setSort}
            filterAxios={filterAxios}
        />
        :null
        }
        {
        showAdd
        ?<ModalForm
            lb={addFormTitle}
            formTemplate={dataForm}
            stateTemplate={dataState}
            loadData={{id:lastRecordId+1}}
            selectData={{basicData:basicData}}
            setShow={setShowAdd}
            iconAction={iconAction}
            iconActionData={iconActionData}
            iconActionDataDetail={iconActionDataDetail}
            detailTableTemplate={detailTableTemplate}
            submitFunction={submitFunctionAdd}
            keyName={["photoUrl1"]}
            calculation={calculation}
        />
        :null
        }
        {
        showEdit
        ?<ModalForm
            lb={editFormTitle}
            formTemplate={dataForm}
            stateTemplate={dataState}
            loadData={editData}
            selectData={{basicData:basicData}}
            setShow={setShowEdit}
            iconAction={iconAction}
            iconActionData={iconActionData}
            iconActionDataDetail={iconActionDataDetail}
            detailTableTemplate={detailTableTemplate}
            submitFunction={submitFunctionEdit}
            keyName={["photoUrl1"]}
            calculation={calculation}
        />
        :null
        }
        {
        showModalConfirm&&canDataChange
        ?<ModalConfirm
            setShow={setShowModalConfirm}
            submitFunction={submitDeleteFunction}
        />
        :null
        }

        { 
        showModalError
        ?renderModalError({
            show:showModalError,
            setShow:setShowModalError,
            message,setMessage 
        })
        :null
        }
    </div>
    :<div style={{height:"100%",width:"100%",position:'relative'}}>
        {renderGroup()}
    </div>
)
}
PageComponent.defaultProps={
    groupTitle:"กลุ่ม",
    tableTitle:"ตารางหลัก",
    detailTableTitle:"ตารางย่อย",
    graphTitle:"กราฟ",
    addFormTitle:"เพิ่มข้อมูล",
    editFormTitle:"แก้ไขข้อมูล",
    tableHeadColor:"#6B5B95",
    detailTableHeadColor:"#34568B",
    graphColor:"#FF6F61",
    graphDetailKey:"name",
    dataUrl:"product",
    groupDataUrl:"group",
    dataForm:null,
    dataGroupForm:null,
    dataState:null,
    dataGroupState:null,
    dataFilter:null,
    dataInputState:null,
    canDataChange:true,
    dataTableTemplateName:null,
    detailTableTemplateName:null,
    totalSwapPage:1,
    setSelectData:()=>{},
    setSelectGroup:()=>{},
    iconActionData:null,
    iconActionDataDetail:null,
    renderOnlyGroup:false,
    cardTemplate:null,
    cardTitle:null,
    intervalTime:1000
}
export default PageComponent
