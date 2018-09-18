function UtilHelper() {
}

UtilHelper.prototype.isEmpty = function(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = function(){
    return UtilHelper;
}