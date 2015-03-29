/**
 * Created by Vikramraj on 29-Mar-15.
 */
function checkid() {
    var i=document.getElementById("uid");
    uid.setAttribute("pattern" , "\d{2}\w{3}\d{4}");
    document.getElementById("uid").style.padding = "15px";
}
function small() {
    document.getElementById("pswd").style.padding = "15px";
}
function enlr() {
    document.getElementById("uid").style.padding = "25px";
}
function enlp() {
    document.getElementById("pswd").style.padding = "25px";
}