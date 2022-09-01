
var map = L.map('map').setView([40.18307014852534 , 29.07257080078125], 10)

//-----------Icons-----------\\

var campicon = L.icon({
    iconUrl: 'https://i.ibb.co/SKVfJHC/camping-icon-13528.png',
    iconSize:     [40, 40]
  })

//-----------Map Scale-----------\\

L.control.scale({position:'bottomright', metric:true, imperial:false}).addTo(map);

//-----------Harita Katmanları-----------\\

var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 17,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
streetMap.addTo(map);


document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';

//-----------Mouse Position-----------\\

L.control.mousePosition().addTo(map);
map.addControl( new L.Control.Gps() );

var helloPopup = L.popup().setContent('Hello World!');
