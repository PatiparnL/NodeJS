module.exports = (app) => {
    const helloController = require('../controllers/hello.controller');
    // const authorization = require('../../../../config/authorize')
    const environment = require('../../../../environments/environment');

    const vapi = environment.v1;

    app.post(vapi + "/hello", helloController.create);

}