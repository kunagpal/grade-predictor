/**
 * Created by Vikramraj on 29-Mar-15.
 */
function checkid() {
    //var i = document.getElementById("rno");
    document.getElementById("rno").setAttribute("pattern", "\d{2}\w{3}\d{4}");
    document.getElementById("rno").style.padding = "15px";
}

function big() {
    document.getElementById("rno").style.padding = "25px";
}
function big2() {
    document.getElementById("eid").style.padding = "25px";
}
function small1() {
    document.getElementById("eid").style.padding = "15px";
}