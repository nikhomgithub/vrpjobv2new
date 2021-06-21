import React from 'react';
import {FaRegCalendarAlt} from 'react-icons/fa'; 

import './Calendar.css';

//==================
function Calendar({inputDate}) {

const thaiMonths=[
    "มค","กพ","มีค","เมย","พค","มิย",
    "กค","สค","กย","ตค","พย","ธค"
]

const engMonths=[
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
]

const thaiDays=[
    "อา","จ","อ","พ","พฤ","ศ","ส"
]

const engDays=[
    "Su","M","Tu","W","Th","F","Sa"
]

let [date,setDate]=React.useState(new Date())

const [thai,setThai]=React.useState(true)

const [showModal,setShowModal]=React.useState(false)

React.useEffect(()=>{
    console.log('inputDate')
    console.log(inputDate)
  },[inputDate])
  
const displayDD_MM_YYYY=(inputDate)=>{
    const day=inputDate.substring(8,10)
    const month=inputDate.substring(5,7)
    const year=inputDate.substring(0,4)
    return `${day}-${month}-${year}`
}
//"2021-01-15T13:58:32.188Z"
// 0123456789
const getSelectedDateThisMonth=(i,date)=>{
    let temp=date.setDate(i)
    temp=new Date(temp)
    setDate(temp)
}

const genThaiFullDate=(date)=>{
    const thaiMonth=thaiMonths[date.getMonth()]
    const thaiDay=thaiDays[date.getDay()]
    const thaiYear=date.getFullYear()+543
    const thaiDate=date.getDate()
    const temp=`${thaiDay} ${thaiDate} ${thaiMonth} ${thaiYear}`
    return temp
}

const genPrevMonthDay=(date)=>{
    const lastFullDayPrevMonth=new Date(date.getFullYear(),date.getMonth(),0)
    const lastDayPrevMonth=lastFullDayPrevMonth.getDay()
    const lastDatePrevMonth=lastFullDayPrevMonth.getDate()

    let prevMonthDay =[]
    for (let i=lastDatePrevMonth-lastDayPrevMonth;i<=lastDatePrevMonth;i++){
        prevMonthDay=[...prevMonthDay,i]
    }
    return prevMonthDay
}

const genThisMonthDay=(date)=>{
    const lastDate=new Date(date.getFullYear(),date.getMonth()+1,0).getDate()
    let thisMonthDay=[]
    for (let j=1;j<=lastDate;j++){
        thisMonthDay=[...thisMonthDay,j]
    }
    return thisMonthDay
}

const genNextMonthDay=(date)=>{
    const lastFullDayThisMonth=new Date(date.getFullYear(),date.getMonth()+1,0)
    const lastDayThisMonth=lastFullDayThisMonth.getDay()

    let nextMonthDay=[]
    for (let k=1;k<=6-lastDayThisMonth;k++){
        nextMonthDay=[...nextMonthDay,k]
    }
    return nextMonthDay
}

const renderModalCalendar=()=>{
    return(
    <div className="container">
        <div className="calendar">

            <div className="month">
                 <div className="arrow year"
                      onClick={e=>{
                        let temp=date.setYear(date.getFullYear()-1)
                        temp=new Date(temp)
                        setDate(temp)
                      }}
                 >
                    &lt;&lt;
                </div>
                <div className="arrow"
                      onClick={e=>{
                        let temp=date.setMonth(date.getMonth()-1)
                        temp=new Date(temp)
                        setDate(temp)
                      }}
                 >
                    &lt;
                </div>
                <div className="month-header"
                    onClick={e=>{
                        setThai(!thai)
                    }}
                >{thai
                        ?thaiMonths[date.getMonth()]+' '+(date.getFullYear()+543)
                        :engMonths[date.getMonth()]+' '+date.getFullYear()
                     }
                </div>
                <div className="arrow"
                      onClick={e=>{
                        let temp=date.setMonth(date.getMonth()+1)
                        temp=new Date(temp)
                        setDate(temp)
                      }}
                >
                    &gt;
                </div>
                <div className="arrow year"
                      onClick={e=>{
                        let temp=date.setYear(date.getFullYear()+1)
                        temp=new Date(temp)
                        setDate(temp)
                      }}
                >
                    &gt;&gt;
                </div>
            </div>

            <div className="weekdays">
                {thai
                 ?thaiDays.map((i,index)=>{
                    return(
                        <div key={index}>{i}</div>
                    )        
                 })
                 :engDays.map((i,index)=>{
                    return(
                        <div key={index}>{i}</div>
                    )        
                 })
                }
            </div>

            <div className="days">
                {
                genPrevMonthDay(date).map((i,index)=>(
                    <div key={index} className="not-current-date">
                        {i}
                    </div>
                ))
                }

                {
                genThisMonthDay(date).map((i,index)=>(
                    <div key={index} 
                         className={i==date.getDate()?"today":null}
                         onClick={e=>{
                            getSelectedDateThisMonth(i,date)
                            setShowModal(false)
                        }}
                    >
                        {i}
                    </div>
                ))
                }
                
                {
                genNextMonthDay(date).map((i,index)=>(
                    <div key={index} className="not-current-date">
                        {i}
                    </div>
                ))
                }
            </div>   

        </div>
    </div>
    )
}

//==================================
return (
    <div style={{width:"100%",height:"100%",position:"relative"}}>

        <input 
            placeholder="dd-mm-yyyy"
            style={{width:"100%",fontSize:"1rem"}}   
            value={displayDD_MM_YYYY(inputDate)}
            onClick={e=>{
                setShowModal(!showModal)
            }}
        />

        <FaRegCalendarAlt
            style={{position:'absolute',
                    top:"0.2rem",right:'0.3rem',
                    fontSize:"1rem",
                }}
            onClick={e=>{
                setShowModal(!showModal)
            }}
        />
        {
            showModal
            ?renderModalCalendar()
            :null
        }
    </div>
  );
}

export default Calendar;
