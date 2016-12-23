const mqtt = require('mqtt');
const exec = require('exec');
const fs = require('fs');
const args = JSON.parse(fs.readFileSync('sys.args', 'utf-8'));
const ip = args.ip;

if (!ip) {
    console.log("First argument must be an IP address");
    process.exit(0);
}

const client = mqtt.connect("mqtt://" + ip);

client.on('connect', function (topic, message) {
    exec(['git', 'push'], function (err, out, code) {
        if (err instanceof Error)
            throw err;
        process.stderr.write(err);
        process.stdout.write(out);
        client.publish('update', 'Git commit message');
        client.end();
    });
});