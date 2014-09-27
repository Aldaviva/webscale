var HID = require('node-hid');
var util = require('util');
var events = require('events');

var VENDOR_ID = 9332;
var PRODUCT_ID = 1360;


function WebScale(deviceIndex){
    this._prevWeight = null;
    this._deviceIndex = deviceIndex || 0;
    this._device = null;

    this._connectWithRetry();
}

util.inherits(WebScale, events.EventEmitter);

WebScale.prototype.disconnect = function(){
    if(this._device){
	this.emit('disconnected');
	this._device.close();
	this._device = null;
    }
};

WebScale.prototype._connectWithRetry = function(){
    var reconnectInterval = setInterval((function(){
	try {
	    this._connect();
	    clearInterval(reconnectInterval);
	} catch(e){
	    //reconnect failed, try again shortly
	}
    }).bind(this), 2000);
};

WebScale.prototype._connect = function(){
    var devices = HID.devices(VENDOR_ID, PRODUCT_ID);

    if(!devices.length || !devices[this._deviceIndex]){
	this.emit('disconnected');
    }

    var devicePath = devices[this._deviceIndex].path;
    this._device = new HID.HID(devicePath);
    this._onConnect(this._device);
};

WebScale.prototype._onConnect = function(device){
    this.emit('connected');
    device.on('data', this._onData.bind(this));
    device.on('error', this._onError.bind(this));
};

WebScale.prototype._onData = function(data){
    var ounces = data.readInt16LE(4)/10;

    if(this._prevWeight !== ounces){
	this._prevWeight = ounces;
	this.emit('change:weight', ounces);
    }
};

WebScale.prototype._onError = function(error){
    if(error.message == 'could not read from HID device'){
	this.emit('disconnected', error);
	this._connectWithRetry();
    } else {
	this.emit('error', error);
    }
};

module.exports = WebScale;
