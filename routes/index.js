'use strict';

const express = require('express');
const router = express.Router();
const request = require('request');

// const secure = require('express-force-https');
// router.use(secure);

router.get('/engagementattributes', (req, res) => {
  res.send('Welcome to SDE Manager. One Service to manage them All!!');
});

router.post('/accounts/:accountId/consumer/:consumerId/engagementattributes', (req, res) => {
  const { accountId, consumerId } = req.params;
  const { appId, engagementAttributes } = req.body;

  const monitoringServiceDomain = 'https://va.v.liveperson.net';

  const monitoringServiceURL = `${monitoringServiceDomain}/api/account/${accountId}/app/${appId}/report?v=1.1`;

  //console.log(monitoringServiceURL);

  const identities = [
    {
        "iss": "LivePerson",
        "acr": "loa1",
        "sub": consumerId
    }
  ];

  const loadSession = {
    identities,
    engagementAttributes
  }

  const options = {
    method: 'PUT',
    url: monitoringServiceURL,
    headers: {
      'X-HTTP-Method-Override': 'PUT',
      'Content-Type': 'application/json'
    },
    body: loadSession,
    json: true
  };

  console.log(monitoringServiceURL);

  request(options, async (error, response, body) =>  {
    if (error) throw new Error(error);

    console.log(body);

    const { message } = body;

    const vid = message.slice(-22);

    const setServiceURL = `${monitoringServiceURL}&vid=${vid}`;

    console.log(setServiceURL);

    const setOptions = {
      method: 'PUT',
      url: setServiceURL,
      headers: {
        'X-HTTP-Method-Override': 'PUT',
        'Content-Type': 'application/json'
      },
      body: loadSession,
      json: true
    };
 
    await new Promise(resolve => setTimeout(resolve, 2000));

    request(setOptions, (setError, setResponse, setBody) => {
      if (setError) throw new Error(setError);

      console.log(setBody);

      res.send(setBody);
    });

  });

});

module.exports = router;

