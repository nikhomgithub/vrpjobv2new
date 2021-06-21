import React from 'react';

import PageComponent from '../../component/dataComponent/PageComponent.js'
import {MainContext} from '../../context/MainContext';

import StateTemplate from '../../model/StateTemplate'
import FormTemplate from '../../render/renderForm/FormTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import ModalComponent from '../../render/ModalComponent'
//import './App2.css'

function AppForPageComponent() {
const {groupForm,productForm,
       partnerForm,partnerGroupForm,
       transactionForm,transactionGroupForm
      }=FormTemplate
const {groupState,productState,
       partnerState,partnerGroupState,
       transactionState,transactionGroupState 
      }=StateTemplate
const {productFilter,partnerFilter,transactionFilter}=FilterTemplate
const {productInputState,partnerInputState,transactionInputState}=inputState

const [showPartnerModal,setShowPartnerModal]=React.useState(false)
const [showTransactionGroupModal,
       setShowTransactionGroupModal]=React.useState(false)
const [showProductModal,setShowProductModal]=React.useState(false)

const {basicData}=React.useContext(MainContext)

const [selectTransactionGroup,setSelectTransactionGroup]=React.useState(null)
const [selectPartner,setSelectPartner]=React.useState(null)
const [selectProduct,setSelectProduct]=React.useState(null)

const [iconActionData,setIconActionData]=React.useState(null)
const [iconActionDataDetail,setIconActionDataDetail]=React.useState(null)

React.useEffect(()=>{
    if(selectTransactionGroup){
    setIconActionData({groupId:selectTransactionGroup.id,
                       groupName:selectTransactionGroup.groupName})
    }
},[selectTransactionGroup])

React.useEffect(()=>{
    if(selectPartner){
    setIconActionData({partnerId:selectPartner.id,
                       title:selectPartner.title,
                       name:selectPartner.name,
                       phone:selectPartner.phone,
                       address:selectPartner.address
                    })
    }
},[selectPartner])

React.useEffect(()=>{
    if(selectProduct){
    setIconActionDataDetail(selectProduct)
    }
},[selectProduct])


const transactionCalculation=(formInputState)=>{
    const {total,reduction,grandTotal,detail}=formInputState
    
    let tempTotal = 0
    let tempDetail=[]
    detail.map(i=>{
        const tempResult=i.quantity*i.price
        tempTotal=tempTotal+tempResult

        const tempObj={...i,["result"]:tempResult}
        tempDetail=[...tempDetail,tempObj]
    })

    const tempGrandTotal=tempTotal-reduction
    let tempFormInputState={...formInputState,
                            ["detail"]:tempDetail,
                            ["total"]:tempTotal,
                            ["grandTotal"]:tempGrandTotal}
    return tempFormInputState
}

return(
<div className="bgc-lightGray" style={{height:"100%",width:"100%"}}>
    <PageComponent
        basicData={basicData}
        dataForm={transactionForm}
        dataGroupForm={transactionGroupForm}
        dataState={transactionState}
        dataGroupState={transactionGroupState}
        dataFilter={transactionFilter}
        dataInputState={transactionInputState}
        groupTitle={"ประเภทเอกสาร"}
        tableTitle={"ตารางเอกสาร"}
        detailTableTitle={"ตารางสินค้าในเอกสาร"}
        graphTitle={"กราฟข้อมูลเอกาสาร"}
        addFormTitle={"เพิ่มข้อมูลเอกสาร"}
        editFormTitle={"แก้ไขข้อมูลเอกสาร"}
        tableHeadColor={"#6B5B95"}
        detailTableHeadColor={"#34568B"}
        graphColor={"#FF6F61"}
        graphDetailKey={"name"}
        dataUrl={"transaction"}
        groupDataUrl={"transactiongroup"}
        canDataChange={true}
        dataTableTemplateName={"transactionTableTemplate"}
        detailTableTemplateName={"productDetailTableTemplate"}
        totalSwapPage={3}
        calculation={transactionCalculation}
        iconAction={[()=>setShowTransactionGroupModal(true),
                     ()=>setShowPartnerModal(true),
                     ()=>setShowProductModal(true),
                    ]}
        iconActionData={iconActionData}
        iconActionDataDetail={iconActionDataDetail}
    />

    {showTransactionGroupModal
    ?<ModalComponent className="bd-red"
        funcCancel={()=>{
            setIconActionData({groupId:"",groupName:""})
            setShowTransactionGroupModal(false)
        }}
        funcOK={()=>setShowTransactionGroupModal(false)}
        children={
            <PageComponent
                dataGroupState={transactionGroupState}
                groupDataUrl={"transactiongroup"}
                setSelectGroup={setSelectTransactionGroup}
                renderOnlyGroup={true}  
            />
        }
    />
    :null
    }
    {showPartnerModal
    ?<ModalComponent className="bd-red"
        funcCancel={()=>{
            setIconActionData({partnerId:"",
                title:"",
                name:"",
                phone:[],
                address:[]
             })
            setShowPartnerModal(false)
        }}
        funcOK={()=>setShowPartnerModal(false)}

        children={
            <PageComponent
                basicData={basicData}
                dataForm={partnerForm}
                dataGroupForm={partnerGroupForm}
                dataState={partnerState}
                dataGroupState={partnerGroupState}
                dataFilter={partnerFilter}
                dataInputState={partnerInputState}
                groupTitle={"ประเภทคู่ค้า"}
                tableTitle={"ตารางคู่ค้า"}
                graphTitle={"กราฟข้อมูลคู่ค้า"}
                addFormTitle={"เพิ่มข้อมูลคู่ค้า"}
                editFormTitle={"แก้ไขข้อมูลคู่ค้า"}
                tableHeadColor={"#6B5B95"}
                detailTableHeadColor={"#34568B"}
                graphColor={"#FF6F61"}
                graphDetailKey={"name"}
                dataUrl={"partner"}
                groupDataUrl={"partnergroup"}
                canDataChange={false}
                dataTableTemplateName={"partnerTableTemplate"}
                totalSwapPage={1}
                setSelectData={setSelectPartner}
            />
        }
    />
    :null
    }

{showProductModal
     ?<ModalComponent className="bd-red"
        funcOK={()=>setShowProductModal(false)}
        children={
            <PageComponent
                basicData={basicData}
                dataForm={productForm}
                dataGroupForm={groupForm}
                dataState={productState}
                dataGroupState={groupState}
                dataFilter={productFilter}
                dataInputState={productInputState}
                groupTitle={"กลุ่มสินค้า"}
                tableTitle={"ตารางสินค้า"}
                detailTableTitle={"ตาราสินค้างย่อย"}
                graphTitle={"กราฟข้อมูลสินค้า"}
                addFormTitle={"เพิ่มข้อมูลสินค้า"}
                editFormTitle={"แก้ไขข้อมูลสินค้า"}
                tableHeadColor={"#6B5B95"}
                detailTableHeadColor={"#34568B"}
                graphColor={"#FF6F61"}
                graphDetailKey={"name"}
                dataUrl={"product"}
                groupDataUrl={"group"}
                canDataChange={false}
                dataTableTemplateName={"productTableTemplate"}
                detailTableTemplateName={"productDetailTableTemplate"}
                totalSwapPage={1}
                setSelectData={setSelectProduct}
            />
     }
    />

    :null
    }


</div>
)

}
export default AppForPageComponent;
