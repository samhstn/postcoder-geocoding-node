const https = require('https');
/*
Create instance and basic default options
*/

class AlliesGeocoding {
  constructor() {
    this.config = {
      urlBase: 'https://ws.postcoder.com/pcw/',
      pageNum: 0,
      options: {
        category: 'places',
      },
    };
  }

  /*
  Init function

  Sets up API key (required, will default to Test key if not supplied)

  Optional

  Options object which is turned into query string parameters
  Debug use true to check search key against status service and console.log the result
  */
  init(apiKey, options, debug) {
    if (typeof apiKey === 'string') {
      this.config.apiKey = apiKey;
    } else {
      this.config.apiKey = 'PCW45-12345-12345-1234X';
    }

    const newOptions = options || false;

    if (newOptions) {
      this.setOptions(newOptions);
    }

    this.config.debug = debug || false;

    if (this.config.debug === true) {
      this.checkStatus((response, error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(response);
        }
      });
    }
  }

  /*
  Internal helper functions
  */
  static sendRequest(requestUrl, callback) {
    https.get(requestUrl, (response) => {
      const data = [];
      response.on('data', (chunk) => {
        data.push(chunk);
      });
      response.on('end', () => {
        if (response.statusCode === 200) {
          const theResponse = JSON.parse(data.join());
          return callback(theResponse, false);
        }
        const errorResponse = {
          http_status: response.statusCode,
          error_body: 'Error',
        };
        return callback(false, errorResponse);
      });
    }).on('error', (e) => {
      const errorResponse = {
        http_status: 500,
        error_body: e,
      };
      return callback(false, errorResponse);
    });
  }

  static trimCheck(text) {
    if (text === false) {
      return false;
    }
    if (text.trim() === '') {
      return false;
    }
    return true;
  }

  static queryString(object) {
    return Object.keys(object)
      .map((key) => `${key}=${object[key]}`)
      .join('&');
  }

  /*
  Overwrite the options object after init
  */
  setOptions(object) {
    this.config.options = object;
  }

  /*
  Overwrite the pageNum
  */
  setPageNum(pageNum) {
    if (typeof pageNum === 'number') {
      this.config.pageNum = parseInt(pageNum, 10);
    }
  }

  /*
  Status endpoint give information about number of credits available amongst others
  */
  checkStatus(callback) {
    const requestUrl = `${this.config.urlBase}${this.config.apiKey}/status`;
    AlliesGeocoding.sendRequest(requestUrl, (result, error) => callback(result, error));
  }

  /*
  Return the geodata for a given postcode
  */
  geoFromPostcode(search, callback) {
    const requestUrl = `${this.config.urlBase}${this.config.apiKey}/position/UK/${encodeURIComponent(search)}?${AlliesGeocoding.queryString(this.config.options)}`;
    AlliesGeocoding.sendRequest(requestUrl, (result, error) => callback(result, error));
  }

  /*
  Return the street name(s) along with geodata for a given postcode
  */
  searchStreetGeo(search, callback) {
    const requestUrl = `${this.config.urlBase}${this.config.apiKey}/geo/UK/${encodeURIComponent(search)}?${AlliesGeocoding.queryString(this.config.options)}`;
    AlliesGeocoding.sendRequest(requestUrl, (result, error) => callback(result, error));
  }

  /*
  Return the nearest streets for given latitude and longitude, within radius (metres)
  */
  streetFromGeo(latitude, longitude, radius, callback) {
    const theRadius = radius || 50;
    const theLatitude = latitude || false;
    const theLongitude = longitude || false;

    if (AlliesGeocoding.trimCheck(latitude) !== false
      && AlliesGeocoding.trimCheck(longitude) !== false) {
      const requestUrl = `${this.config.urlBase}${this.config.apiKey}/rgeo/UK/${encodeURIComponent(theLatitude)}/${encodeURIComponent(theLongitude)}?distance=${encodeURIComponent(theRadius)}&${AlliesGeocoding.queryString(this.config.options)}`;
      AlliesGeocoding.sendRequest(requestUrl, (result, error) => callback(result, error));
      return true;
    }
    const errorResponse = {
      http_status: 404,
      error_body: 'No latitude or/and longitude parameter supplied',
    };
    return callback(false, errorResponse);
  }
}

module.exports = new AlliesGeocoding();
