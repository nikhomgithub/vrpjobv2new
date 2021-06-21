const tableResize=({tableTemplate,showTable,setShowTable})=>{
    if(tableTemplate){
    
        let tempWidth=0;
        let tempGridCol=""
    
        const objKeys = Object.keys(tableTemplate);
        
        objKeys.map(i=>{
          if(tableTemplate[i].showCol){
            tempWidth=tempWidth+parseInt(tableTemplate[i].width);
            tempGridCol=`${tempGridCol} ${tableTemplate[i].width}px`
          }
        })  
    
        setShowTable({...showTable,width:tempWidth,gridCol:tempGridCol})
      }
}
//========================================

const sortColumn=(filterData,colName,colType,sortType)=>{
  //console.log('sortColumn')
  if(!(colType=="number"||colType=="date"||colType=="string")){
    return
  }

  let tempArray=[]
  let tempFilterData=[]
 
  filterData.map(i=>{
    //this Array will be sorted
    if(colType=="number"){
      tempArray=[...tempArray,parseInt(i[colName])]
    }
    if(colType=="string"||colType=="date"){
      tempArray=[...tempArray,i[colName]]
    }

    //Add ["<checked/>"] filed to tempFilterData
    let tempI={...i,["<checked/>"]:false}
    tempFilterData=[...tempFilterData,tempI]
  })

  if (colType=="number") {    
    if(sortType=="a-b"){
      tempArray.sort(function(a, b){return a - b});
      //console.log('a-b')
    }
    if(sortType=="b-a"){
      tempArray.sort(function(a, b){return b - a});
      //console.log('b-a')
    }
  }

  if (colType=="string"||colType=="date") {
    if(sortType=="a-b"){
      tempArray.sort();
    }
    if(sortType=="b-a"){
      tempArray.sort();
      tempArray.reverse();
    }
  }

  let tempResult=[]

  tempArray.map(i=>{
    
    for (let j=0;j<tempFilterData.length;j++){
      if(!tempFilterData[j]["<checked/>"]){
        if(i==tempFilterData[j][colName]){
          tempResult=[...tempResult,filterData[j]]
          tempFilterData[j]["<checked/>"]=true
          break;
        }
      }
    }

  })
  return tempResult    
}

//=======================================

const tableUtil={tableResize,sortColumn}

export default tableUtil
