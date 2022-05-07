![CI](https://github.com/samhstn/postcoder-geocoding-node/workflows/CI/badge.svg?branch=main&event=push)

# Postcoder geocoding

Simple node wrapper for geocoding endpoints of the Postcoder API from Allies.

[Find out more about the geocoding API](https://postcoder.com/docs/address-lookup#uk-geocoding)
and [sign up for a trial to get an API key](https://postcoder.com/sign-up)

The API allows searching for forward and reverse UK geocoding.
**Note: This is a paid for API**

[For full developer documentation](https://postcoder.com/docs)

## Install

`npm install postcoder-geocoding`

[https://www.npmjs.com/package/postcoder-geocoding](https://www.npmjs.com/package/postcoder-geocoding)

### Basic usage

```javascript
const geocoding = require('postcoder-geocoding');

geocoding.init('[YOUR API KEY HERE]');

geocoding.geoFromPostcode('NR14 7PZ', (error, result) => {

    if (error) {
        console.log(error);
    } else {
        // returns an array of locations containing latitude and longitude
        console.log(result);
    }

});
```

Also returns OS Eastings and Northings.

### Return street level data as well as latitude and longitude

```javascript
const geocoding = require('postcoder-geocoding');

geocoding.init('[YOUR API KEY HERE]');

geocoding.searchStreetGeo('NR14 7PZ', (error, result) => {

    if (error) {
        console.log(error);
    } else {
        // returns an array of locations containing street level data,
        // latitude and longitude
        console.log(result);
    }

});
```

Returns street name, county name and more alongside the same fields as the
geoFromPostcode method, [full list of fields](https://postcoder.com/docs/address-lookup#street-lookup)

### Reverse geocoding (street level data)

```javascript
const geocoding = require('postcoder-geocoding');

geocoding.init('[YOUR API KEY HERE]');

// Passing in latitude, longitude and radius (metres)
geocoding.streetFromGeo(
  '52.5859714116',
  '1.3492192897',
  '50',
  (error, result) => {

    if (error) {
        console.log(error);
    } else {
        // returns an array of locations containing street level data,
        // latitude and longitude
        console.log(result);
    }

});
```

### Check status of your API key

Returns an object with information about number of credits on your account and more

[Full list of fields returned](https://postcoder.com/docs/status)

```javascript
const geocoding = require('postcoder-geocoding');

geocoding.init('[YOUR API KEY HERE]');

geocoding.checkStatus((error, result) => {

    if (error) {
        console.log(error);
    } else {
        // returns an object with information about number of
        // credits on your account and more
        console.log(result);
    }

});
```

### Note about support

This is a community supported package, maintained by [Stephen Keable](https://github.com/stephenkeable)
