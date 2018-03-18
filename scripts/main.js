function loadMeteo() {
	var xhttp = new XMLHttpRequest();
	var api_key = '6a9775d9a9b0db81bd98b8002033af73';
	var url = 'http://api.openweathermap.org/data/2.5/weather?q=Montreal,ca&mode=xml&units=metric&appid=' + api_key;
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			afficherInformation(this);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
	setTimeout(loadMeteo, 10000);
}
function afficherInformation(xml){
	var xmlDoc = xml.responseXML;
	var balisCity = xmlDoc.getElementsByTagName("city")[0];
	document.getElementById("meteoCity").innerHTML = balisCity.getAttribute("name");
	var balisDate = xmlDoc.getElementsByTagName("lastupdate")[0];
	currentDate=new Date(balisDate.getAttribute("value"));
	currentOffset=currentDate.getTimezoneOffset();
	currentDate.setHours(currentDate.getHours()-currentOffset/60);
	document.getElementById("meteoDate").innerHTML = currentDate.getFullYear()+"/"+
											("0" + (currentDate.getMonth() + 1)).slice(-2)+"/"+
											("0" + (currentDate.getDate() + 1)).slice(-2);
	var balisTemperature = xmlDoc.getElementsByTagName("temperature")[0];
	document.getElementById("meteoTemp").innerHTML = balisTemperature.getAttribute("value");
	var balisImage = xmlDoc.getElementsByTagName("weather")[0];
	document.getElementById("meteoImage").src="http://openweathermap.org/img/w/"+
											balisImage.getAttribute("icon")+".png";
}
function loadDoc(url) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("infSource").innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", "files/"+url, true);
	xhttp.send();
}