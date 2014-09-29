var WebScale = require('./index');

var webScale = new WebScale();

webScale.on('change:weight', function(ounces){
    var pounds = roundTowardsZero(ounces/16);
    var remainderOunces = (Math.round(ounces % 16 * 10)/10).toFixed(1);

    console.log(pounds + " lbs. " + remainderOunces + " oz.");
});

webScale.on('error', function(err){
    console.error("Oh noes.", err);
});

webScale.on('connected', function(){
    console.log("Scale online.");
});

webScale.once('disconnected', function(){
    console.log("Scale disconnected. Try running as root.");
    webScale.on('disconnected', function(){
	console.log("Scale disconnected. Reconnecting...");
    });
});

function roundTowardsZero(num){
    if(num >= 0){
	return Math.floor(num);
    } else {
	return Math.ceil(num);
    }
}