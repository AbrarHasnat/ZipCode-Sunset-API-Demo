function convertToEST(utc) {
	let utcHours = utc.substr(0, utc.indexOf(":"));
  let utcMinSec = utc.substr(utc.indexOf(":")+1,utc.indexOf(" ")-2);
  let utcAP = utc.substr(utc.indexOf(" "))

  console.log(utcHours);
  console.log(utcMinSec);
  console.log(utcAP);

	let est = parseInt(utcHours, 10) - 5; //EST


  if (est < 0){
    est = 12 +est;
    if (utcAP == " AM"){
      utcAP = "PM"
    }
    else if ( utcAP == " PM"){
      utcAP = "AM"
    }
  }

  if (utcHours >= 12){
    if (utcAP == " AM"){
      utcAP = "PM"
    }
    else if ( utcAP == " PM"){
      utcAP = "AM"
    }

  }

  
	est += ":" + utcMinSec + utcAP;
	return est;
}

function letSee(){
  let zipSubmitted = $(".zip").val();

  let request = new XMLHttpRequest();
  let zip = zipSubmitted;
  let url = "https://api.zippopotam.us/us/"+zip;
  request.open("GET", url, true);

  //Callback function executes when request is successfully completed

  request.onload = function() {
    // Begin accessing JSON data here. Data stored in request.response
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        $("#city").text(data.places[0]["place name"]);
        $("#state").text(data.places[0].state);
        $("#lat").text(data.places[0].latitude);
        $("#long").text(data.places[0].longitude);
        
    }
    let lat = data.places[0].latitude;
    let long = data.places[0].longitude;
    let newRequest = new XMLHttpRequest();
    let newUrl = "https://api.sunrise-sunset.org/json?lat="+lat+"&lng="+long;
    newRequest.open("GET", newUrl, true);
    newRequest.onload = function() {
      let data = JSON.parse(this.response);
      $("#sunrise").text(convertToEST(data.results.sunrise));
      $("#sunset").text(convertToEST(data.results.sunset));

    };
    newRequest.send();
    
  };

  request.send();
}


