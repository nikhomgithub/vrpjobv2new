import React from 'react'
import axios from 'axios';
import StateTemplate from '../model/StateTemplate'
import StateUtil from '../model/StateUtil'
import ctUtil from '../util/ctUtil'
//import myheader from '../myheader'

const {basicDataState}=StateTemplate
const {genBlankState}=StateUtil
const {createTableTemplateForPage}=ctUtil

export const MainContext=React.createContext();

const MainContextProvider=(props)=>{
    //console.log('MainContext')
    
    //==========================
    //basicData
    let [basicData,setBasicData] = React.useState(null
       // genBlankState({template:basicDataState}).state
    );

    const [reloadCheckToken,setReloadCheckToken]=React.useState(true)
    const [haveShopToken,setHaveShopToken]=React.useState(false)
    const [haveUserToken,setHaveUserToken]=React.useState(false)
    const [userName,setUserName]=React.useState(null)
    
    const [widthLeft,setWidthLeft]=React.useState(40)
    const [reloadBasicData,setReloadBasicData] = React.useState(true);


    const myheader={headers: {'Content-Type': 'application/json',
    'Shopauthorization':localStorage.getItem('shopauthorization'),
    'Userauthorization':localStorage.getItem('userauthorization')
    }}

    React.useEffect(()=>{
        if(reloadCheckToken){

            if(localStorage.getItem('shopauthorization')){
                setHaveShopToken(true)
            }
            else{
                setHaveShopToken(false)
                localStorage.removeItem('userauthorization')
                localStorage.removeItem('username')
            }

            if(localStorage.getItem('userauthorization')&&
               localStorage.getItem('username')){
                setHaveUserToken(true)
                setUserName(localStorage.getItem('username'))
            }
            else{
                setHaveUserToken(false)
                setUserName(null)
                localStorage.removeItem('userauthorization')
                localStorage.removeItem('username')
            }

            setReloadCheckToken(false)
        }
    },[reloadCheckToken])
    
    
    React.useEffect(()=>{
        //console.log('reloadBasicData')
        //console.log(reloadBasicData)
        if(reloadBasicData){
            
            if(localStorage.getItem('shopauthorization')&&
               localStorage.getItem('userauthorization')
               //to ensure user&shop token in place before request to server
            ){
                axios.post('/basicdata/getcustom',
                {},myheader
                )
                .then(result=>{
                    console.log(`MainContext: basicData: '/basicdata/getcustom'`)
                    console.log(result.data.data[0])
                    setReloadBasicData(false)
                    setBasicData(result.data.data[0])
                    //console.log(result.data.data[0])
                })
                .catch(err=>{
                    //console.log(err)
                    setReloadBasicData(false)
                })
            }
        }
    },[reloadBasicData])
    
//=========================================
//==================================
return(
        <MainContext.Provider value={
            {
               //allTableTemplate,
               //reloadTableTemplate,setReloadTableTemplate,
               myheader,
               basicData,setBasicData,
               reloadBasicData,setReloadBasicData,
            
               reloadCheckToken,setReloadCheckToken,
               haveShopToken,setHaveShopToken,
               haveUserToken,setHaveUserToken,
               userName,setUserName,
               widthLeft,setWidthLeft
            }
        }>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainContextProvider;
