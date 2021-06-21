import React from 'react';

import {MdEdit} from 'react-icons/md';
//==========
import SubTable from '../../component/table/SubTable'

//==========
import renderBadge from '../../render/renderBadge/renderBadge'

//===================
import {MainContext} from '../../context/MainContext'
//===================
import tableTemplate from '../../component/table/tableTemplate'
import StateUtil from '../../model/StateUtil'
import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import ModalForm from '../../render/renderForm/ModalForm'
import ModalSubForm from '../../render/renderForm/ModalSubForm'

//==================
import ModalSubFormConfirm from '../../render/ModalSubFormConfirm'
//==================
const {basicDataForm,routeAuthForm}=FormTemplate      
const {basicDataState,routeAuthState}=StateTemplate
const {genBlankState,genRefAndValue}=StateUtil
const {basicDataTableTemplate}=tableTemplate
//==================

function BasicData() {

    const {basicData,setBasicData,
           reloadBasicData,setReloadBasicData
          }=React.useContext(MainContext)

//====================
//for basicData.routeAuth
const [filterData,setFilterData]=React.useState(basicData.routeAuth)

React.useEffect(()=>{
    //Everytime basicData change in context, 
    //data in BasicData also change dynamically
    if(basicData){
        setFilterData(basicData.routeAuth)
    }
},[basicData])

//====================
const [showModalConfirm,setShowModalConfirm]=React.useState(false)

const [showTableSetting,setShowTableSetting]=React.useState(false)
const [showFilter,setShowFilter]=React.useState(false)
const [showAdd,setShowAdd]=React.useState(false)
const [showEdit,setShowEdit]=React.useState(false)
const [reloadData,setReloadData]=React.useState(true)

//====================    
const renderSelect=()=>{
        const arrs=[
            {lb:"คำนำหน้า",name:"title",
             cName:"xc12 sc12 p-1 flex-center-baseline",
             subCName:["xc4 sc12 ","xc8 sc12 "]},

            {lb:"หน่วย",name:"unit",
             cName:"xc12 sc12 p-1 flex-center-baseline",
             subCName:["xc4 sc12 ","xc8 sc12"]},
            
            {lb:"กลุ่มผู้ใช้",name:"userLevel",
             cName:"xc12 sc12 p-1 flex-center-baseline",
             subCName:["xc4 sc12 ","xc8 sc12"]},            

            {lb:"กระทบสต็อก",name:"effectStock",
             cName:"xc12 sc12 p-1 flex-center-baseline",
             subCName:["xc4 sc12 ","xc8 sc12"]},            
            
            {lb:"กระทบจอง",name:"effectOrder",
             cName:"xc12 sc12 p-1 flex-center-baseline",
             subCName:["xc4 sc12 ","xc8 sc12"]},

            {lb:"กระทบแผน",name:"effectPlan",
             cName:"xc12 sc12 p-1 flex-center-baseline",
             subCName:["xc4 sc12 ","xc8 sc12"]},
            
        ]

        return(
        <div className="w-100 h-90" style={{overflow:"auto"}}>   
        {arrs.map((a,index)=>{
            
            return(
            <div key={index} className={a.cName}>
                <div className={a.subCName[0]}>
                    <label >{a.lb}</label>  
                </div>             
                <div className={a.subCName[1]}>
                    <select className="w-100">  
                        <option value="" hidden>
                            ตรวจสอบรายการ...</option>
                        {  
                        a.name=="routeAuth"
                        ?basicData[`${a.name}`].map((m,index)=>
                         <option key={index}>
                            {`${m.routeName}:${m.routeAddress}`}
                         </option>)
                        :basicData[`${a.name}`].map((m,index)=>
                            <option key={index}>{m}</option>)
                        }
                    </select>
                </div>    
            </div>)
        })}
        </div>      
        ) 
    }
//======================
const [tableTemplate,setTableTemplate]=React.useState(basicDataTableTemplate)

//==================================
  //Badge
  const [badgeState,setBadgeState] =React.useState({
    swapShow:false,
    reloadShow:true,
    settingShow:true,
    filterShow:false,
    addShow:true,
    editShow:false,
    delShow:false,
    printerShow:false,
  })
//====================================

const actionAfterSuccess=(formInputState)=>{
    setReloadBasicData(true)
}

const [editData,setEditData]=React.useState(null)

let param={
    isAddForm:false,
    lb:'แก้ไขค่าพื้นฐาน',
    formTemplate:basicDataForm,
    stateTemplate:basicDataState,
  
    selectData:{basicData},
    loadData:editData,
    show:showEdit,
    setShow:setShowEdit,
    url:'/basicdata/updatecustom',
  
    keyName:null,
    submitOption:0,
    iconAction:null,//[()=>{}],
    actionAfterSuccess:actionAfterSuccess,//()=>{}
    useGenFD:false,
  
  }

    const actionAfterRouteAuthDelete=()=>{
        setShowModalConfirm(false)
        setReloadBasicData(true)
    }
  //=====================
  const actionAfterRouteAuthUpdate=()=>{
        setShowAddRouteAuth(false)
        setShowEditRouteAuth(false)
        setReloadBasicData(true)
  }

  //==========================
  const blankData = genBlankState({template:basicDataState}).state
  const [showEditRouteAuth,setShowEditRouteAuth]=React.useState(false)
  const [showAddRouteAuth,setShowAddRouteAuth]=React.useState(false)
  const [editRouteAuth,setEditRouteAuth]=React.useState(null)
  const [addRouteAuth,setAddRouteAuth]=React.useState(blankData.routeAuth[0])

  React.useEffect(()=>{
      console.log('editRouteAuth')
      console.log(editRouteAuth)
      if(editRouteAuth){
        setBadgeState({...badgeState, ['editShow']:true,['delShow']:true})  
      }
      else{
        setBadgeState({...badgeState, ['editShow']:false,['delShow']:false})  
      }

  },[editRouteAuth])

  const paramEditRouteAuth={
    isAddForm:false,
    lb:'แก้ไขสิทธิ์ใช้งาน',
    formTemplate:routeAuthForm,
    stateTemplate:basicDataState.routeAuth.stChildren,
  
    selectData:{basicData},
    loadData:editRouteAuth,
    show:showEditRouteAuth,
    setShow:setShowEditRouteAuth,
    url:'/basicdata/updatecustom',
  
    iconAction:null,//[()=>{}],
    actionAfterSuccess:actionAfterRouteAuthUpdate,//()=>{}
    useGenFD:false,

    mainData:basicData,
    subField:'routeAuth'
  }
  //==============
  const paramAddRouteAuth={
    isAddForm:false,
    lb:'แก้ไขสิทธิ์ใช้งาน',
    formTemplate:routeAuthForm,
    stateTemplate:basicDataState.routeAuth.stChildren,
  
    selectData:{basicData},
    loadData:addRouteAuth,
    show:showAddRouteAuth,
    setShow:setShowAddRouteAuth,
    url:'/basicdata/updatecustom',

    iconAction:null,//[()=>{}],
    actionAfterSuccess:actionAfterRouteAuthUpdate,//()=>{}
    useGenFD:false,

    mainData:basicData,
    subField:'routeAuth'
  }
  //======================
return(
<div className="page-badge">
    <div    id="1"
            className="flex-center-stretch h-100 hide-on-print" 
            style={{overflow:"hidden"}}>
        
        {/*===========*/}
        <div className="xc4 h-100 px-2 bd-black" 
           style={{paddingTop:"0.5rem"}}>
            <div className="flex-center-center w-100 h-10">
                <h1>ข้อมูลพื้นฐาน</h1>    
                <MdEdit className="md-icon"
                    onClick={e=>{
                        setEditData({...basicData})
                        setShowEdit(true)
                }}
                />   
            </div>
            {filterData
            ?renderSelect()
            :null
            }
        </div>

        {/*===========*/}

        <div className="xc8 h-100 bd-black" 
           style={{paddingTop:"0.5rem"}}>
            <div className="h-100 w-100">
                <div style={{height:"7%"}}>
                    <h1 style={{textAlign:"center"}}>สิทธิ์การใช้งาน</h1>
                </div>
                <div className="w-100" style={{height:`93%`}}>
       
                <SubTable
                    tableTemplate={tableTemplate}
                    setTableTemplate={setTableTemplate}
                    filterData={filterData}
                    setFilterData={setFilterData}
                    editData={editRouteAuth}
                    setEditData={setEditRouteAuth}
                
                    showTableSetting={showTableSetting}
                    setShowTableSetting={setShowTableSetting}
                /> 

                </div>  
            </div>
        </div>
        {/*===========*/}
        
        {showEdit?<ModalForm param={param}/>:null}
        {showEditRouteAuth?<ModalSubForm param={paramEditRouteAuth}/>:null}
        {showAddRouteAuth?<ModalSubForm param={paramAddRouteAuth}/>:null}

        {showModalConfirm
        ?<ModalSubFormConfirm
                show={showModalConfirm}
                setShow={setShowModalConfirm}
                url={'/basicdata/updatecustom'}
                mainData={basicData}
                subField={'routeAuth'}
                editData={editRouteAuth}
                stateTemplate={basicDataState}

                submitOption={1}
                actionAfterSuccess={actionAfterRouteAuthDelete}
        />
        :null
        }

        {
            renderBadge({
                badgeState,
                pageNumber:null,setPageNumber:null,
                limitRow:null,
                count:null,setCount:null,                    
                setFilterOption:null,
                badgeLayoutOption:0,
                barWidth:"100",

                swapState:null,setSwapState:null,
                reloadData:reloadBasicData,setReloadData:setReloadBasicData,
                showTableSetting,setShowTableSetting,
                showFilter:null,setShowFilter:null,
                //we use same ModalForm for Add and Edit
                showAdd:showAddRouteAuth,setShowAdd:setShowAddRouteAuth,
                showEdit:showEditRouteAuth,setShowEdit:setShowEditRouteAuth,
                setShowModalConfirm
            })
        } 

    </div>
</div>
);
}

export default BasicData;