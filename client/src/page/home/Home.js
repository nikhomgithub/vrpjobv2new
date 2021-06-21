import React from 'react';
import {FaWarehouse,FaUserEdit,FaUsers,FaChartLine} from 'react-icons/fa';
import {MdSettingsApplications,MdShoppingCart} from 'react-icons/md';
import {Link} from 'react-router-dom';

import './Home.css'


function Home() {

const refUser=React.createRef()
const refSetting=React.createRef()
const refJob=React.createRef()

return (
    <div className="home-hero">
        <div className="home-bg-screen">
            <div className="home-box">
                
                <div className="home-link" 
                     onClick={e=>{refUser.current.click()}}>
                    <div >
                        <FaUserEdit className="home-icon"/>
                    </div>
                    <div>
                        <h3>ผู้ใช้</h3>
                    </div>
                </div>
                
                <div className="home-link"
                     onClick={e=>{refSetting.current.click()}}>
                    <div>
                        <MdSettingsApplications className="home-icon"/>
                    </div>
                    <div>
                        <h3>ตั้งค่า</h3>
                    </div>
                </div>

    
                <div className="home-link"
                     onClick={e=>{refJob.current.click()}}>
                    <div>
                        <MdShoppingCart className="home-icon"/>
                    </div>
                    <div>
                        <h4>Job</h4>
                    </div>
                </div>

         
            </div>
        </div>
       
        <div className="d-none">
            <Link ref={refUser} to="/pageuser"/>
            <Link ref={refSetting} to="/pagebasicdata"/>
            <Link ref={refJob} to="/pagejob"/>
        </div>
        
    </div>
)
}

export default Home;
/*
<div className="home-link"
onClick={e=>{refProduct.current.click()}}>
<div>
   <FaWarehouse className="home-icon"/>
</div>
<div>
   <h3>คลังสินค้า</h3>
</div>
</div>
*/