const fs = require('fs');

const genDateFolder=(folder)=>{
    
    const currentDate=new Date().toISOString()
    const day=currentDate.substring(8,10)
    const month=currentDate.substring(5,7)
    const year=currentDate.substring(0,4)
    const dateFolder=`${month}_${day}_${year}`

    const dir = `./${folder}/${dateFolder}`;
    //to create date folder if it does not exist
    if (!fs.existsSync(dir)){
        //console.log(fs.existsSync(dir))
        fs.mkdirSync(dir);
       //console.log(`mkdirSync ${dir}`)
    }

    /*
    const testDir='./good/boy'
    if(!fs.existsSync(testDir)){
        fs.mkdirSync(testDir)
    }
    */

    return `${folder}/${dateFolder}`
}


const middlewareUtil={genDateFolder}

module.exports = middlewareUtil;