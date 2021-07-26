import cookies from "js-cookie"
// 设置cookie
function set(options){
    for (const key in options) {
        cookies.set(key,options[key]);
    }
    return true;
}
// 获取cookie
function get(name=""){
    if(cookies.get(name)){
        return cookies.get(name)
    }else{
        return false
    }   
}
// 删除cookie
function remove(name="email"){
    cookies.remove(name);
    return true;
}
export default {
    set,
    get,
    remove,
}