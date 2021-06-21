import React from 'react';
import {FaChartBar,FaChartPie} from 'react-icons/fa';
import { Line,Bar } from "react-chartjs-2";

//===================
function Graph({
            filterData, 
            barColor,
            stateTemplate,
            detailKey
          }) {

//====================
const convertISOdateToShortDate=(data,tableTemplate)=>{
    if(!data){return null}
    if(!Array.isArray(data)){return null}
    if(data.length<1){return null}
    if(!tableTemplate){return null}
    const objKeys = Object.keys(tableTemplate);
    let tempData=[]
    data.map(i=>{
        let temp=i

        objKeys.map(j=>{            
            if(tableTemplate[j].stType=="date"){
                const year=i[j].substring(0,4)
                const month=i[j].substring(5,7)
                const date=i[j].substring(8,10)
                //console.log(`${date}-${month}-${year}`)
                temp={...temp,[j]:`${date}-${month}-${year}`}
                //temp={...temp,[j]:i[j].substring(0,10)}
            }
            
        })

        tempData=[...tempData,temp]
    })
    return tempData
}

const genOptionArray=(graphStateTemplate)=>{

    const objKeys = Object.keys(graphStateTemplate);

    let tempX=[]
    let tempY=[]

    objKeys.map(i=>{
        const {stType,lb}=graphStateTemplate[i]
        if(stType=="number"||stType=="string"||stType=="date"){
            const tempObjX={key:i,lb:lb}
            //console.log(tempObjX)
            tempX=[...tempX,tempObjX]
        }
        if(stType=="number"){
            const tempObjY={key:i,lb:lb}
            //console.log(tempObjY)
            tempY=[...tempY,tempObjY]
        }
    })

    return {optionX:tempX,optionY:tempY}
}

const genLb=({graphStateTemplate,key,setLb})=>{
    const objKeys = Object.keys(graphStateTemplate);

    objKeys.map(i=>{
        if(i==key){
            setLb(graphStateTemplate[i].lb)
        }
    })
}

//================================
//==================================
const [isSecond,setIsSecond]=React.useState(false)

React.useEffect(()=>{
    //console.log(`isSecond : ${isSecond}`)
    if(!isSecond){
        setIsSecond(true)
    }
},[isSecond])

const filterDataWithShorDate=convertISOdateToShortDate(filterData,stateTemplate)

const [graphData,setGraphData]=React.useState(
    filterDataWithShorDate
)

//======================================
//======================================
const [graphStateTemplate,setGraphStateTemplate]=React.useState(stateTemplate)

const [keyX,setKeyX]=React.useState(null)
const [keyY,setKeyY]=React.useState(null)
const [lbX,setLbX]=React.useState(null)
const [lbY,setLbY]=React.useState(null)

const [option,setOption]=React.useState(genOptionArray(graphStateTemplate))

React.useEffect(()=>{
    
    setOption(genOptionArray(graphStateTemplate))
    
},[graphStateTemplate])

React.useEffect(()=>{
    if(isSecond){
        if(keyX){
            genLb({graphStateTemplate,key:keyX,setLb:setLbX})
        }
    }
},[keyX])
React.useEffect(()=>{
    if(isSecond){
        if(keyY){
            genLb({graphStateTemplate,key:keyY,setLb:setLbY})
        }
    }
},[keyY])

//======================

const genArrayOfKey=({data,key})=>{
    if(!key){return null}

    let temp=[]
    data.map(i=>{
      temp=[...temp,i[key]]
    })
    return temp
}

const data = {
    //labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    //labels: [1, 2, 3, 4, 5, 6],
    labels:genArrayOfKey({data:graphData,key:keyX}),
    
    datasets: [
        {
            label: `${lbX} - ${lbY}`,
            data: genArrayOfKey({data:graphData,key:keyY}),
            fill: true,
            backgroundColor: barColor,
            borderColor: barColor
        },
    ],
};

//======================================

let [selectDetailId,setSelectDetailId]=React.useState(null)

const addDetailToGraphDataAndState=(id,graphData,stateTemplate)=>{
    
    const objState=Object.keys(stateTemplate.detail.stChildren);
    
    let stChildren = stateTemplate.detail.stChildren

    let tempStChildren={}

    objState.map(i=>{
        //console.log(stChildren[i])
        tempStChildren={
            ...tempStChildren,
            [`detail-${i}`]:{
                ...stChildren[i],
                lb:`detail-${stChildren[i].lb}`
            }
        }
    })

    const tempStateTemplateWithDetail={...stateTemplate,...tempStChildren}

    let tempArrayData=[]

    graphData.map(j=>{

        j.detail.map(l=>{
            if(l.id==id){
                let tempDetailObj={}
                objState.map(k=>{
                    tempDetailObj={...tempDetailObj,[`detail-${k}`]:l[k]}
                })
                tempArrayData=[...tempArrayData,{...j,...tempDetailObj}]
            }
        })

    })

    return {stateTemplate:tempStateTemplateWithDetail,data:tempArrayData}

}

//====================================

const displayDetailOption=(filterData,stateTemplate)=>{

    let tempArrayOfId=[]
    let tempArrayObj=[]

    filterData.map(i=>{
        i.detail.map(j=>{
            if(j.id){
            tempArrayOfId=[...tempArrayOfId,j.id]
            tempArrayObj=[...tempArrayObj,j]
            }
        })
    })

    let uniqueArray = [...new Set(tempArrayOfId)];

    let optionArray=[]
    uniqueArray.map(k=>{
        for (let l=0;l<tempArrayObj.length;l++){
            if(k==tempArrayObj[l].id){
                const temp={id:k,[detailKey]:tempArrayObj[l][detailKey]}
                optionArray=[...optionArray,temp]
                break
            }
        }
    })

    return(
    <select
        value={selectDetailId}
        onChange={e=>{
            const temp=addDetailToGraphDataAndState(e.target.value,
                    filterDataWithShorDate,stateTemplate)

            setGraphStateTemplate(temp.stateTemplate)
            setGraphData(temp.data)
            setSelectDetailId(e.target.value)
        }}
    >
        <option value="" hidden>list...</option>
        {
        optionArray.map((k,index)=>
        <option key={index} value={k.id}>{`${k.id}.${k[detailKey]}`}</option>)
        }
    </select>
    )   
}

//======================

return(
    <div className="h-100 w-100">
                
        <div className="w-100"
                style={{display:"flex",
                    justifyContent:"start",alignItems:"baseline",
                    marginBottom:"0.3rem",
                    height:"10%"
                    }}> 
            
                <div className="xc2">
                    <p>Horizontal Data</p>    
                </div>
                <div className="xc3">
                    <select
                        value={keyX}
                        onChange={e=>{setKeyX(e.target.value)}}
                    >
                    <option value="" hidden>list...</option>
                    {
                        option.optionX.map((m,index)=>
                        <option key={index} value={m.key}>{m.lb}</option>)
                    }
                    </select>   
                </div>
                <div className="xc2">
                    <p>Vertical Data</p>    

                </div>
                <div className="xc3">
                    <select
                        value={keyY}
                        onChange={e=>{setKeyY(e.target.value)}}
                    >
                    <option value="" hidden>list...</option>
                    {option.optionY.map((m,index)=>
                        <option key={index} value={m.key}>{m.lb}</option>)}
                    </select>    
                </div>
                {    
                stateTemplate.detail
                ?<>
                    <div className="xc2">
                        detail Data
                    </div>
                    <div className="xc3">
                        {
                        displayDetailOption(filterData,stateTemplate)
                        }
                    </div>
                </>
                :null
                }         
                        
        </div>
        <div className="w-100" 
            style={{height:"90%"}}
        >
            <Bar data={data} 
                options={{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                    }
                        }]
                    }
                }}  
            
            />
        </div>
                
    </div>

);
}
Graph.defaultProps={
    lb:"Graph",
    filterData:null,
    barColor:"#FF6F61",
    stateTemplate:{},
    detailKey:"name"
}

export default Graph;