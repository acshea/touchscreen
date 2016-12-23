var ip = process.argv[2];

if(!ip) {
    console.log("First argument must be an IP address");
    process.exit(0);
}

var mqtt = require('mqtt');
var exec = require('exec');

var client  = mqtt.connect("mqtt://" + ip);

client.on('connect', function () {
  client.subscribe('update');
  client.publish('update', 'Git commit message');
});
 
client.on('message', function (topic, message) {
  // message is Buffer
    
    exec(['git', 'pull'], function(err, out, code) {
      if (err instanceof Error)
        throw err;
      process.stderr.write(err);
      process.stdout.write(out);
    });
    //client.end();
});