
const convertTableTemplateObjToArray=(objTableTemplate)=>{
    
    if(!objTableTemplate){
        return null
    }
    
    const objKeys=Object.keys(objTableTemplate)

    let tempArray=[]

    objKeys.map(i=>{
        const {lb,type,width,showCol,
               showColHead,showSum}=objTableTemplate[i]

        const temp={
            colName:i,
            lb,type,width,showCol,showColHead,showSum
        }
        tempArray=[...tempArray,temp]
    })

    return tempArray
}

const converTableTemplateArrayToObj=(arrayTableTemplate)=>{
    
    if(!arrayTableTemplate){
        console.log('null')
        return null
    }

    if(Array.isArray(arrayTableTemplate)){
        if(arrayTableTemplate.length==0){
            console.log('Array length = 0')
            return null
        }
    }
    
    let tempObj={}

    arrayTableTemplate.map(i=>{
        const {colName,...remaining}=i
        const temp={[colName]:remaining}
        tempObj={...tempObj,...temp}
    })
    return tempObj
}

const createTableTemplate=({tableTemplate,userId,shopId})=>{
    console.log(userId)
    console.log(shopId)
    
    if(!tableTemplate || !userId || !shopId){
        return null
    }

    let tempArray=[]

    const objKeys=Object.keys(tableTemplate)

    objKeys.map(i=>{
        
        const a ={
                    tableName:i,
                    id:userId,
                    shopId,
                    template:convertTableTemplateObjToArray(tableTemplate[i])
                }
        tempArray=[...tempArray,a]
    })

    return tempArray
}

module.exports = {createTableTemplate,
                  converTableTemplateArrayToObj,
                  convertTableTemplateObjToArray}
