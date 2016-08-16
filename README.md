# RTP monitoring and metrics

This module is intended to be used with node.js web apps using Express.
 
### Endpoints provided

The following endpoints are provided:

##### GET `/metrics`

This will return metrics in the following JSON format, with HTTP 200:

``` json
{
  "cpu": 5.5,
  "memory": {
    "rss": 92643328,
    "heapTotal": 71131392,
    "heapUsed": 40280776
  }
}
```

*Note: if an error occurs attempting to generate the metrics HTTP 500 will be returned with JSON containing the error*

##### GET `/healthz`

This will check that a session store is available and return HTTP 200 all is ok. The JSON response will be in the following format:
 
``` json
{
  "app": "OK",
  "session": "OK"
}
```

If the request to the endpoint times out then the app is not alive. Also if there is not a session store available HTTP 500 will be returned and it will state "unavailable".

##### GET `/readiness`

The readiness endpoint operates exactly the same as the `/healthz` endpoint.

### How to use

1. Add this module to your application using `npm install --save rtp-monitoring-metrics`
2. Require the module in your main file (e.g. `server.js`) using `const rtpMonitoringMetrics = require('rtp-monitoring-metrics');`
3. Call it to mount middleware functions on the root of your app: `rtpMonitoringMetrics(app);`

### Additional configuration

If you would like to mount the middleware functions under a sub-route, you can do so by passing a base path to the function

```
rtpMonitoringMetrics(app, '/path-to-mount-at');
```
