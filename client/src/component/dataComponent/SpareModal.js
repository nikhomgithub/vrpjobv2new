import React from 'react';

import ModalComponent from '../../render/ModalComponent';

function ModalDataComponent({funcOK,funcCancel}) {

return (
<ModalComponent
    funcOK={funcOK}
    funcCancel={funcCancel}
    title={"เลือกสินค้า"}
    fullScreen={true}
>
{/*
<DataComponent 
    allDataOut={allProduct2}            setAllDataOut={setAllProduct2}
    selectDataOut={selectProduct2}      setSelectDataOut={setSelectProduct2}
    selectGroup={selectGroup2}          setSelectGroup={setSelectGroup2}
    reloadData={reloadProduct2}          setReloadData={setReloadProduct2}
    selectDataInForDetail={null}        setSelectDataInForDetail={()=>{}}
    canChangeData={false}
    />
*/}
</ModalComponent>
)
}

export default ModalDataComponent;
