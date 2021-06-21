const axios = require('axios')

let myheader={headers: {'Content-Type': 'application/json'}}

const mainUrl=""

const shopQry = {shopName:"shopa",password:"shopa"}

const getInit = async () => {
  try {

    await axios.get(`http://${mainUrl}/shop/init`,myheader)
    console.log('getInit')
    const result= await axios.post(`http://${mainUrl}/shop/shoplogin`,shopQry,myheader)
    

    myheader={ headers: {'Content-Type': 'application/json',
                        'Shopauthorization':`b ${result.data.shopToken}`}
             }
              
    
    await axios.get(`http://${mainUrl}/user/init`,myheader)
    
    await axios.get(`http://${mainUrl}/basicdata/init`,myheader)

    await axios.get(`http://${mainUrl}/job/init`,myheader)

    
  } catch (error) {
    console.log('error')
  }
}

getInit()