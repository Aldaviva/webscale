WebScale
========

Measure weight using a Stamps.com digital USB postage scale.

![Stamps.com 5-pound digital postage scale](http://store.stamps.com/web/images/catalog/sku/SC05500000_small.jpg)

# Hardware
1. Sign up for free trial at [Stamps.com](https://registration.stamps.com/registration/).
2. During signup, request a complimentary [5-pound digital postage scale](http://store.stamps.com/Store/catalog/product4.jsp?id=5lb-digital-postal-scale). Pay $9.99 shipping and handling.
3. Before the four-week trial is up, [cancel your account](https://stamps.custhelp.com/app/answers/detail/a_id/114/kw/cancel) and avoid the monthly fee.

# Installation
    $ npm install webscale
In the event of installation trouble, refer to the [node-hid documentation](https://github.com/node-hid/node-hid/blob/master/README.md).

# Usage
```javascript
var WebScale = require('webscale');
var webScale = new WebScale();

webScale.on('change:weight', function(ounces){
    console.log(ounces + ' oz.');
});
```
See also `test-client.js`.

# Events

## change:weight
Called whenever the scale's weight reading changes.
### Arguments
- **ounces** how much weight is on the scale, in ounces. Can be negative if the scale was tared with weight on it.

## connected
Called when the program first starts and connects successfully to the device, or when it reconnects after losing the connection.

## disconnected
Called when the device is unplugged or powered off, and once per reconnect attempt.

## error
An error with the USB device occurred (except disconnections, see above).
### Arguments
- **error** The error from node-hid.

# Methods

## disconnect()
Disconnect from the USB device.
