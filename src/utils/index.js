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
