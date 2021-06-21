/*

import renderModalImage from './renderModalImage'

const [showModalImage,setShowModalImage]=React.useState(false)
let [imageSrc,setImageSrc]=React.useState(null)

<img className="img" 
    src={imgSrc} 
    ref={refImg}
    style={{width:"auto"}}
    onClick={e=>{
        setImageSrc(imgSrc)
        setTimeout(()=>{
            setShowModalImage(true)
        },50)
    }} 
/>

render
{renderModalImage({show:showModalImage,setShow:setShowModalImage,imgSrc:imageSrc})}
*/

import React from 'react';
import '../../render/Modal.css'
const renderModalImage=({show,setShow,imgSrc,modalImageWidth,setModalImageWidth})=>{
return(
    show
    ?<div className="Modal-background">
        <div style={{width:"90%",height:"90%",
                     border:"solid black 1px",
                     position:"relative",
                     overflow:"scroll"}}>
            <img className="" 
                 onClick={e=>{setShow(false)}} 
                 src={imgSrc} 
                 style={{width:`${modalImageWidth}%`}} />
            
            <div  style={{position:"fixed",top:"5px",width:"90vw"}}>
                <input type="range" min="10" max="200"   
                    value={modalImageWidth}
                    onChange={e=>{setModalImageWidth(e.target.value)}} 
                />
            </div>       
        </div>
     
    </div>
    :null
)}

export default renderModalImage


/*
   <div style={{height:"100%",
                     width:"100%",
                     objectFit:"cover",
                     overflow:"scroll"}} >
            <img className="" 
                 onClick={e=>{setShow(false)}} 
                 src={imgSrc} 
                 style={{width:`${modalImageWidth}%`}} />

            <div  style={{position:"absolute",top:"5px",width:"100%"}}>
                <input type="range" min="10" max="200"   
                    value={modalImageWidth}
                    onChange={e=>{setModalImageWidth(e.target.value)}} 
                />
            </div>     
        </div>


*/