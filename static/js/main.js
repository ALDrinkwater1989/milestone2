var modal = document.getElementById("myModal");
var btn = document.getElementById("tkBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function(){
    modal.style.display = "block";

}

window.onclick = function(event){
    if(event.target == modal){
    mo.style.display = "none";
    }
}