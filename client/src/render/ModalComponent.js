import React from 'react';

function ModalComponent({children,funcOK,funcCancel,title,fullScreen}) {
//console.log('ModalComponent')

  return (
    <div className="Modal-background">
        <div className="Modal-box w-100 h-100" style={{minWidth:"90%"}}>

                <div style={{display:"flex",position:"fixed",
                     bottom:fullScreen?"1rem":"4rem",right:"2rem",zIndex:"200"}}>

                        {funcOK
                        ?<div className="mx-1">
                            <button
                                onClick={e=>{
                                    funcOK()
                                }}
                            >Confirm</button>
                        </div>
                        :null
                        }
                        {funcCancel
                        ?<div className="mx-1">
                            <button
                                onClick={e=>{
                                    funcCancel()
                                }}
                            >Cancel</button>
                        </div>
                        :null
                        }
                    </div>

                       

            <div className="" style={{height:"100%"}}>           
                {children}
            </div>

        </div>
    </div>
  );
}

ModalComponent.defaultProps={
    children:null,
    funcOK:null,
    funcCancel:null,
    fullScreen:true
}

export default ModalComponent;
