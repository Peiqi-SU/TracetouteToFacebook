var map;
var marker; // facebook location
var markers = [];
var routePaths = [];
var star = "images/star.png";
var data = "data/traceRoute_outArray.txt"
var loadedText = false;
var ip_locations;
var h = 0;
var iterator = 0;
var btnColor = [];

function initialize() {
  //initIp_Locations();
    initColors();
	initBtns();
  var mapOptions = {
	center: new google.maps.LatLng(40.3756, -74.6597),
	zoom: 3,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
    },
    panControl: true,
    panControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
    },
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.RIGHT_TOP
    },
    scaleControl: true,
    scaleControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    streetViewControl: true,
    streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
    }
  };
  
  var styles = [
  {
    featureType: "water",
    stylers: [
      { hue: "#00a1ff" },
      { saturation: -51 },
	  { lightness: -74 }
    ]
  },
  {
    featureType: "landscape",
    stylers: [
      { hue: "#00d4ff" },
      { saturation: -20 },
	  { lightness: -59 }
    ]
  },
  {
	featureType: "poi",
    stylers: [
      { hue: "#00ffff" },
      { saturation: -51 },
	  { lightness: -70 }
    ]
  },
  {
	featureType: "road",
    stylers: [
	  { visibility: "off" }
    ]
  },
  {
	featureType: "transit",
    stylers: [
      { visibility: "off" }
    ]
  },
  {
	featureType: "administrative",
	elementType: "labels.text.fill",
    stylers: [
      { hue: "#ff0000" },
      { saturation: -100 },
	  { lightness: 62 }
    ]
  },
  {
	featureType: "administrative",
	elementType: "labels.text.fill",
    stylers: [
      { hue: "#ff0000" },
      { saturation: -100 },
	  { lightness: 57 }
    ]
  },
  {
	featureType: "administrative",
	elementType: "labels.text.stroke",
    stylers: [
      { hue: "#ff0000" },
      { saturation: -100 },
	  { lightness: -100 }
    ]
  }
];
  
  map = new google.maps.Map(document.getElementById("map-canvas"),
	  mapOptions);
  map.setOptions({styles: styles});
  
  // To add the marker to the map, use the 'map' property
  var myLatlng = new google.maps.LatLng(40.3756, -74.6597);
  marker = new google.maps.Marker({
	  animation: google.maps.Animation.BOUNCE,
	  position: myLatlng,
	  map: map,
	  title:"Facebook!"
  });
  addMarker();
}


function bounce() {
  //marker.setAnimation(google.maps.Animation.BOUNCE);
}


function addMarker(){
	for (var i=0,len=ip_locations.length; i<len; i++){
		setTimeout(function() {
      drop();
    }, i * 100); // 1000
  }
  //console.log(markers);
}


function drop(){
	var i = iterator;
	markers[i] = new Array();
	routePaths[i] = new Array();
	var routeCoordinates = new Array();
	for (var j=0,len2=ip_locations[i].length; j<len2; j++){
	  if(j==0){
		// the first one
		var myLatlng2 = new google.maps.LatLng(ip_locations[i][j][0], ip_locations[i][j][1]);
		marker2 = new google.maps.Marker({
		animation: google.maps.Animation.DROP,
		position: myLatlng2,
		//map: map,
		title: "IP: "+ip_locations[i][j][2]+'\n'+ "ISP: "+ ip_locations[i][j][3]+'\n'+ ip_locations[i][j][4]
		});
		

	  }
	  else{
		// the others
		var myLatlng2 = new google.maps.LatLng(ip_locations[i][j][0], ip_locations[i][j][1]);
		marker2 = new google.maps.Marker({
		animation: google.maps.Animation.DROP,
		position: myLatlng2,
		//map: map,
		icon: star,
		title:"IP: "+ip_locations[i][j][2]+'\n'+ "ISP: "+ ip_locations[i][j][3]+'\n'+ ip_locations[i][j][4]
		});
	  }
	  // a new sub array
	  markers[i].push(marker2);
	  markers[i][j].setMap(map);
	  
	  		// save the coordinate
	  routeCoordinates[j] = new google.maps.LatLng(ip_locations[i][j][0], ip_locations[i][j][1]);
	  
	  setTimeout(
		function(){
	  // draw a line
		
		var routePath = new google.maps.Polyline({
		path: routeCoordinates,
		geodesic: true,
		strokeColor: btnColor[i],
		strokeOpacity: 0.8,
		strokeWeight: 1
		});
		routePaths[i].push(routePath);
		//btnColor.push(lineColor);
		//routePaths[i][j].setMap(map);}
		routePath.setMap(map)}
		,30);  //300
	}
	
	iterator ++;
}

function initColors(){
  //var rand = Math.floor(Math.random( ) * 0xFFFFFF).toString(16);
  for (var i=0; i<ip_locations.length; i++){
	var lineColor = HSVtoRGB(h, 0.69, 0.89);
	btnColor.push(lineColor);
	h += 0.9/60;
  }
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && v === undefined) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
	r = Math.floor(r * 255);
	g = Math.floor(g * 255);
	b = Math.floor(b * 255);
	return '#'+r.toString(16)+g.toString(16)+b.toString(16);
}

