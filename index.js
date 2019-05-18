window.addEventListener('load',geoLocation);

let long;
let lat;
let locationTimezone= document.querySelector('.location-timezone')
let temperatureDegree = document.querySelector('.temperature-degree')

function geoLocation(){
    if(navigator.geolocation){
        console.log("Si hay localizacion", navigator.geolocation)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                callApi(position)
            }
         )        
    }
    else {
        return alert("No se ha podido acceder a la geolocalizacion")
    }    
    
}

async function callApi(position){
    long = position.coords.longitude;
    lat = position.coords.latitude;
    // proxy:
    const proxy='https://cors-anywhere.herokuapp.com/'
    const apiURL = `${proxy}https://api.darksky.net/forecast/3cd91c5b37e9263bc6c893e537b92a80/${lat},${long}`

    let apiCall = await fetch(apiURL)
    let dataJSON = await apiCall.json()
    console.log("dataJSON",dataJSON)
    setWeatherData(dataJSON)
}

function setWeatherData (data) {
    locationTimezone.textContent = data.timezone;
    temperatureDegree.textContent=data.currently.temperature;
}