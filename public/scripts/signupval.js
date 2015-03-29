/**
 * Created by Vikramraj on 29-Mar-15.
 */
/**
 * Created by Vikramraj on 29-Mar-15.
 */

function checkpswd() {
    var pswd =document.getElementById("pwd").value;
    var l=pswd.length;
    if (l<8)
        window.alert("Password too short!");
    else if (l>20)
        window.alert("Password too long!");
}
function checkretype() {
    var pwd=document.getElementById("pwd").value;
    var rpwd=document.getElementById("rpwd").value;
if (pwd!==rpwd) {

    document.getElementById("rpwd").setAttribute("value","");
    window.alert("Please re-type the password correctly!");
}

}