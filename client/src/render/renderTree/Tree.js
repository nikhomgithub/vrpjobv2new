import React from 'react';

import {FaFolderPlus,FaFolder,FaFolderOpen} from 'react-icons/fa';

import {MdRefresh,MdEdit,MdAddCircle,MdDelete,MdFolderSpecial, MdSignalCellularNull} from 'react-icons/md';
import treeUtil from './treeUtil'

import './Tree.css'

const {convertToObject,createGroupTree,findAllChildrenIdByGroupTree,
  openAllParentId} = treeUtil

const Tree=(props)=>{
  //console.log('Tree')
  const {loadData,editData,
         setEditGroup,
         setAllDeleteId,
         groupState,
         setShowAdd,setShowEdit,setShowModalConfirm,
         reloadFunctionForGroup,
         filterDataByGroup,
         canGroupChange,
         clickFolderIcon,
         setClickFolderIcon

        }=props

  const [isSecond,setIsSecond] = React.useState(false)    

  React.useEffect(()=>{
    //console.log(`isSecond : ${isSecond}`)
    if(!isSecond){
        setIsSecond(true)
    }
  },[isSecond])
 
  const [groupTree,setGroupTree]=React.useState(createGroupTree({group:loadData}))
  const [tempObj,setTempObj]=React.useState(convertToObject(groupTree,groupState))
  const [selectGroupObjectId,setSelectGroupObjectId]=React.useState(null)          

  React.useEffect(()=>{
  if(isSecond){
    if(loadData){
      //console.log('loadData')
      if(Array.isArray(loadData)){
        if(loadData.length>0){
          const tempGroupTree=createGroupTree({
            group:loadData,
            prevGroupTree:groupTree
          })
          setGroupTree(tempGroupTree)
        }
      }
    }
  }
  },[loadData])

  React.useEffect(()=>{
  if(isSecond){
    if(groupTree){
      //console.log('groupTree')
      setTempObj(convertToObject(groupTree,groupState))
    }
  }  
  },[groupTree])

  React.useEffect(()=>{
  if(isSecond){
    if(editData){
      setSelectGroupObjectId(editData.groupId)
      setGroupTree(openAllParentId({groupTree,editGroupId:editData.groupId}))
    }
  }
  },[editData])

  React.useEffect(()=>{


  if(isSecond){

    if(selectGroupObjectId&&groupTree){
      groupTree.map(i=>{
        if(i.id==selectGroupObjectId){
          setEditGroup(i)
        }
      })
      const temp=findAllChildrenIdByGroupTree(selectGroupObjectId,groupTree)
      setAllDeleteId(temp)
    }
  }
  },[selectGroupObjectId])
  
  //===================================
  const getBGcolor=(id)=>{
    if(!selectGroupObjectId){return null}
    if(selectGroupObjectId==id){
      return '2px solid rgb(244, 248, 4)'
    }
  }

  const changeKeyInData=({data,setData,id,key,value})=>{
    let tempData=[]
    if(data){
      data.map(i=>{
          if (i.id==id){
              tempData=[...tempData,{...i,[key]:value}]
          }else{
              tempData=[...tempData,i]
          }
      })
    setData([...tempData])
    }
  }   

  //================================
  const renderSubFolder = (subArrs) =>{
    
    return ( subArrs.map((i,index)=> {

      //if(!i){return null}
      return(  
      <div key={index} className="Tree-box">    
        {
          i.open    
          ?<div>
              <FaFolderOpen 
                  className="Tree-open-icon"
                  style={{display:'inline'}}
                  onClick={e=>{                //ถ้าคลิกรูปไอคอน folder เปิดนี้    
                      if(i.parentId==1){
                        setClickFolderIcon(i.id)
                      }   
                    
                      changeKeyInData({
                          data:groupTree,
                          setData:setGroupTree,
                          id:i.id,
                          key:"open",
                          value:false
                      })
                  }}
              />
              
              {i.groupName
              ?<p id={i.groupName}
                  onClick={e=>{
                      setSelectGroupObjectId(i.id)
                      filterDataByGroup(i.id)
                  }}
                  className="Tree-p"
                  style={{color:selectGroupObjectId==i.id?'red':'black',
                          fontSize:i.groupName=="main"?"1.5rem":null
                          }}
              >{`${i.id}.${i.groupName}`}
              </p>
              :null
              }
              <div >
                  {
                  renderSubFolder(i.folders)
                  }    
              </div>
          </div>
          :<div>
              
              {i.children
                ?i.children.length>0  
                  
                  ?<FaFolderPlus 
                      className="Tree-close-icon"
                      style={{display:'inline',
                              border:getBGcolor(i.id)
                    }} 
                      onClick={e=>{    //ถ้าคลิกรูปไอคอน folder ปิดนี้  
                          if(i.parentId==1){
                            setClickFolderIcon(i.id)
                          }    
                          changeKeyInData({
                              data:groupTree,
                              setData:setGroupTree,
                              id:i.id,
                              key:"open",
                              value:true
                          })
                      }}
                  />
                  :<FaFolder
                      className="Tree-close-icon"
                      style={{display:'inline',
                              border:getBGcolor(i.id)
                      }} 
                      onClick={e=>{ //ถ้าคลิกรูปไอคอน folder ปิดนี้       
                          changeKeyInData({
                              data:groupTree,
                              setData:setGroupTree,
                              id:i.id,
                              key:"open",
                              value:true
                          })
                      }}
                  />
                  
                :null  
              }
              {i.groupName
              ?<p id={i.groupName}
                  onClick={e=>{
                    setSelectGroupObjectId(i.id)
                    filterDataByGroup(i.id)
                  }}
                  className="Tree-p"
                  style={{color:selectGroupObjectId==i.id?'red':'black',
                          fontSize:i.groupName=="main"?"1.5rem":null
                          }}
              >{`${i.id}.${i.groupName}`}
              </p>
              :null
              }
          </div>
        }
      </div>
      )}
    ))
  }
  
  //==============================

  return(
    <div className="h-100 w-100" style={{position:"relative"}}>
    
      <div className="h-5">
        <MdRefresh className="lg-icon" onClick={e=>{
          setSelectGroupObjectId(null)
          reloadFunctionForGroup()
        }}
        />
        {selectGroupObjectId>0&&canGroupChange
          ?<MdAddCircle className="lg-icon" onClick={e=>{setShowAdd(true)}}/>
          :null
        }
        {selectGroupObjectId>1&&canGroupChange
          ?<MdEdit className="lg-icon"  onClick={e=>{setShowEdit(true)}} />
          :null
        }
        {selectGroupObjectId>1&&canGroupChange
          ?<MdDelete className="lg-icon" 
              onClick={e=>{
                setShowModalConfirm(true)
                setSelectGroupObjectId(null)
              }}/>
          :null
        }
              
      </div>

      <div className="w-100 h-95"
            style={{overflowY:"scroll",overflowX:"scroll",}}
      >
        { tempObj
          ?renderSubFolder(tempObj)
          :null
        }
      </div>
    </div>
  )
}

Tree.defaultProps={
  loadData:[],
  editData:null,
  setEditGroup:()=>{},
  setAllDeleteId:()=>{},
  groupState:{},
  setShowAdd:()=>{},
  setShowEdit:()=>{},
  setShowModalConfirm:()=>{},
  filterDataByGroup:()=>{},
  canGroupChange:true
}  
export default Tree
