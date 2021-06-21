//==========================    
//test   : <h4>{showArray(people[0].email)}</h4>
//result : peter1@mail.com, peter2@mail.com

const showArray=(arrs)=>{
    if(arrs){if(arrs.length>0){ 
        let temp =''
        arrs.forEach((i,index)=>{
            temp=`${temp} ${i}`
            
            if(index!=arrs.length-1){
                temp=`${temp}, `
            }
           
        })
         return temp
    }}
}

//===========================
// <h4>{showObject(people[0])} </h4>
//id : 0, active : true, 
//email : peter1@mail.com, peter2@mail.com, 
//photo : upload/employee/room-1.jpeg, upload/employee/room-2.jpeg,
const showObject=(obj,children)=>{

    const tempArray=Object.keys(obj)

    let temp=''
    tempArray.map((i,index)=>{
        if(!obj[i]){}
        else if(i=="_id") {} 
        else{
            temp=temp+` ${obj[i]}`
            if(index!=tempArray.length-1){
                temp=`${temp},`
            }
        }
    })

    return temp
}    

//==================================
const showAddress=(obj)=>{
    if(obj){
        let {number,building,tambon,district,province,postcode}=obj
        //console.log(obj)
        number=number?`เลขที่ ${number}`:``
        building=building?` อาคาร ${building}`:``
        tambon=tambon?` ตำบล ${building}`:``
        district=district?` อำเภอ ${building}`:``
        province=province?` จังหวัด ${province}`:``
        postcode=postcode?` รหัสไปรษณีย์ ${postcode}`:``

        const address=number+building+tambon+district+province+postcode
        return address
    }
}

//----------------------------------

const showUtil={showArray,showObject,showAddress}

export default showUtil

