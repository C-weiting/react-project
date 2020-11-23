import moment from 'moment';

export function time_range (beginTime, endTime) {
    let strb = beginTime.split(":");

    if (strb.length !== 2) {
        return false;
    }

    let stre = endTime.split(":");
    if (stre.length !== 2) {
        return false;
    }

    let b = new Date();
    let e = new Date();
    let n = new Date();

    b.setHours(strb[0]);
    b.setMinutes(strb[1]);
    e.setHours(stre[0]);
    e.setMinutes(stre[1]);

    if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
        return true;

    } else {

        return false;
    }
}

export function showTime (timestamp) {
    function zeroize (num) {
        return (String(num).length === 1 ? '0' : '') + num;
    }

    var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳

    var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
    var tmDate = new Date(timestamp);  // 参数时间戳转换成的日期对象

    var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
    var H = tmDate.getHours(), i = tmDate.getMinutes();

    if (curDate.getFullYear() === Y && curDate.getMonth() + 1 === m && curDate.getDate() === d) {
        return '今天' + zeroize(H) + ':' + zeroize(i);
    } else {
        var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
        if (newDate.getFullYear() === Y && newDate.getMonth() + 1 === m && newDate.getDate() === d) {
            return '昨天' + zeroize(H) + ':' + zeroize(i);
        } else if (curDate.getFullYear() === Y) {
            return zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
        } else {
            return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
        }
    }
}
