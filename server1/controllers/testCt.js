
exports.addcustom=(req,res,next)=>{
    console.log(req.body)
    return res.status(200).json({msg:"test"});
}