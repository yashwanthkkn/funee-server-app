const Topic = require('../../models/topic')
const {v4:uuidv4} = require('uuid')

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
    Topic.find({},(err,topics)=>{
        if(err){
            callback(err)
        }else{
            callback(null,topics)
        }
    })
}