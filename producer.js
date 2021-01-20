const kafka =  require("kafka-node")
const client = new kafka.KafkaClient("localhost:2181");

const Producer = kafka.Producer
const producer = new Producer(client);
const sentMessage = JSON.stringify({
    Msg_id : 1,
    Sender : 'Tom',
    Msg : 'Hello'
});
    
    producer.on('ready', function () {
        console.log('Producer is ready');

        send(sentMessage)
    });


    
function send(sentMessage) {
    payloads = [
        { topic: "test-kafka2", messages:sentMessage , partition: 0 }
    ];
    producer.send(payloads, function (err, data) {
       console.log("send data ",sentMessage)
    });
}  