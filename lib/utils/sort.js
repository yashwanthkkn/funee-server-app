module.exports.sortByTime = (array)=>{
    if(array.length){
        for(var i = 0;i<array.length;i++){
            for(var j=0;j<array.length;j++){
                if(array[i].time > array[j].time){
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
        }
        return array;
    }else{
        return [];
    }
}