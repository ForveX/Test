#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var axios = require('axios');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'createVech';
    

    for (let i = 0; i <= 100; i++) { 
      
      ch.assertQueue(q, {durable: false});
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
      ch.consume(q, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
      }, {noAck: true});     

      axios
      .get('http://localhost:3000/vechicles')
      .then(response => {
        this.info = response;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      console.log("iteration "+ i)
    }
  });  
});