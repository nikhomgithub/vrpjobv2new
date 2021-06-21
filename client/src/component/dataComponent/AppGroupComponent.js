import React from 'react'
import axios from 'axios'
import GroupComponent from './GroupComponent.js'
import testTemplateGroupComponent from './testTemplateGroupComponent'
import myheader from '../../myheader'

const {groupState,groupData,groupForm}=testTemplateGroupComponent

const AppGroupComponent = () => {
console.log('AppGroupComponent')

const [isSecond,setIsSecond]=React.useState(false)
React.useEffect(()=>{
    if(!isSecond){
        setIsSecond(true)
    }
},[isSecond])

const [editData,setEditData]=React.useState(null) //data from table
const [loadData,setLoadData]=React.useState(null) //data from server   
const [lastRecord,setLastRecord]=React.useState({id:0}) //data from server 
const [editGroup,setEditGroup]=React.useState(null) //data to table / form
const [allDeleteId,setAllDeleteId]=React.useState(null) //data to delete to server
const [reloadGroup,setReloadGroup]=React.useState(true)

const deleteFunctionForGroup=()=>{
    return new Promise((resolve,reject)=>{
        axios.post('/group/deletecustom',
            {...editGroup,allDeleteId:allDeleteId},
            myheader)
        .then(result=>{
            setReloadGroup(true)
            resolve(true)
        })
        .catch(err=>{
            console.log(err)
            setReloadGroup(false)
            reject(false)
        })
    })
}
const addFunctionForGroup=(formInputState)=>{
    return new Promise((resolve,reject)=>{
        axios.post('/group/addcustom',formInputState,myheader)
        .then(result=>{
            setReloadGroup(true)
            resolve(true)
        })
        .catch(err=>{
            console.log(err)
            setReloadGroup(false)
            reject(false)
        })
    })
}
const editFunctionForGroup=(formInputState)=>{
    return new Promise((resolve,reject)=>{
        axios.post('/group/updatecustom',formInputState,myheader)
        .then(result=>{
            setReloadGroup(true)
            resolve(true)
        })
        .catch(err=>{
            console.log(err)
            setReloadGroup(false)
            reject(false)
        })
    })
}
const reloadFunctionForGroup=()=>{
    axios.post('/group/getcustom',{},myheader)
    .then(result=>{
        console.log(result.data)
        setLoadData(result.data.data)
        setLastRecord({id:result.data.lastRecordId})
        setReloadGroup(false)
    })
    .catch(err=>{
        console.log(err)
        setReloadGroup(false)
    })
}


React.useEffect(()=>{
    if(reloadGroup){
        reloadFunctionForGroup()       
    }
},[reloadGroup])

return (
    <GroupComponent
        groupState={groupState}
        groupForm={groupForm}
        loadData={loadData}
        lastRecord={lastRecord}
        editData={editData}
        setEditData={setEditData}
        editGroup={editGroup}
        setEditGroup={setEditGroup}
        setAllDeleteId={setAllDeleteId}
        deleteFunctionForGroup={deleteFunctionForGroup}
        editFunctionForGroup={editFunctionForGroup}
        addFunctionForGroup={addFunctionForGroup}
        reloadFunctionForGroup={reloadFunctionForGroup}
    />
)
}

export default AppGroupComponent
