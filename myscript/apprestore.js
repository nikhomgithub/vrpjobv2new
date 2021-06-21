const axios = require('axios')

const myheader={headers: {'Content-Type': 'application/json'}}

const mainUrl="localhost:3001"

const bkDate="15_06_2021"

const qry = {shopName:"shopa",password:"shopa"}

const shopQry={...qry,filePath:`backupData/${bkDate}_shop.json`} 
const userQry={...qry,filePath:`backupData/${bkDate}_user.json`} 
const basicdataQry={...qry,filePath:`backupData/${bkDate}_basicdata.json`} 
const jobQry={...qry,filePath:`backupData/${bkDate}_job.json`} 


const getRestore = async () => {
  try {

    await axios.get(`http://${mainUrl}/shop/init`,myheader)
    await axios.post(`http://${mainUrl}/shop/restore`,shopQry,myheader)
    await axios.post(`http://${mainUrl}/user/restore`,userQry,myheader)
    await axios.post(`http://${mainUrl}/basicdata/restore`,basicdataQry,myheader)
    await axios.post(`http://${mainUrl}/job/restore`,jobQry,myheader)


  } catch (error) {
    console.log(error)
  }
}

console.log('test')
getRestore()
