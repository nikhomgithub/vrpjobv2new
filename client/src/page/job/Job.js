import React from 'react';
import axios from 'axios'
import {MainContext} from '../../context/MainContext'
import Galleryone from '../../component/galleryone/Galleryone'
import {FaRegLightbulb,FaLightbulb} from 'react-icons/fa';
import Badge from '../../render/renderBadge/Badge'

import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import ModalFilterInput from '../../render/renderFilter/ModalFilterInput'
import ModalForm from '../../render/renderForm/ModalForm'
import ModalConfirm from '../../render/ModalConfirm'
import renderModalError from '../../render/renderModalError'
import axiosUtil from '../../util/axiosUtil'
const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil

function Job() {

const {basicData,widthLeft,setWidthLeft,myheader}=React.useContext(MainContext)

//-------------------------------------------------
const reloadAxiosAll=()=>{
    const promise1=axios.post(`/job/getlimit`,
                   {pageNumber,limitRow,sort,...qry},myheader)
    //const promise2=axios.post(`/tabletemplate/getcustom`,{},myheader)
    Promise.all([promise1])
        .then(result=>{
            //console.log('filterData')
            //console.log(result[0].data.data)
            setFilterData(result[0].data.data)
            setCount(result[0].data.count)
            setLastRecordId(result[0].data.lastRecordId)
           
            setReloadData(false)
        })
        .catch(error=>{
            //setMessage(error.response.data.message)
            //console.log(error.response)
            setReloadData(false)         
        })
}
//<Galleryone imgarrs={photoUrl1} width={100}/>


const submitFunctionAdd=(formInputState)=>{
    let controller="addcustom"
    const dataUrl="job"
    const dataState=StateTemplate.jobState

    const tempFormInputState=addFileNameInPhotoUrl(formInputState)
    const fd=genFD({inputState:formInputState,template:dataState})
    axios.post(`/${dataUrl}/${controller}`,fd,myheader)
        .then(result=>{
            setShowAdd(false)
            setReloadData(true)
        })
        .catch(error=>{
            //catchErrorToMessage(error)
            catchErrorToMessage(error,setMessage)
            setShowModalError(true)
        })
}
const submitFunctionEdit=(formInputState)=>{
    let controller="updatecustom"
    const dataUrl="job"
    const dataState=StateTemplate.jobState

    setEditData(formInputState)
    const tempFormInputState=addFileNameInPhotoUrl(formInputState)
    const fd=genFD({inputState:formInputState,template:dataState})
    axios.post(`/${dataUrl}/${controller}`,fd,myheader)
        .then(result=>{
            setShowEdit(false)
            setReloadData(true)
        })
        .catch(error=>{
            catchErrorToMessage(error,setMessage)
            //setMessage(error.response.data.message)
            setShowModalError(true)
        })
}


const deleteAxios=()=>{
    let controller="deletecustom"
    const dataUrl="job"
    return new Promise((resolve,reject)=>{
        axios.post(`/${dataUrl}/${controller}`,
        {id:editData.id},myheader)
        .then(result=>{
            setReloadData(true)
            resolve(true)
        })
        .catch(error=>{
            catchErrorToMessage(error,setMessage)
            //setMessage(error.response.data.message)
            setReloadData(false)
            resolve(false)
        })
    })
}

const filterAxios=(option)=>{
    const dataUrl="job"
    
    const arrayCommand=genArrayForFilterAxios({
        filterTemplate:FilterTemplate.jobFilter,inputState
    })

    console.log('arrayCommand')
    console.log(arrayCommand)

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
        setReloadData(true)
        //setFilterData(result.data)
    })
    .catch(error=>{
        catchErrorToMessage(error,setMessage)
        //setMessage(error.response.data.message)
        setReloadData(true) //4-06-2021
        setShowModalError(true)
    })
    
}

//-----------------------------
const submitDeleteFunction=async()=>{
    let isSuccess = await deleteAxios()
    if(isSuccess){ setShowModalConfirm(false)}
    else{
        setShowModalError(true)
    }
}
//--------------------------------
const refreshPage=()=>{
    setEditData(null)
    setInputState(FilterTemplate.jobInputState)
    setQry(null)
    setReloadData(true)
}
//========================

const changeToThaiDate=(fulldate)=>{
    let thaiDate=null

    if(fulldate) {
        const year=fulldate.substring(0,4)
        const month=fulldate.substring(5,7)
        const date=fulldate.substring(8,10)
        thaiDate=`${date}-${month}-${year}`
    }
    return thaiDate
}

