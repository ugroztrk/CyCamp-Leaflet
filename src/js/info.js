var markers = L.markerClusterGroup();
map.addLayer(markers);
var fg = L.featureGroup();

//-----------Database-----------//

var polygonKenar = [];
var markerpoint = [];
var linepoints = [];
var pathColor
var drawItem 
var campname

//-----------Options-----------//

map.pm.setGlobalOptions({icon: campicon})

var polygonOption = {color:'#D36C00',fillColor:'#E87C09',fillOpacity: 0.5,}

var cycleRouteOption = {color: '#7A0AC8',weight: 6,dashArray: '15, 20', dashOffset: '0'}

var walkRouteOption = {color: '#C8180A',weight: 5,dashArray: '0.6, 9', dashOffset: '0'}

//var pointOption = {icon:campicon}

// Bursa
var marker =markers.addLayer(L.marker([40.18307014852534 , 29.07257080078125]).addTo(map).bindTooltip('Bursa',));

//-----------Manuel Kamp Alanı Noktaları-----------//

var mosk = (L.marker([40.19776521857842, 28.97904485464096], {icon: campicon}).bindPopup('OPTİONS').bindTooltip('MOSK Kamp Alanı'));
var hudavendigarPark = (L.marker([40.20142824550515,28.999443054199215], {icon: campicon}).bindTooltip('Hüdavendigar Parkı').bindPopup('OPTİONS'));
var guzelyaliMesireAlani = (L.marker([40.35110667908996, 28.944425582885742], {icon: campicon}).bindTooltip('Güzelyalı Mesire Alanı').bindPopup('OPTİONS'));
var buyuksehirbelediyesiCampArea = (L.marker([40.10369622769541,29.28767323493957], {icon: campicon}).bindTooltip('Büyükşehir Belediyesi Kamp Alanı').bindPopup('OPTİONS'));

  
//-----------Manuel Kamp Alanı Bilgileri-----------//

var hudavendigarParkPolygon = L.polygon([
        [40.20527953689089,28.998348712921146],
        [40.205050104384114,28.99787664413452],
        [40.20362432782847,28.997361660003666],
        [40.20278851383685,28.996610641479492],
        [40.20226407626712,28.99633169174194],
        [40.20134630075813,28.996460437774658],
        [40.2001171176678,28.996717929840088],
        [40.19880596447519,28.996546268463135],
        [40.19452815088644,28.995666503906246],
        [40.19428229133014,28.99585962295532],
        [40.19490513380823,28.997576236724854],
        [40.19572465466905,28.9984130859375],
        [40.196003289505576,28.998112678527832],
        [40.19649499524764,28.998584747314453],
        [40.196740846781594,28.998777866363522],
        [40.19788814215409,28.998584747314453],
        [40.19898624954266,28.999228477478027],
        [40.19910097615416,28.999571800231934],
        [40.199346818239476,29.00161027908325],
        [40.199920446305285,29.00328397750855],
        [40.201739634640454,29.004743099212643],
        [40.20328017037401,29.00369167327881],
        [40.20393570687698,29.002854824066162],
        [40.20441096687781,29.001846313476562],
        [40.20450929611716,29.000623226165768],
        [40.20475511859153,29.000365734100342],
        [40.20498455209669,29.000537395477295],
        [40.20511565660815,29.000236988067627]],
        {color:'#D36C00',
          fillColor:'#E87C09',
          fillOpacity: 0.5,}).bindTooltip('Hüdavendigar Parkı'),
    buyuksehirbelediyesiCampAreaPolygon = L.polygon([
    [40.10372905276938,29.289094805717465],
    [40.10381521851323,29.289577603340145],
    [40.10397934343765,29.289507865905758],
    [40.10410653998175,29.289325475692745],
    [40.10432810758741,29.289143085479733],
    [40.104553777555076,29.28907871246338],
    [40.104660457642844,29.28876757621765],
    [40.10465225148818,29.288241863250732],
    [40.10464404533254,29.28795754909515],
    [40.10441837566431,29.287834167480465],
    [40.10409833376028,29.287871718406677],
    [40.1039875496735,29.287651777267456],
    [40.103958827843755,29.28704559803009],
    [40.10408192131436,29.28647696971893],
    [40.104274767303835,29.285892248153683],
    [40.10410653998175,29.285495281219482],
    [40.103934209122905,29.28543090820313],
    [40.10361006180087,29.285650849342343],
    [40.10336797608458,29.285511374473575],
    [40.103162818023534,29.285725951194763],
    [40.10315461168825,29.28628921508789],
    [40.10316692119082,29.28705632686615],
    [40.103220262343,29.287469387054443],
    [40.10336797608458,29.287882447242737],
    [40.103536205232984,29.28830623626709],
    [40.103630577499956,29.288724660873413],
    [40.10372905276938,29.289094805717465]],
    polygonOption).bindTooltip('Büyükşehir Belediyesi Kamp Alanı')

