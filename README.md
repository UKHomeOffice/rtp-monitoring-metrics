# RTP monitoring and metrics

This module is intended to be used with node.js web apps using Express. It exports an express router which provides useful endpoints.
 
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
2. Add the exported router to you app: `app.use(require('rtp-monitoring-metrics'));`

### Additional configuration

If you would like to mount the middleware functions under a sub-route, you can do so using express out the box

```
app.use('/path-to-mount-at', require('rtp-monitoring-metrics'));
```
