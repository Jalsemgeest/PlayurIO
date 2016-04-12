module.exports = {
    DateDiff: {
     
        inDays: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();
     
            return parseInt((t2-t1)/(24*3600*1000));
        },
     
        inWeeks: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();
     
            return parseInt((t2-t1)/(24*3600*1000*7));
        },
     
        inMonths: function(d1, d2) {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();
     
            return (d2M+12*d2Y)-(d1M+12*d1Y);
        },
     
        inYears: function(d1, d2) {
            return d2.getFullYear()-d1.getFullYear();
        }
    },
    getRoomCookie: function(str) {
        if (str.indexOf('roomName') !== -1) {
            var index = str.indexOf('roomName') + 9;
            var newCookie = str.substring(index);
            return newCookie;
        }
        return '';
    },
    getHashCookie: function(str) {
        if (str.indexOf('roomHash') !== -1) {
            var index = str.indexOf('roomHash') + 9;
            var newCookie = str.substring(index);
            if (newCookie.indexOf(' ') !== -1) {
                index = newCookie.indexOf(' ');
                newCookie = newCookie.substring(0, index-1);
            } 
            return newCookie;
        }
        return '';
    }
}