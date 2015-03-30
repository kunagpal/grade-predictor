/**
 * Created by Vikramraj on 29-Mar-15.
 */
function checkid() {

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

function remember() {
    if (document.getElementById("chk").checked==true){
        document.getElementById("uid").setAttribute("value",document.getElementById("uid").value);
        document.getElementById("pswd").setAttribute("value",document.getElementById("pswd").value);
    }
}