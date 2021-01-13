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
        createdAt:Date.now(),
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

module.exports.addComment  = (data,callback)=>{
    var owner = data.owner;
    var topicId = data.uuid;
    var side = data.side;
    var msg = data.msg;
    var type = data.type;
    var ownerName = data.ownerName;
    var comment = new Comment({
        uuid:uuidv4(),
        createdAt:Date.now(),
        owner:owner,
        topicId:topicId,
        side:side,
        upvotes:0,
        downvotes:0,
        rank:0,
        msg:msg,
        type:type,
        ownerName:ownerName
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
