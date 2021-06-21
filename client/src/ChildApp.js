import isSameSecond from 'date-fns/isSameSecond/index.js'
import React from 'react'


const ChildApp = (props) => {
    const {b,setB,isSecond} = props


const [c,setC]=React.useState(b*10)

React.useEffect(()=>{
    if(isSecond){
        console.log(`b inChild = ${b}`)
        setC(b*10)
    }
},[b])

React.useEffect(()=>{
    if(isSecond){
        console.log(`c:${c}`)
    }
},[c])


const renderChildApp=()=>{
    console.log(`renderChildApp : ${b}`)
    return (
    <div>
        <h2>
            renderChilcApp
        </h2>
        <button
            onClick={e=>setB(b+1)}
        >
            {`Add B in Child B=${b}`}
        </button>
        <button
            onClick={e=>setC(c+1)}
        >
            {`Add C=${c}`}
        </button>


    </div>
    )
}

    return (
        <div>
            {renderChildApp()}            
        </div>
    )
}

export default ChildApp

/*


import React from 'react';
//import GroupComponent from './component/dataComponent/GroupComponent'
import AppModalForm from './render/renderForm/AppModalForm'

import './App2.css'
import ChildApp from './ChildApp'

function App() {

console.log('App')
const [isSecond,setIsSecond]=React.useState(false)
React.useEffect(()=>{
    if(!isSecond){
        console.log('isSecond')
        setIsSecond(true)
    }
},[isSecond])


const [a,setA]=React.useState(1)
const [b,setB]=React.useState(10)

React.useEffect(()=>{
    if(isSecond){
        console.log(`a:${a}`)
    }
},[a])

React.useEffect(()=>{
    if(isSecond){
        console.log(`b:${b}`)
    }
},[b])

const renderJa=()=>{
    console.log(`renderJa b:${b}`)
    return (
    <>
        <h1>renderJa</h1>
        <button
            onClick={e=>setA(a+1)}
        >{`Add A =${a}`}</button>
        <button
            onClick={e=>setB(b+1)}
        >{`Add B =${b}`}</button>
        <ChildApp b={b} setB={setB} isSecond={isSecond}/>

    </>
    )
}
return(
<div className="bgc-lightGray" style={{height:"100%"}}>
    {renderJa()}
</div>
)
}
export default App;





*/
