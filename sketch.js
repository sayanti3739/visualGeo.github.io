var mapimg;

var lat = 0;
var lon = 0;

var clat = 22.5726; var clon = 88.3639; //22.5726° N, 88.3639° E

var earthquakes;

var volcanos;

function preload()
{
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoicmlkaGltYTQ3IiwiYSI6ImNqajczNnlxbjAxZGgzcG1uYW9kOXg3NmoifQ.R4n2Q4sXBbBgV2VxKMGglg');
  earthquakes = loadJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson");
  volcanos = loadJSON("https://data.humdata.org/dataset/a60ac839-920d-435a-bf7d-25855602699d/resource/7234d067-2d74-449a-9c61-22ae6d98d928/download/volcano.json");
}

function markX(lon)
{
	lon = radians(lon);
	var x = (256/PI)*(pow(2,1));
	var y = PI+lon;
	return x*y;
}

function markY(lat)
{
	lat = radians(lat);
	var x = (256/PI)*(pow(2,1));
	var y = tan((PI/4)+(lat/2));
	var z = PI-log(y);
	return x*z;
}

function earthquakespts()
{
  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapimg,0,0);
  var cx = markX(0);
  var cy = markY(0);

  for(var i = 0; i<earthquakes.features.length; i++)
  {
    clon = earthquakes.features[i].geometry.coordinates[0];
    clat = earthquakes.features[i].geometry.coordinates[1];
    var mag = earthquakes.features[i].properties.mag;
    var x = markX(clon)-cx;
    var y = markY(clat)-cy;

    mag = pow(10, mag);
    mag = sqrt(mag);

    var magmax = sqrt(pow(10,10));

    var r = map(mag, 0, magmax, 0, 500);

    fill(255,0,0);
    ellipse(x,y,2*r,2*r);

  }
}

function volcanospts(){
  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapimg,0,0);

  var cx = markX(0);
  var cy = markY(0);
 
  for(var i=0; i<volcanos.features.length; i++)
  {
	lat= volcanos.features[i].properties.Latitude;
	lon= volcanos.features[i].properties.Longitude;
	var x = markX(lon) - cx;
	var y = markY(lat) - cy;
	var activity = volcanos.features[i].properties.risk;
	if(activity=="NULL"){
		noStroke();
		fill(255, 246, 0,150);
		triangle(x-3,y,x,y-6,x+3,y);
	}

	else if(activity=="1"){
		noStroke();
		fill(255, 119, 0,200)
		triangle(x-3,y,x,y-6,x+3,y);

	}
	else if(activity=="2"){
		noStroke();
		fill(221, 101, 15,200);
		triangle(x-3,y,x,y-6,x+3,y);

	}
	else{
		noStroke();
		fill(255, 0, 0);
		triangle(x-5,y,x,y-10,x+5,y);
	}
  
 }

}

function setup() 
{

  var c=createCanvas(1024,512);

  c.style("width","1024px");
  c.style("margin","40px 100px 20px 50px");
  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapimg,0,0);

  button_1 = createButton('EARTHQUAKES');
  button_2 = createButton('VOLCANOS');
  button_1.position(130, 580);
  button_2.position(330, 580);
  button_1.mousePressed(earthquakespts);
  button_2.mousePressed(volcanospts);
}