//-----------Manuel Katmanlar-----------//

var campAreas =L.layerGroup([guzelyaliMesireAlani,mosk,hudavendigarPark,buyuksehirbelediyesiCampArea]);
var campAreaPolygon =L.layerGroup([hudavendigarParkPolygon,buyuksehirbelediyesiCampAreaPolygon]);
var campLayer =markers.addLayer (L.layerGroup([campAreas,campAreaPolygon]));
var draws = L.layerGroup()

//-----------Rota Bilgileri-----------//

var latlngs = [];

//-----------Haritalar-----------//

var baseMaps = {
  "<span style='color:white;font-weight:bold;'>Harita<span>": streetMap,
  "<span style='color:white;font-weight:bold;'>Uydu Görüntüsü<span>": Esri_WorldImagery
};
var overlays =  {
  "<span style='color:white;font-weight:bold;'>Kamp Alanları<span>": campLayer
};

//-----------Katman Kontrol-----------//

var layerControl = L.control.layers(baseMaps,overlays, {position: 'bottomleft'}).addTo(map);


//-----------Çizim Editörü-----------//

map.pm.addControls({  
  position: 'topleft',
  customControls: true, 
  drawMarker: false,
  drawCircle: false,
  drawCircleMarker: false,
  drawRectangle: false,
  cutPolygon: false,
  snapMiddle: true,
  drawPolygon: false,
  drawPolyline: false,
  focus: true,
  drawText: false
});
var pathColor = 0
const _actions = [
  {
    text: 'Rota türünü değiştirmek için tıklayın.',
    onClick(e) {
      if (pathColor==0){
        pathColor = 1
        map.pm.Draw.PolylineCopy.setPathOptions(cycleRouteOption)
    }
      else{
        pathColor=0
        map.pm.Draw.PolylineCopy.setPathOptions(walkRouteOption)
      }
  
    },
    name: 'actionName',
  },]; 

  


map.pm.Toolbar.copyDrawControl('Polygon', {
  name: 'PolygonCopy',
  block: 'draw',
  title: 'Kamp alanı çiz',
  onClick: polygon
});
map.pm.setGlobalOptions({layerGroup: campLayer});
map.pm.Toolbar.changeControlOrder(['PolygonCopy']);
map.pm.Draw.PolygonCopy.setPathOptions({ color: '#D36C00',fillColor:'#E87C09',fillOpacity: 0.5,opacity: 1 });


map.pm.Toolbar.copyDrawControl('Polyline', {
  name: 'PolylineCopy',
  block: 'draw',
  title: 'Hat çiz',
  actions: _actions,
  onClick: polyline
});
map.pm.Draw.PolylineCopy.setPathOptions(walkRouteOption);
map.pm.Toolbar.changeControlOrder(['PolylineCopy']);

map.pm.Toolbar.copyDrawControl('Marker', {
  name: 'MarkerCopy',
  block: 'draw',
  title: 'Kamp yeri belirt',
});

map.pm.enableDraw('MarkerCopy',{markerStyle: {icon:campicon}});
map.pm.disableDraw('MarkerCopy')

