const axios = require('axios')

const myheader={headers: {'Content-Type': 'application/json'}}

const mainUrl="varaporn.net"

const shopQry = {shopName:"shopa",password:"shopa"}


const getBackup = async () => {
  try {

    await axios.post(`http://${mainUrl}/shop/backup`,shopQry,myheader)
    await axios.post(`http://${mainUrl}/user/backup`,shopQry,myheader)

    await axios.post(`http://${mainUrl}/basicdata/backup`,shopQry,myheader)
    await axios.post(`http://${mainUrl}/job/backup`,shopQry,myheader)

  } catch (error) {
    console.log(error)
  }
}

console.log('test')
getBackup()