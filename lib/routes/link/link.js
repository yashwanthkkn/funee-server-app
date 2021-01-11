const Link = require('../../models/link');
const {v4:uuidv4} = require('uuid');

module.exports.createNewLink = (data,callback)=>{
    var owner = data.owner;
    var caption = data.caption;
    var uuid = uuidv4();
    var createdAt = Date.now();
    var link = new Link({
        uuid:uuid,
        createdAt:createdAt,
        owner:owner,
        caption:caption
    })
    link.save((err)=>{
        if(err){
            callback(err)
        }else{
            callback(null,link)
        }
    })
}

module.exports.getLink = (data,callback)=>{
    var uuid = data.uuid;
    var owner = data.owner;
    Link.findOne({uuid:uuid,owner:owner},(err,link)=>{
        if(err){
            callback(err)
        }else{
            if(!link){
                callback(null,null)
            }else{
                callback(null,link)
            }
        }
    })
}

module.exports.getLinks = (data,callback)=>{
    var owner = data.owner;
    Link.find({owner:owner},(err,links)=>{
        if(err){
            callback(err)
        }else{
                callback(null,links)
        }
    })
    
}