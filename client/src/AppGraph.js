import React from 'react';

import { Line,Bar } from "react-chartjs-2";

import {MainContext} from './context/MainContext';

import StateTemplate from './model/StateTemplate'; 
//import inputState from './component/table/inputState';
import StateUtil from './model/StateUtil'

import './App2.css'




const filterData= [
{ id:1, date:"2018-01-21", groupName:"ใบจอง", groupId:"1",
  effectStock:"plus", effectOrder:"minus", photoUrl1:[""], partnerId:1,
  title:"นาย",name:"จิตติ",phone:["12345","67890"],

  address:{number:"12",tambon:"good",district:"bad",province:"well",postcode:"2345"},

  //remark:"ของแท้",total:100,reduction:20,grandTotal:80,

  detail:[
       {id:1,barcode:"1",name:"สายพาน1",groupId:1,groupName:"main",unit:"เส้น",
       price:100,quantity:1,result:100,remark:"ok",isRawMat:false},
       {id:2,barcode:"1",name:"สายไฟ2",groupId:1,groupName:"main",unit:"เส้น",
       price:200,quantity:1,result:200,remark:"ok",isRawMat:false},
       {id:3,barcode:"1",name:"สายยาง3",groupId:1,groupName:"main",unit:"เส้น",
       price:300,quantity:1,result:300,remark:"ok",isRawMat:false},
  ]
},
{
  id:2, date:"2018-01-21", groupName:"ใบจอง", groupId:"1",
  effectStock:"plus", effectOrder:"minus", photoUrl1:[""], partnerId:1,
  title:"นาย",name:"จิตติ",phone:["12345","67890"],

  address:{number:"12",tambon:"good",district:"bad",province:"well",postcode:"2345"},

  remark:"ของแท้",total:100,reduction:20,grandTotal:80,

  detail:[
       {id:1,barcode:"1",name:"สายน้ำ4",groupId:1,groupName:"main",unit:"เส้น",
       price:100,quantity:2,result:100,remark:"ok",isRawMat:false},
       {id:2,barcode:"1",name:"ไฟสว่าง5",groupId:1,groupName:"main",unit:"เส้น",
       price:200,quantity:2,result:200,remark:"ok",isRawMat:false},
       {id:3,barcode:"1",name:"ก็อกน้ำ6",groupId:1,groupName:"main",unit:"เส้น",
       price:300,quantity:2,result:300,remark:"ok",isRawMat:false},
  ]
},

]


//==================================
const transactionInputState={
    detail_id:     {toCheck:false,min:0,max:3},
    detail_barcode:{toCheck:false,value:""},
    detail_name:   {toCheck:true,value:"สาย"},
    detail_groupId:{toCheck:false,min:0,max:10},
    detail_groupName:{toCheck:false,value:""},
    detail_unit:   {toCheck:false,value:""},
    detail_isRawMat:   {toCheck:false,value:false},

    detail_price:  {toCheck:true,min:299,max:301},
    detail_quantity: {toCheck:false,min:1,max:10},
    detail_result: {toCheck:false,min:0,max:10},
    detail_remark: {toCheck:false,value:""},
}



//==================================



function App() {

    console.log('App')
    
    const {transactionState}=StateTemplate
    //const {transactionInputState}=inputState
    const {convertFitlerDataToGraphData}=StateUtil


    const [graphData,setGraphData]=React.useState(
      convertFitlerDataToGraphData({
        template:transactionState,
        filterData,
        inputState:transactionInputState
      })
    )
    
    React.useEffect(()=>{
      console.log('graphData')
      console.log(graphData)
    },[graphData])

    const genArray=({data,key})=>{
      let temp=[]
      data.map(i=>{
        temp=[...temp,i[key]]
      })
      return temp
    }

    const data = {
        //labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        //labels: [1, 2, 3, 4, 5, 6],
        labels:genArray({data:graphData,key:"detail_name"}),
        
        datasets: [
          {
            label: "First dataset",
            data: genArray({data:graphData,key:"detail_quantity"}),
            fill: true,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(75,192,192,1)"
          },

        ]
    };
    
return(
<div className="bgc-lightGray" style={{height:"100%"}}>

    <Bar data={data} />

</div>



)
}
export default App;

