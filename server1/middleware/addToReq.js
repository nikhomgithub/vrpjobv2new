const {genDateFolder} = require('./middlewareUtil.js')

const addToReq=(param,i)=>{
    const {modal,initData,restoreData,backupFolder,
           addLimit,
           tokenName,routeName,folder}=param
    return (req,res,next)=>{

        req.modal=modal
        req.initData=initData
        req.restoreData=restoreData
        req.backupData=backupFolder
        req.addLimit=addLimit
        req.folder=genDateFolder(folder)
        req.tokenName=tokenName
        req.routeAddress=`/${routeName}/${i.route}`
        req.secondAddress=`/${i.route}`

        next()
    }
    
}

module.exports = addToReq;


