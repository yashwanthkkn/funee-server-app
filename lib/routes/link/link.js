const Link = require('../../models/link');
const {v4:uuidv4} = require('uuid');

module.exports.createNewLink = (data,callback)=>{
    var owner = data.owner;
    var caption = data.caption;
    var privacy = data.privacy;
    var uuid = uuidv4();
    var createdAt = Date.now();
    var link = new Link({
        uuid:uuid,
        createdAt:createdAt,
        owner:owner,
        caption:caption,
        privacy:privacy

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

module.exports.getPublicLink = (data,callback)=>{
    var uuid = data.uuid;
    Link.findOne({uuid:uuid,privacy:'public'},(err,link)=>{
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

module.exports.getLinkById = (data,callback)=>{
    var uuid = data.uuid;
    Link.findOne({uuid:uuid},(err,link)=>{
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

module.exports.addComment = (data,callback)=>{
    var uuid = data.uuid;
    var response = data.response;
    var time = Date.now();
    Link.findOne({uuid:uuid},(err,link)=>{
        if(err){
            callback(err)
        }else{
            if(!link){
                callback(null,null)
            }else{
                var comment = {
                    response:response,
                    time:time
                }
                link.responses.push(comment);
                link.save(()=>{
                    callback(null,link)
                })
            }
        }
    })
}


module.exports.removeLink = (data,callback)=>{
    //expects owner and uuid
    var owner = data.owner;
    var uuid = data.uuid;
    Link.deleteOne({owner:owner,uuid:uuid},(err)=>{
        if(err){
            callback(err);
        }else{
            callback(null,"SUCCESS")
        }
    })
}

module.exports.togglePrivacy = (data,callback)=>{
    var owner = data.owner;
    var uuid = data.uuid;
    Link.findOne({owner:owner,uuid:uuid},(err,link)=>{
        if(err){
            callback(err)
        }else{
            if(!link){
                callback(null,null)
            }else{
                if(link.privacy == 'private'){
                    link.privacy = 'public';
                }else{
                    link.privacy = 'private';
                }
                link.save(()=>{
                    callback(null,link)
                })
            }
        }
    })
}