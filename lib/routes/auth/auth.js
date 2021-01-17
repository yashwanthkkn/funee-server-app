global.fetch = require('node-fetch');
const User = require('../../models/user')
global.navigator = () => null;
const { v4: uuidv4 } = require('uuid');
const emailToName = require('email-to-name')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
   UserPoolId: "ap-south-1_7HI0QRtRa",
   ClientId: "649rdvmscnc765e1nt7ngja3bv",
};
const pool_region = "ap-south-1";
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports.isLoggedIn = (req,res,next)=>{
    if (req.user && (req.user.claim == "user" || req.user.claim == "admin")) {
        if(req.user.emailVerified){
            next()
        }else{
            res.redirect('/verifyEmail')
        }
        
    } else {
        res.redirect('/login');
    }
}

module.exports.Signup = (data,callback)=>{
    var username = data.username;
    var password = data.password;
    if(username && password && password.length >=6){
        User.register(new User({
            username:username,
            email:username,
            claim:"user",
            joined:Date.now()+19800000,
            uuid:uuidv4(), 
            emailVerified:false
            ,name:emailToName.process(username)
        
        }),password,(err,user)=>{
            if(err){
                callback(err)
            }else{
                var attributeList = [];
                attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: username }));
                userPool.signUp(user.uuid, password, attributeList, null,(err,cuser)=>{
                    if(err){
                        callback(err)
                    }else{
                        callback(null,user)
                    }
                })             
                
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
                        var userData = {
                            Username: uuid,
                            Pool: userPool,
                         };
                         var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
                        cognitoUser.changePassword(cPassword, nPassword, function(err, result) {
                            //pass
                        });
                        callback(null,user)
                    }
                })
            }
        })
    }else{
        callback('infs')
    }
}

module.exports.verifyEmailCode = (data,callback)=>{
    var username = data.uuid;
    var uuid = data.uuid;
    var code = data.code;
    if(username && uuid && code){
        User.findOne({uuid:uuid},(err,user)=>{
            var userData = {
                Username: username,
                Pool: userPool,
             };
             
             var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
             cognitoUser.confirmRegistration(code, true, function(err, result) {
                if (err) {
                    callback(err)
                }else{
                    user.emailVerified = true;
                    user.save(err=>{
                        if(err){
                            callback(err)                           
                        }else{
                            callback(null,result)
                        }
                    })
                }
             });
        })
    }else{
        callback('infs')
    }
}

module.exports.resendVerificationCode = (data,callback)=>{
    var username = data.uuid;
    var userData = {
        Username: username,
        Pool: userPool,
     };
     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
           callback(err)
        }else{
            callback(null,result)
        }
        
    });
}