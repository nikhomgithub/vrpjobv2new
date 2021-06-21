import React from 'react'
import {FaRegArrowAltCircleRight} from 'react-icons/fa';


//import $ from 'jquery';
//import './Galleryone.css';

//import Galleryone from './component/galleryone/Galleryone'
//<div style={{width:"300px",border:"1px solid black"}}>
//  <Galleryone imgarrs={["/upload/employee/room-5.jpeg","/upload/employee/room-1.jpeg"]}/>
//</div>

import renderModalImage from './renderModalImage'

export default function Galleryone({imgarrs,width}) {
    
    const [showModalImage,setShowModalImage]=React.useState(false)
    let [imageSrc,setImageSrc]=React.useState(null)

    let [modalImageWidth,setModalImageWidth]=React.useState(100);

    const renderImg=(arrs)=>{

        if(arrs){
            return arrs.map((i,index)=>{
                if(i!==""){


                    let imgSrc
                    let imgName
                    let isFile
                    if(i.blob){
                        isFile=true
                        imgSrc=i.blob
                        imgName=i.name 
                    }    
                    else {
                        isFile=false
                        imgSrc=i
                        imgName=i
                    }
                    //style={{height:'100%',width:'100%',
                    //display:'grid',placeItems: 'center',
                    //}}
                    return    (
                        <div key={index} style={{width:'100%'}}>
                            <img className="img" 
                                 src={imgSrc} 
                                 style={{
                                        objectFit:"cover",
                                    }}
                                    onClick={e=>{
                                        setImageSrc(imgSrc)
                                        setTimeout(()=>{
                                            setShowModalImage(true)
                                        },50)
                                    }} 
                            />
                        </div>   
                    )

                } //if(i!=="")


            }) 
        }
    } 
    //console.log($(`#img-id`).width()*0.57)
    //style={{width:'100%',height:imgFrameHeight,overflow:"auto"}}
    // <div style={{height:"100%",width:entparWidth}} >
    //
    //
    //
    //<div style={{height:"100%"}} >
    return (
        <div style={{width:"100%",height:"100%",position:"relative"}} >
        {
        renderModalImage({
            show:showModalImage,setShow:setShowModalImage,imgSrc:imageSrc,
            modalImageWidth,setModalImageWidth
        })
        }

        {
        (imgarrs)
        ?
            <div className="img-frame border" 
                id="img-id"
                style={{width:`${width}%`,height:"100%",overflowX:"auto",overflowY:"hidden",
        
            }}    
            >   
                {imgarrs.length>1    
                ?<div className="flex-center-center"
                    style={{position:"absolute",right:"0rem",
                            height:"1rem",width:"1rem",
                            backgroundColor:"white",borderRadius:"50%"}}
                 >
                     <div style={{fontSize:"0.7rem"}}> 
                         {imgarrs.length}
                     </div>
                </div>
                :null
                }
                <div className="img-track" 
                        style={{display:'flex',width:`${width*imgarrs.length}%`}}>
                
                {
                  renderImg(imgarrs)
                }
                </div>  
            </div>
        :<p>No Photo</p>
        }
        
        </div>
    )
}
//style={{width:'100%',height:imgFrameHeight,overflow:"auto"}}