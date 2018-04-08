const https = require('https');
// const querystring = require('querystring');
const moment = require('moment');
const _ = require('underscore');

let openHour = "9:00";
let closeHour = "19:00";
let startDate = "2018-04-02";
let endDate = "2018-04-04"

let qStart = moment(new Date(`${startDate} ${openHour}`));
let qEnd = moment(new Date(`${endDate} ${closeHour}`));

console.log(qStart.format('x'));
console.log(qEnd.format('x'));

const options = {
    hostname: 'cis.apps.sg1.bosch-iot-cloud.com',
    port: 443,
    path: `/api/roomdata/5aa8c731bfd9f7000e140d2d?startTime=${qStart.format('x')}&endTime=${qEnd.format('x')}`,
    method: 'GET'
};

console.log(options);

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    let result = '';
    res.on('data', (chunk) => {
        result+=chunk;
    });

    res.on('end', () => {
        console.log('No more data in response. Start parsing...');
        _.each(JSON.parse(result), (e) => {
            console.log(_.pick(e,'SN','Time', 'TimeZone', 'In','Out'));
        });
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.end();