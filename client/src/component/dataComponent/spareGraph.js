import React from 'react';
import {FaChartBar,FaChartPie} from 'react-icons/fa';
import { Line,Bar } from "react-chartjs-2";

//==========
import SubTable from '../table/SubTable'
import formUtil from '../../render/renderForm/formUtil'

//===================
function GraphComponent({
            lb,
            colorHead,
            selectDataIn, 
            setSelectDataIn,
            graphTableTemplate,
            setGraphTableTemplate,
            showRange,
            barColor
          }) {

//====================
console.log('graphTableTemplate')
console.log(graphTableTemplate)
const genOptionArray=(tableTemplate)=>{
    const objKeys = Object.keys(tableTemplate);

    let tempX=[]
    let tempY=[]

    objKeys.map(i=>{
        const {type}=tableTemplate[i]
        if(type=="number"||type=="string"){
            tempX=[...tempX,i]
        }
        if(type=="number"){
            tempY=[...tempY,i]
        }
        
        if(type=="date"){
            tempX=[...tempX,i]
        }
        
    })
    return {optionX:tempX,optionY:tempY}
}
//===================((================
const convertISOdateToShortData=(data,tableTemplate)=>{
    const objKeys = Object.keys(tableTemplate);
    let tempData=[]
    data.map(i=>{
        let temp=i

        objKeys.map(j=>{            
            if(tableTemplate[j].type=="date"){
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


//const [tableTemplate,setTableTemplate]=React.useState(graphTableTemplate)
const [filterData,setFilterData]=React.useState(  
        convertISOdateToShortData(selectDataIn,graphTableTemplate)
    )
const [editData,setEditData]=React.useState(null)
const [showTableSetting,setShowTableSetting]=React.useState(false)

const [showGraph,setShowGrap]=React.useState(false)
const [keyX,setKeyX]=React.useState(null)
const [keyY,setKeyY]=React.useState(null)
const [lbX,setLbX]=React.useState(null)
const [lbY,setLbY]=React.useState(null)

const [option,setOption]=React.useState(genOptionArray(graphTableTemplate))

const genLb=({tableTemplate,key,setLb})=>{
    const objKeys = Object.keys(tableTemplate);
    console.log('genLb')
    console.log(tableTemplate)
    objKeys.map(i=>{
        if(i==key){
            setLb(tableTemplate[i].lb)
        }
    })
}

React.useEffect(()=>{
    if(keyX){
        genLb({tableTemplate:graphTableTemplate,key:keyX,setLb:setLbX})
    }
},[keyX])
React.useEffect(()=>{
    
    if(keyY){
        genLb({tableTemplate:graphTableTemplate,key:keyY,setLb:setLbY})
    }
},[keyY])

React.useEffect(()=>{
    //Everytime basicData change in context, data in BasicData also change dynamically
    if(selectDataIn){
        setFilterData(convertISOdateToShortData(selectDataIn,graphTableTemplate))
    }
},[selectDataIn])

//======================


const genArrayOfKey=({data,key})=>{
    let temp=[]
    data.map(i=>{
      temp=[...temp,i[key]]
    })
    console.log('genArrayOfKey')
    console.log(temp)
    return temp
}

const data = {
    //labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    //labels: [1, 2, 3, 4, 5, 6],
    labels:genArrayOfKey({data:filterData,key:keyX}),
    
    datasets: [
        {
            label: `${lbX} - ${lbY}`,
            data: genArrayOfKey({data:filterData,key:keyY}),
            fill: true,
            backgroundColor: barColor,
            borderColor: barColor
        },
    ],


};

//======================

return(

    <div className="h-100 w-100">
        
            <div style={{height:"6%",display:"flex",
                         justifyContent:"center",alignItems:"center"}}> 

                  <h5 style={{textAlign:"center",marginRight:"1rem"}}>
                    {lb}
                  </h5>
                  {!showRange
                   ?<FaChartPie className="md-icon"
                    style={{zIndex:"300"}}
                    onClick={e=>setShowGrap(!showGraph)}
                   />
                  :null
                  }
                  
            </div>
            
            {showGraph  
            ?<div className="w-100" style={{height:`94%`,}}>
                    
                <div className="w-100"
                     style={{display:"flex",
                            justifyContent:"start",alignItems:"baseline",
                            marginBottom:"0.3rem",
                            height:"10%"
                            }}> 
                    
                        <div className="xc2">
                            <p>ข้อมูลแนวนอน</p>    
                        </div>
                        <div className="xc3">
                            <select
                                 value={keyX}
                                 onChange={e=>{setKeyX(e.target.value)}}
                            >
                            <option value="" hidden>ตรวจสอบรายการ...</option>
                            {option.optionX.map((m,index)=>
                                <option key={index} value={m}>{m}</option>)}
                            </select>   
                        </div>
                        <div className="xc2">
                            <p>ข้อมูลแนวตั้ง</p>    

                        </div>
                        <div className="xc3">
                            <select
                                value={keyY}
                                onChange={e=>{setKeyY(e.target.value)}}
                            >
                            <option value="" hidden>ตรวจสอบรายการ...</option>
                            {option.optionY.map((m,index)=>
                                <option key={index} value={m}>{m}</option>)}
                            </select>    
                        </div>
                
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
                

            :<SubTable
                    colorHead={colorHead}
                    
                    tableTemplate={graphTableTemplate}
                    setTableTemplate={setGraphTableTemplate}
                    
                    filterData={filterData}
                    setFilterData={setFilterData}
                    
                    editData={editData}
                    setEditData={setEditData}
                
                    showTableSetting={showTableSetting}
                    setShowTableSetting={setShowTableSetting}
                /> 
            }    
            

    </div>

);
}

export default GraphComponent;