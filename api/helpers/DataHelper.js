//Importa módulo moment para trabalhar com as datas
var moment = require('moment');

function DataHelper() {
}

DataHelper.prototype.isDataMaiorQueHoje = function(data, msg) {
    var now = moment();
    if (moment(data).isAfter(now)) {
        return '';
    } else {
        return {
            "msg": msg,
            "value": data
        };
    }
}

DataHelper.prototype.isDataValida = function(data, msg) {
    if (moment(data,'YYYY-MM-DD HH:mm:ss').isValid()) {
        return '';
    } else {
        return {
            'msg': msg,
            'value': data
        };
    }
}

DataHelper.prototype.isDataMaiorQue = function(dataInicio, dataFim, msg) {
    if (moment(dataInicio).isBefore(dataFim)) {
        return '';
    } else {
        return {
            "msg": msg,
            "value": "Data Maior: " + dataFim + ", Data Menor: " + dataInicio
        };
    }
}


module.exports = function(){
    return DataHelper;
}

