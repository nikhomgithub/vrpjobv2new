import React from 'react'
import {MdClose,MdCheck} from 'react-icons/md';

const genLength=(filterData)=>{
  if(filterData){
    return filterData.length
  }
  else{
    return null
  }
}

const Card = (props) => {
    const {filterData,cardTemplate,title,intervalTime}=props

    const [idx,setIdx]=React.useState(0)
    const [length,setLength]=React.useState(genLength(filterData))
    const [showRangeBar,setShowRangeBar]=React.useState(false)
    const [widthTop,setWidthTop]=React.useState(50)

    React.useEffect(()=>{
    if(filterData){
      if(idx==0||idx>0){
        console.log(`idx : ${idx}`)
        setTimeout(()=>{
            console.log('setTimeout')
            if(idx<length-1){
                setIdx(idx+1)
            }
            else{
                setIdx(0)
            }
        },intervalTime)
      }
    }
    },[idx])
    
    const renderEachInputType=(data,templateType,inputType)=>{
      if(templateType=="array"){
          let temp=''
          data.map((i,idx)=>{
              if(idx==0){
                  temp=i
              }
              else{
                  temp=`${temp}, ${i}`
              }
          })
          return temp
      }
      else if(inputType=="date"||inputType=="thaiDate"){
          const date=data.substring(8,10);
          const month=data.substring(5,7);
          const year=data.substring(0,4)
          return (`${date}-${month}-${year}`)
      }
      else{
          return data
      }
    }

    const renderFunction=({tPt,lDt})=>{
        const arrayTemplate=Object.keys(tPt) 

        return ( arrayTemplate.map((tpKey,tpIdx)=>{  

          const { lb,cName,subCName,subFormTemplate,
                  inputType,templateType,iconActionIdx}=tPt[tpKey]
          
          if(templateType=="object"){
            
            return(
              <div key={tpIdx} className={cName}>
                  <div className={subCName[0]}>
                    <p className="">{lb}</p>
                  </div>
                  <div className={subCName[1]}>
                    {
                      renderFunction({
                        tPt:subFormTemplate,
                        lDt:lDt[tpKey],
                      })
                    }
                  </div>
              </div>
            )
            
          }
          else if(templateType=="arrayObject"){
            return(
              <div key={`${tpKey}-${idx}`} className={cName}>
                  <div className={subCName[0]}>
                    <p className="">{lb}</p>
                  </div>                
                  {
                  <div className={subCName[1]}> 
                    <div className="flex-center-start jc-start"> 
                      { 
                      renderFunction({
                        tPt:subFormTemplate,
                        lDt:lDt[tpKey][0]
                      })
                      }
                    </div>
                  </div>
                  }
              </div>
            )
          }  
          else if(templateType=="arrayObjectInTable"){ }
          else if(templateType=="icon"){ }
          else{
            return(
            <div key={tpIdx} className={cName}>
              <div  className="flex-center-center">
                <div className={subCName[0]}>
                    <div className="">{lb}</div>
                </div>
                <div className={subCName[1]} 
                  style={{ 
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center"
                  }}>
                  <div className="w-100 h-100 bd-black flex-center-center" 
                        style={{height:"2.2rem"}}>
                      {renderEachInputType(lDt[tpKey],templateType,inputType)}
                  </div>
                </div>
              </div>
            </div>
            )
          }
        }))
    }
    //===================
    const renderImage1=(arr)=>{
      const totalImage=arr.length
      const trackWidth=`${totalImage*100/2}%`
      return(
        <div className="bd-red flex-center-center" 
             style={{width:"100%",height:"100%",overflow:"auto",position:"relative"}}>
          <p style={{position:"absolute",top:"0",left:"0"}}>{`${idx}:${totalImage}`}</p>
          <div style={{width:trackWidth,height:"80%",display:"flex",
                      position:"absolute",left:"0%"
                     }}>
            {
              arr.map((i,idx)=>
              <div key={idx} className="w-50 bd-black flex-center-center" >
                <img style={{objectFit:"cover"}} 
                      src={arr[idx]}/>
              </div>   
              )
            }
          </div>
        </div>
      )
    }
    //===================
    const renderImage2=(arr)=>{
      const lastIdx=arr.length-1
      let tempArray=[]
      let subTempArray=[]

      arr.map((i,idx)=>{
        if(idx%2==0){
          if(idx==lastIdx){
            subTempArray=[i]
            tempArray=[...tempArray,subTempArray]
          }
          else {
            subTempArray=[i]
          }
        }
        else if(idx%2==1){
          subTempArray=[...subTempArray,i]
          tempArray=[...tempArray,subTempArray]
        }
      })
      //---------------------------
      const totalImage=arr.length
      let trackWidth
      if(totalImage%2==1){
        trackWidth=`${(totalImage+1)*100/4}%`
      }
      else{
        trackWidth=`${totalImage*100/4}%`
      }
      return(
        <div className="w-100 h-100" 
             style={{overflow:"auto",position:"relative"}}>

          <div className="flex-center-center" 
            style={{position:"absolute",top:"0",left:"0",
                    width:"2rem",height:"2rem",
                    backgroundColor:"white",zIndex:"10",
                    borderRadius:"50%",
                   
          }}>
              <p >{`${idx}:${totalImage}`}</p>
          </div>
         
          <div style={{width:trackWidth,height:"100%",display:"flex",
                      position:"absolute",left:"0",top:"0"}}
          > 
          {
            tempArray.map((i,idx)=>
            <div key={idx} className="w-100 h-100 bd-black" >
              {
                i.map((j,idx2)=>
                  <div key={idx2} className="h-50 w-100">
                    <img style={{
                          objectFit:"cover",
                          height:"100%",width:"100%"}} 
                        src={j}/>
                  </div>
                  )
              }
            </div>   
            )
          }
          </div>
        </div>
      )
    }
    //===================
    return (
      filterData&&cardTemplate
      ?<div className="w-100 h-100 flex-center-center"
            style={{position:"relative"}}
      >
        <div className="w-100" 
             style={{height:`${widthTop}%`,overflow:"hidden"}}>
            {title
            ?<div className="w-100 flex-center-center bd-black">
              <h4>{title}</h4>
            </div>
            :null
            }
            {showRangeBar
            ?<div style={{width:"50%",transform:"rotate(90deg)",
                          position:"absolute",top:"20%",left:"-23%",
                          zIndex:"10"
                          }}>
              <div className="flex-center-center">
                <div className="w-10"> 
                  <MdClose className="md-icon"
                    onClick={e=>setShowRangeBar(false)}
                  />
                </div>
                <div className="w-90">
                  <input type="range" orient="vertical"
                      value={widthTop}
                      onChange={e=>{setWidthTop(e.target.value)}} 
                  />
                </div>
              </div>
            </div>
            :<div style={{position:"absolute",top:"0"}}>
              <MdCheck className="md-icon" 
                onClick={e=>setShowRangeBar(true)}
              />
            </div>
            }
            <div className="flex-center-center"
                style={{overflow:"hidden"}}>
            {  
              renderFunction({
                tPt:cardTemplate,
                lDt:filterData[idx],
              }) 
            }
            </div>
        </div>
        <div className="w-100 flex-center-center"
             style={{height:`${100-widthTop}%`}}
        >
          {filterData[idx].photoUrl1
          ?renderImage2(filterData[idx].photoUrl1)
          :null
          }
        </div>
      </div>
      :null
    )
}

Card.defaultProps={
    title:null,
    filterData:null,
    cardTemplate:null,
    intervalTime:1000
}

export default Card

