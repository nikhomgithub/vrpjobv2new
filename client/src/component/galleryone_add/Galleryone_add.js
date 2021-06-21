
import React from 'react'
import {MdDelete} from 'react-icons/md';
import photoUtil from '../../component/galleryone_add/photoUtil'

import './Galleryone_add.css';

const {fileListItem,changeArrayFile,handleInputFile,
    reloadImage,resetFile,deleteFileUrl,deletePhotoUrl}=photoUtil

export default function Galleryone_add({
            //imgarrs,totalImages,
            fileUrl,arrayFile,setArrayFile,keyName,
            setShowImage,
            inputState,setInputState,
            
        }) {
    //console.log('keyName')
    //console.log(inputState)
    //console.log(keyName)
    //console.log(inputState[keyName])

    let temp=[]
    inputState[keyName].map(i=>{
        if(i!=""){ temp=[...temp,i] }
    })        
    //imarrs = photoUrl+fileUrl
    const imgarrs=[...temp,...fileUrl]
    const totalImages=temp.length+fileUrl.length
           
    //const [imgFrameHeight,setImgFrameHeight]=React.useState('')

    const [imgTrackWidth,setImgTrackWidth]=React.useState('')

    const refFrame=React.useRef();
    
    const refButtonAddPicture=React.useRef()
    
    React.useEffect(()=>{

        if(imgarrs){if(imgarrs.length>0){
            //to get imgFrameHeight 
            if(refFrame){
                //refFrame.current.click()
            }
            //to set imgTrackWidth
            let temp=imgarrs.length*100
            setImgTrackWidth(`${temp}%`)
        }} 
        
    },[])
    
/*
    React.useEffect(()=>{
        if(imgFrameHeight){
            //console.log(imgFrameHeight);
        }
    },[imgFrameHeight])
*/
    const renderImg=(arrs)=>{
        if(arrs){
            return arrs.map((i,index)=>{
                let imgSrc
                let imgName
                let isFile
                //in case of fileUrl
                if(i.blob){
                    isFile=true
                    imgSrc=i.blob
                    imgName=i.name 
                }    
                //in case of PhotoUrl
                else {
                    isFile=false
                    imgSrc=i
                    imgName=i
                }

                return    (
                    <div 
                         key={index} 
                         className=""
                         style={{height:'100%',width:'100%',
                                display:'grid',placeItems: 'center',
                                position:"relative"}}
                        onClick={e=>{
                            reloadImage({setShowImage})
                        }}
                    >
                        
                        <img className="img" src={imgSrc} style={{width:"100%",height:"auto"}} />
                    
                    
                        <MdDelete  
                            style={{
                                position:"absolute",border:isFile?"3px solid red":"3px solid green",fontSize:"3rem",
                                backgroundColor:"white",bottom:"1rem",right:"1rem",
                                zIndex:"0",borderRadius:"50%"
                            }}
                            onClick={e=>{
                                if(isFile){
                                    deleteFileUrl({name:imgName,arrayFile,setArrayFile,reloadImage,setShowImage})
                                    //console.log(imgName)                          
                                }else{
                                    //console.log(imgName)
                                    deletePhotoUrl({name:imgName,inputState,setInputState,keyName,reloadImage,setShowImage})
                                }
                            }}             
                        />
                    </div>   
                    )
                }
            ) 
        }
    } 
    //accept="image/jpeg,image/png,image/jpg,image/*"
    return (
    <div style={{height:"100%",overflow:"hidden"}}>        
        <input
            type="file"
            multiple="multiple" accept="image/jpeg,image/png,image/jpg,image/*"
            style={{display:"none"}}
            ref={refButtonAddPicture}

            onChange={e=>{
                //console.log(e.target.files)
                handleInputFile({files:e.target.files,
                arrayFile,
                setArrayFile})
                
            }}    
        />
            
        <div 
            style={{
                display:"flex",
                alignItems:"baseline",
                justifyContent:"flex-start",
                flexWrap: "wrap",
                width:"100%"
            }}
        >
            <button 
                onClick={e=>{
                    //console.log('inputState')
                    //console.log(inputState)
                    refButtonAddPicture.current.click()
                }} 
            >
                เลือกรูป       
            </button>  
            <p>จำนวนรูป = {totalImages}</p>
        </div>
        {//style={{height:imgFrameHeight,overflow:"auto"}}

        (imgarrs)
        ?
            <div className="img-frame" 
                id="img-id"
                ref={refFrame}
                style={{height:'90%',overflow:"scroll"}}
                onClick={e=>{
                    //const currentWidth=document.getElementById('img-id').getBoundingClientRect().width
                    //setImgFrameHeight(currentWidth*0.57)
                    //setImgFrameHeight($(e.currentTarget).width()*0.57)
                }}    
            >       
                <div className="img-track" 
                    style={{display:'flex',width:imgTrackWidth,height:"100%"}}>
                    {renderImg(imgarrs)}
                </div>  
            </div>
        :null  
        }
    </div>
    )
}
//style={{width:'100%',height:imgFrameHeight,overflow:"auto"}}
