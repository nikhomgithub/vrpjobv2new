const dataCt = require('../controllers/dataCt')

const upload = require('../middleware/upload.js')

const addToReq = require('../middleware/addToReq.js')
const valReqBody=require('../middleware/validation/valReqBody.js')


const dataRt=({router,param,routeTemplate})=>{
    routeTemplate.forEach(i=>{
        if(i.useRoute){
            router[i.type](
                `/${i.route}`,
                addToReq(param,i),
                i.checkAuth(),
                i.checkLevel(),
                upload.array('imageUrl'),
                valReqBody(param.valTemplate),
                dataCt[i.route]
            )
        }
    })
}

module.exports = dataRt