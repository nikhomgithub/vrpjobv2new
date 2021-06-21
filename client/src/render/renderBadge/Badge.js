import React from 'react'

import {MdRefresh,MdSwapHoriz,MdSettings,
        MdSearch,MdEdit,MdAddCircle,MdDelete,MdPrint,
        MdChevronLeft,MdChevronRight,MdLastPage} from 'react-icons/md';

//const limitRow=10

const Badge=({      
                badgeState,
                pageNumber,setPageNumber,
                limitRow,
                count,                    

                totalSwapPage, //swapIcon
                swapState,setSwapState,
                
                setReloadData, //reloadIcon
                setShowFilter, //filterIcon
                setShowAdd, //addIcon
                setShowEdit, //editIcon
                setShowModalConfirm, //delIcon
            })=>{

    const {swapShow,swapFunc,
           reloadShow,reloadFunc,
           filterShow,filterFunc,
           addShow,addFunc,
           editShow,editFunc,
           delShow,delFunc,
           printerShow,printerFunc
          } = badgeState

    //console.log('Badge')
    //===========================
            
    //==============================
    const changeSwapState=()=>{
        if(swapState<totalSwapPage-1){
            setSwapState(swapState+1)
        }
        if(swapState==totalSwapPage-1){
            setSwapState(0)
        }
    }


    const [totalPage,setTotalPage]=React.useState( //04-06-2021
        Math.ceil(count/limitRow)
    )
    React.useEffect(()=>{ //04-06-2021
        setTotalPage(Math.ceil(count/limitRow))
    },[count,limitRow])
    return(

        <div className="badge-frame-xc12"> 
        
        <div className="flex-center-center flex-no-wrap xc12 jc-start"
              style={{overflow:"auto",justifyContent:"flex-start"}}>

            {swapShow
            ?<div>
                <MdSwapHoriz
                className="lg-icon"
                onClick={e=>{
                    changeSwapState()
                    if(swapFunc){swapFunc()}
                }}
                />
            </div>:null}
            

            {reloadShow
            ?<div>
                <MdRefresh
                className="lg-icon"
                onClick={e=>{
                    setReloadData(true)
                    if(reloadFunc){reloadFunc()}
                }}
                />
            </div>:null}
               
            {filterShow
            ?<div>
                <MdSearch
                    className="lg-icon"
                    onClick={e=>{ 
                        setShowFilter(true)
                        if(filterFunc){filterFunc()}
                    } } 
                />
            </div>:null}
            
            {addShow
            ?<div>    
                <MdAddCircle
                    className="lg-icon"
                    onClick={e=>{ 
                        setShowAdd(true)
                        if(addFunc){addFunc()}
                    }}
                />
            </div>:null}

            {editShow
            ?<div>   
                <MdEdit 
                    className="lg-icon"
                    onClick={e=>{
                        setShowEdit(true)
                        if(editFunc){editFunc()}
                    }}
                />
            </div>:null}
            
            {delShow
            ?<div>
                <MdDelete
                    className="lg-icon"
                    onClick={e=>{
                          setShowModalConfirm(true)
                          if(delFunc){delFunc()}
                        }}
                />
            </div>:null}

            {printerShow
            ?<div>
                <MdPrint
                    className="lg-icon"
                    onClick={e=>{
                        window.print()
                        if(printerFunc){printerFunc()}
                    }}
                />
            </div>:null}
                  
            <div>
                <MdChevronLeft
                    className="lg-icon"
                    style={{visibility:(totalPage>1)&&(pageNumber>1)
                            ?"visible":"hidden"}}
                    onClick={e=>{
                        const temp=parseInt(pageNumber)-1
                        setPageNumber(temp)
                        setReloadData(true)
                    }}
                />
            </div>
            {totalPage>1
             ?<input 
                type="number"
                style={{width:"70px"}}
                value={pageNumber.toString()}
                onChange={e=>{
                    const temp=parseInt(e.target.value)
                    if(temp<=totalPage||!temp){ //04-06-2021
                        setPageNumber(temp)
                        setReloadData(true)
                    }
                }}
              />
             :null
            }        
            {totalPage>1
            ?<div style={{paddingTop:"1rem"}}>
                <p>{`/${totalPage}`}</p>
            </div>
            :null
            }
            {(totalPage>1)&&(pageNumber<totalPage)
            ?<div>
                <MdChevronRight
                    className="lg-icon"
                    onClick={e=>{
                      const temp=parseInt(pageNumber)+1
                      setPageNumber(temp)
                      setReloadData(true)
                    }}
                />
            </div>
            :null}
               
            {(totalPage>1)&&(pageNumber<totalPage)
             ?<div>
                 <MdLastPage
                    className="lg-icon"
                    onClick={e=>{
                        const temp=parseInt(totalPage)
                        setPageNumber(temp)
                        setReloadData(true)
                    }}
                 />
              </div>   
             :null   
            }
        </div>
        
    </div>  
    )
}

Badge.defaultProps={
    badgeState:
        {swapShow:false,swapFunc:()=>{},
        reloadShow:false,reloadFunc:()=>{},
        filterShow:false,filterFunc:()=>{},
        addShow:false,addFunc:()=>{},
        editShow:false,editFunc:()=>{},
        delShow:false,delFunc:()=>{},
        printerShow:false,printerFunc:()=>{},
       }
    ,
    pageNumber:0,
    setPageNumber:()=>{},
    limitRow:0,
    count:0,                    
    totalSwapPage:0,
    swapState:0,
    setSwapState:()=>{},
    
    setReloadData:()=>{},
    setShowFilter:()=>{},
    setShowAdd:()=>{},
    setShowEdit:()=>{},
    setShowModalConfirm: ()=>{},
}

export default Badge

