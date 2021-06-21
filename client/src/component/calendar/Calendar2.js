import React from 'react';
import './Calendar.css';

//==================
function Calendar() {

const months=[
    "Jan/มค","Feb/กพ","Mar/มีค","Apr/เมย","May/พค","Jun/มิย",
    "Jul/กค","Aug/สค","Sep/กย","Oct/ตค","Nov/พย","Dec/ธค"
]

const days=[
    "Sat/อา","Mon/จ","Tue/อ","Wed/พ","Thu/พฤ","Fri/ศ","Sat/ส"
]

let [date,setDate]=React.useState(new Date())


const getSelectedDateThisMonth=(i,date)=>{
    let temp=date.setDate(i)
    temp=new Date(temp)
    setDate(temp)
}

const genThaiFullDate=(date)=>{
    const thaiDays=[
        "อา","จ","อ","พ","พฤ","ศ","ส"
    ]
    const thaiMonths=[
        "มค","กพ","มีค","เมย","พค","มิย",
        "กค","สค","กย","ตค","พย","ธค",
    ]
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

//==================================
return (
    <div className="container">
        <div className="calendar">
            <div className="month">
                 <div className="arrow"
                      onClick={e=>{
                        let temp=date.setMonth(date.getMonth()-1)
                        temp=new Date(temp)
                        setDate(temp)
                      }}
                 >
                    <i>&lt;</i>
                </div>
                <div className="date">
                    <h1>{months[date.getMonth()]}</h1>
                    <p>{date.toDateString()}</p>
                    <p>{genThaiFullDate(date)}</p>
                </div>
                <div className="arrow"
                      onClick={e=>{
                        let temp=date.setMonth(date.getMonth()+1)
                        temp=new Date(temp)
                        setDate(temp)
                      }}
                >
                    <i>&gt;</i>
                </div>

            </div>
            <div className="weekdays">
                {
                    days.map((i,index)=>{
                        return(
                            <div key={index}>{i}</div>
                        )        
                    })
                }
            </div>
            <div className="days">
                
                {
                genPrevMonthDay(date).map((i,index)=>(
                    <div key={index} className="prev-date">
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
                        }}
                    >
                        {i}
                    </div>
                ))
                }
                
                {
                genNextMonthDay(date).map((i,index)=>(
                    <div key={index} className="next-date">
                        {i}
                    </div>
                ))
                }
            </div>   
        </div>
    </div>
  );
}

export default Calendar;
