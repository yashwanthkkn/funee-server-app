global.fetch = require('node-fetch');
const User = require('../../models/user')
global.navigator = () => null;
const { v4: uuidv4 } = require('uuid');
// const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// const poolData = {
//    UserPoolId: "ap-south-1_7HI0QRtRa",
//    ClientId: "649rdvmscnc765e1nt7ngja3bv",
// };
// const pool_region = "ap-south-1";
// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports.isLoggedIn = (req,res,next)=>{
    if (req.user && req.user.claim == "user") {
        next()
    } else {
        res.redirect('/login');
    }
}

module.exports.Signup = (data,callback)=>{
    var username = data.username;
    var password = data.password;
    if(username && password ){
        User.register(new User({username:username,email:username,claim:"user",joined:Date.now(),uuid:uuidv4(), emailVerified:false,name:null}),password,(err,user)=>{
            if(err){
                callback(err)
            }else{
                callback(null,user)
            }
        })
    }else{
        callback({message:"Insufficient Data"})
    }
}

module.exports.changePassword = (data,callback)=>{
    var uuid = data.uuid;
    var cPassword = data.cPassword;
    var nPassword = data.nPassword;
    if(cPassword && nPassword){
        User.findOne({uuid:uuid},(err,user)=>{
            if(err || !user){
                callback(err,null)
            }else{
                user.changePassword(cPassword,nPassword,(err)=>{
                    if(err){
                        callback(err)
                    }else{
                        callback(null,user)
                    }
                })
            }
        })
    }else{
        callback('infs')
    }
}