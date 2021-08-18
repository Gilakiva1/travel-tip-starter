import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onAddLocation = onAddLocation;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
        addListeners()
}

function addListeners() {
    const map = mapService.getMap()
    map.addListener("click", (mapsMouseEvent) =>{
         var lat = mapsMouseEvent.latLng.lat();
         var lng = mapsMouseEvent.latLng.lng();
         openModal({lat,lng})
     })
     map.addListener("click", (mapsMouseEvent) =>{
        var lat = mapsMouseEvent.latLng.lat();
        var lng = mapsMouseEvent.latLng.lng();
        openModal({lat,lng})
    })
}


// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var elModal = document.querySelector(".add-modal")
    if (event.target == elModal) {
      elModal.style.display = "none";
    }
  }
  
  function openModal(location) {
    debugger
    var elModal = document.querySelector(".add-modal")
    elModal.style.display = "block";
    const edLocationData = document.querySelector(".location-data");
    var locStr = JSON.stringify(location)
    edLocationData.setAttribute("uluru", locStr);
  }
  
  function closeModal() {
    var elModal = document.querySelector(".add-modal")
    elModal.style.display = "none";
  }
  
  function onAddLocation(ev = null) {
    if (ev) ev.preventDefault();
    debugger
    const edLocationData = document.querySelector(".location-data");
    const title = edLocationData.value
    const locStr = edLocationData.getAttribute("uluru");
    var location = JSON.parse(locStr)
    var locationData = {
        title,
        location
    }
  
    mapService.addLocation(locationData)
    //{ lat: -25.344, lng: 131.036 }
    closeModal()
  }