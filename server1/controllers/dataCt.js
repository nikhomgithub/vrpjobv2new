const casual = require('casual');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const shopAndUser=require('./shopAndUser')
const developer=require('./developer')
const {    
       shopsignup,shoplogin,ownerlogin,
       shopchangepassword,ownerchangepassword,
       getshop,getlimitshop,deleteshop,updateshop,
       adduser,login,changepassword
} = shopAndUser
       
const {
       init,restore,backup,
       getcustom,getlimit,
       deleteall,deletecustom,deletetransaction,deletegroup,
       addcustom,addtransaction,addgroup,
       updatecustom,updatetabletemplate,updatetransaction,updategroup
} = developer

exports.init=(req,res,next)=>{init(req,res,next)}
exports.restore=(req,res,next)=>{restore(req,res,next)}
exports.backup=(req,res,next)=>{backup(req,res,next)}

exports.getcustom=(req,res,next)=>{getcustom(req,res,next)}
exports.getlimit=(req,res,next)=>{getlimit(req,res,next)}

exports.deleteall=(req,res,next)=>{deleteall(req,res,next)}
exports.deletecustom=(req,res,next)=>{deletecustom(req,res,next)}
exports.deletetransaction=(req,res,next)=>{deletetransaction(req,res,next)}
exports.deletegroup=(req,res,next)=>{deletegroup(req,res,next)}

exports.addcustom=(req,res,next)=>{addcustom(req,res,next)}
exports.addtransaction=(req,res,next)=>{addtransaction(req,res,next)}
exports.addgroup=(req,res,next)=>{addgroup(req,res,next)}

exports.updatecustom=(req,res,next)=>{updatecustom(req,res,next)}
exports.updatetabletemplate=(req,res,next)=>{updatetabletemplate(req,res,next)}
exports.updatetransaction=(req,res,next)=>{updatetransaction(req,res,next)}
exports.updategroup=(req,res,next)=>{updategroup(req,res,next)}

//==========================

exports.shopsignup=(req,res,next)=>{shopsignup(req,res,next)}
exports.shoplogin=(req,res,next)=>{shoplogin(req,res,next)}
exports.ownerlogin=(req,res,next)=>{ownerlogin(req,res,next)}
exports.shopchangepassword=(req,res,next)=>{shopchangepassword(req,res,next)}
exports.ownerchangepassword=(req,res,next)=>{ownerchangepassword(req,res,next)}


exports.getshop=(req,res,next)=>{getshop(req,res,next)}
exports.getlimitshop=(req,res,next)=>{getlimitshop(req,res,next)}
exports.deleteshop=(req,res,next)=>{deleteshop(req,res,next)}
exports.updateshop=(req,res,next)=>{updateshop(req,res,next)}


exports.login=(req,res,next)=>{login(req,res,next)}
exports.changepassword=(req,res,next)=>{ changepassword(req,res,next) }
exports.adduser=(req,res,next)=>{ adduser(req,res,next)}


