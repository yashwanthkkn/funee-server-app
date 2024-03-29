const Topic = require('../../models/topic')
const {v4:uuidv4} = require('uuid')
const Comment = require('../../models/comment')

module.exports.addTopic = (data,callback)=>{
    var owner = data.owner;
    var title = data.title;
    var side1 = data.side1;
    var side2 = data.side2;
    var topic = new Topic({
        uuid:uuidv4(),
        createdAt:Date.now()+19800000,
        owner:owner,
        title:title,
        side1:side1,
        side2:side2,
        side1Count:0,
        side2Count:0,
        deletion:'private',
        total:0
    })
    topic.save(err=>{
        if(err){
            callback(err)
        }else{
            callback(null,topic)
        }
    })
}

module.exports.getTopicById = (data,callback)=>{
    var uuid = data.uuid;
    Topic.findOne({uuid:uuid},(err,topic)=>{
        if(err){
            callback(err)
        }else{
            callback(null,topic)
        }
    })
}

module.exports.getTopicByTitle = (data,callback)=>{
    var title = data.title;
    Topic.findOne({title:title},(err,topic)=>{
        if(err){
            callback(err)
        }else{
            callback(null,topic)
        }
    })
}

module.exports.getTopicByIdAndOwner = (data,callback)=>{
    var uuid = data.uuid;
    var owner = data.owner;
    Topic.findOne({uuid:uuid},(err,topic)=>{
        if(err){
            callback(err)
        }else{
            callback(null,topic)
        }
    })
}

module.exports.getTopics = (callback)=>{
    Topic.find({}).sort("-total").find((err,topics)=>{
        if(err){
            callback(err)
        }else{
            callback(null,topics)
        }
    })
}

module.exports.getTopicsAsRecent = (callback)=>{
    Topic.find({}).sort("-createdAt").find((err,topics)=>{
        if(err){
            callback(err)
        }else{
            callback(null,topics)
        }
    })
}

module.exports.addComment  = (data,callback)=>{
    var owner = data.owner;
    var topicId = data.uuid;
    var side = data.side;
    var msg = data.msg;
    var type = data.type;
    var ownerName = data.ownerName;
    var comment = new Comment({
        uuid:uuidv4(),
        createdAt:Date.now()+19800000,
        owner:owner,
        topicId:topicId,
        side:side,
        upvotes:0,
        downvotes:0,
        rank:0,
        msg:msg,
        type:type,
        ownerName:ownerName,
        reported:false
    })
    comment.save((err)=>{
        if(err){
            callback(err)
        }else{
            callback(null,comment);
        }
    })
}

module.exports.getCommentsByRoomid = (data,callback)=>{
    var topicId = data.uuid;
    Comment.find({topicId:topicId}).sort('-createdAt').find((err,comments)=>{
        if(err){
            callback(err)
        }else{
            callback(null,comments)
        }
    })
}

module.exports.getPublicCommentsByRoomid = (data,callback)=>{
    var topicId = data.uuid;
    Comment.find({topicId:topicId}).sort('-createdAt').limit(5).find((err,comments)=>{
        if(err){
            callback(err)
        }else{
            callback(null,comments)
        }
    })
}


module.exports.removeTopic = (data,callback)=>{
    var uuid = data.uuid;
    var owner = data.owner;
    if(owner && uuid ){
        Topic.findOne({uuid:uuid},(err,topic)=>{
            if(err && !topic){
                callback('notopic')
            }else{
                if(topic.owner == owner){
                    Comment.deleteMany({topicId:uuid});
                    Topic.deleteOne({uuid:uuid},(err)=>{
                        if(err){
                            callback(err)
                        }else{
                            callback(err,'ok')
                        }
                    })
                }else{
                    callback('unauth')
                }
            }
        })
    }else{
        callback('infs')
    }
}

module.exports.removeTopicAdmin = (data,callback)=>{
    var uuid = data.uuid;
    if(uuid ){
        Topic.findOne({uuid:uuid},(err,topic)=>{
            if(err && !topic){
                callback('notopic')
            }else{
                Comment.deleteMany({topicId:uuid},(err)=>{
                    if(err){
                        callback(err);
                    }else{
                        Topic.deleteOne({uuid:uuid},(err)=>{
                            if(err){
                                callback(err)
                            }else{
                                callback(err,'ok')
                            }
                        })
                    }
                });
            }
        })
    }else{
        callback('infs')
    }
}

module.exports.reportMsg = (data,callback)=>{
    var msgid = data.msgid;
    var userid = data.userid;
    Comment.findOne({uuid:msgid},(err,comment)=>{
        if(err || !comment){
            callback('no comment');
        }else{
            comment.reported = true;
            if(!comment.reports.find(ele=>ele==userid)){
                comment.reports.push(userid)
            }
            if(comment.reports.length > 10){
                Comment.deleteOne({uuid:msgid},(err)=>{
                    callback(null,comment)
                })
            }else{
                comment.save(()=>{
                    callback(null,comment)
                })
            }
        }

    })
}

module.exports.getReportComments = (data,callback)=>{
    Comment.find({reported:true},(err,docs)=>{
        if(err){
            callback(err)
        }else{
            callback(null,docs);
        }
    })
}

module.exports.deleteComment = (data,callback)=>{
    var uuid = data.uuid;
    this.getMsgById({uuid:uuid},(err,comment)=>{
        Topic.findOne({uuid:comment.topicId},(err,topic)=>{
            topic.total-=1;
            if(topic.side1 == comment.side){
                topic.side1Count--;
            }else{
                topic.side2Count--;
            }
            topic.save(err=>{
                Comment.deleteOne({uuid:uuid},(err)=>{
                    callback(null,"ok")
                })
            })

        })
    })

}

module.exports.getMsgById = (data,callback)=>{
    var uuid = data.uuid;
    Comment.findOne({uuid:uuid},(err,doc)=>{
        if(err){
            callback(err)
        }else{
            callback(err,doc)
        }
       
    })
}