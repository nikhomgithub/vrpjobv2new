/*
inputState=
{ id:5, name:"sand", active:true,
  email:["a@mail.com","b@mail.com"],
  address:[{district:"Kapi",phone:["1579","345"]}],
  photoUrl:["/upload/employee/room-8.jpeg"]},
  education:{highSchool:"BRR",university:"KU"}
}
*/

//แก้ไข id
//changeKey({key:"id",value:e.target.value,inputState,setInputState})
const changeKey=({key,value,inputState,setInputState})=>{
    setInputState({...inputState,[key]:value})
}

//แก้ไข email:["peter1@mail.com","peter2@mail.com"]
const changeArray=({key,value,idx,inputState,setInputState})=>{ 
    let temp=[]
    inputState[key].forEach((i,index)=>{
        if(index==idx){
            temp=[...temp,value]
        }else{
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[key]:temp})
}
//เพิ่ม "" email:["peter1@mail.com","peter2@mail.com"]
const addArray=({key,inputState,setInputState})=>{ 
    let temp=[...inputState[key],"" ]
    setInputState({...inputState,[key]:temp})
}
//ลบ email:["peter1@mail.com","peter2@mail.com"]
const deleteArray=({key,idx,inputState,setInputState})=>{
    let temp=[]
    inputState[key].forEach((i,index)=>{
        if(index!=idx){
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[key]:temp})
}
//==========================================
//เพิ่ม address
const addArrayObject=({key,newObj,inputState,setInputState})=>{
    let temp=[...inputState[key],newObj ]
    setInputState({...inputState,[key]:temp})
} 
//ลบ address
const deleteArrayObject=({key,idx,inputState,setInputState})=>{
    let temp=[]
    inputState[key].forEach((i,index)=>{
        if(index!=idx){
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[key]:temp})
}

//แก้ไข district:"Bangbo",
const changeArrayObjectKey=({key,idx,subKey,value,
                            inputState,setInputState})=>{
    let temp=[]
    inputState[key].forEach((i,index)=>{
        if(index==idx){
            const tempObj={...i,[subKey]:value}
            temp=[...temp,tempObj]
        }
        else {
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[key]:temp})
}
//========================================
//แก้ไข phone:["0899214409"]
const changeArrayObjectArray=({key,value,idx,subKey,subIdx,
                              inputState,setInputState})=>{
    let temp=[]
    inputState[key].forEach((i,index)=>{
        if(index==idx){
            let subArray=[]
            i[subKey].forEach((j,index2)=>{
                if(index2==subIdx){
                    subArray=[...subArray,value]
                }   
                else{
                    subArray=[...subArray,j]
                }             
            })
            let tempObj={...i,[subKey]:subArray}
            temp=[...temp,tempObj]
        }
        else {
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[key]:temp})
}
//ลบ phone:["0899214409"]
const deleteArrayObjectArray=({key,idx,subKey,
                subIdx,inputState,setInputState})=>{
    let temp=[]
    inputState[key].forEach((i,index)=>{
        if(index==idx){
            let subArray=[]
            i[subKey].forEach((j,index2)=>{
                if(index2!=subIdx){
                    subArray=[...subArray,j]
                }     
            })
            let tempObj={...i,[subKey]:subArray}
            temp=[...temp,tempObj]
        }
        else {
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[key]:temp})
}
//เพิ่ม "" ใน phone:["0899214409"]
const addArrayObjectArray=({key,idx,subKey,
                        inputState,setInputState})=>{
    let temp=[]
    inputState[key].forEach((i,index)=>{
        if(index==idx){
            const subArray=[...i[subKey],""]
            let tempObj={...i,[subKey]:subArray}
            temp=[...temp,tempObj]
        }
        else {
            temp=[...temp,i]
        }
    });
    setInputState({...inputState,[key]:temp})
}

//================================
const changeKeyKey=({key,subKey,value,inputState,setInputState})=>{
    const tempObj={...inputState[key],[subKey]:value}
    const tempInputState={...inputState,[key]:tempObj}
    setInputState({...tempInputState})
}

const stateUtil={changeKey,changeArray,addArray,deleteArray,
    addArrayObject,deleteArrayObject,changeArrayObjectKey,
    changeArrayObjectArray,
    deleteArrayObjectArray,addArrayObjectArray,changeKeyKey}

export default stateUtil
