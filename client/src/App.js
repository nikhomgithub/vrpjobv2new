
import React from 'react';

import {Route,Switch,Redirect} from 'react-router-dom';

import Navbar from './component/navbar/Navbar'

import Home from './page/home/Home'
import ShopWelcome from './page/shop/ShopWelcome'
import UserWelcome from './page/user/UserWelcome'
import BasicData from './page/basicdata/BasicData'
import Job from './page/job/Job'

//import Product from './page/product/Product'


import {MainContext} from './context/MainContext';

import './App2.css'

function App() {

const {username,setUsername,
   reloadCheckToken,setReloadCheckToken,
   haveShopToken,setHaveShopToken,
   haveUserToken,setHaveUserToken,
   userName,setUserName,
   basicData,myheader
}=React.useContext(MainContext)

return(
<div className="bgc-lightGray" style={{height:"100vh",width:"100vw"}}>
   <div className="h-5">
         <Navbar/>   
   </div>

   <div className="h-95">
      <Switch>
         <Route path="/home" component={Home}/>
         <Route exact path="/pageshop" component={haveShopToken?UserWelcome:ShopWelcome}/>
         <Route exact path="/pageuser" component={haveShopToken?UserWelcome:ShopWelcome}/> 
         <Route exact path="/pagebasicdata" 
            component={haveShopToken?(haveUserToken?BasicData:UserWelcome):ShopWelcome} /> 
         <Route exact path="/pagejob" 
            component={haveShopToken?(haveUserToken?Job:UserWelcome):ShopWelcome} />    
         <Route exact path="/" render={() => <Redirect to="/home" />} />   
      </Switch>
   </div>

</div>
)

}
export default App;


/*


import React from 'react';

import {Route,Switch,Redirect} from 'react-router-dom';

import Navbar from './component/navbar/Navbar'

import Home from './page/home/Home'
import ShopWelcome from './page/shop/ShopWelcome'
import UserWelcome from './page/user/UserWelcome'
import BasicData from './page/basicdata/BasicData'
import Partner from './page/partner/Partner'
import Transaction from './page/transaction/Transaction'
import TransactionLog from './page/transaction/TransactionLog'
import Product from './page/product/Product'


import {MainContext} from './context/MainContext';

import './App2.css'

function App() {

const {username,setUsername,
   reloadCheckToken,setReloadCheckToken,
   haveShopToken,setHaveShopToken,
   haveUserToken,setHaveUserToken,
   userName,setUserName,
   basicData,myheader
}=React.useContext(MainContext)

return(
<div className="bgc-lightGray" style={{height:"100vh",width:"100vw"}}>
   <div className="h-5">
         <Navbar/>   
   </div>

   <div className="h-95">
      <switch>
         <Route exact path="/" component={Home}/>
         <Route exact path="/shop" component={haveShopToken?UserWelcome:ShopWelcome}/>
         <Route exact path="/user" component={haveShopToken?UserWelcome:ShopWelcome}/> 
         <Route exact path="/basicdata" 
            component={haveShopToken?(haveUserToken?BasicData:UserWelcome):ShopWelcome} /> 
         <Route exact path="/partner" 
            component={haveShopToken?(haveUserToken?Partner:UserWelcome):ShopWelcome}/> 
         <Route exact path="/product" 
            component={haveShopToken?(haveUserToken?Product:UserWelcome):ShopWelcome}/> 
         <Route exact path="/transaction" 
            component={haveShopToken?(haveUserToken?Transaction:UserWelcome):ShopWelcome}/> 
         <Route exact path="/transactionlog" 
            component={haveShopToken?(haveUserToken?TransactionLog:UserWelcome):ShopWelcome}/> 
         <Route render={() => <Redirect to="/" />} />   
      </switch>
   </div>

</div>
)

}
export default App;

*/