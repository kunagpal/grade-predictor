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
    document.getElementById("pwd").style.padding="15px";
}
function checkretype() {
    var pwd=document.getElementById("pwd").value;
    var rpwd=document.getElementById("rpwd").value;

    if (pwd!==rpwd) {
        window.alert("Please re-type the password correctly!");
        document.getElementById("rpwd").value="";
    }
    document.getElementById("rpwd").style.padding="15px";
}

function enlfname() {
    document.getElementById("fname").style.padding = "25px";
}
function enlmname() {
    document.getElementById("mname").style.padding = "25px";
}
function enllname() {
    document.getElementById("lname").style.padding = "25px";
}
function enlrno() {
    document.getElementById("rno").style.padding = "25px";
}
function enlpwd() {
    document.getElementById("pwd").style.padding = "25px";
}
function enlrpwd() {
    document.getElementById("rpwd").style.padding = "25px";
}
function enlemail() {
    document.getElementById("email").style.padding = "25px";
}
function enldob() {
    document.getElementById("dob").style.padding = "25px";
}
function small() {
    document.getElementById("fname").style.padding = "15px";
    document.getElementById("mname").style.padding = "15px";
    document.getElementById("lname").style.padding = "15px";
    document.getElementById("rno").style.padding = "15px";
    document.getElementById("email").style.padding = "15px";
    document.getElementById("dob").style.padding = "15px";
}