//function initIp_Locations(){
  ip_locations = [
	[[-34.5875,-58.6725, "201.219.64.31","Cooperativa Telefónica Pinamar Ltda.","Argentina,Buenos Aires"],[-34.5875,-58.6725, "201.219.64.246","Cooperativa Telefónica Pinamar Ltda.","Argentina,Buenos Aires"],[34.0024,-117.9757, "208.50.254.149","Level 3 Communications","U.S.,Hacienda Heights"],[38,-97, "67.16.166.186","Level 3 Communications","U.S.,"],[38,-97, "67.16.166.250","Level 3 Communications","U.S.,"],[38,-97, "64.215.81.234","Level 3 Communications","U.S.,"],[37.3762,-122.1826, "74.119.78.68","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.32","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.15","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[-27,133, "203.50.77.49","Telstra Internet","Australia,"],[-27,133, "203.50.80.1","Telstra Internet","Australia,"],[-27,133, "203.50.11.74","Telstra Internet","Australia,"],[-27,133, "203.50.6.90","Telstra Internet","Australia,"],[-27,133, "203.50.13.134","Telstra Internet","Australia,"],[22.25,114.1667, "202.84.223.38","Reach Networks HK Ltd Network Blocks","Hong Kong,"],[22.25,114.1667, "202.84.249.54","Reach Networks HK Ltd Network Blocks","Hong Kong,"],[22.25,114.1667, "202.40.149.142","Telstra Global","Hong Kong,"],[1.3667,103.8, "103.4.96.49","Facebook","Singapore,"],[53,-8, "31.13.30.26","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.28.111","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.44","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.78","Facebook Ireland Ltd","Ireland,"],],
	[[53.9,27.5667, "178.124.134.50","Republican Unitary Telecommunication Enterprise Be","Belarus,Minsk"],[53,28, "93.84.125.166","Republican Unitary Telecommunication Enterprise Be","Belarus,"],[53,28, "93.84.125.38","Republican Unitary Telecommunication Enterprise Be","Belarus,"],[53,28, "93.85.80.38","Republican Unitary Telecommunication Enterprise Be","Belarus,"],[53,28, "93.85.80.74","Republican Unitary Telecommunication Enterprise Be","Belarus,"],[57,25, "80.232.190.253","SIA Lattelecom","Latvia,"],[52.35,4.9167, "195.69.145.115","Amsterdam Internet Exchange B.V.","Netherlands,Amsterdam"],[53,-8, "31.13.29.90","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.131","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.236","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.75","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.27.59","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[50.8333,4, "85.88.33.1","EUSIP bvba","Belgium,"],[52.5,5.75, "212.3.238.85","Level 3 Communications","Netherlands,"],[38,-97, "4.69.148.178","Level 3 Communications","U.S.,"],[38,-97, "4.69.148.182","Level 3 Communications","U.S.,"],[38,-97, "4.69.143.86","Level 3 Communications","U.S.,"],[38,-97, "4.69.137.70","Level 3 Communications","U.S.,"],[38,-97, "4.69.201.62","Level 3 Communications","U.S.,"],[51.5,-0.13, "4.69.132.89","Level 3 Communications","United Kingdom,"],[38,-97, "4.69.134.146","Level 3 Communications","U.S.,"],[38,-97, "4.69.149.146","Level 3 Communications","U.S.,"],[38,-97, "4.53.116.78","Level 3 Communications","U.S.,"],[37.3762,-122.1826, "204.15.20.54","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.86","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.21","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[-16.5,-68.15, "200.75.160.7","MegaLink","Bolivia,La Paz"],[-16.5,-68.15, "200.75.160.1","MegaLink","Bolivia,La Paz"],[-16.5,-68.15, "200.105.128.3","AXS Bolivia S. A.","Bolivia,La Paz"],[40,-4, "5.53.1.49","Telefonica International Wholesale Services-SL","Spain,"],[40,-4, "94.142.127.154","Telefonica International Wholesale Services-SL","Spain,"],[40,-4, "94.142.122.253","Telefonica International Wholesale Services-SL","Spain,"],[40,-4, "5.53.1.58","Telefonica International Wholesale Services-SL","Spain,"],[37.3762,-122.1826, "204.15.20.238","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.32","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.80","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[-10,-55, "200.145.255.2","Universidade Estadual Paulista","Brazil,"],[-10,-55, "200.143.255.49","Associação Rede Nacional de Ensino e Pesquisa","Brazil,"],[-10,-55, "187.16.218.82","Núcleo de Informação e Coordenação do Ponto BR","Brazil,"],[37.3762,-122.1826, "204.15.22.110","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.95","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.78","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[44.8023,-64.2141, "208.93.233.1","Data Centers Canada","Canada,Vaughan"],[44.8023,-64.2141, "74.122.129.1","Data Centers Canada","Canada,Vaughan"],[44.8023,-64.2141, "199.7.239.72","Data Centers Canada","Canada,Vaughan"],[44.8023,-64.2141, "199.7.239.65","Data Centers Canada","Canada,Vaughan"],[-29,24, "41.165.14.72","Neotel Pty Ltd","South Africa,"],[43.6885,-79.7616, "69.17.187.189","Rogers Cable","Canada,Brampton"],[60,-95, "69.63.251.1","Rogers Cable","Canada,"],[60,-95, "24.156.156.245","Rogers Cable","Canada,"],[60,-95, "69.63.253.142","Rogers Cable","Canada,"],[37.5331,-122.2471, "206.126.236.191","Equinix","U.S.,Redwood City"],[37.3762,-122.1826, "74.119.77.146","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.86","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.73","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[-33.45,-70.6667, "200.27.2.3","Telmex Chile Internet S.A.","Chile,Santiago"],[-33.45,-70.6667, "200.27.5.58","Telmex Chile Internet S.A.","Chile,Santiago"],[-33.45,-70.6667, "200.27.5.237","Telmex Chile Internet S.A.","Chile,Santiago"],[-33.45,-70.6667, "200.27.5.194","Telmex Chile Internet S.A.","Chile,Santiago"],[-33.45,-70.6667, "190.208.9.9","Telmex Servicios Empresariales S.A.","Chile,Santiago"],[-33.45,-70.6667, "190.208.9.6","Telmex Servicios Empresariales S.A.","Chile,Santiago"],[40.7684,-74.1454, "129.250.198.213","NTT America","U.S.,Kearny"],[39.6237,-104.8738, "129.250.4.250","NTT America","U.S.,Englewood"],[39.6237,-104.8738, "129.250.3.105","NTT America","U.S.,Englewood"],[39.6237,-104.8738, "204.2.241.114","NTT America","U.S.,Englewood"],[37.3762,-122.1826, "204.15.23.208","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.27.118","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.19","Facebook Ireland Ltd","Ireland,"],],
	[[35,105, "182.50.8.1","Beijing Linktom Network Technology Co.Ltd.","China,"],[39.9289,116.3883, "121.101.208.133","Beijing Sun Rise Technology CO.LTD","China,Beijing"],[39.9289,116.3883, "121.101.208.13","Beijing Sun Rise Technology CO.LTD","China,Beijing"],[39.9289,116.3883, "61.148.157.45","China Unicom Beijing","China,Beijing"],[39.9289,116.3883, "124.65.59.121","China Unicom Beijing","China,Beijing"],[39.9289,116.3883, "124.65.194.37","China Unicom Beijing","China,Beijing"],[35,105, "219.158.97.202","CNC group","China,"],],
	[[35,105, "202.38.128.2","Institute of High Energy Physics","China,"],[39.9289,116.3883, "202.122.36.1","Institute of High Energy Physics","China,Beijing"],[39.9289,116.3883, "159.226.253.77","China Science And Technology Network","China,Beijing"],[39.9289,116.3883, "159.226.253.54","China Science And Technology Network","China,Beijing"],],
	[[49.7455,18.6218, "78.157.167.1","SilesNet s.r.o.","Czech Republic,Cesky Tesin"],[49.7455,18.6218, "78.157.167.65","SilesNet s.r.o.","Czech Republic,Cesky Tesin"],[50.0833,14.4667, "82.113.38.105","Dial Telecom-a.s.","Czech Republic,Prague"],[49.75,15.5, "82.119.246.25","Dial Telecom-a.s.","Czech Republic,"],[49.75,15.5, "82.119.245.97","Dial Telecom-a.s.","Czech Republic,"],[49.75,15.5, "82.119.245.186","Dial Telecom-a.s.","Czech Republic,"],[50.1167,8.6833, "80.81.194.40","DE-CIX Management GmbH","Germany,Frankfurt Am Main"],[53,-8, "31.13.27.203","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.28.25","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.92","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.25.73","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.32","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.15","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[56,10, "87.72.98.17","ComX Networks A/S","Denmark,"],[56,10, "87.72.99.97","ComX Networks A/S","Denmark,"],[52.35,4.9167, "195.69.145.115","Amsterdam Internet Exchange B.V.","Netherlands,Amsterdam"],[53,-8, "31.13.29.92","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.131","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.236","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.75","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.27.80","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[62,-7, "212.55.32.7","Faroese Telecom","Faroe Islands,"],[62,-7, "212.55.63.105","Faroese Telecom","Faroe Islands,"],[62,-7, "212.55.63.77","Faroese Telecom","Faroe Islands,"],[62,-7, "212.55.63.65","Faroese Telecom","Faroe Islands,"],[56,10, "62.242.207.185","Tele Danmark","Denmark,"],[56,10, "83.88.25.27","Tele Danmark","Denmark,"],[51.5142,-0.093099999999993, "195.66.225.69","London Internet Exchange Ltd.","United Kingdom,London"],[53,-8, "31.13.30.198","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.31.2","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.31.249","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.59","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[60.2167,24.6667, "193.166.4.254","CSC - Tieteen tietotekniikan keskus Oy","Finland,Espoo"],[64,26, "193.166.187.185","CSC - Tieteen tietotekniikan keskus Oy","Finland,"],[62,15, "109.105.102.61","NORDUnet","Sweden,"],[62,15, "109.105.97.10","NORDUnet","Sweden,"],[62,15, "109.105.97.117","NORDUnet","Sweden,"],[52.35,4.9167, "195.69.145.115","Amsterdam Internet Exchange B.V.","Netherlands,Amsterdam"],[53,-8, "31.13.29.90","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.99","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.236","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.31.235","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.59","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[48.86,2.35, "212.95.66.126","SdV-Plurimedia","France,"],[48.6004,7.7874, "212.95.69.226","SdV-Plurimedia","France,Strasbourg"],[48.86,2.35, "212.95.64.58","SdV-Plurimedia","France,"],[48.8667,2.3333, "46.255.176.86","Neo Telecoms S.A.S.","France,Paris"],[48.86,2.35, "83.167.55.118","Neo Telecoms S.A.S.","France,"],[48.86,2.35, "83.167.56.159","Neo Telecoms S.A.S.","France,"],[48.86,2.35, "83.167.55.116","Neo Telecoms S.A.S.","France,"],[48.86,2.35, "37.49.236.174","France IX Services SASU","France,"],[37.3762,-122.1826, "204.15.22.194","Facebook","U.S.,Palo Alto"],[37.3762,-122.1826, "204.15.23.17","Facebook","U.S.,Palo Alto"],[37.3762,-122.1826, "204.15.20.128","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.32","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.76","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[48.86,2.35, "46.19.176.193","Linkbynet","France,"],[48.9333,2.3667, "217.19.56.31","Linkbynet","France,Saint-denis"],[48.8667,2.3333, "193.251.250.225","Orange","France,Paris"],[48.86,2.35, "193.251.132.102","Orange","France,"],[48.8667,2.3333, "193.251.252.238","Orange","France,Paris"],[37.3762,-122.1826, "204.15.23.14","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.30.92","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.25.73","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.95","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.73","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[51.65,6.1833, "176.28.4.58","Host Europe GmbH","Germany,Host"],[51.65,6.1833, "176.28.4.73","Host Europe GmbH","Germany,Höst"],[51,9, "217.243.217.253","Deutsche Telekom AG","Germany,"],[51,9, "217.5.95.62","Deutsche Telekom AG","Germany,"],[51,9, "80.157.128.166","Deutsche Telekom AG","Germany,"],[53,-8, "31.13.27.203","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.28.25","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.23.17","Facebook","U.S.,Palo Alto"],[37.3762,-122.1826, "204.15.20.128","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.86","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.67","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[51,9, "213.239.224.65","Hetzner Online AG","Germany,"],[51,9, "213.239.245.121","Hetzner Online AG","Germany,"],[51,9, "213.239.245.177","Hetzner Online AG","Germany,"],[51,9, "213.239.245.5","Hetzner Online AG","Germany,"],[50.1167,8.6833, "80.81.194.40","DE-CIX Management GmbH","Germany,Frankfurt Am Main"],[53,-8, "31.13.27.203","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "74.119.78.112","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.30.92","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.128","Facebook","U.S.,Palo Alto"],[37.3762,-122.1826, "204.15.20.128","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.27.69","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.67","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[37.9833,23.7333, "147.102.222.200","National Technical University of Athens","Greece,Athens"],[37.9833,23.7333, "194.177.209.117","Greek Research and Technology Network S.A","Greece,Athens"],[37.9833,23.7333, "195.251.27.54","Greek Research and Technology Network S.A","Greece,Athens"],[51.5,-0.13, "62.40.124.89","DANTE Ltd","United Kingdom,"],[51.5,-0.13, "62.40.112.165","DANTE Ltd","United Kingdom,"],[51.5,-0.13, "62.40.98.43","DANTE Ltd","United Kingdom,"],[47.3333,13.3333, "193.203.0.194","ACOnet Services @ Vienna Internet eXchange","Austria,"],[53,-8, "31.13.29.210","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.28.25","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.92","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.25.71","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.80","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.73","Facebook Ireland Ltd","Ireland,"],],
	[[22.25,114.1667, "210.0.250.1","Hutchison Global Communications","Hong Kong,"],[22.25,114.1667, "202.40.161.110","Suite 1602-16/F.-Tower 2-Nina Tower","Hong Kong,"],[53,-8, "31.13.28.116","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.21.186","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.28","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.76","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[47,20, "193.225.14.253","NIIFI (Nemzeti Informacios Infrastruktura Fejleszt","Hungary,"],[47,20, "195.111.96.57","NIIFI (Nemzeti Informacios Infrastruktura Fejleszt","Hungary,"],[51.5,-0.13, "62.40.124.102","DANTE Ltd","United Kingdom,"],[51.5,-0.13, "62.40.124.101","DANTE Ltd","United Kingdom,"],[51.5,-0.13, "62.40.98.111","DANTE Ltd","United Kingdom,"],[51.5,-0.13, "62.40.98.63","DANTE Ltd","United Kingdom,"],[47.3333,13.3333, "193.203.0.194","ACOnet Services @ Vienna Internet eXchange","Austria,"],[53,-8, "31.13.29.158","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.2","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.92","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.163","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.32","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.61","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[65,-18, "130.208.16.13","SURIS/RHnet Iceland University Research Network","Iceland,"],[62,15, "109.105.102.1","NORDUnet","Sweden,"],[62,15, "109.105.97.41","NORDUnet","Sweden,"],[51.5142,-0.093099999999993, "195.66.225.69","London Internet Exchange Ltd.","United Kingdom,London"],[53,-8, "31.13.30.198","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.236","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.31.249","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.73","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[28.6,77.2, "203.110.87.17","delDSL Internet Pvt. Ltd.","India,New Delhi"],[28.6,77.2, "203.110.80.9","delDSL Internet Pvt. Ltd.","India,New Delhi"],[20,77, "115.113.254.77","TATA Communications","India,"],[20,77, "115.114.85.233","TATA Communications","India,"],[47,8, "80.231.217.17","TATA Communications (Canada) Ltd.","Europe,"],[47,8, "80.231.217.6","TATA Communications (Canada) Ltd.","Europe,"],[47,8, "80.231.154.17","TATA Communications (Canada) Ltd.","Europe,"],[47,8, "80.231.153.66","TATA Communications (Canada) Ltd.","Europe,"],[38,-97, "4.69.168.62","Level 3 Communications","U.S.,"],[38,-97, "4.69.161.93","Level 3 Communications","U.S.,"],[38,-97, "4.69.137.62","Level 3 Communications","U.S.,"],[38,-97, "4.69.134.150","Level 3 Communications","U.S.,"],[38,-97, "4.69.149.82","Level 3 Communications","U.S.,"],[38,-97, "4.53.116.78","Level 3 Communications","U.S.,"],[37.3762,-122.1826, "204.15.20.54","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.80","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.57","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[3.5833,98.6667, "202.162.192.254","PT. Media Antar Nusa","Indonesia,Medan"],[3.5833,98.6667, "202.162.199.238","PT. Media Antar Nusa","Indonesia,Medan"],[-6.1744,106.8294, "124.195.60.121","PT Indosat Tbk.","Indonesia,Jakarta"],[-6.1744,106.8294, "124.195.111.250","PT Indosat Tbk.","Indonesia,Jakarta"],[-6.1744,106.8294, "114.0.12.121","PT Indosat Tbk (www.indosat.com)","Indonesia,Jakarta"],[-5,120, "202.93.44.33","INDOSAT Internet Network Provider","Indonesia,"],[-6.1744,106.8294, "114.4.19.2","PT Indosat Tbk (www.indosat.com)","Indonesia,Jakarta"],[-6.1744,106.8294, "114.4.19.18","PT Indosat Tbk (www.indosat.com)","Indonesia,Jakarta"],[-6.1744,106.8294, "114.4.19.38","PT Indosat Tbk (www.indosat.com)","Indonesia,Jakarta"],[-6.1744,106.8294, "114.4.19.102","PT Indosat Tbk (www.indosat.com)","Indonesia,Jakarta"],[1.3667,103.8, "103.4.97.25","Facebook","Singapore,"],[53,-8, "31.13.28.146","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.28.139","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.79","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.28.111","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.118","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.80","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[42.8333,12.8333, "85.94.212.9","SEEWEB s.r.l.","Italy,"],[42.8333,12.8333, "212.25.160.3","SEEWEB s.r.l.","Italy,"],[42.8333,12.8333, "85.94.223.199","SEEWEB s.r.l.","Italy,"],[52.35,4.9167, "195.69.145.164","Amsterdam Internet Exchange B.V.","Netherlands,Amsterdam"],[53,-8, "31.13.29.88","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "74.119.78.225","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.30.236","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.75","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.27.69","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[35.7167,140.65, "124.155.65.228","ASAHI Net.Inc.","Japan,Asahi"],[35.7167,140.65, "124.155.65.254","ASAHI Net.Inc.","Japan,Asahi"],[35.7167,140.65, "124.155.64.1","ASAHI Net.Inc.","Japan,Asahi"],[35.69,139.69, "202.224.32.56","Asahi Net","Japan,"],[35.69,139.69, "125.29.26.105","Kddi Corporation","Japan,"],[35.69,139.69, "118.155.197.129","Kddi Corporation","Japan,"],[35.69,139.69, "106.187.6.34","Kddi Corporation","Japan,"],[35.69,139.69, "203.181.102.18","Kddi Corporation","Japan,"],[53,-8, "31.13.27.130","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.23.215","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.31.160","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.59","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[42.8731,74.6003, "212.42.96.51","ElCat Ltd.","Kyrgyzstan,Bishkek"],[42.8731,74.6003, "212.42.96.80","ElCat Ltd.","Kyrgyzstan,Bishkek"],[55.7522,37.6156, "195.218.197.85","VimpelCom","Russian Federation,Moscow"],[60,100, "79.104.235.70","VimpelCom","Russian Federation,"],[52.35,4.9167, "195.69.145.164","Amsterdam Internet Exchange B.V.","Netherlands,Amsterdam"],[53,-8, "31.13.29.92","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.131","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.236","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.75","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.27.71","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[57,25, "80.232.169.1","SIA Lattelecom","Latvia,"],[57,25, "195.122.0.42","SIA Lattelecom","Latvia,"],[52.35,4.9167, "195.69.145.115","Amsterdam Internet Exchange B.V.","Netherlands,Amsterdam"],[53,-8, "31.13.29.86","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "74.119.78.225","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.30.236","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.75","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.27.73","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[56,24, "84.15.6.170","UAB Bite Lietuva","Lithuania,"],[51,9, "80.150.171.57","Deutsche Telekom AG","Germany,"],[51,9, "217.5.95.26","Deutsche Telekom AG","Germany,"],[51,9, "80.157.128.166","Deutsche Telekom AG","Germany,"],[53,-8, "31.13.27.203","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "74.119.78.112","Facebook","U.S.,Palo Alto"],[37.3762,-122.1826, "204.15.23.17","Facebook","U.S.,Palo Alto"],[37.3762,-122.1826, "204.15.20.128","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.32","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.82","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[49.75,6.1667, "80.92.66.1","Datacenter Luxembourg S.A.","Luxembourg,"],[49.75,6.1667, "80.92.83.199","Datacenter Luxembourg S.A.","Luxembourg,"],[49.75,6.1667, "80.92.83.193","Datacenter Luxembourg S.A.","Luxembourg,"],[33.4356,-112.3496, "64.208.205.149","Level 3 Communications","U.S.,Avondale"],[38,-97, "67.17.71.213","Level 3 Communications","U.S.,"],[38,-97, "67.16.166.166","Level 3 Communications","U.S.,"],[38,-97, "67.16.166.234","Level 3 Communications","U.S.,"],[38,-97, "64.215.81.234","Level 3 Communications","U.S.,"],[37.3762,-122.1826, "74.119.78.68","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.32","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.76","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[52.5,5.75, "80.69.67.220","Transip B.V.","Netherlands,"],[52.35,4.9167, "195.69.145.115","Amsterdam Internet Exchange B.V.","Netherlands,Amsterdam"],[53,-8, "31.13.29.86","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "74.119.78.225","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.30.236","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.75","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.27.73","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[31.5497,74.3436, "202.59.80.2","Nexlinx ISP Pakistan","Pakistan,Lahore"],[30,70, "202.125.143.149","Paknet Limited Merged into PTCL","Pakistan,"],[33.69,73.0551, "221.120.252.225","PTCL","Pakistan,Islamabad"],[33.69,73.0551, "221.120.254.42","PTCL","Pakistan,Islamabad"],[30,70, "202.125.128.170","Paknet Limited Merged into PTCL","Pakistan,"],[42.8333,12.8333, "195.22.198.204","TELECOM ITALIA SPARKLE S.p.A.","Italy,"],[42.8333,12.8333, "195.22.199.99","TELECOM ITALIA SPARKLE S.p.A.","Italy,"],[42.8333,12.8333, "89.221.41.81","TELECOM ITALIA SPARKLE S.p.A.","Italy,"],[37.3762,-122.1826, "204.15.23.216","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.30","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.57","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[50.2584,19.0275, "217.153.235.185","GTS Poland Sp. z o.o.","Poland,Katowice"],[52,20, "157.25.4.237","GTS Poland Sp. z o.o.","Poland,"],[52,20, "157.25.248.222","GTS Poland Sp. z o.o.","Poland,"],[52,20, "157.25.248.114","GTS Poland Sp. z o.o.","Poland,"],[47.3333,13.3333, "195.39.208.221","GTS Czech s.r.o.","Austria,"],[50.1167,8.6833, "80.81.194.40","DE-CIX Management GmbH","Germany,Frankfurt Am Main"],[53,-8, "31.13.27.205","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "74.119.78.112","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.30.92","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.128","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.86","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.19","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[39.5,-8, "94.46.248.46","NFSi Telecom-Lda.","Portugal,"],[41.1496,-8.611, "94.46.143.61","NFSi Telecom-Lda.","Portugal,Porto"],[39.5,-8, "81.92.220.6","NFSi Telecom-Lda.","Portugal,"],[51.5,-0.13, "62.73.183.105","NTT America","United Kingdom,"],[39.6237,-104.8738, "129.250.4.137","NTT America","U.S.,Englewood"],[39.6237,-104.8738, "129.250.4.85","NTT America","U.S.,Englewood"],[39.6237,-104.8738, "129.250.3.126","NTT America","U.S.,Englewood"],[39.6237,-104.8738, "129.250.3.73","NTT America","U.S.,Englewood"],[39.6237,-104.8738, "129.250.2.9","NTT America","U.S.,Englewood"],[39.6237,-104.8738, "129.250.3.110","NTT America","U.S.,Englewood"],[39.6237,-104.8738, "168.143.97.118","NTT America","U.S.,Englewood"],[37.3762,-122.1826, "74.119.78.68","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.86","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.21","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[45.3833,22.3333, "89.47.38.129","Datazyx Sc Data Zyx Srl","Romania,Turnu"],[46,25, "178.21.123.201","Direct One SA","Romania,"],[46,25, "193.106.45.38","Direct One S.A.","Romania,"],[40,-4, "83.217.231.2","NTT America","Spain,"],[40,-4, "83.217.231.1","NTT America","Spain,"],[39.6237,-104.8738, "129.250.3.188","NTT America","U.S.,Englewood"],[39.6237,-104.8738, "129.250.5.217","NTT America","U.S.,Englewood"],[39.6237,-104.8738, "129.250.3.20","NTT America","U.S.,Englewood"],[39.6237,-104.8738, "129.250.3.114","NTT America","U.S.,Englewood"],[39.6237,-104.8738, "168.143.97.118","NTT America","U.S.,Englewood"],[37.3762,-122.1826, "74.119.78.68","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.32","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.19","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[55.7522,37.6156, "195.128.76.225","CJSC Macomnet","Russian Federation,Moscow"],[55.7522,37.6156, "195.239.11.229","VimpelCom","Russian Federation,Moscow"],[52.35,4.9167, "195.69.145.164","Amsterdam Internet Exchange B.V.","Netherlands,Amsterdam"],[53,-8, "31.13.29.92","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "74.119.78.231","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.30.236","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.31.5","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.17","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[1.3667,103.8, "202.150.221.169","NewMedia Express Pte Ltd-Singapore Web Hosting","Singapore,"],[1.3667,103.8, "202.79.197.65","Equinix Asia Pacific Pte Ltd","Singapore,"],[53,-8, "31.13.28.146","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.28.139","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.79","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.28.111","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.120","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.57","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[-25.7597,28.2651, "160.124.109.126","Posix Systems (Pty) Ltd","South Africa,Lynnwood"],[-25.7597,28.2651, "160.124.1.2","Posix Systems (Pty) Ltd","South Africa,Lynnwood"],[51,9, "213.200.77.17","Tinet SpA","Germany,"],[51,9, "213.200.77.234","Tinet SpA","Germany,"],[38,-97, "67.16.166.250","Level 3 Communications","U.S.,"],[38,-97, "64.215.81.234","Level 3 Communications","U.S.,"],[37.3762,-122.1826, "74.119.78.68","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.32","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.76","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[59.35,17.9167, "193.228.143.149","Flashdance AB","Sweden,Bromma"],[59.35,17.9167, "193.228.143.250","Flashdance AB","Sweden,Bromma"],[62,15, "194.68.0.217","Resilans AB","Sweden,"],[62,15, "194.68.0.205","Resilans AB","Sweden,"],[62,15, "80.67.0.213","Portlane Networks AB","Sweden,"],[62,15, "80.67.4.174","Portlane Networks AB","Sweden,"],[62,15, "80.67.4.179","Portlane Networks AB","Sweden,"],[52.35,4.9167, "195.69.145.164","Amsterdam Internet Exchange B.V.","Netherlands,Amsterdam"],[53,-8, "31.13.29.88","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.131","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.236","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.31.5","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.67","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[47.3667,8.55, "130.59.108.5","SWITCH-The Swiss Education and Research Network","Switzerland,Zurich"],[47.3667,8.55, "130.59.36.138","SWITCH-The Swiss Education and Research Network","Switzerland,Zurich"],[47.3667,8.55, "130.59.36.1","SWITCH-The Swiss Education and Research Network","Switzerland,Zurich"],[52.35,4.9167, "195.69.145.164","Amsterdam Internet Exchange B.V.","Netherlands,Amsterdam"],[53,-8, "31.13.29.92","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "74.119.78.231","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.30.236","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.75","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.27.73","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[25.0392,121.525, "211.76.96.254","Eastern Broadband Telecom Co.-Ltd","Taiwan,Taipei"],[25.0392,121.525, "219.80.240.37","Taiwan Fixed Network CO.LTD.","Taiwan,Taipei"],[25.0392,121.525, "60.199.20.34","Taiwan Fixed Network CO.LTD.","Taiwan,Taipei"],[37.5331,-122.2471, "198.32.176.71","Equinix","U.S.,Redwood City"],[37.3762,-122.1826, "74.119.77.177","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.25.246","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.42","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.21","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[13.754,100.5014, "202.28.62.246","UniNet(Inter-university network)","Thailand,Bangkok"],[13.754,100.5014, "202.28.62.250","UniNet(Inter-university network)","Thailand,Bangkok"],[13.754,100.5014, "202.28.212.173","UniNet(Inter-university network)","Thailand,Bangkok"],[13.754,100.5014, "202.28.212.53","UniNet(Inter-university network)","Thailand,Bangkok"],[15,100, "122.155.224.29","CAT Telecom public company Ltd","Thailand,"],[15,100, "61.19.7.9","CAT Telecom public company Ltd","Thailand,"],[15,100, "61.19.7.2","CAT Telecom public company Ltd","Thailand,"],[15,100, "61.19.9.158","CAT Telecom public company Ltd","Thailand,"],[53,-8, "31.13.28.146","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.28.139","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.79","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.28.111","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.44","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.78","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[49,32, "185.12.112.254","PP Koordinator","Ukraine,"],[51.5,-0.13, "87.245.239.37","RETN Limited","United Kingdom,"],[51.5,-0.13, "87.245.233.138","RETN Limited","United Kingdom,"],[47.3333,13.3333, "193.203.0.194","ACOnet Services @ Vienna Internet eXchange","Austria,"],[53,-8, "31.13.29.158","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.28.25","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.92","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.128","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.38","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.76","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[53.3333,-2.6333, "193.62.127.129","The JNT Association","United Kingdom,Daresbury"],[51.5,-0.13, "193.63.74.131","The JNT Association","United Kingdom,"],[51.5,-0.13, "193.63.74.226","The JNT Association","United Kingdom,"],[53.3333,-2.6333, "193.62.116.18","The JNT Association","United Kingdom,Daresbury"],[51.5142,-0.093099999999993, "146.97.41.61","UK Academic Joint Network Team (NET-JANET-IP)","United Kingdom,London"],[51.5142,-0.093099999999993, "146.97.33.41","UK Academic Joint Network Team (NET-JANET-IP)","United Kingdom,London"],[51.5142,-0.093099999999993, "146.97.33.21","UK Academic Joint Network Team (NET-JANET-IP)","United Kingdom,London"],[51.5142,-0.093099999999993, "146.97.33.1","UK Academic Joint Network Team (NET-JANET-IP)","United Kingdom,London"],[51.5142,-0.093099999999993, "146.97.35.174","UK Academic Joint Network Team (NET-JANET-IP)","United Kingdom,London"],[51.5142,-0.093099999999993, "195.66.237.69","London Internet Exchange Ltd.","United Kingdom,London"],[53,-8, "31.13.30.198","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.30.236","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.31.249","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.69","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[38,-97, "64.200.84.2","Level 3 Communications","U.S.,"],[38,-97, "4.26.41.225","Level 3 Communications","U.S.,"],[38,-97, "4.69.140.74","Level 3 Communications","U.S.,"],[51.5,-0.13, "4.69.132.194","Level 3 Communications","United Kingdom,"],[38,-97, "4.69.136.190","Level 3 Communications","U.S.,"],[38,-97, "4.69.134.138","Level 3 Communications","U.S.,"],[38,-97, "4.69.149.210","Level 3 Communications","U.S.,"],[38,-97, "4.53.116.78","Level 3 Communications","U.S.,"],[37.3762,-122.1826, "74.119.77.146","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.38","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.17","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[42.3584,-71.0598, "216.93.240.253","TowardEX Technologies International","U.S.,Boston"],[42.3584,-71.0598, "216.93.255.197","TowardEX Technologies International","U.S.,Boston"],[38,-97, "198.160.63.131","TOWARDEX Carrier Services IP TRANSIT BACKBONE","U.S.,"],[38,-97, "198.160.63.137","TOWARDEX Carrier Services IP TRANSIT BACKBONE","U.S.,"],[42.3646,-71.1028, "4.31.154.77","Level 3 Communications","U.S.,Cambridge"],[38,-97, "4.69.140.90","Level 3 Communications","U.S.,"],[38,-97, "4.69.140.98","Level 3 Communications","U.S.,"],[38,-97, "4.69.201.42","Level 3 Communications","U.S.,"],[38,-97, "4.69.202.53","Level 3 Communications","U.S.,"],[38,-97, "4.69.134.158","Level 3 Communications","U.S.,"],[38,-97, "4.69.149.18","Level 3 Communications","U.S.,"],[38,-97, "4.53.116.78","Level 3 Communications","U.S.,"],[37.3762,-122.1826, "74.119.77.146","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.24","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.73","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[41.8745,-87.6503, "208.100.4.50","Steadfast Networks","U.S.,Chicago"],[41.8745,-87.6503, "208.100.32.32","Steadfast Networks","U.S.,Chicago"],[41.8745,-87.6503, "216.86.149.53","Steadfast Networks","U.S.,Chicago"],[41.8745,-87.6503, "216.86.149.53","Steadfast Networks","U.S.,Chicago"],[53,-8, "31.13.29.2","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.150","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.120","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.61","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[39.9612,-82.9988, "33.62.76.144","DoD Network Information Center","U.S.,Columbus"],[51,9, "213.239.243.225","Hetzner Online AG","Germany,"],[51,9, "213.239.245.149","Hetzner Online AG","Germany,"],[51,9, "213.239.245.177","Hetzner Online AG","Germany,"],[51,9, "213.239.245.5","Hetzner Online AG","Germany,"],[50.1167,8.6833, "80.81.194.40","DE-CIX Management GmbH","Germany,Frankfurt Am Main"],[53,-8, "31.13.27.203","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "74.119.78.118","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.30.92","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.25.71","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.86","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.73","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[41.5839,-93.6289, "167.142.67.89","netINS","U.S.,Des Moines"],[41.5839,-93.6289, "167.142.67.25","netINS","U.S.,Des Moines"],[41.5839,-93.6289, "167.142.67.182","netINS","U.S.,Des Moines"],[42.7627,-84.4427, "216.176.4.29","Great Lakes Comnet","U.S.,East Lansing"],[38,-97, "206.223.119.115","","U.S.,"],[53,-8, "31.13.29.0","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.148","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.30","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.80","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[36.1113,-115.2791, "208.76.255.189","Colocation America Corporation","U.S.,Las Vegas"],[34.4065,-118.4015, "208.64.231.81","Multacom Corporation","U.S.,Canyon Country"],[34.4065,-118.4015, "208.64.231.6","Multacom Corporation","U.S.,Canyon Country"],[38,-97, "206.223.143.161","","U.S.,"],[53,-8, "31.13.30.26","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.28.111","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.120","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.82","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[33.7866,-118.2987, "68.181.194.65","University of Southern California","U.S.,Los Angeles"],[33.8188,-118.0377, "137.164.23.225","CENIC","U.S.,Cypress"],[33.8188,-118.0377, "137.164.46.134","CENIC","U.S.,Cypress"],[33.8188,-118.0377, "137.164.46.97","CENIC","U.S.,Cypress"],[33.8188,-118.0377, "137.164.46.205","CENIC","U.S.,Cypress"],[33.8188,-118.0377, "137.164.47.20","CENIC","U.S.,Cypress"],[17.1333,-62.6167, "198.32.251.133","Almond Oil Process-LLC.","Saint Kitts and Nevis,Charlestown"],[37.3762,-122.1826, "74.119.77.130","Facebook","U.S.,Palo Alto"],[37.3762,-122.1826, "74.119.76.137","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.28","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.80","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[37.459,-122.1781, "134.79.197.130","SLAC National Accelerator Laboratory","U.S.,Menlo Park"],[37.459,-122.1781, "134.79.252.162","SLAC National Accelerator Laboratory","U.S.,Menlo Park"],[37.459,-122.1781, "134.79.252.145","SLAC National Accelerator Laboratory","U.S.,Menlo Park"],[38,-97, "192.68.191.249","SLAC National Accelerator Laboratory","U.S.,"],[37.8668,-122.2536, "134.55.40.5","ESnet","U.S.,Berkeley"],[37.8668,-122.2536, "134.55.50.202","ESnet","U.S.,Berkeley"],[37.8668,-122.2536, "134.55.49.58","ESnet","U.S.,Berkeley"],[37.8668,-122.2536, "134.55.43.81","ESnet","U.S.,Berkeley"],[37.8668,-122.2536, "134.55.38.162","ESnet","U.S.,Berkeley"],[37.8668,-122.2536, "198.125.140.234","ESnet","U.S.,Berkeley"],[38,-97, "67.16.166.234","Level 3 Communications","U.S.,"],[38,-97, "64.215.81.234","Level 3 Communications","U.S.,"],[37.3762,-122.1826, "74.119.78.68","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.32","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.15","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[40.7214,-74.0052, "69.162.170.3","Steadfast Networks","U.S.,New York"],[41.8745,-87.6503, "67.202.117.61","Steadfast Networks","U.S.,Chicago"],[41.8745,-87.6503, "67.202.117.25","Steadfast Networks","U.S.,Chicago"],[37.5331,-122.2471, "198.32.118.27","Equinix","U.S.,Redwood City"],[53,-8, "31.13.30.10","Facebook Ireland Ltd","Ireland,"],[37.3762,-122.1826, "204.15.20.128","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.32","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.80","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[40.3756,-74.6597, "128.112.128.2","Princeton University","U.S.,Princeton"],[40.3756,-74.6597, "128.112.12.82","Princeton University","U.S.,Princeton"],[40.3756,-74.6597, "204.153.48.10","Princeton University","U.S.,Princeton"],[40.7553,-73.9924, "63.138.53.73","PAETEC Communications","U.S.,New York"],[43.1005,-77.426, "169.130.164.138","PAETEC Communications","U.S.,Fairport"],[53,-8, "31.13.27.82","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[35.7463,-78.7239, "209.132.180.92","Red Hat","U.S.,Raleigh"],[35.7463,-78.7239, "209.132.180.2","Red Hat","U.S.,Raleigh"],[37.5081,-122.301, "209.132.181.163","Red Hat","U.S.,Belmont"],[33.7516,-84.3915, "69.25.121.29","Internap Network Services Corporation","U.S.,Atlanta"],[33.7516,-84.3915, "69.25.168.84","Internap Network Services Corporation","U.S.,Atlanta"],[48.86,2.35, "77.67.94.73","Tinet SpA","France,"],[48.86,2.35, "89.149.182.174","Tinet SpA","France,"],[38,-97, "4.68.62.1","Level 3 Communications","U.S.,"],[38,-97, "4.69.144.190","Level 3 Communications","U.S.,"],[38,-97, "4.69.137.17","Level 3 Communications","U.S.,"],[51.5,-0.13, "4.69.132.78","Level 3 Communications","United Kingdom,"],[38,-97, "4.69.134.22","Level 3 Communications","U.S.,"],[38,-97, "4.69.148.242","Level 3 Communications","U.S.,"],[38,-97, "4.69.159.33","Level 3 Communications","U.S.,"],[38,-97, "4.28.26.46","Level 3 Communications","U.S.,"],[37.3762,-122.1826, "204.15.23.210","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.27.120","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.19","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[38.6143,-90.4444, "206.123.64.46","Colo4-LLC","U.S.,Saint Louis"],[35.222,-101.8313, "173.219.246.92","Suddenlink Communications","U.S.,Amarillo"],[37.3762,-122.1826, "204.15.21.50","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.27.110","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.59","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[37.3338,-121.8915, "205.185.112.144","FranTech Solutions","U.S.,San Jose"],[32.7153,-117.1573, "199.47.208.9","VegasNAP-LLC","U.S.,San Diego"],[37.5155,-121.8962, "64.62.249.89","Hurricane Electric","U.S.,Fremont"],[37.5155,-121.8962, "184.105.222.161","Hurricane Electric","U.S.,Fremont"],[38,-97, "206.223.143.161","","U.S.,"],[53,-8, "31.13.30.26","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.28.111","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.24.44","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.82","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[40.7801,-74.0633, "66.45.228.190","Interserver","U.S.,Secaucus"],[40.7801,-74.0633, "64.20.32.213","Interserver","U.S.,Secaucus"],[40.7801,-74.0633, "64.20.32.234","Interserver","U.S.,Secaucus"],[40.7605,-73.9933, "207.239.51.85","XO Communications","U.S.,New York"],[38,-97, "216.156.0.17","XO Communications","U.S.,"],[38,-97, "206.111.13.214","XO Communications","U.S.,"],[38,-97, "67.17.105.237","Level 3 Communications","U.S.,"],[38,-97, "67.16.166.190","Level 3 Communications","U.S.,"],[38,-97, "67.16.166.250","Level 3 Communications","U.S.,"],[38,-97, "64.215.81.234","Level 3 Communications","U.S.,"],[37.3762,-122.1826, "74.119.78.68","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.32","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.80","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[34.3078,-118.4493, "208.79.89.233","Arp Networks","U.S.,Sylmar"],[38,-97, "206.223.143.161","","U.S.,"],[53,-8, "31.13.30.26","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.28.111","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.118","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.55","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	[[32.2217,-110.9265, "207.182.35.49","Opus One","U.S.,Tucson"],[32.2476,-110.95, "209.104.3.89","Login","U.S.,Tucson"],[32.2217,-110.9265, "206.169.93.41","tw telecom holdings","U.S.,Tucson"],[38,-97, "64.129.238.190","tw telecom holdings","U.S.,"],[37.3635,-118.3951, "12.91.226.9","AT&T Services","U.S.,Bishop"],[38,-97, "12.122.104.14","AT&T Services","U.S.,"],[38,-97, "12.122.1.146","AT&T Services","U.S.,"],[38,-97, "12.122.128.201","AT&T Services","U.S.,"],[37.5147,-122.0423, "12.249.231.26","AT&T Services","U.S.,Newark"],[37.3762,-122.1826, "74.119.76.21","Facebook","U.S.,Palo Alto"],[53,-8, "31.13.24.28","Facebook Ireland Ltd","Ireland,"],[53,-8, "31.13.27.80","Facebook Ireland Ltd","Ireland,"],[40.3756,-74.6597, "173.252.110.27","Facebook","U.S.,Princeton"],],
	];
//}


google.maps.event.addDomListener(window, 'load', initialize);

allBtns = "<button onclick=\"allBtn()\" class=\"btn\" style = \"background-color:#000000; border-color: #ffffff;\">show all</button>"
//cityBtns = "<button onclick=\"hideMarks()\">"+ip_locations[0][0][4]+"</button>"
//cityBtns = [];
function initBtns(){
  cityBtns = [];
  for (var i=0; i<ip_locations.length; i++){
	cityBtns.push("<button onclick=\"hideMarks("+i+")\" class=\"btn\" style = \"border-color:"+btnColor[i]+";\">"+ip_locations[i][0][4]+"</button>");
  }
  //cityBtns = "<button onclick=\"hideMarks()\">"+ip_locations[0][0][4]+"</button>"
  document.getElementById('citiesBtns').innerHTML = cityBtns.join("");
}

function allBtn(){
  for (var i=0,len=markers.length; i<len; i++){
	for (var j=0,len2=markers[i].length; j<len2; j++){
	  markers[i][j].setMap(map);
	  routePaths[i][j].setMap(map);
	}
  }
}

function hideMarks(city) {
  for (var i=0,len=markers.length; i<len; i++){
	for (var j=0,len2=markers[i].length; j<len2; j++){
	  markers[i][j].setMap(null);
	  routePaths[i][j].setMap(null);
	}
  }
  for (var j=0,len2=ip_locations[city].length; j<len2; j++){
	markers[city][j].setMap(map);
	routePaths[city][j].setMap(map);
  }
}