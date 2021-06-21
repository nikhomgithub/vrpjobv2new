const dateNow=()=>{
    let temp=new Date()
    temp=temp.toISOString()
    temp=temp.substring(0,10)
    temp=`${temp}T00:00:00.000Z`
    return temp
}  

const dateUtil={dateNow}

export default dateUtil
