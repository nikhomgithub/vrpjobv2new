const valReqBody = ({stateTemplate,inputState})=>{
    let valResult=true

    const valFunction=({reqBody,template})=>{
     const arrayTemplate=Object.keys(template)

     arrayTemplate.map((tpKey,tpIdx)=>{    
        if(reqBody[tpKey]){
            const {stType,validate,pattern,children}=template[tpKey]

            if(stType=="object"){
                valFunction({reqBody:reqBody[tpKey],template:template[tpKey].children})
            }
            else if(stType=="arrayObject"){
                reqBody[tpKey].map(i=>{
                    valFunction({reqBody:i,template:template[tpKey].children})
                })
            }else if(stType=="file"){
                
            }
            else{

                valResult=validate(pattern,reqBody[tpKey])
                if(!valResult){
                    throw(`${tpKey} : invalid`)
                }
                
            }
        }
     })
    }
   
    try {
        valFunction({reqBody:inputState,template:stateTemplate})
        return valResult
    } 
    
    catch (error) {
        return error 
    }
               
}

module.exports = valReqBody

