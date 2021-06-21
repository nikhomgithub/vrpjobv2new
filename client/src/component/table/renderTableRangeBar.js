import React from 'react';
import {MdClose,MdCheck} from 'react-icons/md';


const renderTableRangeBar=({showRange,setShowRange,widthLeft,setWidthLeft})=>{
return(
showRange  
?<div  style={{position:"absolute",bottom:"3rem",
        width:`100%`,zIndex:"200"}}>
    
    <div className="flex-center-center jc-space-between">
        <div className="w-95">
            <input type="range" min="5" max="95"   
                style={{visibility:showRange?"visible":"hidden"}}
                value={widthLeft}
                onChange={e=>{setWidthLeft(e.target.value)}} 
            />
        </div>
        <div className="w-5"
             style={{display:"flex",justifyContent:"flex-end"}}
        >
           <MdClose className="lg-icon" 
                style={{backgroundColor:"rgba(255,255,255,0.5)"}}
                onClick={e=>{setShowRange(!showRange)}}/>
        </div>
    </div>
</div> 
:<MdCheck className="lg-icon"
         style={{position:"absolute",bottom:"3rem",zIndex:"200",right:"0",
                backgroundColor:"rgba(255,255,255,0.5)"}}
          onClick={e=>{setShowRange(!showRange)}}/>
)
}

export default renderTableRangeBar

