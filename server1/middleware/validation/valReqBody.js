//ใช้ req.body มา เทียบกับ validationTemplate แค่นั้น
//แต่ใน เท็มเพลต นั้น ก็มี type:"ประเภท", validate: ฟังชัน,  pattern: เร็กเอ็ก}
const valReqBody = (paramValTemplate)=>{

    //---------------
    const valFunction=({reqBody,template})=>{
        let result=true

        const arrayTemplate=Object.keys(template)

        for(let i=0;i<arrayTemplate.length;i++){
            const tpKey=arrayTemplate[i]
            const {type,validate,regex,children}=template[tpKey]
            
            let pattern
            let message 
            if(regex){
                pattern=regex.pattern
                message=regex.message
            }
            
            if(reqBody[tpKey]){
                if(type=="object"){
                    valFunction({
                        reqBody:reqBody[tpKey],
                        template:children
                    })
                }
                else if(type=="arrayObject"){
                    reqBody[tpKey].map(i=>{
                        valFunction({
                            reqBody:i,
                            template:children
                        })
                    })
                }
                else{
                    result=validate(pattern,reqBody[tpKey])
                    if(!result){
                        //console.log(tpKey)
                        //console.log(reqBody[tpKey])
                        throw({message:`${tpKey}: ${message}`})
                    }
                }
            }
        }
    }
    //-------------------------
    return (req,res,next)=>{
        return next()
        /*
        if(!paramValTemplate){return next()}
     
        try {
            valFunction({
                reqBody:req.body,
                template:paramValTemplate
            })
            return next()
        } 
        
        catch (error) {
            return res.status(400).send(error)
        }
        */     
    }
}

module.exports = valReqBody



