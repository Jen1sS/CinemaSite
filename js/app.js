//funzione per caricare la pagina in modo generale
function onLoadSetup(){
  setTimeout(popup,2000);
  //RECUPERO IL JSON
  if (api){
    onLoadSetupAPI();
    filldaysAPI();
  }
  else {
    fetch('json/database.json')
      .then(response => response.json())
      .then(database => {
        data = database;
        onClickShow(days[today]); // Call onLoadSetup() after data has been fetched
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    filldays();
  }
}
function filldays(){
  if (api) filldaysAPI();
  else {
    let now = document.getElementById("dates");
    date.setDate(date.getDate() - today - 1)
    for (let i = 0; i < days.length; i++) {
      date.setDate(date.getDate() + 1);
      now.innerHTML += "<div class='element' id=\"" + i + "\" " + "onClick=" + "onClickShow(\"" + days[i] + "\")" + ">" + daysName[i] + " " + date.getDate() + "/" + (date.getMonth() + 1) + "</div>"
    }
  }
}
function onClick_ShowAll(){
  if (api) onClick_ShowAllAPI();
  else {
    for (let i = 0; i < days.length; i++) {
      let now = document.getElementById(days[i]);
      now.style.display = "block";
      now.innerHTML = "<h1 class='days'>" + data[i].day + "</h1>";

      for (let j = 0; j < data[i].films.length; j++) {
        now.innerHTML +=
          "<div class=\"film\">" +
          "<img src=" + data[i].films[j].poster + " class=\"filmImages\">" +
          "<div class='content'>" +
          "<h2>" + data[i].films[j].title + "</h2><hr>" +
          "<p><strong>Direttore: </strong>" + data[i].films[j].director + "<br>" +
          "<strong>Descrizione: </strong>" + data[i].films[j].description + "</p></div></div>";
      }
      document.getElementById(days[i]).style.display = "block";
      document.getElementById(i).style.fontWeight = "lighter";

    }
  }
}
function onClickShow(name){
  if (api) onClickShowAPI(name);
  else {
    for (let i = 0; i < days.length; i++) {
      if (name === days[i]) {
        document.getElementById(i).style.fontWeight = "bolder";
        let now = document.getElementById(days[i]);
        now.style.display = "block";
        now.innerHTML = "<h1 class='days'>" + data[i].day + "</h1>";

        for (let j = 0; j < data[i].films.length; j++) {
          now.innerHTML +=
            "<div class=\"film\">" +
            "<img src=" + data[i].films[j].poster + " class=\"filmImages\">" +
            "<div class='content'>" +
            "<h2>" + data[i].films[j].title + "</h2><hr>" +
            "<p><strong>Direttore: </strong>" + data[i].films[j].director + "<br>" +
            "<strong>Descrizione: </strong>" + data[i].films[j].description + "</p></div></div>";
        }
      } else if (days[i] !== null) {
        document.getElementById(i).style.fontWeight = "lighter";
        document.getElementById(days[i]).style.display = "none";
      }
    }
  }
}


//funzione per ingrandire le immagini (funziona sempre)
function enlarge(img){
  if (currentZoom!==undefined && currentZoom!==img){
    currentZoom.style.height="32em";
    img.style.height = "64em";
  } else if (currentZoom===img && currentZoom.style.height==="64em") currentZoom.style.height="32em";
  else img.style.height = "64em";

  currentZoom = img;

}
window.onclick = function(event) {
  if (event.target.className!=="filmImages") {
    currentZoom.style.height="32em";
    currentZoom = undefined;
  } else if (event.target.className==="filmImages") {
    enlarge(event.target);
  }
}


//funzione per caricare la pagina da API
function onLoadSetupAPI() {
  fetch("https://www.sammasensei.it/scuola/movies/get-movies.php")
    .then(response => response.json())
    .then(database => {
      data = database;
      onClickShowAPI(days[today]); // Call onLoadSetup() after data has been fetched
    })
    .catch((error) => {
      console.error('Error:', error);
    });
} //setup iniziale pagina
function filldaysAPI(){
  let now=document.getElementById("dates");
  date.setDate(date.getDate()-today-1)
  for (let i = 0; i < days.length; i++) {
    date.setDate(date.getDate()+1);
    now.innerHTML += "<div class='element' id=\"" + i +"\" "+ "onClick="+"onClickShowAPI(\""+days[i]+"\")"+">" + daysName[i] + " " + date.getDate() + "/" + (date.getMonth() + 1) + "</div>"
  }
} //riempimento giorni dinamico con data
function onClick_ShowAllAPI(){
  for (let i = 0; i < days.length; i++){
    let now=document.getElementById(days[i]);
    now.style.display = "block";
    now.innerHTML="<h1 class='days'>"+daysName[i]+"</h1>";

    for (let j=0;j<data.length;j++){
      now.innerHTML+=
        "<div class=\"film\">"+
        "<img src="+data[j].poster_url+" class=\"filmImages\">"+
        "<div class='content'>" +
        "<h2>"+data[j].title+"</h2><hr>"+
        "<p><strong>Cast: </strong>"+data[j].cast+"<br>"+
        "<strong>Genre: </strong>"+data[j].genre+"<br>"+
        "<strong>Duration: </strong>"+data[j].duration+"<br>"+
        "<strong>Rating: </strong>"+data[j].rating+"<br>"+
        "<strong>Plot: </strong>"+data[j].plot+"<br>"+
        "<strong>Showtimes: </strong>"+data[j].showtimes+"</p></div></div>";
    }
    document.getElementById(days[i]).style.display = "block";
    document.getElementById(i).style.fontWeight="lighter";

  }
} //mostra tutti i film
function onClickShowAPI(name){
  for (let i = 0; i < days.length; i++) {
    if (name===days[i]) {
      document.getElementById(i).style.fontWeight="bolder";
      let now=document.getElementById(days[i]);
      now.style.display = "block";
      now.innerHTML="<h1 class='days'>"+daysName[i]+"</h1>";

      for (let j=0;j<data.length;j++){
        now.innerHTML+=
          "<div class=\"film\">"+
          "<img src="+data[j].poster_url+" class=\"filmImages\">"+
          "<div class='content'>" +
          "<h2>"+data[j].title+"</h2><hr>"+
          "<p><strong>Cast: </strong>"+data[j].cast+"<br>"+
          "<strong>Genre: </strong>"+data[j].genre+"<br>"+
          "<strong>Duration: </strong>"+data[j].duration+"<br>"+
          "<strong>Rating: </strong>"+data[j].rating+"<br>"+
          "<strong>Plot: </strong>"+data[j].plot+"<br>"+
          "<strong>Showtimes: </strong>"+data[j].showtimes+"</p></div></div>";
      }
    } else if (days[i]!==null){
      document.getElementById(i).style.fontWeight="lighter";
      document.getElementById(days[i]).style.display = "none";
    }
  }
} //mostra i film del giorno selezionato

//pubblicità Aª
function popup(){
  let random="popup"+Math.round(Math.random()*numPopups)+".png"
  document.getElementById("popup").innerHTML="<img src=\"img/popups/"+random+"\" id='advertisement'>";
  document.getElementById("popup").style.backdropFilter="blur(0.5em)";
  document.getElementById("header").style.backdropFilter="initial";
  document.getElementById("header").style.position="initial";
  setTimeout(activateX,3000);
}
function activateX(){
  document.getElementById("popup").innerHTML+="<span class=\"close\" onclick='closePopup()'></span>";
}
function closePopup(){
  document.getElementById("popup").innerHTML="";
  document.getElementById("popup").style.display="none";
  document.getElementById("header").style.backdropFilter="blur(1em)";
  document.getElementById("header").style.position="sticky";
}

//dati necessari per il funzionamento del sito
const date = new Date()
const today = new Date().getDay();
const days = ["dom", "lun", "mar", "mer","gio","ven","sab"];
const daysName = ["Domenica", "Lunedì", "Martedì", "Mercoledì","Giovedì","Venerdì","Sabato"];
let currentZoom;
let data;
var api;
let numPopups=4;
