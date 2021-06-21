import React from 'react';
import stateUtil from '../../util/stateUtil'
import {FaPlusSquare,FaMinusSquare} from 'react-icons/fa'; 

import '../../render/Modal.css'
//=============================

const {changeKeyKey}=stateUtil

const renderTableSetting=({
    setShowTableSetting,
    tableTemplate,setTableTemplate,
    })=>{

const objKeys = Object.keys(tableTemplate);                
             
return(
<div className="Modal-background">
    <div className="Modal-box">
   
        <div className="Modal-header">
            <div>
                <h1>{'Table Setting'}</h1>
            </div>
        </div>
   
        <div>
            <div className="flex-center-baseline flex-no-wrap" >
                <div className="lc6 flex-center-center">
                    <h5>Subject</h5></div>
                <div className="lc6 flex-center-center">
                    <h5>Show</h5></div>
            </div>
            {
             objKeys.map((i,index)=>(
                <div className="flex-center-baseline flex-no-wrap m-1" 
                     key={index} >
                    <div className="lc6 flex-center-center">
                        <p>{tableTemplate[i].lb}</p></div>
                    <div className="lc6 flex-center-center">
                        <input
                            type="checkbox"
                            checked={tableTemplate[i].showCol}
                            onChange={e=>{
                                if(index>0){
                                    changeKeyKey({
                                        key:`${i}`,
                                        subKey:'showCol',
                                        value:e.target.checked,
                                        inputState:tableTemplate,
                                        setInputState:setTableTemplate
                                    })
                                }
                            }}
                        />
                    </div>
                </div>
             ))   
            }
        </div>
       
        <div className="Modal-footer">
            <div>
                <button
                    onClick={e=>{setShowTableSetting(false)}}
                >Confirm</button>
            </div>
            <div>
                <button
                    onClick={e=>{setShowTableSetting(false)}}
                >Cancel</button>
            </div>
        </div>

    </div>
</div>
)}
//=============================
export default renderTableSetting
