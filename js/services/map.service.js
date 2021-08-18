

export const mapService = {
    initMap,
    addMarker,
    panTo,
    savePlace,
}





var gMap;
var gCurrPlace;

window.gMyLocations = [];

function getMap() {
    return gMap
}

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('.map'), {
                center: { lat, lng },
                zoom: 15
            })
            gMap.addListener("click", (mapsMouseEvent) =>{
                console.log(mapsMouseEvent);
                var lat = mapsMouseEvent.latLng.lat();
                var lng = mapsMouseEvent.latLng.lng();
                
                //addMarker({lat,lng})
                gCurrPlace = {
                    pos:{lat,lng}
                }
                // addLocation({lat,lng})
            })
            // console.log('Map!', gMap);
        })
}

function addLocation(){

    gMyLocations.push(
        {
            position: gCurrPlace.pos,
            title:gCurrPlace.title
        }
    )
    gCurrPlace.title = '';
    addMarker(gCurrPlace.pos);
}
function savePlace(title){
    // gCurrTitle = title;
    gCurrPlace.title = title
    console.log(gCurrPlace);
    addLocation();
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}


function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBdzhvc7MZJ9iqXpunw-QupAjXFviNB0As'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}