map.on('pm:actionclick', function (e) {
  console.log(e);
});
map.on('pm:buttonclick', function (e) {
  console.log(e);
});

map.on("pm:create", function (e) {
  window.campname = prompt("Bölge ismi giriniz.","")
})


function polyline () {
  window.drawItem = 'polyline'
  console.log(drawItem);
};

function polygon () {
  window.drawItem = 'polygon'
  console.log(drawItem);
};

//-----------Koordinat Gösterme-----------//

map.on("click",function(c){
var point = c.latlng;
console.log("Boylam: "+point.lat+" Enlem: "+point.lng);
});

//-----------Kullanıcı Çizimi-----------//

function makePopupContent(feature){
  return `
    ${feature.geometry.coordinates}   
  `;
}
var Koordinatlar=[]
function setPupup(layer) {
  var feature = layer.toGeoJSON();
  var coords = makePopupContent(feature);
  var cords=coords.substring(5,coords.length-6);

  cords = cords.split (",")
  if (cords.length==2) {
    var temp = []
    var x = parseFloat(cords[1])
    var y = parseFloat(cords[0])
    temp.push(x)
    temp.push(y)
    markerpoint.push(temp)
  console.log (cords[1]+ ' '+ cords[0])
  }
  if(drawItem=='polyline')
  {
    var element=[];
    for (let i=0; i<cords.length; i++)
    {
      if(i%2==0){
        var temp = parseFloat(cords[i])
        element.push(temp)
      }
      else{
        var temp = parseFloat(cords[i])
        element.push(temp)
        element= element.reverse()
        console.log(element);
        polygonKenar.push(element)
        element=[]
      }
    }
  }
  else {
    var element=[];
    for (let i=2; i<cords.length; i++)
    {
      if(i%2==0){
        var temp = parseFloat(cords[i])
        element.push(temp)
      }
      else{
        var temp = parseFloat(cords[i])
        element.push(temp)
        element= element.reverse()
        console.log(element);
        polygonKenar.push(element)
        element=[]
      }
    }
  }
  
  layer.bindPopup(coords);
  layer.bindTooltip(campname);
  console.log (cords)
}

map.on('pm:create', function(e) {
  var layer = e.layer;
  setPupup(layer);
  layer.on('pm:update', function(e) {
    setPupup(e.layer);
  });
});




function drawcustompolygon () {
  if (markerpoint.length!=0){
  var custommarker = L.marker(markerpoint[0],{icon: campicon})
  custommarker.addTo(campLayer).bindTooltip(campname)
  console.log(markerpoint)
  markerpoint=[];
  }
  else{
  if (drawItem === 'polyline'){
    if (pathColor==1){
    var custompolyline = L.polyline (polygonKenar,cycleRouteOption);
    custompolyline.addTo(campLayer).bindTooltip(campname)
    console.log(polygonKenar)
    polygonKenar=[];}
  else {
    var custompolyline = L.polyline (polygonKenar,walkRouteOption);
    custompolyline.addTo(campLayer).bindTooltip(campname)
    console.log(polygonKenar)
    polygonKenar=[];
  }
  }
  else{
  var custompolygon = L.polygon (polygonKenar,polygonOption);
  custompolygon.addTo(campLayer).bindTooltip(campname)
  console.log(polygonKenar)
  polygonKenar=[];
  }}
}


L.easyButton({states:[{
  icon:'<span class="flag">&#9873;</span>',
  onClick: function(){map.setView([40.18307014852534 , 29.07257080078125], 10),sidebar.toggle();},
  title:'Menüyü açmak için tıklayın'
}]}).addTo(map);
var drawPenTool = L.easyButton({states:[{
  icon:'<span class="pen">&#9998;</span>',
  onClick: function(){onclick=drawcustompolygon()},
  title:'Son çizimi kopyala'
}]}).addTo(map)

var sidebar = L.control.sidebar('sidebar', {
  position: 'left'
});

map.addControl(sidebar);

function clicked () {
  console.log('tıklandı')
}
