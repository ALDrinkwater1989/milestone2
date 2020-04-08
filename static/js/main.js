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


var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://sheet.best/api/sheets/b0eb5319-377e-419f-8c19-0a1bbc62a116");

xhr.send();