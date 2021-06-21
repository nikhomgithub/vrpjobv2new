import React from 'react'

//import testTemplateGroupComponent from './testTemplateGroupComponent'
import ModalConfirm from '../../render/ModalConfirm'
import Tree from '../../render/renderTree/Tree'
import ModalForm from '../../render/renderForm/ModalForm'
import renderModalError from '../../render/renderModalError'
//const {groupState,groupData,groupForm}=testTemplateGroupComponent

const GroupComponent = (props) => {

const {editData,setEditData,loadData,lastRecord,
       groupState,groupForm,
       editGroup,setEditGroup,
       setAllDeleteId,
       addFunctionForGroup,editFunctionForGroup,
       deleteFunctionForGroup,reloadFunctionForGroup,
       filterDataByGroup,
       selectData,canGroupChange
}=props

console.log('GroupComponent')

//const [loadData,setLoadData]=React.useState(groupData) //get from parent   
//const [lastRecord,setLastRecord]=React.useState({id:0}) //get from parent 

//const [editData,setEditData]=React.useState(null) //get from parent < Table
//const [editGroup,setEditGroup]=React.useState(null) //send to Parent
//const [allDeleteId,setAllDeleteId]=React.useState(null) //send to Parent to allDeleteId

const [showAdd,setShowAdd]=React.useState(false)  //inside 
const [showEdit,setShowEdit]=React.useState(false) //inside
const [showModalConfirm,setShowModalConfirm]=React.useState(false) //inside
const [showModalError,setShowModalError]=React.useState(false) //inside 

const genSmallLoadData=(loadData,clickFolderIcon)=>{
    let temp=[loadData[0]]
    let tempChildren=[]
    for (let i=0;i<loadData.length;i++){
        if(loadData[i].parentId==1){
            temp=[...temp,loadData[i]]
        }

        if(clickFolderIcon){
            if(loadData[i].id==clickFolderIcon){
                tempChildren=[...tempChildren,...loadData[i].children]
            }
        }

        tempChildren.map(j=>{
            if(j==loadData[i].id){

                const index = tempChildren.indexOf(j);
                if (index > -1) {
                tempChildren.splice(index, 1);
}
                tempChildren=[...tempChildren,...loadData[i].children]

                temp=[...temp,loadData[i]]
            }
        })
    }
    return temp
}

const [smallLoadData,setSmallLoadData]=React.useState(null)

let [clickFolderIcon,setClickFolderIcon]=React.useState(null)



React.useEffect(()=>{
    console.log('clickFolderIcon')
    setSmallLoadData(genSmallLoadData(loadData,clickFolderIcon))
},[clickFolderIcon])

const submitDeleteFunction=()=>{
    //some function from parent--> must return true/false
    let isSuccess=deleteFunctionForGroup()
    if(isSuccess){ setShowModalConfirm(false) }
    else { setShowModalError(true) }
}

const submitAddFunction=async (formInputState)=>{
    //some function from parent --> must return true/false
    let isSuccess= await addFunctionForGroup(formInputState)
    if(isSuccess){ setShowAdd(false) }
    else { setShowModalError(true) }
}

const submitEditFunction=async (formInputState)=>{
    //some function from parent--> must return true/false
    let isSuccess=await editFunctionForGroup(formInputState)
    if(isSuccess){ setShowEdit(false) }
    else { setShowModalError(true) }
} 


return (
    <div className="bgc-lightGray" style={{height:"100%"}}>
        { 
         
            <Tree
                loadData={smallLoadData}
                editData={editData}
                setEditGroup={setEditGroup}
                setAllDeleteId={setAllDeleteId}
                groupState={groupState}
                
                setShowAdd={setShowAdd}
                setShowEdit={setShowEdit}
                setShowModalConfirm={setShowModalConfirm}
                reloadFunctionForGroup={reloadFunctionForGroup}
                filterDataByGroup={filterDataByGroup}
                canGroupChange={canGroupChange}
                clickFolderIcon={clickFolderIcon}
                setClickFolderIcon={setClickFolderIcon}
            />
           
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
            showAdd
            ?<ModalForm
                lb={"เพิ่มข้อมูล"}
                formTemplate={groupForm}
                stateTemplate={groupState}
                loadData={{id:lastRecord.id+1,parentId:editGroup.id}}
                submitFunction={submitAddFunction}
                setShow={setShowAdd}
                submitFuction={submitAddFunction}
                selectData={selectData}
             />
            :null
        }
        {
            showEdit
            ?<ModalForm
                lb={"แก้ไขข้อมูล"}
                formTemplate={groupForm}
                stateTemplate={groupState}
                loadData={editGroup}
                submitFunction={submitEditFunction}
                setShow={setShowEdit}
                submitFuction={submitEditFunction}
                selectData={selectData}
            />
            :null
        }
        {
            showModalError
            ?renderModalError({
                show:showModalError,
                setShow:setShowModalError
            })
            :null
        }
      
    </div>
)
}

export default GroupComponent
