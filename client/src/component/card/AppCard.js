import React from 'react'
import axios from 'axios'

import Card from './Card'
import FormTemplate from '../../render/renderForm/FormTemplate'
import CardTemplate from '../../component/card/CardTemplate'

import {MainContext} from '../../context/MainContext';

const photoArray=[
    [
        "https://picsum.photos/id/237/400/200",
        "https://picsum.photos/id/2/400/200",
        "https://picsum.photos/400/200/",
    ],
    [
         "https://picsum.photos/id/237/400/200",
        "https://picsum.photos/400/200/",
        "https://picsum.photos/seed/picsum/400/200",
        "https://picsum.photos/id/237/400/200",
        "https://picsum.photos/id/237/400/200",
        "https://picsum.photos/400/200/",
        "https://picsum.photos/seed/picsum/400/200",
        "https://picsum.photos/id/237/400/200",
    ],
    [
        "https://picsum.photos/id/237/400/200",
        "https://picsum.photos/id/231/400/200",
    ],
    [
        "https://picsum.photos/seed/picsum/400/200",
        "https://picsum.photos/400/200/"
    ]
]



const AppCard = (props) => {

const {transactionForm}=FormTemplate
const {transactionCard}=CardTemplate

const {username,setUsername,
    reloadCheckToken,setReloadCheckToken,
    haveShopToken,setHaveShopToken,
    haveUserToken,setHaveUserToken,
    userName,setUserName,
    basicData,myheader
    }=React.useContext(MainContext)

const [filterData,setFilterData]=React.useState(null)
const [reloadData,setReloadData]=React.useState(true) //reloadData

//====================
const getAxios=()=>{
    axios.post(`/transaction/getcustom`,{},myheader)
        .then(result=>{
            let tempArray=[]
            const temp=result.data.data
            temp.map((i,idx)=>{
                tempArray=[...tempArray,{...i,["photoUrl1"]:photoArray[idx]}]
            })

            setFilterData(tempArray)
        })
        .catch(error=>{
            console.log(error)
        })
}
//===========================
React.useEffect(()=>{
    if(reloadData){
        getAxios()
    }
},[reloadData])

    return (
        <div className="w-100 h-100">
         {filterData
         ?<Card
            filterData={filterData}
            cardTemplate={transactionCard}
            intervalTime={3000}
            title={"aaaa"}
         />
         :null
         }
        </div>
    )
}


export default AppCard
/*
title={"OKKK"}
filterData={filterData}
cardTemplate={transactionCard}
*/