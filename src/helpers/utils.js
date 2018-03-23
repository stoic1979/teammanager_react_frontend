function dateOnlyStr(dt) {
    const d = new Date(dt);

    var ret = d.getFullYear() + "-";
    if(d.getMonth() < 10) ret += "0";
    ret += d.getMonth() + "-";

    if(d.getDate() < 10) ret += "0";
    ret += d.getDate();

    return  ret;
}

export default dateOnlyStr;
