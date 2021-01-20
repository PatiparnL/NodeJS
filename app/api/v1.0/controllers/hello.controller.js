const kafka = require("kafka-node")
const client = new kafka.KafkaClient("localhost:2181");
const Producer = kafka.Producer
const producer = new Producer(client);

producer.on('ready', function () {
    console.log('Producer is ready');
});

exports.create = (req, res) => {
    send(req.body, res)
}

function send(sentMessage, res) {
    console.log(sentMessage)
    let date = new Date()
    payloads = [
        { topic: "test-kafka2", messages: JSON.stringify(sentMessage), partition: 1 }
    ];
    producer.send(payloads, function (err, data) {
        let log = '# ' + sentMessage.Sender + ': ' + sentMessage.Msg + ', ' + date
        console.log(log)

        res.status(200).json({ Code: 'OK', Received_Time: date});
    });
}  