const kafka = require("kafka-node")

const db = require('./db');
const hello = require('./app/api/v1.0/models/hello_model');

const client = new kafka.KafkaClient("localhost:2181");

const topics = [
  {
    topic: "test-kafka2", //test-kafka
    partition: 1
  }
];
const options = {
  autoCommit: true
};

const consumer = new kafka.Consumer(client, topics, options);

consumer.on("message", function (message) {
  db.connectProd().then(() => {
    console.log(message)
    let obj = JSON.parse(message.value)
    hello.create(obj).then(result => {

    }).catch(error => {
      console.log(error.message)
    })
  });


});

consumer.on('error', function (err) {
  console.log('Error:', err);
})

consumer.on('offsetOutOfRange', function (err) {
  console.log('offsetOutOfRange:', err);
})