const renderEachCard=(i,idx)=>{
    const { id,date,timestamp,title,body,category,
    photoUrl1,videoLink,active,timeupdate,
    username,comment,timeupdateComment,
    usernameComment} = i

const getEditBgcColor=(id)=>{
    if(editData){
        if(editData.id==id){
            return "#A0DAA9"
        }
        else{
            return "#DFCFBE"
        }
    }   
    else {
        return "#DFCFBE"
    }
}

return(
    <div key={idx} className="w-100 h-100" 
         style ={{border:"none",boxShadow:"5px 5px 5px #888888",
         position:"relative"}}
         onClick={e=>{setEditData(i)}}
         >
        <div style={{position:"absolute",top:"0rem",zIndex:"150",
                    backgroundColor:"white",borderRadius:"50%"}}>
            {active
            ?<FaRegLightbulb style={{fontSize:"1.5rem"}}/>
            :<FaLightbulb style={{fontSize:"1.5rem"}}/>
            }
        </div>

       <div className="flex-center-center w-100 h-50" 
            style={{overlfow:"auto"}}
       >      
           <Galleryone imgarrs={photoUrl1} width={100}/>
       </div>

       <div className="flex-center-start jc-start w-100 h-50"
            styl={{overflow:"auto"}}
       >
          
           <div className="w-100 h-100 bgc-yellow" 
                style={{textAlign:"left",backgroundColor:getEditBgcColor(id),
                        borderRadius:"5px",padding:"0 0 0 0"}}>
                <div className="w-100" 
                     style={{height:"14%",overflow:"hidden",color:"red"
                }}>
                    {changeToThaiDate(date)}
                </div>

                <div className="w-100" 
                     style={{height:"14%",overflow:"hidden",fontWeight:"bold",fontSize:"1.2rem"
                }}>
                    {title}
                </div>
                <div className="w-100" 
                     style={{height:"14%",overflow:"hidden",fontStyle:"italic",color:"green",
                }}> 
                    {category} </div>
                <div className="w-100" style={{height:"55%",overflow:"hidden"}}>{body}</div>

           </div>
         
       </div>
       
   </div>
    )
}


const renderCard=()=>{
    return(
        <div className="w-100 h-100 bd-black" style={{overflow:"auto",padding:"1rem"}}>
            <div className="grid-card"> 
                {filterData.map((i,idx)=>renderEachCard(i,idx))
                }
            </div>
        </div> 
    )
}


//========================================================
const [filterData,setFilterData]=React.useState(null)
const [editData,setEditData]=React.useState(null)

const [badgeState,setBadgetState]=React.useState({
    swapShow:false,swapFunc:()=>{},
    reloadShow:true,reloadFunc:refreshPage,
    filterShow:true,filterFunc:()=>{},
    addShow:true,addFunc:()=>{},
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
const [showModalShowModalFilter]=React.useState(false) //filterIcon

const [showAdd,setShowAdd]=React.useState(false) //addIcon
const [showEdit,setShowEdit]=React.useState(false) //editIcon
const [showModalConfirm,setShowModalConfirm]=React.useState(false) //delIcon
const [showModalError,setShowModalError]=React.useState(false)

const [showModalFilter,setShowModalFilter]=React.useState(false)
const [inputState,setInputState]=React.useState(FilterTemplate.jobInputState)

const [filterOption,setFilterOption]=React.useState(0)
let [sort,setSort]=React.useState({id:1})
let [qry,setQry]=React.useState(null)


const [message,setMessage]=React.useState(null)
//========================================================

React.useEffect(()=>{
    if(reloadData){
        reloadAxiosAll()
    }
},[reloadData])

React.useEffect(()=>{
    console.log('filterData')
    console.log(filterData)
},[filterData])
React.useEffect(()=>{
    if(editData){
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
},[editData])

React.useEffect(()=>{
    console.log('qry')
    console.log(qry)
},[qry])

React.useEffect(()=>{
    console.log('qry')
    console.log(inputState)
},[inputState])
//========================================================
return (
<div className="w-100 h-100">
    <div className="flex-center-center w-100" style={{height:"93%"}}>
        {
        filterData
        ?renderCard()
        :null
        }
    </div>
    <div className="flex-center-center h-10 w-100" style={{height:"7%"}}>
    <Badge
        //delIcon
        badgeState={badgeState}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        limitRow={limitRow}
        count={count}                    
        setFilterOption={setFilterOption}

        totalSwapPage={1}
        swapState={swapState}
        setSwapState={setSwapState}

        setReloadData={setReloadData} //reloadIcon
        setShowFilter={setShowModalFilter} //filterIcon
        setShowAdd={setShowAdd} //addIcon
        setShowEdit={setShowEdit} //editIcon
        setShowModalConfirm={setShowModalConfirm} 
        />
    </div>   

        { 
        showModalFilter
        ?<ModalFilterInput
            title={`ค้นหางาน`}
            show={showModalFilter} setShow={setShowModalFilter}
            filterTemplate={FilterTemplate.jobFilter}
            inputState={inputState} setInputState={setInputState}
            limitRow={limitRow} setLimitRow={setLimitRow}
            sort={sort} setSort={setSort}
            filterAxios={filterAxios}
            selectData={{basicData}}
        />
        :null
        }
        {
        showAdd
        ?<ModalForm
            lb={"Add Form"}
            formTemplate={FormTemplate.jobForm}
            stateTemplate={StateTemplate.jobState}
            selectData={{basicData:basicData}}
            loadData={{id:lastRecordId+1}}

            setShow={setShowAdd}
            submitFunction={submitFunctionAdd}
            keyName={["photoUrl1"]} //new ---------------------------------
        />
        :null
        }
        { 
        showEdit
        ?<ModalForm
            lb={"Edit Form"}
            formTemplate={FormTemplate.jobForm}
            stateTemplate={StateTemplate.jobState}
            selectData={{basicData:basicData}}
            loadData={editData}

            setShow={setShowEdit}
            submitFunction={submitFunctionEdit}
            keyName={["photoUrl1"]} //new -------
        />
        :null
        }
        {
        showModalConfirm
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
  );
}

export default Job;
